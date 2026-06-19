import React from 'react';
import Image from 'next/image';
import Typography from '@/components/ui/typoGraphy';
import HomePageSearchBarTab from '@/components/homePage/HomePageSearchBarTab';

interface CityHeroSectionProps {
    title: string;
    description: string;
    heroImageUrl: string | any;
    city: string;
    ctaLabel?: string;
    onSearch?: (searchParams: any) => void;
    onCtaClick?: () => void;
}

export default function CityHeroSection({
    title,
    description,
    heroImageUrl,
    city,
    ctaLabel,
    onSearch,
    onCtaClick,
}: CityHeroSectionProps) {
    const splitTitle = title.split(` in `);
    const highlightedPart = splitTitle.length > 1 ? ` in ${city}` : '';
    const firstPart = splitTitle[0];

    return (
        <section className="bg-white w-full pt-12 px-4 md:px-16 relative">
            {/* Background Glow */}
            <div className="w-96 h-96 opacity-30 bg-amber-200 absolute z-50 -top-[15%] hidden md:block left-[9%] rounded-full blur-3xl" />

            <div className="flex flex-col-reverse lg:flex-row gap-12 mb-12">
                {/* Left Content */}
                <div className="flex-1 md:mt-12 flex flex-col justify-center">
                    <div className="self-stretch">
                        <span className="text-zinc-800 text-4xl sm:text-5xl md:text-6xl font-bold font-['Figtree'] leading-snug sm:leading-tight md:leading-[64px]">
                            {firstPart}
                        </span>
                        {highlightedPart && (
                            <span className="text-[#F7D13A] text-4xl sm:text-5xl md:text-6xl font-bold font-['Figtree'] leading-snug sm:leading-tight md:leading-[64px]">
                                {highlightedPart}
                            </span>
                        )}
                    </div>
                    <Typography
                        className="mt-4 max-w-lg"
                        color="text-gray-500"
                        size="xl"
                        weight="normal"
                    >
                        {description}
                    </Typography>

                    {/* CTA Button (from design) - hidden on mobile if it conflicts with search bar, but let's show it */}
                    <div className="mt-8">
                        <button
                            onClick={onCtaClick}
                            className="bg-[#F7D13A] hover:bg-yellow-500 text-zinc-900 font-semibold px-6 py-3 rounded-full shadow-sm transition-colors duration-200"
                        >
                            {ctaLabel ?? `Find ${firstPart}`}
                        </button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex flex-1 justify-center lg:justify-end items-center relative min-h-[250px] sm:min-h-[350px] lg:min-h-[400px]">
                    <div className="relative w-full max-w-[600px] h-[250px] sm:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden shadow-xl">
                        <Image
                            src={heroImageUrl}
                            alt={title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Search Bar - positioned below the main content in this layout */}
            <div className="flex flex-col items-center mx-auto my-4 w-full max-w-6xl">
                <HomePageSearchBarTab
                    isSearchPage
                    onSearch={onSearch}
                    className="w-full relative z-[40]"
                />
            </div>
        </section>
    );
}
