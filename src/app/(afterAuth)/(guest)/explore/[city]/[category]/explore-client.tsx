'use client';

import React from 'react';
import { useExplorePage } from './useExplorePage';
import {
    CityHeroSection,
    ExploreSpacesSection,
    WhyBookSection,
    CategoryGallery,
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
    'wellness-workshops': wellnessBanner,
    'wellness-workshop': wellnessBanner,
    workshops: workshopsBanner,
    'event-venues': eventVenturesBanner,
    'event-venue': eventVenturesBanner,
    'cyclorama': cycloramaBanner,
    'cyclorama-studios': cycloramaBanner,
};

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
    const {
        mostBooked,
        recentlyAdded,
        isLoading,
        isAuth,
        handleSpaceClick,
        handleSearch,
        handleGalleryItemClick,
    } = useExplorePage(initialSpaceData);

    // Get config for this category or fallback
    const normalizedCategory = (categorySlug || '').toLowerCase();
    const galleryConfig = EXPLORE_PAGE_GALLERY[normalizedCategory] || EXPLORE_PAGE_GALLERY.DEFAULT;
    const galleryItems = galleryConfig.items || [];
    const faqs = EXPLORE_PAGE_FAQS[normalizedCategory] || EXPLORE_PAGE_FAQS.DEFAULT;

    const bannerInfo = CATEGORY_BANNERS[normalizedCategory] || DEFAULT_BANNER;

    // Format strings
    const formattedCity = formatCityName(citySlug);
    const formattedCategory = capitalize(normalizedCategory.replace(/-/g, ' '));
    const title = `${formattedCategory} in ${formattedCity}`;

    // First try mapping from our assets, then fallback to CategoryBanner ogImage, then default
    const heroImageUrl = BANNER_IMAGE_MAP[normalizedCategory];

    return (
        <div className="relative min-h-screen bg-white flex flex-col w-full gap-8 md:gap-16">
            <CityHeroSection
                title={title}
                description={
                    bannerInfo.description ||
                    `Discover and book professional ${formattedCategory.toLowerCase()} in ${formattedCity}.`
                }
                heroImageUrl={heroImageUrl}
                city={formattedCity}
                onSearch={handleSearch}
            />

            <ExploreSpacesSection
                city={formattedCity}
                mostBooked={mostBooked}
                recentlyAdded={recentlyAdded}
                isLoading={isLoading}
                isAuth={isAuth}
                onSpaceClick={handleSpaceClick}
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
