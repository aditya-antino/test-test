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
        <div className="flex flex-col items-center w-full max-w-[160px] sm:max-w-[180px] text-center">
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
                <div className="flex justify-center mb-8">
                    <Typography size="3xl" weight="bold" align="center" className="mb-4">
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

                <div className="grid grid-cols-2 gap-y-8 gap-x-4 justify-items-center max-w-[360px] mx-auto md:max-w-none md:flex md:flex-wrap md:justify-center md:gap-12">
                    {benefitCards}
                </div>
            </div>
        </section>
    );
}
