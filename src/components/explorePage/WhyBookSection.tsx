import React from 'react';
import Image from 'next/image';
import Typography from '@/components/ui/typoGraphy';
import { EXPLORE_PAGE_BENEFITS } from '@/constants/explorePage';

interface BenefitItem {
    name: string;
    slug: string;
    image: any;
}

interface WhyBookSectionProps {
    title: string;
}

const BenefitCard = ({ benefit }: { benefit: BenefitItem }) => {
    return (
        <div className="flex flex-col items-center max-w-[180px] text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                <Image
                    src={benefit.image}
                    alt={benefit.name}
                    width={48}
                    height={48}
                    className="object-contain"
                />
            </div>
            <Typography weight="semibold" size="base" className="text-gray-900">
                {benefit.name}
            </Typography>
        </div>
    );
};

export default function WhyBookSection({ title }: WhyBookSectionProps) {
    const benefitCards = EXPLORE_PAGE_BENEFITS.map((benefit) => (
        <BenefitCard key={benefit.slug} benefit={benefit} />
    ));

    return (
        <section className="py-16 px-4 md:px-16 bg-white">
            <div className="max-w-7xl mx-auto text-center">
                <div className="flex justify-center mb-12">
                    <Typography size="3xl" weight="font-bold" className="mb-12">
                        {title.split('Sparespace').map((part, i, arr) => (
                            <React.Fragment key={i}>
                                {part}
                                {i < arr.length - 1 && (
                                    <span className="text-[#F6CD28]">Sparespace</span>
                                )}
                            </React.Fragment>
                        ))}
                    </Typography>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12">{benefitCards}</div>
            </div>
        </section>
    );
}
