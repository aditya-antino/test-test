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
    'residential-spaces': {
        title: 'Residential Spaces',
        description: 'Discover stunning apartments, homes, and luxury villas for shoots. Perfect for creative projects, lifestyle photography, and content creation. Book authentic residential locations with unique character.',
        keywords: 'Home photoshoot, villa rental, apartment venue',
        ogImage: '/og-images/residential-spaces.png',
    },
    'event-spaces': {
        title: 'Event Spaces',
        description: 'Find the perfect venue for product launches, networking events, and brand activations. Flexible event spaces with professional setups, catering options, and full technical support.',
        keywords: 'Event venue rental, product launch space',
        ogImage: '/og-images/event-spaces.png',
    },
    'workshop-area': {
        title: 'Workshop Areas',
        description: 'Professional meeting rooms for workshops, team collaboration, and business meetings. Equipped with high-speed internet, AV systems, and breakout areas for productive sessions.',
        keywords: 'Meeting room rental, office space for meetings',
        ogImage: '/og-images/work-meeting-spaces.png',
    },
    'fitness-wellness-spaces': {
        title: 'Fitness & Wellness Spaces',
        description: 'Discover peaceful venues for yoga workshops, meditation sessions, and wellness retreats. Find fully equipped studios, calm spaces, and holistic environments designed for wellness activities.',
        keywords: 'Yoga studio rental, wellness workshop space, meditation venue',
        metaTitle: 'Book Fitness & Wellness Spaces in Delhi NCR | Spare Space',
        metaDescription: 'Book fitness and wellness spaces across Delhi, Noida & Gurgaon. Discover yoga studios, dance spaces, community halls, and creative venues on Spare Space.',
        ogImage: '/og-images/fitness-wellness-spaces.png',
    },
    'photo-film-studio': {
        title: 'Photo & Film Studio',
        description: 'Inspiring studios and creative hubs for artists, designers, and innovators. Bring your ideas to life with professional art studios, design workspaces, and collaborative creative environments.',
        keywords: 'Artist studio space, creative workspace',
    },
    'dining-spaces': {
        title: 'Dining Spaces',
        description: 'Beautifully designed culinary spaces for cooking classes, dinner parties, and food photography. Fully equipped kitchens, elegant dining areas, and atmospheric settings for food events.',
        keywords: 'Cooking class venue, dinner party space',
        ogImage: '/og-images/dining-spaces.png',
    },
    'outdoor-spaces': {
        title: 'Outdoor Spaces',
        description: 'Breathtaking open-air venues for garden parties, outdoor shoots, and team retreats. Natural backdrops with landscaping, terraces, and refreshing environments for outdoor events.',
        keywords: 'Outdoor event venue, garden party space',
        ogImage: '/og-images/outdoor-spaces.png',
    },
};

export const DEFAULT_BANNER: BannerContent = {
    title: 'Discover Unique Spaces',
    description: 'Explore a curated collection of spaces for meetings, events, and creative projects in your city.',
};
