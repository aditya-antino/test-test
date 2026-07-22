'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BookingCard from '@/components/common/bookingCard/bookingCard';
import SpaceMap from '@/components/common/SpaceMap';
import { SkeletonCardGrid } from '@/components/skeletons';
import { EmptyState } from '@/components/common';
import Pagination from '@/components/ui/CustomPagination';
import {
    useGetSpaceGuestList,
    useAfterAuthGetSpaceGuestList,
} from '@/services';
import { mapRawSpace, toMapMarker, type SpaceListSectionProps } from './spaceListUtils';

const DesktopSpaceList = ({
    filterParams,
    isAuth,
    handleSpaceClick,
    clearFilters,
}: SpaceListSectionProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);

    // Sync current page from URL on mount / URL change
    useEffect(() => {
        const pageParam = searchParams.get('page');
        if (pageParam) {
            const parsed = parseInt(pageParam);
            if (!isNaN(parsed) && parsed > 0) setCurrentPage(parsed);
        } else {
            setCurrentPage(1);
        }
    }, [searchParams]);

    const isFirstRender = React.useRef(true);

    // Reset to page 1 whenever filter params change (excluding `limit`)
    const filterKey = useMemo(() => {
        const { limit, ...rest } = filterParams;
        return JSON.stringify(rest);
    }, [filterParams]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setCurrentPage(1);
        const pageParam = searchParams.get('page');
        if (pageParam) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('page');
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    }, [filterKey]);

    const queryParams = useMemo(
        () => ({ ...filterParams, page: currentPage }),
        [filterParams, currentPage],
    );

    const guestListQuery = useGetSpaceGuestList(queryParams, { enabled: !isAuth });
    const afterAuthGuestListQuery = useAfterAuthGetSpaceGuestList(queryParams, { enabled: isAuth });

    const activeQuery = isAuth ? afterAuthGuestListQuery : guestListQuery;
    const { data: spacesData, isLoading: spacesLoading } = activeQuery;

    const records = useMemo(() => spacesData?.data?.records || [], [spacesData]);
    const spaces = useMemo(() => records.map(mapRawSpace), [records]);

    // Memoized map markers — avoids a fresh array reference on every render
    const mapMarkers = useMemo(() => records.map((space) => toMapMarker(space)), [records]);

    const totalCount = spacesData?.data?.count || 0;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(window.location.search);
        if (page > 1) {
            params.set('page', String(page));
        } else {
            params.delete('page');
        }
        router.push(`?${params.toString()}`, { scroll: false });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-4 pt-6 items-stretch">
                {/* Left: first 2 listings share viewport with the map */}
                <div className="lg:col-span-2">
                    {spacesLoading ? (
                        <SkeletonCardGrid count={2} gridClassName="grid-cols-1 md:grid-cols-2" />
                    ) : spaces.length === 0 ? (
                        <EmptyState
                            title="No spaces found"
                            description="We couldn't find any spaces matching your criteria. Try adjusting your filters or search location."
                            actionLabel="Clear Filters"
                            onAction={clearFilters}
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full justify-items-center">
                            {spaces.slice(0, 2).map((spaceItem) => (
                                <BookingCard
                                    key={spaceItem.id}
                                    showWishlist={isAuth}
                                    space={spaceItem as any}
                                    onClick={() => handleSpaceClick(spaceItem.slug)}
                                    className="w-full"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: sticky map — reads from memoized mapMarkers, no parent state needed */}
                <div className="hidden lg:block lg:col-span-2 sticky top-4 min-h-[450px]">
                    <SpaceMap
                        spaces={mapMarkers}
                        onSpaceClick={handleSpaceClick}
                        className="h-full"
                    />
                </div>
            </div>

            {/* Remaining listings below the map row */}
            {spacesLoading ? (
                <div className="py-4">
                    <SkeletonCardGrid
                        count={4}
                        gridClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                    />
                </div>
            ) : (
                spaces.length > 2 && (
                    <div className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                            {spaces.slice(2).map((spaceItem) => (
                                <BookingCard
                                    key={spaceItem.id}
                                    showWishlist={isAuth}
                                    space={spaceItem as any}
                                    onClick={() => handleSpaceClick(spaceItem.slug)}
                                    className="w-full"
                                />
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* Pagination controls */}
            {!spacesLoading && spaces.length > 0 && (
                <div className="py-8">
                    <Pagination
                        limit={10}
                        count={totalCount}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </>
    );
};

export default DesktopSpaceList;
