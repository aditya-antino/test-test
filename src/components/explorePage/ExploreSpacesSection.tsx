'use client';

import React from 'react';
import BookingCard from '@/components/common/bookingCard/bookingCard';
import ArrowScrollWrapper from '@/components/ui/arrowScrollWrapper';
import { SkeletonCardGrid } from '@/components/skeletons';
import { EmptyState } from '@/components/common';
import Typography from '@/components/ui/typoGraphy';
import { capitalize } from '@/utils';
import { Space } from '@/services';

interface ExploreSpacesSectionProps {
    city: string;
    mostBooked: Space[];
    recentlyAdded: Space[];
    isLoading: boolean;
    isAuth: boolean;
    onSpaceClick: (slug: string) => void;
}

export default function ExploreSpacesSection({
    city,
    mostBooked,
    recentlyAdded,
    isLoading,
    isAuth,
    onSpaceClick,
}: ExploreSpacesSectionProps) {
    const formattedCity = city;

    const renderCarousel = (spaces: Space[], title: string) => {
        if (spaces.length === 0) return null;

        const isSingle = spaces.length === 1;

        return (
            <div className="mt-8">
                <Typography size="lg" weight="semibold" className="mb-4 pl-2">
                    {title}
                </Typography>
                {isSingle ? (
                    <div className="flex justify-center w-full">
                        <div className="min-w-[280px] sm:min-w-[320px] max-w-[320px] p-2">
                            <BookingCard
                                space={spaces[0]}
                                showWishlist={isAuth}
                                onClick={() => onSpaceClick(spaces[0].slug)}
                                className="w-full h-full"
                                isNotHomePage={false}
                            />
                        </div>
                    </div>
                ) : (
                    <ArrowScrollWrapper arrowVariant="default">
                        {spaces.map((space) => (
                            <div key={space.id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] p-2">
                                <BookingCard
                                    space={space}
                                    showWishlist={isAuth}
                                    onClick={() => onSpaceClick(space.slug)}
                                    className="w-full h-full"
                                    isNotHomePage={false}
                                />
                            </div>
                        ))}
                    </ArrowScrollWrapper>
                )}
            </div>
        );
    };

    return (
        <section className="bg-gray-50/50 py-12 px-4 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Explore <span className="text-[#F6CD28]">Spaces</span> in {formattedCity}
                    </h2>
                    <Typography color="text-gray-500">
                        Select a city and discover top-rated spaces available for hourly rentals.
                    </Typography>
                </div>

                {isLoading ? (
                    <div className="space-y-12">
                        <div>
                            <Typography size="lg" weight="semibold" className="mb-4 pl-2">
                                Most Booked
                            </Typography>
                            <SkeletonCardGrid count={4} gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
                        </div>
                        <div>
                            <Typography size="lg" weight="semibold" className="mb-4 pl-2">
                                Recently Added
                            </Typography>
                            <SkeletonCardGrid count={4} gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
                        </div>
                    </div>
                ) : mostBooked.length === 0 && recentlyAdded.length === 0 ? (
                    <EmptyState
                        title="No spaces found"
                        description={`We couldn't find any spaces in ${formattedCity} matching this category right now.`}
                    />
                ) : (
                    <div className="space-y-6">
                        {renderCarousel(mostBooked, 'Most Booked')}
                        {renderCarousel(recentlyAdded, 'Recently Added')}
                    </div>
                )}
            </div>
        </section>
    );
}
