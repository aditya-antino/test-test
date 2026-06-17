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

    // Use raw backend data directly without mappers, as BookingCard supports fallbacks internally
    const spaces = useMemo(() => {
        return spacesData || [];
    }, [spacesData]);

    const mostBooked = useMemo(() => {
        return spacesData?.data?.mostBookedSpaces || spacesData?.mostBookedSpaces || [];
    }, [spacesData]);

    const recentlyAdded = useMemo(() => {
        return spacesData?.data?.recentlyAddedSpaces || spacesData?.recentlyAddedSpaces || [];
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

    return {
        spaces,
        mostBooked,
        recentlyAdded,
        isLoading: spacesLoading,
        isAuth,
        handleSpaceClick,
        handleSearch,
        handleGalleryItemClick,
    };
};
