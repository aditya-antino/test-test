'use client';

import React from 'react';
import Typography from '@/components/ui/typoGraphy';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQ } from '@/constants/explorePage';

interface FAQSectionProps {
    faqs: FAQ[];
}

const FAQAccordionItem = ({ faq, index }: { faq: FAQ; index: number }) => {
    return (
        <AccordionItem value={`item-${index}`} className="border-b border-gray-200 last:border-0">
            <AccordionTrigger className="text-left font-medium text-lg text-gray-900 py-5 hover:no-underline">
                {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-[15px] text-gray-500 leading-relaxed pb-6 pr-12">
                {faq.answer}
            </AccordionContent>
        </AccordionItem>
    );
};

export default function FAQSection({ faqs }: FAQSectionProps) {
    const faqItems = faqs?.map((faq, index) => (
        <FAQAccordionItem key={index} faq={faq} index={index} />
    ));

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="py-16 px-4 md:px-16 bg-white">
            <div className="max-w-4xl mx-auto w-full">
                <Typography
                    size="3xl"
                    weight="bold"
                    align="center"
                    className="mb-12 text-gray-900"
                >
                    Frequently Asked Questions
                </Typography>
                <Accordion type="single" collapsible className="w-full">
                    {faqItems}
                </Accordion>
            </div>
        </section>
    );
}
