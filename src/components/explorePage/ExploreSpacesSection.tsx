'use client';

import React from 'react';
import BookingCard from '@/components/common/bookingCard/bookingCard';
import ArrowScrollWrapper from '@/components/ui/arrowScrollWrapper';
import { SkeletonCardGrid } from '@/components/skeletons';
import { EmptyState } from '@/components/common';
import Typography from '@/components/ui/typoGraphy';
import { capitalize } from '@/utils';
import { Space } from '@/services';
import { ChevronRight } from 'lucide-react';

interface ExploreSpacesSectionProps {
    city: string;
    spacesByCity: Record<string, Space[]>;
    isLoading: boolean;
    isAuth: boolean;
    onSpaceClick: (slug: string) => void;
    onCityHeaderClick?: (cityKey: string) => void;
}

export default function ExploreSpacesSection({
    city,
    spacesByCity,
    isLoading,
    isAuth,
    onSpaceClick,
    onCityHeaderClick,
}: ExploreSpacesSectionProps) {
    const formattedCity = city;

    const renderCarousel = (spaces: Space[], title: string, cityKey: string) => {
        if (spaces.length === 0) return null;

        const isSingle = spaces.length === 1;

        return (
            <div className="mt-8">
                <div
                    onClick={() => onCityHeaderClick?.(cityKey)}
                    className="flex items-center gap-1.5 mb-4 pl-2 group w-fit cursor-pointer select-none"
                >
                    <Typography
                        size="lg"
                        weight="semibold"
                        className="group-hover:text-[#D89D03] transition-colors"
                    >
                        {title}
                    </Typography>
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#D89D03] group-hover:translate-x-1 transition-all" />
                </div>
                {isSingle ? (
                    <div className="flex justify-center md:justify-start w-full">
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

    const hasAnySpaces = Object.values(spacesByCity || {}).some(
        (list) => Array.isArray(list) && list.length > 0
    );

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
                                Loading spaces...
                            </Typography>
                            <SkeletonCardGrid count={4} gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
                        </div>
                    </div>
                ) : !hasAnySpaces ? (
                    <EmptyState
                        title="No spaces found"
                        description={`We couldn't find any spaces in ${formattedCity} matching this category right now.`}
                    />
                ) : (
                    <div className="space-y-10">
                        {Object.entries(spacesByCity).map(([cityKey, list]) => {
                            if (!list || list.length === 0) return null;
                            const cityLabel = capitalize(cityKey);
                            return (
                                <div key={cityKey}>
                                    {renderCarousel(list, `Spaces in ${cityLabel}`, cityKey)}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
