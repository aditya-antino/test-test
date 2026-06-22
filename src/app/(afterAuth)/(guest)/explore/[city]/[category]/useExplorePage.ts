'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setSelectedCategories } from '@/store/slice/homePageSearchSlice';
import { PATHS } from '@/constants/path';

export const useExplorePage = (initialSpaceData?: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state: RootState) => state.auth);

    const spacesData = initialSpaceData;
    const spacesLoading = false;

    // Map backend keys to what BookingCard expects
    const mapSpaceToBookingCardFormat = (space: any) => {
        if (!space) return space;
        return {
            ...space,
            SpaceImages: space.SpaceImages || space.spaceImages || [],
            price: space.price ?? (space.pricePerHour ? parseFloat(space.pricePerHour) : undefined),
            rating: space.rating ?? (space.avgRating ? parseFloat(space.avgRating) : undefined),
            seats: space.seats ?? space.capacity ?? 0,
            category_name: space.category_name || space.category || '',
            CategoryMaster: space.CategoryMaster || (space.category ? { name: space.category } : undefined),
            computed_status: space.computed_status || space.status || 'active',
            SpaceListing: space.SpaceListing || {
                price_per_hour: space.pricePerHour || '0',
                isRefundable: space.isRefundable ?? false,
                instant_booking: space.instantBooking ?? false,
            }
        };
    };

    // Use raw backend data directly without mappers, as BookingCard supports fallbacks internally
    const spaces = useMemo(() => {
        const list = Array.isArray(spacesData)
            ? spacesData
            : [
                  ...(spacesData?.data?.mostBookedSpaces || spacesData?.mostBookedSpaces || []),
                  ...(spacesData?.data?.recentlyAddedSpaces || spacesData?.recentlyAddedSpaces || []),
              ];
        return list.map(mapSpaceToBookingCardFormat);
    }, [spacesData]);

    const mostBooked = useMemo(() => {
        const list = spacesData?.data?.mostBookedSpaces || spacesData?.mostBookedSpaces || [];
        return list.map(mapSpaceToBookingCardFormat);
    }, [spacesData]);

    const recentlyAdded = useMemo(() => {
        const list = spacesData?.data?.recentlyAddedSpaces || spacesData?.recentlyAddedSpaces || [];
        return list.map(mapSpaceToBookingCardFormat);
    }, [spacesData]);

    const handleSpaceClick = (slug: string) => {
        router.push(`${PATHS.GUEST_SPACE_DETAILS}/${slug}`);
    };

    const handleSearch = ({ selectedCategory }) => {
        // Just forward the search to the main space list page
        if (selectedCategory) {
            const formattedCategory = {
                item: {
                    id: selectedCategory.id || selectedCategory.categoryId,
                    name:
                        selectedCategory.name ||
                        selectedCategory.CategoryMaster?.name ||
                        selectedCategory.activity,
                },
                type: 'ids' in selectedCategory ? 'activities' : 'spaces',
            };
            dispatch(setSelectedCategories([formattedCategory]));
        }

        // This is a simplified search forward. A complete implementation would sync to Redux and push to /space-list
        router.push(PATHS.SPACE_LISTING_PAGE_GUEST || '/space-list');
    };

    const handleGalleryItemClick = (slug: string) => {
        // Typically, this would route to /space-list with the sub-category filter
        router.push(`${PATHS.SPACE_LISTING_PAGE_GUEST}?activity=${slug}`);
    };

    // Map explore frontend category slugs directly to backend category name slugs
    // These must match toSlug(CategoryMaster.name) on the space-list page
    const slugToCategoryMap: Record<string, string> = {
        'photography-studios':  'creative-spaces',
        'podcast-studios':      'creative-spaces',
        'baithaks':             'event-spaces',
        'baithak':              'event-spaces',
        'fitness-wellness':   'fitness-wellness-spaces',
        'wellness-workshop':    'fitness-wellness-spaces',
        'wellness':             'fitness-wellness-spaces',
        'exhibitions':          'event-spaces',
        'exhibition':           'event-spaces',
        'exhibition-spaces':    'event-spaces',
        'cyclorama-studios':    'creative-spaces',
        'cyclorama':            'creative-spaces',
        'event-venues':         'event-spaces',
        'event-venue':          'event-spaces',
        'creative-spaces':      'creative-spaces',
    };

    const handleCtaClick = (categorySlug: string) => {
        const mappedCategory = slugToCategoryMap[categorySlug] || categorySlug;
        const params = new URLSearchParams();
        if (mappedCategory) params.append('space', mappedCategory);
        router.push(`${PATHS.SPACE_LISTING_PAGE_GUEST || '/space-list'}?${params.toString()}`);
    };

    return {
        spaces,
        mostBooked,
        recentlyAdded,
        isLoading: spacesLoading,
        isAuth,
        handleSpaceClick,
        handleSearch,
        handleGalleryItemClick,
        handleCtaClick,
    };
};
