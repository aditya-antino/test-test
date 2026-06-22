import { easyDiscovery, flexibleBooking, noAIPics, verifiedStudios } from '@/assets/explore-page';

export interface Benefit {
    title: string;
    description: string;
    iconUrl?: any; // string path or StaticImageData
}

export interface GalleryItem {
    name: string;
    slug: string;
    image: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export const EXPLORE_PAGE_BENEFITS = [
    {
        name: 'Verified Studios',
        slug: 'verified-studios',
        image: verifiedStudios,
    },
    {
        name: 'Flexible Booking Options',
        slug: 'flexible-booking-options',
        image: flexibleBooking,
    },
    {
        name: 'Easy Discovery',
        slug: 'easy-discovery',
        image: easyDiscovery,
    },
    {
        name: 'No AI Images',
        slug: 'no-ai-images',
        image: noAIPics,
    },
];

const placeholderImage = '/og-images/creative-spaces.png';

export interface GalleryCategory {
    title?: string;
    whyBookTitle?: string;
    items: GalleryItem[];
}

export const EXPLORE_PAGE_GALLERY: Record<string, GalleryCategory> = {
    'photography-studios': {
        title: 'Photography Studios for Every Shoot',
        whyBookTitle: 'Why Book Photography Studios Through Spare Space?',
        items: [
            { name: 'Fashion Photography', slug: 'fashion-photography', image: placeholderImage },
            {
                name: 'Product Photography',
                slug: 'product-photography',
                image: '/og-images/residential-spaces.png',
            },
            {
                name: 'E-commerce Catalog Shoots',
                slug: 'e-commerce-catalog-shoots',
                image: '/og-images/event-spaces.png',
            },
            {
                name: 'Portrait Photography',
                slug: 'portrait-photography',
                image: '/og-images/work-meeting-spaces.png',
            },
            {
                name: 'Maternity Shoots',
                slug: 'maternity-shoots',
                image: '/og-images/dining-spaces.png',
            },
            {
                name: 'Pre-Wedding Shoots',
                slug: 'pre-wedding-shoots',
                image: '/og-images/outdoor-spaces.png',
            },
        ],
    },
    'residential-spaces': {
        title: 'Residential Spaces for Every Shoot',
        whyBookTitle: 'Why Book Living Room Studio Sets Through Spare Space?',
        items: [],
    },
    podcast: {
        title: 'Podcast Studios for Every Creator',
        whyBookTitle: 'Why Book Podcast Studios Through Spare Space?',
        items: [
            { name: 'Video Podcasts', slug: 'video-podcasts', image: placeholderImage },
            { name: 'Audio Only', slug: 'audio-only', image: placeholderImage },
            { name: 'Interview Setup', slug: 'interview-setup', image: placeholderImage },
            { name: 'Livestreaming', slug: 'livestreaming', image: placeholderImage },
        ],
    },
    baithak: {
        title: 'Baithak Venues for Every Gathering',
        whyBookTitle: 'Why Book Baithak Venues Through Spare Space?',
        items: [
            { name: 'Musical Baithaks', slug: 'musical-baithaks', image: placeholderImage },
            { name: 'Poetry Readings', slug: 'poetry-readings', image: placeholderImage },
            { name: 'Intimate Gatherings', slug: 'intimate-gatherings', image: placeholderImage },
            { name: 'Corporate Offsites', slug: 'corporate-offsites', image: placeholderImage },
        ],
    },
    wellness: {
        title: 'Wellness Spaces for Every Practice',
        whyBookTitle: 'Why Book Wellness Workshop Venues Through Spare Space?',
        items: [
            { name: 'Yoga Studios', slug: 'yoga-studios', image: placeholderImage },
            { name: 'Meditation Rooms', slug: 'meditation-rooms', image: placeholderImage },
            { name: 'Sound Healing', slug: 'sound-healing', image: placeholderImage },
            { name: 'Therapy Rooms', slug: 'therapy-rooms', image: placeholderImage },
        ],
    },
    'wellness-workshops': {
        title: 'Wellness Spaces for Every Practice',
        whyBookTitle: 'Why Book Wellness Workshop Venues Through Spare Space?',
        items: [
            { name: 'Yoga Studios', slug: 'yoga-studios', image: placeholderImage },
            { name: 'Meditation Rooms', slug: 'meditation-rooms', image: placeholderImage },
            { name: 'Sound Healing', slug: 'sound-healing', image: placeholderImage },
            { name: 'Therapy Rooms', slug: 'therapy-rooms', image: placeholderImage },
        ],
    },
    'wellness-workshop': {
        title: 'Wellness Spaces for Every Practice',
        whyBookTitle: 'Why Book Wellness Workshop Venues Through Spare Space?',
        items: [
            { name: 'Yoga Studios', slug: 'yoga-studios', image: placeholderImage },
            { name: 'Meditation Rooms', slug: 'meditation-rooms', image: placeholderImage },
            { name: 'Sound Healing', slug: 'sound-healing', image: placeholderImage },
            { name: 'Therapy Rooms', slug: 'therapy-rooms', image: placeholderImage },
        ],
    },
    exhibitions: {
        title: 'Exhibition Venues for Every Showcase',
        whyBookTitle: 'Why Book Exhibition Venues Through Spare Space?',
        items: [
            { name: 'Art Galleries', slug: 'art-galleries', image: placeholderImage },
            { name: 'Pop-up Stores', slug: 'pop-up-stores', image: placeholderImage },
            { name: 'Product Launches', slug: 'product-launches', image: placeholderImage },
            { name: 'Trade Shows', slug: 'trade-shows', image: placeholderImage },
        ],
    },
    'event-venues': {
        title: '',
        whyBookTitle:'',
        items: [

        ]
    },
    'creative-spaces': {
        title: '',
        whyBookTitle:'',
        items: [
            
        ]
    },
    'cyclorama-studios': {
        title: '',
        whyBookTitle:'',
        items: [
            
        ]
    },
    DEFAULT: {
        items: [],
    },
};

export const EXPLORE_PAGE_FAQS: Record<string, FAQ[]> = {
    'photography-studios': [
        {
            question: 'How much does it cost to rent a photography studio in Delhi?',
            answer: 'The cost depends on the studio size, location, equipment included, and booking duration.',
        },
        {
            question: 'Can I rent a photography studio by the hour?',
            answer: 'Yes, many photography studios offer hourly, half-day, and full-day rental options.',
        },
        {
            question: 'Are lighting equipment and backdrops included?',
            answer: 'Many studios provide professional lighting setups, backdrops, and basic shooting equipment. Availability varies by venue.',
        },
        {
            question: 'Can I book a studio for product photography?',
            answer: 'Absolutely. Several studios are specifically designed for e-commerce and product photography requirements.',
        },
        {
            question: 'Do photography studios provide changing rooms?',
            answer: 'Many professional studios offer makeup rooms, changing areas, and preparation spaces for models and talent.',
        },
        {
            question: 'How far in advance should I book a photography studio?',
            answer: 'Booking 1–2 weeks in advance is generally recommended, especially during weekends and peak production seasons.',
        },
    ],

    'event-venues': [
        {
            question: 'What is the average cost of an event venue?',
            answer: 'The cost varies depending on location, venue size, duration, and facilities provided.',
        },
        {
            question: 'Can I rent an event venue for a single day?',
            answer: 'Yes, many event venues offer hourly, daily, and weekend booking options.',
        },
        {
            question: 'Are event venues suitable for product launches?',
            answer: 'Absolutely. Many venues are specifically designed for brand showcases and product launch events.',
        },
        {
            question: 'Can organizers book event venues through Sparespace?',
            answer: 'Yes, organizers, hosts, and corporations can find suitable event venues across different regions.',
        },
        {
            question: 'What facilities are typically included in event venues?',
            answer: 'Common amenities include presentation areas, lighting, internet, parking, security, and event support services.',
        },
        {
            question: 'How far in advance should I book an event venue?',
            answer: 'For large events or premium venues, booking 1-3 months in advance is recommended.',
        },
    ],
    'event-venue': [
        {
            question: 'What is the average cost of an event venue?',
            answer: 'The cost varies depending on location, venue size, duration, and facilities provided.',
        },
        {
            question: 'Can I rent an event venue for a single day?',
            answer: 'Yes, many event venues offer hourly, daily, and weekend booking options.',
        },
        {
            question: 'Are event venues suitable for product launches?',
            answer: 'Absolutely. Many venues are specifically designed for brand showcases and product launch events.',
        },
        {
            question: 'Can organizers book event venues through Sparespace?',
            answer: 'Yes, organizers, hosts, and corporations can find suitable event venues across different regions.',
        },
        {
            question: 'What facilities are typically included in event venues?',
            answer: 'Common amenities include presentation areas, lighting, internet, parking, security, and event support services.',
        },
        {
            question: 'How far in advance should I book an event venue?',
            answer: 'For large events or premium venues, booking 1-3 months in advance is recommended.',
        },
    ],
    'creative-spaces': [
        {
            question: 'What is the average cost of a creative space?',
            answer: 'The cost varies depending on location, venue size, duration, and facilities provided.',
        },
        {
            question: 'Can I rent a creative space for a single day?',
            answer: 'Yes, many creative spaces offer hourly, daily, and weekend booking options.',
        },
        {
            question: 'Are creative spaces suitable for collaborative projects?',
            answer: 'Absolutely. Many venues are specifically designed for content creation, brainstorming sessions, and creative workshops.',
        },
        {
            question: 'Can creators book creative spaces through Sparespace?',
            answer: 'Yes, artists, designers, and creators can find suitable creative spaces across different regions.',
        },
        {
            question: 'What facilities are typically included in creative spaces?',
            answer: 'Common amenities include workspaces, good lighting, internet, and collaborative environments.',
        },
        {
            question: 'How far in advance should I book a creative space?',
            answer: 'Booking 1-2 weeks in advance is generally recommended.',
        },
    ],
    'creative-space': [
        {
            question: 'What is the average cost of a creative space?',
            answer: 'The cost varies depending on location, venue size, duration, and facilities provided.',
        },
        {
            question: 'Can I rent a creative space for a single day?',
            answer: 'Yes, many creative spaces offer hourly, daily, and weekend booking options.',
        },
        {
            question: 'Are creative spaces suitable for collaborative projects?',
            answer: 'Absolutely. Many venues are specifically designed for content creation, brainstorming sessions, and creative workshops.',
        },
        {
            question: 'Can creators book creative spaces through Sparespace?',
            answer: 'Yes, artists, designers, and creators can find suitable creative spaces across different regions.',
        },
        {
            question: 'What facilities are typically included in creative spaces?',
            answer: 'Common amenities include workspaces, good lighting, internet, and collaborative environments.',
        },
        {
            question: 'How far in advance should I book a creative space?',
            answer: 'Booking 1-2 weeks in advance is generally recommended.',
        },
    ],
    'cyclorama-studios': [
        {
            question: 'How much does it cost to rent a cyclorama studio?',
            answer: 'The cost depends on the studio size, location, equipment included, and booking duration.',
        },
        {
            question: 'Can I rent a cyclorama studio for a single day?',
            answer: 'Yes, many cyclorama studios offer hourly, half-day, and full-day rental options.',
        },
        {
            question: 'Can I rent a cyclorama studio by the hour?',
            answer: 'Yes, many cyclorama studios offer hourly, half-day, and full-day rental options.',
        },
        {
            question: 'Are lighting equipment and backdrops included in cyclorama studios?',
            answer: 'Many studios provide professional lighting setups, backdrops, and basic shooting equipment. Availability varies by venue.',
        },
        {
            question: 'Can I book a cyclorama studio for product photography?',
            answer: 'Absolutely. Several studios are specifically designed for e-commerce and product photography requirements.',
        },
        {
            question: 'Do cyclorama studios provide changing rooms?',
            answer: 'Many professional studios offer makeup rooms, changing areas, and preparation spaces for models and talent.',
        },
        {
            question: 'How far in advance should I book a cyclorama studio?',
            answer: 'Booking 1–2 weeks in advance is generally recommended, especially during weekends and peak production seasons.',
        },
    ],
    'cyclorama': [
        {
            question: 'How much does it cost to rent a cyclorama studio?',
            answer: 'The cost depends on the studio size, location, equipment included, and booking duration.',
        },
        {
            question: 'Can I rent a cyclorama studio for a single day?',
            answer: 'Yes, many cyclorama studios offer hourly, half-day, and full-day rental options.',
        },
        {
            question: 'Can I rent a cyclorama studio by the hour?',
            answer: 'Yes, many cyclorama studios offer hourly, half-day, and full-day rental options.',
        },
        {
            question: 'Are lighting equipment and backdrops included in cyclorama studios?',
            answer: 'Many studios provide professional lighting setups, backdrops, and basic shooting equipment. Availability varies by venue.',
        },
        {
            question: 'Can I book a cyclorama studio for product photography?',
            answer: 'Absolutely. Several studios are specifically designed for e-commerce and product photography requirements.',
        },
        {
            question: 'Do cyclorama studios provide changing rooms?',
            answer: 'Many professional studios offer makeup rooms, changing areas, and preparation spaces for models and talent.',
        },
        {
            question: 'How far in advance should I book a cyclorama studio?',
            answer: 'Booking 1–2 weeks in advance is generally recommended, especially during weekends and peak production seasons.',
        },
    ],
    'exhibition': [
        {
            question: 'What is the average cost of an exhibition space?',
            answer: 'The cost varies depending on location, venue size, duration, and facilities provided.',
        },
        {
            question: 'Can I rent an exhibition space for a single day?',
            answer: 'Yes, many exhibition spaces offer hourly, daily, and weekend booking options.',
        },
        {
            question: 'Are exhibition spaces suitable for product launches?',
            answer: 'Absolutely. Many venues are specifically designed for brand showcases and product launch events.',
        },
        {
            question: 'Can artists book exhibition spaces through Sparespace?',
            answer: 'Yes, artists, galleries, and curators can find suitable exhibition spaces across different regions.',
        },
        {
            question: 'What facilities are typically included in exhibition spaces?',
            answer: 'Common amenities include display areas, lighting, internet, parking, security, and event support services.',
        },
        {
            question: 'How far in advance should I book an exhibition space?',
            answer: 'For large exhibitions or premium venues, booking 1-3 months in advance is recommended.',
        },
    ],
    'exhibitions': [
        {
            question: 'What is the average cost of an exhibition space?',
            answer: 'The cost varies depending on location, venue size, duration, and facilities provided.',
        },
        {
            question: 'Can I rent an exhibition space for a single day?',
            answer: 'Yes, many exhibition spaces offer hourly, daily, and weekend booking options.',
        },
        {
            question: 'Are exhibition spaces suitable for product launches?',
            answer: 'Absolutely. Many venues are specifically designed for brand showcases and product launch events.',
        },
        {
            question: 'Can artists book exhibition spaces through Sparespace?',
            answer: 'Yes, artists, galleries, and curators can find suitable exhibition spaces across different regions.',
        },
        {
            question: 'What facilities are typically included in exhibition spaces?',
            answer: 'Common amenities include display areas, lighting, internet, parking, security, and event support services.',
        },
        {
            question: 'How far in advance should I book an exhibition space?',
            answer: 'For large exhibitions or premium venues, booking 1-3 months in advance is recommended.',
        },
    ],
    'exhibition-spaces': [
        {
            question: 'What is the average cost of an exhibition space?',
            answer: 'The cost varies depending on location, venue size, duration, and facilities provided.',
        },
        {
            question: 'Can I rent an exhibition space for a single day?',
            answer: 'Yes, many exhibition spaces offer hourly, daily, and weekend booking options.',
        },
        {
            question: 'Are exhibition spaces suitable for product launches?',
            answer: 'Absolutely. Many venues are specifically designed for brand showcases and product launch events.',
        },
        {
            question: 'Can artists book exhibition spaces through Sparespace?',
            answer: 'Yes, artists, galleries, and curators can find suitable exhibition spaces across different regions.',
        },
        {
            question: 'What facilities are typically included in exhibition spaces?',
            answer: 'Common amenities include display areas, lighting, internet, parking, security, and event support services.',
        },
        {
            question: 'How far in advance should I book an exhibition space?',
            answer: 'For large exhibitions or premium venues, booking 1-3 months in advance is recommended.',
        },
    ],
    'workshops': [
        {
            question: 'What is the average cost of a workshop space?',
            answer: 'Pricing depends on location, venue size, duration, and facilities available. Hourly rates vary based on the amenities provided.',
        },
        {
            question: 'Can I book a workshop space for a few hours?',
            answer: 'Yes, many workshop spaces offer flexible hourly and half-day booking options to suit your schedule.',
        },
        {
            question: 'What types of workshops can I host in these spaces?',
            answer: 'You can host training sessions, skill-building programs, creative workshops, masterclasses, team learning events, community meetups, and professional development sessions.',
        },
        {
            question: 'What amenities should I look for in a workshop space?',
            answer: 'Look for good lighting, projector or screen, whiteboard, stable internet, comfortable seating, parking, and washroom facilities.',
        },
        {
            question: 'Can I find workshop spaces for large groups?',
            answer: 'Yes, venues are available in various capacities — from intimate 10-person sessions to large group workshops of 100 or more attendees.',
        },
        {
            question: 'How far in advance should I book a workshop space?',
            answer: 'Booking 1–2 weeks in advance is generally recommended, especially for weekends and peak periods.',
        },
    ],
    'workshop': [
        {
            question: 'What is the average cost of a workshop space?',
            answer: 'Pricing depends on location, venue size, duration, and facilities available. Hourly rates vary based on the amenities provided.',
        },
        {
            question: 'Can I book a workshop space for a few hours?',
            answer: 'Yes, many workshop spaces offer flexible hourly and half-day booking options to suit your schedule.',
        },
        {
            question: 'What types of workshops can I host in these spaces?',
            answer: 'You can host training sessions, skill-building programs, creative workshops, masterclasses, team learning events, community meetups, and professional development sessions.',
        },
        {
            question: 'What amenities should I look for in a workshop space?',
            answer: 'Look for good lighting, projector or screen, whiteboard, stable internet, comfortable seating, parking, and washroom facilities.',
        },
        {
            question: 'Can I find workshop spaces for large groups?',
            answer: 'Yes, venues are available in various capacities — from intimate 10-person sessions to large group workshops of 100 or more attendees.',
        },
        {
            question: 'How far in advance should I book a workshop space?',
            answer: 'Booking 1–2 weeks in advance is generally recommended, especially for weekends and peak periods.',
        },
    ],
    'wellness-workshops': [
        {
            question: 'What is the average cost of a wellness workshop space?',
            answer: 'Pricing depends on location, venue size, duration, and facilities available.',
        },
        {
            question: 'Can I book a wellness workshop space for a few hours?',
            answer: 'Yes, many wellness-friendly spaces offer hourly and half-day bookings.',
        },
        {
            question: 'Are yoga and meditation workshops allowed in wellness workshop spaces?',
            answer: 'Absolutely. Many listed spaces are suitable for yoga, meditation, breathwork, and wellness programs.',
        },
        {
            question: 'Can I find outdoor wellness workshop spaces?',
            answer: 'Yes, several venues offer garden, terrace, and open-air spaces for wellness events.',
        },
        {
            question: 'What amenities should I look for in a wellness workshop space?',
            answer: 'Natural light, ventilation, quiet surroundings, washrooms, parking, and sufficient floor space are among the most important factors.',
        },
        {
            question: 'How far in advance should I book a wellness workshop space?',
            answer: 'Booking 2-6 weeks in advance is generally recommended, especially for weekends.',
        },
    ],
    'wellness-workshop': [
        {
            question: 'What is the average cost of a wellness workshop space?',
            answer: 'Pricing depends on location, venue size, duration, and facilities available.',
        },
        {
            question: 'Can I book a wellness workshop space for a few hours?',
            answer: 'Yes, many wellness-friendly spaces offer hourly and half-day bookings.',
        },
        {
            question: 'Are yoga and meditation workshops allowed in wellness workshop spaces?',
            answer: 'Absolutely. Many listed spaces are suitable for yoga, meditation, breathwork, and wellness programs.',
        },
        {
            question: 'Can I find outdoor wellness workshop spaces?',
            answer: 'Yes, several venues offer garden, terrace, and open-air spaces for wellness events.',
        },
        {
            question: 'What amenities should I look for in a wellness workshop space?',
            answer: 'Natural light, ventilation, quiet surroundings, washrooms, parking, and sufficient floor space are among the most important factors.',
        },
        {
            question: 'How far in advance should I book a wellness workshop space?',
            answer: 'Booking 2-6 weeks in advance is generally recommended, especially for weekends.',
        },
    ],
    'wellness': [
        {
            question: 'What is the average cost of a wellness workshop space?',
            answer: 'Pricing depends on location, venue size, duration, and facilities available.',
        },
        {
            question: 'Can I book a wellness workshop space for a few hours?',
            answer: 'Yes, many wellness-friendly spaces offer hourly and half-day bookings.',
        },
        {
            question: 'Are yoga and meditation workshops allowed in wellness workshop spaces?',
            answer: 'Absolutely. Many listed spaces are suitable for yoga, meditation, breathwork, and wellness programs.',
        },
        {
            question: 'Can I find outdoor wellness workshop spaces?',
            answer: 'Yes, several venues offer garden, terrace, and open-air spaces for wellness events.',
        },
        {
            question: 'What amenities should I look for in a wellness workshop space?',
            answer: 'Natural light, ventilation, quiet surroundings, washrooms, parking, and sufficient floor space are among the most important factors.',
        },
        {
            question: 'How far in advance should I book a wellness workshop space?',
            answer: 'Booking 2-6 weeks in advance is generally recommended, especially for weekends.',
        },
    ],
    'baithaks': [
        {
            question: 'What is a baithak venue?',
            answer: 'A baithak venue is an intimate gathering space designed for cultural performances, discussions, music sessions, poetry readings, and community events.',
        },
        {
            question: 'Can I host a live music performance in baithak venues?',
            answer: 'Yes, many venues are suitable for classical music, ghazal nights, Sufi performances, and acoustic concerts.',
        },
        {
            question: 'Are baithak spaces available for small private gatherings?',
            answer: 'Absolutely. Many venues cater to intimate audiences ranging from 20 to 100 attendees.',
        },
        {
            question: 'Can I book a baithak venue for a few hours?',
            answer: 'Yes, several venues offer hourly and half-day rental options.',
        },
        {
            question: 'What facilities are generally available in baithak spaces?',
            answer: 'Most venues provide seating arrangements, sound systems, lighting, washrooms, and event support facilities.',
        },
        {
            question: 'How early should I book a baithak space?',
            answer: 'Booking 2-4 weeks in advance is recommended, especially for weekends and popular cultural venues.',
        },
    ],
    'baithak': [
        {
            question: 'What is a baithak venue?',
            answer: 'A baithak venue is an intimate gathering space designed for cultural performances, discussions, music sessions, poetry readings, and community events.',
        },
        {
            question: 'Can I host a live music performance in baithak venues?',
            answer: 'Yes, many venues are suitable for classical music, ghazal nights, Sufi performances, and acoustic concerts.',
        },
        {
            question: 'Are baithak spaces available for small private gatherings?',
            answer: 'Absolutely. Many venues cater to intimate audiences ranging from 20 to 100 attendees.',
        },
        {
            question: 'Can I book a baithak venue for a few hours?',
            answer: 'Yes, several venues offer hourly and half-day rental options.',
        },
        {
            question: 'What facilities are generally available in baithak spaces?',
            answer: 'Most venues provide seating arrangements, sound systems, lighting, washrooms, and event support facilities.',
        },
        {
            question: 'How early should I book a baithak space?',
            answer: 'Booking 2-4 weeks in advance is recommended, especially for weekends and popular cultural venues.',
        },
    ],
    'podcast-studios': [
        {
            question: 'How much does it cost to rent a podcast studio?',
            answer: 'Costs vary depending on studio equipment, recording duration, production support, and location.',
        },
        {
            question: 'Can I book a podcast studio by the hour?',
            answer: 'Yes, many podcast studios offer hourly, half-day, and full-day rental options.',
        },
        {
            question: 'Are video podcast recording facilities available in podcast studios?',
            answer: 'Yes, many studios provide multi-camera setups, professional lighting, and video production support.',
        },
        {
            question: 'Do podcast studios provide microphones and recording equipment?',
            answer: 'Most professional podcast studios include microphones, audio interfaces, headphones, and recording systems.',
        },
        {
            question: 'Can beginners use podcast studios?',
            answer: 'Absolutely. Many studios provide technical assistance and production support for first-time podcasters.',
        },
        {
            question: 'How far in advance should I book a podcast studio?',
            answer: 'Booking 1-2 weeks in advance is generally recommended, especially for premium studios and weekend slots.',
        },
    ],
    'podcast': [
        {
            question: 'How much does it cost to rent a podcast studio?',
            answer: 'Costs vary depending on studio equipment, recording duration, production support, and location.',
        },
        {
            question: 'Can I book a podcast studio by the hour?',
            answer: 'Yes, many podcast studios offer hourly, half-day, and full-day rental options.',
        },
        {
            question: 'Are video podcast recording facilities available in podcast studios?',
            answer: 'Yes, many studios provide multi-camera setups, professional lighting, and video production support.',
        },
        {
            question: 'Do podcast studios provide microphones and recording equipment?',
            answer: 'Most professional podcast studios include microphones, audio interfaces, headphones, and recording systems.',
        },
        {
            question: 'Can beginners use podcast studios?',
            answer: 'Absolutely. Many studios provide technical assistance and production support for first-time podcasters.',
        },
        {
            question: 'How far in advance should I book a podcast studio?',
            answer: 'Booking 1-2 weeks in advance is generally recommended, especially for premium studios and weekend slots.',
        },
    ],
    DEFAULT: [
        {
            question: 'How do I book a space?',
            answer: 'You can search for spaces using our platform, select your desired date and time, and book instantly or send a request to the host.',
        },
        {
            question: 'What is the cancellation policy?',
            answer: 'Cancellation policies vary by host. You can view the specific cancellation policy on each space listing before booking.',
        },
        {
            question: 'Can I visit the space before booking?',
            answer: 'Some hosts offer tours. You can message the host directly through our platform to request a visit.',
        },
        {
            question: 'Are there any hidden fees?',
            answer: 'No, the total price including any platform fees or taxes is clearly displayed before you confirm your booking.',
        },
        {
            question: 'What is the average cost of an exhibition space in Delhi?',
            answer: 'The cost varies depending on location, venue size, duration, and facilities provided.',
        },
        {
            question: 'Can I rent an exhibition venue for a single day?',
            answer: 'Yes, many exhibition spaces offer hourly, daily, and weekend booking options.',
        },
        {
            question: 'Are exhibition spaces suitable for product launches?',
            answer: 'Absolutely. Many venues are specifically designed for brand showcases and product launch events',
        },
        {
            question: 'Can artists book exhibition venues through Sparespace?',
            answer: 'Yes, artists, galleries, and curators can find suitable exhibition spaces across Delhi.',
        },
        {
            question: 'What facilities are typically included in exhibition venues?',
            answer: 'Common amenities include display areas, lighting, internet, parking, security, and event support services.',
        },
        {
            question: 'How far in advance should I book an exhibition venue?',
            answer: 'For large exhibitions or premium venues,booking 1-3 months in advance is recommended.',
        },
        {
            question: 'What is the average cost of a wellness workshop space in Delhi?',
            answer: 'Pricing depends on location, venue size, duration, and facilities available.',
        },
        {
            question: 'Can I book a wellness venue for a few hours?',
            answer: 'Yes, many wellness-friendly spaces offer hourly and half-day bookings.',
        },
        {
            question: 'Are yoga and meditation workshops allowed in these venues?',
            answer: 'Absolutely. Many listed spaces are suitable for yoga, meditation, breathwork, and wellness programs.',
        },
        {
            question: 'Can I find outdoor wellness workshop venues in Delhi?',
            answer: 'Yes, several venues offer garden, terrace, and open-air spaces for wellness events.',
        },
        {
            question: 'What amenities should I look for in a wellness workshop venue?',
            answer: 'Natural light, ventilation, quiet surroundings, washrooms, parking, and sufficient floor space are among the most important factors.',
        },
        {
            question: 'How far in advance should I book a wellness workshop space?',
            answer: 'Booking 2-6 weeks in advance is generally recommended,especially for weekends.',
        },
        {
            question: 'What is a baithak venue?',
            answer: 'A baithak venue is an intimate gathering space designed for cultural performances, discussions, music sessions, poetry readings, and community events.',
        },
        {
            question: 'Can I host a live music performance in these venues?',
            answer: 'Yes, many venues are suitable for classical music, ghazal nights, Sufi performances, and acoustic concerts.',
        },
        {
            question: 'Are baithak spaces available for small private gatherings?',
            answer: 'Absolutely. Many venues cater to intimate audiences ranging from 20 to 100 attendees.',
        },
        {
            question: 'Can I book a baithak venue for a few hours?',
            answer: 'Yes, several venues offer hourly and half-day rental options.',
        },
        {
            question: 'What facilities are generally available?',
            answer: 'Most venues provide seating arrangements, sound systems, lighting, washrooms, and event support facilities.',
        },
        {
            question: 'How early should I book a baithak space in Delhi?',
            answer: 'Booking 2-4 weeks in advance is recommended,especially for weekends and popular cultural venues.',
        },
        {
            question: 'How much does it cost to rent a podcast studio in Delhi?',
            answer: 'Cost vary depending on studio equipment,recording duration,production support,and location.',
        },
        {
            question: 'Can I book a podcast studio by the hour?',
            answer: 'Yes, many podcast studios offer hourly,half-day,and full-day rental options.',
        },
        {
            question: 'Are video podcast recording facilities available?',
            answer: 'Yes, many studios provide multi-camera setups, professional lighting, and video production support.',
        },
        {
            question: 'Do podcast studios provide microphones and recording equipment?',
            answer: 'Most professional podcast studios include microphones, audio interfaces, headphones, and recording systems.',
        },
        {
            question: 'Can beginners use podcast studios?',
            answer: 'Absolutely. Many studios provide technical assistance and production support for first-time podcasters.',
        },
        {
            question: 'How far in advance should I book a podcast studio?',
            answer: 'Booking 1-2 weeks in advance is generally recommended, especially for premium studios and weekend slots.',
        },
    ],
};
