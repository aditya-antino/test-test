import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import ExploreClient from './explore-client';
import { ServerGet } from '@/services/serverApi';
import { endpoints } from '@/services/endPoints';
import { SEO_BANNERS } from '@/constants/seoBanners';
import { formatCityName } from '@/utils';

export const dynamic = 'force-dynamic';

const VALID_CITIES = new Set(['delhi-ncr', 'delhi']);

const VALID_CATEGORIES = new Set(Object.keys(SEO_BANNERS));

const toSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

type Props = {
    params: Promise<{
        city: string;
        category: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const headersList = await headers();
    const host = headersList.get('host');

    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const formatTitle = (str?: string) => {
        if (!str) return '';
        return str
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const resolvedParams = await params;
    const { city, category } = resolvedParams;
    const normalizedCity = (city || '').toLowerCase();
    const normalizedCategory = (category || '').toLowerCase();

    if (!VALID_CITIES.has(normalizedCity) || !VALID_CATEGORIES.has(normalizedCategory)) {
        notFound();
    }

    const formattedCity = formatCityName(city);
    const formattedCategory = formatTitle(category);

    const bannerInfo = SEO_BANNERS[normalizedCategory];

    const title = bannerInfo?.metaTitle
        ? bannerInfo.metaTitle.replaceAll('{city}', formattedCity)
        : `${formattedCategory} in ${formattedCity} | Spare Space`;
        
    const description = bannerInfo?.metaDescription
        ? bannerInfo.metaDescription.replaceAll('{city}', formattedCity)
        : `Discover and book professional ${formattedCategory.toLowerCase()} in ${formattedCity}. Book unique spaces on Spare Space.`;

    const EXPLORE_OG_IMAGE_MAP: Record<string, string> = {
        'photography-studios':      '/og-images/photography_banner_image.jpg',
        'podcast-studios':          '/og-images/podcast_banner_image.png',
        'baithaks':                 '/og-images/baithak_banner_image.jpg',
        'fitness-wellness':         '/og-images/wellness_banner_image.webp',
        'fitness-wellness-spaces':  '/og-images/wellness_banner_image.webp',
        'exhibitions':              '/og-images/exhibition_banner_image.jpg',
        'event-venues':             '/og-images/event_venues_banner_image.jpg',
        'workshops':                '/og-images/workshop_banner_image.jpg',
        'creative-spaces':          '/og-images/creative_spaces_banner_image.jpg',
        'cyclorama-studios':        '/og-images/cyclorama_banner_image.png',
        // new banners
        'sound-healing':            '/og-images/sound_healing.png',
        'dance-rehearsal':          '/og-images/dance_rehearsal.png',
        'yoga':                     '/og-images/yoga.png',
        'yoga-sessions':            '/og-images/yoga.png',
        'kitchen':                  '/og-images/kitchen.png',
        'living-room':              '/og-images/living_room.png',
        'performance':              '/og-images/performance.jpg',
        'theatre':                  '/og-images/theatre.png',
        'supper-club':              '/og-images/supper_club.png',
        'outdoor-space':            '/og-images/outdoor_space.jpg',
        'bhajan-clubbing':          '/og-images/bhajan_clubbing.png',
        'screening-space':          '/og-images/screening _space.jpg',
        'screening-spaces':         '/og-images/screening _space.jpg',
        'art-gallery':              '/og-images/art_gallery.jpg',
        'warehouse-studio':         '/og-images/warehouse_studio.jpg',
        'brand-pop-up':             '/og-images/brand_pop_up.png',
    };

    let ogImageUrl = `${baseUrl}/og-image.png`;

    // 1st priority: use our hardcoded banner image map
    if (EXPLORE_OG_IMAGE_MAP[normalizedCategory]) {
        ogImageUrl = `${baseUrl}${EXPLORE_OG_IMAGE_MAP[normalizedCategory]}`;
    } else {
        // 2nd priority: try backend CategoryMaster.imgUrl
        try {
            const categoriesRes: any = await ServerGet(endpoints.GET_PUBLIC_CATEGORIES);
            const categories: any[] = categoriesRes?.data?.categories ?? [];

            const matched = categories.find(
                (c: any) => c.CategoryMaster?.name && toSlug(c.CategoryMaster.name) === normalizedCategory,
            );

            if (matched?.CategoryMaster?.imgUrl) {
                ogImageUrl = matched.CategoryMaster.imgUrl;
            }
        } catch (_) {}

        // 3rd priority: fall back to seoBanners.ts ogImage field
        if (ogImageUrl === `${baseUrl}/og-image.png`) {
            if (normalizedCategory && SEO_BANNERS[normalizedCategory]) {
                const item = SEO_BANNERS[normalizedCategory];
                let localPath = '';
                if (item.ogImage) {
                    localPath = item.ogImage;
                } else if (item.parentCategory && SEO_BANNERS[item.parentCategory]?.ogImage) {
                    localPath = SEO_BANNERS[item.parentCategory].ogImage;
                }
                if (localPath) ogImageUrl = `${baseUrl}${localPath}`;
            }
        }
    }

    return {
        title,
        description,

        openGraph: {
            title,
            description,
            url: `${baseUrl}/explore/${city}/${category}`,
            siteName: 'Spare Space',
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: 'Spare Space',
                },
            ],
            type: 'website',
        },

        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImageUrl],
        },
    };
}

async function getSpaceList(city: string, category: string) {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('city', city.replace(/-/g, ' '));
        queryParams.append('activity', category);
        queryParams.append('limit', '10');

        const apiUrl = `${endpoints.GET_EXPLORE_SPACES}?${queryParams.toString()}`;

        const response: any = await ServerGet(apiUrl);

        return response?.data ?? response ?? null;
    } catch (error) {
        console.error('[ExplorePage] Error fetching space list:', error);
        return null;
    }
}

export default async function ExplorePage({ params }: Props) {
    const resolvedParams = await params;
    const { city, category } = resolvedParams;
    const normalizedCity = (city || '').toLowerCase();
    const normalizedCategory = (category || '').toLowerCase();

    if (!VALID_CITIES.has(normalizedCity) || !VALID_CATEGORIES.has(normalizedCategory)) {
        notFound();
    }

    const initialSpaceData = await getSpaceList(city, category);

    return (
        <ExploreClient
            initialSpaceData={initialSpaceData}
            citySlug={city}
            categorySlug={category}
        />
    );
}
