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
import { SEO_BANNERS } from '@/constants/seoBanners';
import { formatCityName } from '@/utils';
import {
    photographyBanner,
    podcastBanner,
    baithakBanner,
    bookLaunchBanner,
    wellnessBanner,
    exhibitionBanner,
    eventVenturesBanner,
    workshopsBanner,
    creativeSpacesBanner,
    cycloramaBanner,

    soundHealingBanner,
    danceRehearsalBanner,
    yogaBanner,
    kitchenBanner,
    livingRoomNewBanner,
    performanceBanner,
    theatreBanner,
    supperClubBanner,

    outdoorSpaceBanner,
    bhajanClubbingBanner,

    screeningSpaceBanner,
    artGalleryBanner,
    warehouseStudioBanner,
    brandPopUpBanner,
} from '@/assets/explore-page';
import { EXPLORE_PAGE_FAQS, EXPLORE_PAGE_GALLERY } from '@/constants/explorePage';

const BANNER_IMAGE_MAP: Record<string, any> = {
    'sound-healing':        soundHealingBanner,
    'dance-rehearsal':      danceRehearsalBanner,
    yoga:                   yogaBanner,
    'yoga-sessions':        yogaBanner,
    kitchen:                kitchenBanner,
    'living-room':          livingRoomNewBanner,
    performance:            performanceBanner,
    theatre:                theatreBanner,
    'supper-club':          supperClubBanner,
    'meet-up':              workshopsBanner,
    meetup:                 workshopsBanner,
    'outdoor-space':        outdoorSpaceBanner,
    'bhajan-clubbing':      bhajanClubbingBanner,
    'community-meetup':     eventVenturesBanner,
    'community-meetups':    eventVenturesBanner,
    'screening-space':      screeningSpaceBanner,
    'screening-spaces':     screeningSpaceBanner,
    'art-gallery':          artGalleryBanner,
    'warehouse-studio':     warehouseStudioBanner,
    'book-launch':          bookLaunchBanner,
    'brand-pop-up':         brandPopUpBanner,

    'photography-studios':  photographyBanner,
    podcast:                podcastBanner,
    'podcast-studios':      podcastBanner,
    baithaks:               baithakBanner,
    baithak:                baithakBanner,
    'fitness-wellness':     wellnessBanner,
    exhibitions:            exhibitionBanner,
    'event-venues':         eventVenturesBanner,
    workshops:              workshopsBanner,
    'creative-spaces':      creativeSpacesBanner,
    'cyclorama-studios':    cycloramaBanner,
};

const CATEGORY_TITLE_PREFIXES: Record<string, string> = {
    'sound-healing': 'Sound Healing Spaces',
    'dance-rehearsal': 'Dance Rehearsal Spaces',
    yoga: 'Yoga Studios & Wellness Spaces',
    'yoga-sessions': 'Yoga Studios & Wellness Spaces',
    kitchen: 'Kitchen Sets & Spaces',
    'living-room': 'Living Room & Residential Spaces',
    performance: 'Performance Venues',
    theatre: 'Theatre Spaces for Plays & Performances',
    'supper-club': 'Supper Club Venues',
    'meet-up': 'Meetup Spaces',
    meetup: 'Meetup Spaces',
    'outdoor-space': 'Outdoor & Open-Air Spaces',
    'bhajan-clubbing': 'Bhajan & Spiritual Gathering Venues',
    'community-meetup': 'Community Meetup Spaces',
    'community-meetups': 'Community Meetup Spaces',
    'screening-space': 'Screening Spaces',
    'screening-spaces': 'Screening Spaces',
    'art-gallery': 'Art Galleries',
    'warehouse-studio': 'Warehouse Studios',
    'book-launch': 'Book Launch Venues',
    'brand-pop-up': 'Brand Pop Up Spaces',

    'photography-studios': 'Photography Studios',
    podcast: 'Podcast Studios',
    'podcast-studios': 'Podcast Studios',
    baithaks: 'Spaces for Hosting Baithaks',
    baithak: 'Spaces for Hosting Baithaks',
    'fitness-wellness': 'Fitness and Wellness Spaces',
    exhibitions: 'Exhibition Spaces',
    'event-venues': 'Event Venues',
    workshops: 'Spaces for Workshops',
    'creative-spaces': 'Creative Spaces',
    'cyclorama-studios': 'Cyclorama Studios',
};

const CATEGORY_CTA_LABELS: Record<string, string> = {
    'sound-healing': 'Find Sound Healing Spaces',
    'dance-rehearsal': 'Find Dance Rehearsal Spaces',
    yoga: 'Find Yoga Studios & Wellness Spaces',
    'yoga-sessions': 'Find Yoga Studios & Wellness Spaces',
    kitchen: 'Find Kitchen Sets & Spaces',
    'living-room': 'Find Living Room & Residential Spaces',
    performance: 'Find Performance Venues',
    theatre: 'Find Theatre Spaces',
    'supper-club': 'Find Supper Club Venues',
    'meet-up': 'Find Meetup Spaces',
    meetup: 'Find Meetup Spaces',
    'outdoor-space': 'Find Outdoor Spaces',
    'bhajan-clubbing': 'Find Bhajan & Spiritual Gathering Venues',
    'community-meetup': 'Find Community Meetup Spaces',
    'community-meetups': 'Find Community Meetup Spaces',
    'screening-space': 'Find Screening Spaces',
    'screening-spaces': 'Find Screening Spaces',
    'art-gallery': 'Find Art Galleries',
    'warehouse-studio': 'Find Warehouse Studios',
    'book-launch': 'Find Book Launch Venues',
    'brand-pop-up': 'Find Brand Pop Up Spaces',

    'photography-studios': 'Find Photography Studios',
    podcast: 'Find Podcast Studios',
    'podcast-studios': 'Find Podcast Studios',
    baithaks: 'Find Baithak Spaces',
    baithak: 'Find Baithak Spaces',
    'fitness-wellness': 'Find Fitness & Wellness Spaces',
    exhibitions: 'Find Exhibition Spaces',
    'event-venues': 'Find Event Venues',
    workshops: 'Find Workshop Spaces',
    'creative-spaces': 'Find Creative Spaces',
    'cyclorama-studios': 'Find Cyclorama Studios',
};

const VALID_CITIES = new Set(['delhi-ncr', 'delhi']);
const VALID_CATEGORIES = new Set(Object.keys(SEO_BANNERS));

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

    const bannerInfo = SEO_BANNERS[normalizedCategory] || CATEGORY_BANNERS[normalizedCategory] || CATEGORY_BANNERS[configKey] || DEFAULT_BANNER;

    // Format strings
    const formattedCity = formatCityName(citySlug);
    const formattedCategory = normalizedCategory
        .split(/[\s-]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    
    const activeBanner = SEO_BANNERS[normalizedCategory] || CATEGORY_BANNERS[normalizedCategory];
    const titlePrefix = CATEGORY_TITLE_PREFIXES[normalizedCategory] || 
        (activeBanner && activeBanner.title !== DEFAULT_BANNER.title
            ? activeBanner.title
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

            <WhyBookSection title={galleryConfig.whyBookTitle || `Why Book ${formattedCategory} Through Spare Space?`} />

            <FAQSection faqs={faqs} />

            <Footer />
        </div>
    );
}
