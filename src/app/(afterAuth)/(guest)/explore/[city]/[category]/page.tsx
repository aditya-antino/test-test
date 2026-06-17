import type { Metadata } from 'next';
import { headers } from 'next/headers';
import ExploreClient from './explore-client';
import { ServerGet } from '@/services/serverApi';
import { endpoints } from '@/services/endPoints';
import { CATEGORY_BANNERS } from '@/constants/categoryBanners';

export const dynamic = 'force-dynamic';

const toSlug = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

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

    const formattedCity = formatTitle(city);
    const formattedCategory = formatTitle(category);

    const title = `${formattedCategory} in ${formattedCity} | Spare Space`;
    const description = `Discover and book professional ${formattedCategory.toLowerCase()} in ${formattedCity}. Book unique spaces on Spare Space.`;

    let ogImageUrl = `${baseUrl}/og-image.png`;

    try {
        const categoriesRes: any = await ServerGet(endpoints.GET_PUBLIC_CATEGORIES);
        const categories: any[] = categoriesRes?.data?.categories ?? [];

        const matched = categories.find(
            (c: any) => c.CategoryMaster?.name && toSlug(c.CategoryMaster.name) === category,
        );

        if (matched?.CategoryMaster?.imgUrl) {
            ogImageUrl = matched.CategoryMaster.imgUrl;
        }
    } catch (_) {}

    if (ogImageUrl === `${baseUrl}/og-image.png`) {
        if (category && CATEGORY_BANNERS[category]) {
            const item = CATEGORY_BANNERS[category];
            let localPath = '';
            if (item.ogImage) {
                localPath = item.ogImage;
            } else if (item.parentCategory && CATEGORY_BANNERS[item.parentCategory]?.ogImage) {
                localPath = CATEGORY_BANNERS[item.parentCategory].ogImage;
            }
            if (localPath) ogImageUrl = `${baseUrl}${localPath}`;
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

async function getMetadata() {
    try {
        const response: any = await ServerGet(endpoints.GET_PUBLIC_CATEGORIES);
        return response?.data ?? null;
    } catch (error) {
        return null;
    }
}

async function getSpaceList(city: string, category: string, metadata: any) {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('page', '1');
        queryParams.append('limit', '20');

        if (category && metadata?.categories) {
            const matchedCategoryIds = metadata.categories
                .filter(
                    (c: any) =>
                        c.CategoryMaster?.name && toSlug(c.CategoryMaster.name) === category,
                )
                .map((c: any) => c.categoryId);

            if (matchedCategoryIds.length > 0) {
                queryParams.append('categoryIds', matchedCategoryIds.join(','));
            } else {
                // Check if it's an activity if not found in categories
                const matchedActivityIds = metadata.activities
                    ?.filter((a: any) => a.activity && toSlug(a.activity) === category)
                    ?.flatMap((a: any) => a.ids || [a.id]);

                if (matchedActivityIds && matchedActivityIds.length > 0) {
                    queryParams.append('activityIds', matchedActivityIds.join(','));
                }
            }
        }

        // We use the home-spaces endpoint to get 'mostBookedSpaces' and 'recentlyAddedSpaces'
        // 'city' here is the slug. We pass it as 'city' parameter since the endpoint supports it.
        queryParams.append('city', city.replace(/-/g, ' '));

        const response: any = await ServerGet(
            `guest/home-spaces?${queryParams.toString()}`,
        );
        return response?.data ?? response ?? null;
    } catch (error) {
        console.error('Error fetching space list on server for explore page:', error);
        return null;
    }
}

export default async function ExplorePage({ params }: Props) {
    const resolvedParams = await params;
    const { city, category } = resolvedParams;

    const metadata = await getMetadata();
    const initialSpaceData = await getSpaceList(city, category, metadata);

    return (
        <ExploreClient
            initialSpaceData={initialSpaceData}
            citySlug={city}
            categorySlug={category}
        />
    );
}
