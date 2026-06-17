'use client';

import React from 'react';
import Image from 'next/image';
import Typography from '@/components/ui/typoGraphy';
import ArrowScrollWrapper from '@/components/ui/arrowScrollWrapper';
import { GalleryItem } from '@/constants/explorePage';

interface CategoryGalleryProps {
    title: string;
    items: GalleryItem[];
    onItemClick: (slug: string) => void;
}

export default function CategoryGallery({ title, items, onItemClick }: CategoryGalleryProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="py-12 px-4 md:px-16 bg-gray-50/30">
            <div className="max-w-7xl mx-auto text-center">
                <div className="flex justify-center">
                    <Typography size="3xl" weight="font-bold" className="mb-10">
                        {title}
                    </Typography>
                </div>

                <div className="relative">
                    {/* The design has a central highlighted item if possible, but an arrow scroll wrapper is standard */}
                    <ArrowScrollWrapper arrowVariant="default">
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className="min-w-[200px] max-w-[200px] sm:min-w-[240px] sm:max-w-[240px] p-2 cursor-pointer group"
                                onClick={() => onItemClick(item.slug)}
                            >
                                <div className="relative w-full h-[300px] rounded-[2rem] overflow-hidden mb-4 shadow-sm group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        unoptimized
                                    />
                                    {/* Gradient overlay for text readability if needed, though design shows text below */}
                                </div>
                                <Typography
                                    size="base"
                                    weight="semibold"
                                    className="text-gray-800 group-hover:text-[#F6CD28] transition-colors"
                                >
                                    {item.name}
                                </Typography>
                            </div>
                        ))}
                    </ArrowScrollWrapper>
                </div>
            </div>
        </section>
    );
}
