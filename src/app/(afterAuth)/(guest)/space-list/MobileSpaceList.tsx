'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import BookingCard from '@/components/common/bookingCard/bookingCard';
import SpaceMap from '@/components/common/SpaceMap';
import { SkeletonCardGrid } from '@/components/skeletons';
import { EmptyState } from '@/components/common';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, X, Loader2, ChevronUp } from 'lucide-react';
import {
    useInfiniteGetSpaceGuestList,
    useInfiniteAfterAuthGetSpaceGuestList,
} from '@/services';
import { mapRawSpace, toMapMarker, type SpaceListSectionProps } from './spaceListUtils';

const MobileSpaceList = ({
    filterParams,
    isAuth,
    handleSpaceClick,
    clearFilters,
}: SpaceListSectionProps) => {
    const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isBottomVisible, setIsBottomVisible] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const guestListQuery = useInfiniteGetSpaceGuestList(filterParams, { enabled: !isAuth });
    const afterAuthGuestListQuery = useInfiniteAfterAuthGetSpaceGuestList(filterParams, {
        enabled: isAuth,
    });

    const activeQuery = isAuth ? afterAuthGuestListQuery : guestListQuery;
    const { data: infiniteData, isLoading: spacesLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = activeQuery;

    const allRecords = useMemo(
        () => infiniteData?.pages?.flatMap((page) => page?.data?.records || []) || [],
        [infiniteData],
    );

    const spaces = useMemo(() => allRecords.map(mapRawSpace), [allRecords]);

    // Memoized map markers — avoids creating a new array reference on every render
    const mapMarkers = useMemo(
        () => allRecords.map((space) => toMapMarker(space, true)),
        [allRecords],
    );

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 300);
            
            if (bottomRef.current && !hasNextPage) {
                const rect = bottomRef.current.getBoundingClientRect();
                setIsBottomVisible(rect.top <= window.innerHeight);
            } else {
                setIsBottomVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 },
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const showFloatingScrollToTop = isScrolled && !(isBottomVisible && !hasNextPage);

    return (
        <>
            {/* Flat responsive grid — no dead desktop map container */}
            {spacesLoading ? (
                <SkeletonCardGrid count={4} gridClassName="grid-cols-1 md:grid-cols-2" />
            ) : spaces.length === 0 ? (
                <EmptyState
                    title="No spaces found"
                    description="We couldn't find any spaces matching your criteria. Try adjusting your filters or search location."
                    actionLabel="Clear Filters"
                    onAction={clearFilters}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 justify-items-center">
                    {spaces.map((spaceItem) => (
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

            {/* Infinite Scroll Sentinel */}
            <div ref={sentinelRef} className="w-full h-4" />

            {/* Next page loading spinner */}
            {isFetchingNextPage && (
                <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-7 w-7 animate-spin text-[#F6CD28]" />
                </div>
            )}

            {/* End of results */}
            <div ref={bottomRef}>
                {!spacesLoading && !hasNextPage && spaces.length > 0 && (
                    <div className="flex flex-col justify-center items-center py-8 gap-3">
                        <p className="text-sm text-gray-400">You've seen all available spaces</p>
                        <button
                            onClick={scrollToTop}
                            className="bg-transparent hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-6 rounded-full border border-gray-300 hover:border-gray-400 transition-all duration-200 text-sm active:scale-95 flex items-center gap-1.5 shadow-sm"
                        >
                            <ChevronUp className="h-4 w-4 text-gray-500" />
                            <span>Scroll to Top</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Floating Container for Map and Scroll to Top buttons */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 pointer-events-none">
                <button
                    onClick={scrollToTop}
                    className={`pointer-events-auto bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-6 rounded-full border border-gray-300 hover:border-gray-400 shadow-md flex items-center gap-1.5 text-sm active:scale-95 transition-all duration-300 transform ${
                        showFloatingScrollToTop
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                >
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                    <span>Scroll to Top</span>
                </button>

                <button
                    onClick={() => setIsMapDialogOpen(true)}
                    className="pointer-events-auto bg-primary-p1 hover:bg-primary-p2 text-gray-800 font-semibold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 border border-primary-p1"
                >
                    <MapPin className="h-5 w-5" />
                    <span>Show Map</span>
                </button>
            </div>

            {/* Mobile Map Dialog — co-located here, reads from local mapMarkers memo */}
            <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
                <DialogContent className="max-w-none w-full h-full m-0 flex items-center justify-center p-4 bg-transparent border-none outline-none shadow-none">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                    <button
                        onClick={() => setIsMapDialogOpen(false)}
                        className="absolute top-2 right-2 z-50 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200 hover:scale-110 transition-all duration-200"
                    >
                        <X className="h-5 w-5 text-gray-700" />
                    </button>
                    <div className="relative w-full h-full max-w-4xl max-h-[90vh] bg-transparent rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl mt-10">
                        <div className="w-full h-full rounded-2xl overflow-hidden">
                            <SpaceMap
                                spaces={mapMarkers}
                                onSpaceClick={handleSpaceClick}
                                className="w-full h-full rounded-2xl"
                            />
                        </div>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                            <Button onClick={() => setIsMapDialogOpen(false)} variant="default">
                                Show Listings
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MobileSpaceList;
