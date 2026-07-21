'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { useExplorePage } from './useExplorePage';
import {
    CityHeroSection,
    ExploreSpacesSection,
    WhyBookSection,
    FAQSection,
} from '@/components/explorePage';
import Footer from '@/components/layout/footer';
import { CATEGORY_BANNERS, DEFAULT_BANNER } from '@/constants/categoryBanners';
import { capitalize, formatCityName } from '@/utils';
import {
    baithakBanner,
    creativeSpacesBanner,
    eventVenturesBanner,
    exhibitionBanner,
    livingRoomBanner,
    photographyBanner,
    podcastBanner,
    wellnessBanner,
    workshopsBanner,
    cycloramaBanner
} from '@/assets/explore-page';
import { EXPLORE_PAGE_FAQS, EXPLORE_PAGE_GALLERY } from '@/constants/explorePage';

const BANNER_IMAGE_MAP: Record<string, any> = {
    baithaks: baithakBanner,
    baithak: baithakBanner,
    'creative-spaces': creativeSpacesBanner,
    'creative-space': creativeSpacesBanner,
    'event-spaces': eventVenturesBanner,
    exhibitions: exhibitionBanner,
    'exhibition-spaces': exhibitionBanner,
    'residential-spaces': livingRoomBanner,
    'photography-studios': photographyBanner,
    podcast: podcastBanner,
    'podcast-studios': podcastBanner,
    wellness: wellnessBanner,
    'fitness-wellness': wellnessBanner,
    'wellness-workshop': wellnessBanner,
    'fitness-wellness-spaces': wellnessBanner,
    workshops: workshopsBanner,
    workshop: workshopsBanner,
    'event-venues': eventVenturesBanner,
    'event-venue': eventVenturesBanner,
    'cyclorama': cycloramaBanner,
    'cyclorama-studios': cycloramaBanner,
};

const CATEGORY_TITLE_PREFIXES: Record<string, string> = {
    baithaks: 'Spaces for Hosting Baithaks',
    baithak: 'Spaces for Hosting Baithaks',
    'fitness-wellness': 'Fitness and Wellness Spaces',
    'wellness-workshop': 'Fitness and Wellness Spaces',
    wellness: 'Fitness and Wellness Spaces',
    'fitness-wellness-spaces': 'Fitness and Wellness Spaces',
    workshops: 'Spaces for Workshops',
    workshop: 'Spaces for Workshops',
};

const CATEGORY_CTA_LABELS: Record<string, string> = {
    baithaks: 'Find Baithak Spaces',
    baithak: 'Find Baithak Spaces',
    'fitness-wellness': 'Find Fitness & Wellness Spaces',
    'wellness-workshop': 'Find Fitness & Wellness Spaces',
    wellness: 'Find Fitness & Wellness Spaces',
    'fitness-wellness-spaces': 'Find Fitness & Wellness Spaces',
    'photography-studios': 'Find Photography Studios',
    'podcast-studios': 'Find Podcast Studios',
    'event-venues': 'Find Event Venues',
    'event-venue': 'Find Event Venues',
    'event-spaces': 'Find Event Spaces',
    'creative-spaces': 'Find Creative Spaces',
    'creative-space': 'Find Creative Spaces',
    'cyclorama-studios': 'Find Cyclorama Studios',
    cyclorama: 'Find Cyclorama Studios',
    exhibitions: 'Find Exhibition Spaces',
    'exhibition-spaces': 'Find Exhibition Spaces',
    'residential-spaces': 'Find Residential Spaces',
    workshops: 'Find Workshop Spaces',
    workshop: 'Find Workshop Spaces',
};

const VALID_CITIES = new Set(['delhi-ncr', 'delhi']);
const VALID_CATEGORIES = new Set(Object.keys(BANNER_IMAGE_MAP));

interface ExploreClientProps {
    initialSpaceData?: any;
    citySlug: string;
    categorySlug: string;
}

export default function ExploreClient({
    initialSpaceData,
    citySlug,
    categorySlug,
}: ExploreClientProps) {
    const normalizedCity = (citySlug || '').toLowerCase();
    const normalizedCategory = (categorySlug || '').toLowerCase();

    if (!VALID_CITIES.has(normalizedCity) || !VALID_CATEGORIES.has(normalizedCategory)) {
        notFound();
    }

    const {
        spacesByCity,
        isLoading,
        isAuth,
        handleSpaceClick,
        handleSearch,
        handleGalleryItemClick,
        handleCtaClick,
        handleCityHeaderClick,
    } = useExplorePage(initialSpaceData);

    // Get config for this category or fallback
    
    // Map alternative category slugs to their main config key in EXPLORE_PAGE_GALLERY
    const galleryConfigKeyMap: Record<string, string> = {
        'baithaks': 'baithak',
        'podcast-studios': 'podcast',
        'exhibition-spaces': 'exhibitions',
        'exhibition': 'exhibitions',
        'wellness-workshop': 'fitness-wellness',
        'wellness': 'fitness-wellness',
        'fitness-wellness-spaces': 'fitness-wellness',
    };
    const configKey = galleryConfigKeyMap[normalizedCategory] || normalizedCategory;
    const galleryConfig = EXPLORE_PAGE_GALLERY[configKey] || EXPLORE_PAGE_GALLERY.DEFAULT;
    const galleryItems = galleryConfig.items || [];
    const faqs = EXPLORE_PAGE_FAQS[normalizedCategory] || EXPLORE_PAGE_FAQS.DEFAULT;

    const bannerInfo = CATEGORY_BANNERS[normalizedCategory] || CATEGORY_BANNERS[configKey] || DEFAULT_BANNER;

    // Format strings
    const formattedCity = formatCityName(citySlug);
    const formattedCategory = normalizedCategory
        .split(/[\s-]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    
    // Determine custom prefix from map, fallback to banner title, fallback to capitalized category
    const titlePrefix = CATEGORY_TITLE_PREFIXES[normalizedCategory] || 
        (CATEGORY_BANNERS[normalizedCategory] && CATEGORY_BANNERS[normalizedCategory].title !== DEFAULT_BANNER.title
            ? CATEGORY_BANNERS[normalizedCategory].title
            : formattedCategory);
        
    const title = `${titlePrefix} in ${formattedCity}`;

    // First try mapping from our assets, then fallback to CategoryBanner ogImage, then default
    const heroImageUrl = BANNER_IMAGE_MAP[normalizedCategory];

    const ctaLabel = CATEGORY_CTA_LABELS[normalizedCategory];

    return (
        <div className="relative min-h-screen bg-white flex flex-col w-full gap-8 md:gap-16">
            <CityHeroSection
                title={title}
                description={
                    bannerInfo.description
                        ? bannerInfo.description.replace('{city}', formattedCity.replace(/\s*NCR\s*$/i, ''))
                        : `Discover and book professional ${formattedCategory.toLowerCase()} in ${formattedCity}.`
                }
                heroImageUrl={heroImageUrl}
                city={formattedCity}
                ctaLabel={ctaLabel}
                onSearch={handleSearch}
                onCtaClick={() => handleCtaClick(categorySlug)}
            />

            <ExploreSpacesSection
                city={formattedCity}
                spacesByCity={spacesByCity}
                isLoading={isLoading}
                isAuth={isAuth}
                onSpaceClick={handleSpaceClick}
                onCityHeaderClick={(cityKey) => handleCityHeaderClick(cityKey, categorySlug)}
            />

            <WhyBookSection title={galleryConfig.whyBookTitle || `Why Book ${formattedCategory} Through Sparespace?`} />

            {/* {galleryItems.length > 0 && (
                <CategoryGallery
                    title={galleryConfig.title || `${formattedCategory.split(' ')[0]} Types`}
                    items={galleryItems}
                    onItemClick={handleGalleryItemClick}
                />
            )} */}

            <FAQSection faqs={faqs} />

            <Footer />
        </div>
    );
}
