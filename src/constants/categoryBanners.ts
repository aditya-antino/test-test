export interface BannerContent {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    parentCategory?: string;
    metaTitle?: string;
    metaDescription?: string;
}

export const CATEGORY_BANNERS: Record<string, BannerContent> = {
    'photography-studios': {
        title: 'Photography Studios',
        description: 'Discover and book professional photography studios in Delhi, Noida & Gurgaon for fashion shoots, product photography, e-commerce catalog shoots, portraits, brand campaigns, content creation, and commercial productions.',
        keywords: 'Photography studio rental, professional photo studio',
        parentCategory: 'creative-spaces',
        metaTitle: 'Book Photography Studios in Delhi NCR | Spare Space',
        metaDescription: 'Discover photography studios in Delhi, Noida & Gurgaon on Spare Space. Book fully equipped studios for fashion, product, portrait, commercial, and content shoots by the hour.'
    },
    'podcast-studios': {
        title: 'Podcast Studios',
        description: 'Discover and book professional podcast studios in Delhi, Noida & Gurgaon for audio podcasts, video podcasts, interviews, webinars, content creation, brand storytelling, and creator collaborations.',
        keywords: 'Podcast studio rental, recording studio',
        parentCategory: 'creative-spaces',
        metaTitle: 'Book Podcast Studios in Delhi NCR | Spare Space',
        metaDescription: 'Book podcast studios across Delhi, Noida & Gurgaon with Spare Space. Find professional recording spaces with premium audio, video, and production setups available by the hour.'
    },
    'baithaks': {
        title: 'Spaces for Hosting Baithaks',
        description: 'Discover and book intimate baithak venues in Delhi, Noida & Gurgaon for classical music performances, ghazal evenings, poetry sessions, storytelling events, Sufi gatherings, cultural programs, and private artistic performances.',
        keywords: 'Baithak venue rental, intimate classical music space, ghazal evening space',
        parentCategory: 'event-spaces',
        metaTitle: 'Book Spaces for Hosting Baithaks in Delhi NCR',
        metaDescription: 'Find and book intimate spaces for baithaks across Delhi, Noida & Gurgaon. Explore homes, studios, cafés, and cultural venues on Spare Space for music, poetry, and community gatherings.'
    },
    'fitness-wellness': {
        title: 'Fitness and Wellness Spaces',
        description: 'Discover and book peaceful fitness and wellness spaces in Delhi, Noida & Gurgaon for yoga sessions, meditation workshops, sound healing events, mindfulness programs, wellness retreats, and holistic health gatherings.',
        keywords: 'Yoga retreat venue, wellness space',
        parentCategory: 'fitness-wellness-spaces',
        metaTitle: 'Book Spaces for Hosting Fitness & Wellness Workshops in Delhi NCR',
        metaDescription: 'Book fitness and wellness workshop spaces across Delhi, Noida & Gurgaon. Discover yoga studios, dance spaces, community halls, and creative venues on Spare Space.'
    },
    'exhibitions': {
        title: 'Exhibition Spaces',
        description: 'Discover and book premium exhibition spaces in Delhi, Noida & Gurgaon for art exhibitions, product launches, trade showcases, brand activations, pop-up events, cultural exhibitions, and corporate displays',
        parentCategory: 'event-spaces',
        metaTitle: 'Book Exhibition Spaces in Delhi NCR | Spare Space',
        metaDescription: 'Book exhibition spaces across Delhi, Noida, & Gurgaon. Discover galleries, studios, event venues, and creative spaces for art exhibitions, showcases, and pop-up events on Spare Space.'
    },
    'event-venues': {
        title: 'Event Venues',
        description: 'Discover and book premium event venues on an hourly basis in Delhi, Noida & Gurgaon for corporate functions, private celebrations, networking events, workshops, launches, exhibitions, and creative gatherings.',
        parentCategory: 'event-spaces',
        metaTitle: 'Book Event Spaces in Delhi NCR | Spare Space',
        metaDescription: 'Book event spaces across Delhi, Noida, & Gurgoan. Discover venues for corporate events, workshops, networking sessions, celebrations, exhibitions, and private gatherings on Spare Space.'
    },
    'workshops': {
        title: 'Spaces for Workshops',
        description: 'Discover and book premium workshop spaces in Delhi, Noida & Gurgaon for training sessions, skill-building programs, creative workshops, masterclasses, team learning events, community meetups, and professional development sessions.',
        keywords: 'Workshop spaces, training rooms, seminar spaces',
        parentCategory: 'workshops',
        metaTitle: 'Book Spaces for Hosting Workshops in Delhi NCR | Spare Space',
        metaDescription: 'Book workshop spaces across Delhi, Noida, & Gurgaon. Discover studios, classrooms, coworking spaces, cafés, and creative venues for professional and community workshops on Spare Space.'
    },
    'creative-spaces': {
        title: 'Creative Spaces',
        description: 'Discover and book inspiring creative spaces in Delhi, Noida & Gurgaon for content creation, brainstorming sessions, design workshops, photo shoots, collaborative projects, artistic expression, and innovative experiences.',
        keywords: 'Artist studio space, creative workspace',
        parentCategory: 'creative-spaces',
        metaTitle: 'Book Creative Spaces in Delhi NCR | Spare Space',
        metaDescription: 'Book creative spaces across Delhi, Noida, & Gurgaon. Discover studios, lofts, galleries, cafés, and unique venues for shoots, workshops, exhibitions, and creative events on Spare Space.'
    },
    'cyclorama-studios': {
        title: 'Cyclorama Studios',
        description: 'Discover and book professional cyclorama studios in Delhi, Noida & Gurgaon for photography, video production, commercials, product shoots, fashion campaigns, content creation, and e-commerce photography.',
        parentCategory: 'creative-spaces',
        metaTitle: 'Book Cyclorama Studios in Delhi NCR | Spare Space',
        metaDescription: 'Book cyclorama studios across Delhi, Noida, & Gurgaon. Find professional infinity wall studios for photography, videography, advertising, fashion, and commercial shoots on Spare Space.'
    },
};

export const DEFAULT_BANNER: BannerContent = {
    title: 'Discover Unique Spaces',
    description: 'Explore a curated collection of spaces for meetings, events, and creative projects in your city.',
};
