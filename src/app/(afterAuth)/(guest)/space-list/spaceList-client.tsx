'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import HomePageSearchBarTab from '@/components/homePage/HomePageSearchBarTab';
import Footer from '@/components/layout/footer';
import { PATHS } from '@/constants/path';
import { Users, Filter, X, Tag } from 'lucide-react';
import FilterPill from '@/components/common/FilterPills';
import { SkeletonCardGrid, BannerSkeleton } from '@/components/skeletons';
import { ProudlyNotAi } from '@/components/common';
import FiltersDrawerGeneric from '@/components/common/FilterDrawer';
import { useSpaceList, toSlug } from './useSpaceList';
import CategoryBanner from '@/components/common/CategoryBanner';
import { CATEGORY_BANNERS, DEFAULT_BANNER } from '@/constants/categoryBanners';
import MobileSpaceList from './MobileSpaceList';
import DesktopSpaceList from './DesktopSpaceList';
import { useRouter } from 'next/navigation';

const transformCategoryData = (categories: any) => {
    if (!Array.isArray(categories)) return [];
    return categories.map((item: any) => ({
        id: String(item.categoryId),
        name: item?.CategoryMaster?.name ?? '',
    }));
};

interface SpaceListClientProps {
    initialSpaceData?: any;
}

const SpaceListClient = ({ initialSpaceData }: SpaceListClientProps) => {
    const {
        appliedFilters,
        setAppliedFilters,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        filterSections,
        categoriesData,
        categoriesLoading,
        isSectionsLoading,
        isAuth,
        filterParams,
        handleSearchBarSearch,
        clearFilters,
        activitiesLoading,
        selectedCategories,
        selectedActivities,
        drawerSelected,
    } = useSpaceList(initialSpaceData);

    // Viewport detection — null = SSR/hydration guard, avoids flash
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const categories = categoriesData?.data?.categories || [];

    const mainHeading = useMemo(() => {
        const space = selectedCategories?.[0]?.item?.name || '';
        const activity = selectedActivities?.[0]?.name || '';
        return space || activity || '';
    }, [selectedActivities, selectedCategories]);

    // Stable reference — prevents sub-components from re-rendering on unrelated parent state changes
    const router = useRouter();
    const handleSpaceClick = useCallback(
        (slug: string) => {
            router.push(`${PATHS.GUEST_SPACE_DETAILS}/${slug}`);
        },
        [router],
    );

    const renderListings = () => {
        // SSR / hydration guard: show skeleton until viewport is known
        if (isMobile === null) {
            return (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-6">
                    <div className="lg:col-span-2">
                        <SkeletonCardGrid count={2} gridClassName="grid-cols-1 md:grid-cols-2" />
                    </div>
                    <div className="hidden lg:block lg:col-span-2 min-h-[450px]">
                        <div className="w-full h-full bg-gray-100 animate-pulse rounded-2xl" />
                    </div>
                </div>
            );
        }

        if (isMobile) {
            return (
                <MobileSpaceList
                    filterParams={filterParams}
                    isAuth={isAuth}
                    handleSpaceClick={handleSpaceClick}
                    clearFilters={clearFilters}
                />
            );
        }

        return (
            <DesktopSpaceList
                filterParams={filterParams}
                isAuth={isAuth}
                handleSpaceClick={handleSpaceClick}
                clearFilters={clearFilters}
            />
        );
    };

    return (
        <div className="relative min-h-screen">
            {/* Search Bar */}
            <div className="flex flex-col items-center mx-auto my-4 w-full max-w-6xl px-4">
                <HomePageSearchBarTab isSearchPage onSearch={handleSearchBarSearch} />
            </div>

            {/* Dynamic Category Banner */}
            <div className="w-full max-w-6xl mx-auto px-4 md:my-6">
                {categoriesLoading || activitiesLoading ? (
                    <BannerSkeleton />
                ) : (
                    (() => {
                        const slug = mainHeading ? toSlug(mainHeading) : '';
                        const resolvedSlug = slug === 'creative-spaces' ? 'creative-space' : slug;
                        const bannerContent = CATEGORY_BANNERS[resolvedSlug] || DEFAULT_BANNER;
                        return <CategoryBanner content={bannerContent} />;
                    })()
                )}
            </div>

            {/* Mobile ProudlyNotAI pill */}
            <div className="flex md:hidden px-4 w-full justify-start items-center border-b pb-4 mb-2">
                <ProudlyNotAi variant="pill" popoverAlign="right" />
            </div>

            {/* Filters + Listings */}
            <div className="px-4 md:px-16">
                {/* Filters Row */}
                <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-between md:items-center w-full">
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-1 pl-1">
                        {/* Price Sort Pill */}
                        <FilterPill
                            key={appliedFilters.range || 'none'}
                            triggerMode="dropdown"
                            placeholder={
                                appliedFilters.range === 'low-to-high'
                                    ? 'Price: Low to High'
                                    : appliedFilters.range === 'high-to-low'
                                    ? 'Price: High to Low'
                                    : 'Price'
                            }
                            leftIcon={<Tag className="h-4 w-4" />}
                            rightIcon={
                                appliedFilters.range ? (
                                    <span
                                        onPointerDown={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setAppliedFilters((prev) => ({
                                                ...prev,
                                                range: undefined,
                                                minPrice: undefined,
                                                maxPrice: undefined,
                                            }));
                                        }}
                                        className="hover:bg-black/10 rounded-full p-0.5 transition-colors cursor-pointer"
                                    >
                                        <X className="h-3 w-3 text-primary-p3" />
                                    </span>
                                ) : undefined
                            }
                            defaultValue={appliedFilters.range}
                            options={[
                                { label: 'Low to High', value: 'low-to-high' },
                                { label: 'High to Low', value: 'high-to-low' },
                            ]}
                            onChange={(val) => {
                                setAppliedFilters((prev) => ({
                                    ...prev,
                                    range: val === 'low-to-high' || val === 'high-to-low' ? val : undefined,
                                    minPrice: undefined,
                                    maxPrice: undefined,
                                }));
                            }}
                            className={`flex-shrink-0 px-2 transition-all ${
                                appliedFilters.range
                                    ? 'bg-primary-tint4 border-primary-p1 text-primary-p3 font-semibold hover:bg-primary-tint4'
                                    : ''
                            }`}
                        />

                        {/* Attendees Pill */}
                        <FilterPill
                            triggerMode="custom"
                            placeholder={
                                appliedFilters.attendees
                                    ? `Attendees: ${appliedFilters.attendees}`
                                    : 'Attendees'
                            }
                            leftIcon={<Users className="h-4 w-4" />}
                            rightIcon={
                                appliedFilters.attendees ? (
                                    <span
                                        onPointerDown={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setAppliedFilters((prev) => ({
                                                ...prev,
                                                attendees: undefined,
                                            }));
                                        }}
                                        className="hover:bg-black/10 rounded-full p-0.5 transition-colors cursor-pointer"
                                    >
                                        <X className="h-3 w-3 text-primary-p3" />
                                    </span>
                                ) : undefined
                            }
                            custom={{
                                type: 'attendees',
                                value: appliedFilters.attendees,
                                onApply: (newAttendees) => {
                                    setAppliedFilters((prev) => ({
                                        ...prev,
                                        attendees: newAttendees,
                                    }));
                                },
                            }}
                            className={`flex-shrink-0 transition-all ${
                                appliedFilters.attendees
                                    ? 'bg-primary-tint4 border-primary-p1 text-primary-p3 font-semibold hover:bg-primary-tint4'
                                    : ''
                            }`}
                        />

                        {/* Generic Filter Drawer Trigger */}
                        <FilterPill
                            triggerMode="external"
                            placeholder="Filter"
                            leftIcon={<Filter className="h-4 w-4" />}
                            onTrigger={() => setIsFilterDrawerOpen(true)}
                            className="flex-shrink-0"
                        />
                    </div>

                    {/* ProudlyNotAI desktop pill */}
                    <div className="hidden md:block">
                        <ProudlyNotAi variant="pill" popoverAlign="left" />
                    </div>
                </div>

                {/* Conditional Mobile / Desktop listing */}
                {renderListings()}
            </div>

            {/* Filter Drawer */}
            <FiltersDrawerGeneric
                sections={filterSections}
                optionCols={2}
                open={isFilterDrawerOpen}
                onOpenChange={setIsFilterDrawerOpen}
                initialSelected={drawerSelected}
                enableCategorySelection
                categories={transformCategoryData(categories) as any}
                categoriesLoading={categoriesLoading}
                sectionsLoading={isSectionsLoading}
                onCategoryChange={(categoryIds) => {
                    setAppliedFilters((prev) => ({
                        ...prev,
                        categoryIds: categoryIds,
                    }));
                }}
                onApply={(selectedIds) => {
                    setAppliedFilters((prev) => ({
                        ...prev,
                        spaceTypeIds: (selectedIds['space_types'] as number[]) || [],
                        activityIds: (selectedIds['activities'] as number[]) || [],
                        amenityIds: (selectedIds['amenities'] as number[]) || [],
                        instantBooking: !!selectedIds.instantBooking,
                    }));
                    setIsFilterDrawerOpen(false);
                }}
            />

            <Footer />
        </div>
    );
};

export default SpaceListClient;
