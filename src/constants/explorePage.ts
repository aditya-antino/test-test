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
    'fitness-wellness': {
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
    'sound-healing': [
        {
            question: 'Can I book a venue for a one-time sound bath session?',
            answer: 'Yes. Many venues offer hourly, half-day, and full-day booking options.',
        },
        {
            question: 'What wellness sessions can I host?',
            answer: 'You can host sound baths, singing bowl healing, breathwork, yoga, Reiki, meditation, and mindfulness workshops.',
        },
        {
            question: 'Can I book for private or group sessions?',
            answer: 'Yes. These venues are suitable for one-on-one sessions, group workshops, and wellness communities.',
        },
        {
            question: 'What facilities are typically available?',
            answer: 'Most venues offer yoga mats, meditation cushions, air conditioning, and washroom facilities.',
        },
        {
            question: 'How early should I reserve the venue?',
            answer: 'Booking at least a week in advance is recommended, especially for weekend sessions.',
        },
    ],

    'dance-rehearsal': [
        {
            question: 'Are mirrors and sound systems included?',
            answer: 'Many studios provide wall-mounted mirrors, professional sound systems, and dance-friendly flooring. Amenities vary by venue.',
        },
        {
            question: 'What dance activities can I host?',
            answer: 'You can use these studios for rehearsals, auditions, dance classes, workshops, fitness sessions, and performances.',
        },
        {
            question: 'Can I book the studio hourly?',
            answer: 'Yes. Most dance studios offer flexible hourly and full-day bookings.',
        },
        {
            question: 'What facilities are available?',
            answer: 'Many studios include mirrors, sound systems, changing rooms, air conditioning, washrooms, and parking.',
        },
        {
            question: 'How early should I book the space?',
            answer: 'Booking a few days in advance is recommended. For weekends and larger groups, book 1–2 weeks ahead.',
        },
    ],

    'yoga': [
        {
            question: 'What types of yoga sessions can I host?',
            answer: 'You can host yoga classes, meditation sessions, breathwork practices, wellness workshops, private sessions, and group retreats.',
        },
        {
            question: 'Can I book a yoga studio for private or group sessions?',
            answer: 'Yes. You can book studios for private classes, group sessions, workshops, retreats, and wellness events.',
        },
        {
            question: 'What facilities are available?',
            answer: 'Most venues offer yoga mats, cushions, changing rooms, air conditioning, washrooms, parking, and a peaceful ambience.',
        },
        {
            question: 'Can I book the studio on an hourly basis?',
            answer: 'Yes. Most yoga studios offer flexible hourly and full-day booking options.',
        },
        {
            question: 'How early should I book a yoga space?',
            answer: 'Booking a few days in advance is recommended, especially for weekends and larger groups.',
        },
    ],
    'kitchen': [
        {
            question: 'Are kitchen spaces suitable for food photography?',
            answer: 'Yes. Kitchen studios are widely used for food photography, recipe content, and commercial food campaigns.',
        },
        {
            question: 'Are cooking appliances included?',
            answer: 'Most kitchens include essential appliances like stoves, ovens, refrigerators, sinks, and preparation counters.',
        },
        {
            question: 'Can I shoot food videos in the kitchen?',
            answer: 'Yes. Many kitchens are suitable for recipe videos, commercial shoots, and social media content.',
        },
        {
            question: 'Is hourly booking available?',
            answer: 'Yes. Most rental kitchens can be booked by the hour or for full-day sessions.',
        },
        {
            question: 'Can I host cooking workshops?',
            answer: 'Absolutely. Many kitchens are designed for chef demonstrations, culinary classes, and tasting events.',
        },
    ],
    
    'living-room': [
        {
            question: 'Can I book a living room space for a photoshoot?',
            answer: 'Yes. Many spaces are designed specifically for lifestyle photography, product shoots, fashion content, and commercial productions.',
        },
        {
            question: 'What events are suitable for these spaces?',
            answer: 'These venues are perfect for lifestyle shoots, interviews, podcasts, workshops, and intimate gatherings.',
        },
        {
            question: 'Can I book for a few hours?',
            answer: 'Yes. Most living room spaces offer flexible hourly bookings.',
        },
        {
            question: 'Are furniture and décor included?',
            answer: 'Yes. Most venues come fully furnished with stylish interiors.',
        },
        {
            question: 'Can I shoot commercial content here?',
            answer: 'Yes. These spaces are frequently used for advertisements, brand campaigns, and content creation.',
        },
    ],

    'performance': [
        {
            question: 'What performances can I host?',
            answer: 'You can host live music, dance shows, comedy acts, theatre previews, poetry events, and cultural performances.',
        },
        {
            question: 'Are sound and lighting available?',
            answer: 'Many venues provide professional sound systems and stage lighting. Amenities vary by venue.',
        },
        {
            question: 'Can I book for rehearsals as well?',
            answer: 'Yes. Most performance venues can be booked for rehearsals and technical practice sessions.',
        },
        {
            question: 'Is there seating for audiences?',
            answer: 'Yes. Seating capacity varies depending on the venue.',
        },
        {
            question: 'How early should I reserve the venue?',
            answer: "It's best to book at least one week in advance for weekends and public events.",
        },
    ],

    'theatre': [
        {
            question: 'What can I host in a theatre space?',
            answer: 'Theatre spaces are suitable for plays, acting workshops, rehearsals, screenings, and live performances.',
        },
        {
            question: 'Is stage lighting included?',
            answer: 'Many theatres include professional stage lighting and sound equipment.',
        },
        {
            question: 'Can I book for rehearsals?',
            answer: 'Yes. Theatre venues offer flexible bookings for rehearsals and practice sessions.',
        },
        {
            question: 'What audience capacity is available?',
            answer: 'Capacity varies by venue, from intimate black box theatres to larger auditoriums.',
        },
        {
            question: 'Is technical support provided?',
            answer: 'Some venues offer on-site technical support for lighting and sound during events.',
        },
    ],

    'supper-club': [
        {
            question: 'What is a supper club venue?',
            answer: 'A supper club venue is a private space designed for curated dining experiences and intimate gatherings.',
        },
        {
            question: 'Can I bring my own chef?',
            answer: 'Yes. Many venues allow you to bring your own chef or catering team.',
        },
        {
            question: 'Is the kitchen included?',
            answer: 'Some venues provide access to a fully equipped kitchen. Facilities vary by venue.',
        },
        {
            question: 'Can I host private dining experiences?',
            answer: "Absolutely. These venues are ideal for chef's tables, tasting menus, and exclusive dinners.",
        },
        {
            question: 'How many guests can the venue accommodate?',
            answer: 'Guest capacity depends on the venue, with options for both small and large gatherings.',
        },
    ],

    'meetups': [
        {
            question: 'What types of meetups can I organize?',
            answer: 'You can host networking events, startup meetups, workshops, club meetings, and community discussions.',
        },
        {
            question: 'Can I book the venue on an hourly basis?',
            answer: 'Yes. Most meetup spaces offer flexible hourly booking options.',
        },
        {
            question: 'Is Wi-Fi available?',
            answer: 'Many venues provide high-speed Wi-Fi for meetings and presentations.',
        },
        {
            question: 'Are refreshments allowed?',
            answer: 'Most venues allow refreshments or external catering, subject to their policies.',
        },
        {
            question: "What's the ideal group size?",
            answer: 'Meetup spaces are available for small groups as well as larger communities, depending on the venue.',
        },
    ],

    'outdoor-space': [
        {
            question: 'What events can I host outdoors?',
            answer: 'Outdoor venues are ideal for workshops, parties, wellness sessions, photoshoots, and community events.',
        },
        {
            question: 'Are outdoor spaces available year-round?',
            answer: 'Yes. Most outdoor venues are available throughout the year, subject to weather conditions.',
        },
        {
            question: 'Is parking available?',
            answer: 'Many outdoor venues provide dedicated parking for guests.',
        },
        {
            question: 'Can decorators be hired?',
            answer: 'Yes. Most venues allow external decorators and event planners.',
        },
        {
            question: 'Is catering allowed?',
            answer: 'Many outdoor venues permit in-house or external catering services.',
        },
    ],

    'bhajan-clubbing': [
        {
            question: 'Can I host a bhajan or satsang?',
            answer: 'Yes. These venues are perfect for bhajans, satsangs, kirtans, and spiritual gatherings.',
        },
        {
            question: 'Are sound systems available?',
            answer: 'Many venues provide microphones and sound systems for devotional singing and speeches.',
        },
        {
            question: 'Are these venues suitable for elderly guests?',
            answer: 'Yes. Most venues offer comfortable seating and easy accessibility.',
        },
        {
            question: 'Can I book the venue for a few hours?',
            answer: 'Yes. Flexible hourly bookings are available for spiritual gatherings.',
        },
        {
            question: 'Is seating provided?',
            answer: 'Most venues provide chairs, floor seating, or meditation cushions based on the event requirements.',
        },
    ],
    
    'community-meetups': [
        {
            question: 'What community events can I host?',
            answer: 'You can host resident meetings, workshops, club gatherings, networking events, and social initiatives.',
        },
        {
            question: 'Can I book recurring sessions?',
            answer: 'Yes. Many venues support weekly or monthly recurring bookings.',
        },
        {
            question: 'Is Wi-Fi available?',
            answer: 'Most community venues provide Wi-Fi for meetings and presentations.',
        },
        {
            question: 'Are refreshments permitted?',
            answer: 'Yes. Many venues allow refreshments or external catering.',
        },
        {
            question: 'What is the booking process?',
            answer: 'Simply choose your venue, select the date and duration, and confirm your booking online.',
        },
    ],

    'screening-spaces': [
        {
            question: 'What can I screen at these venues?',
            answer: 'You can host movie nights, documentaries, presentations, product launches, and private film screenings.',
        },
        {
            question: 'Is a projector included?',
            answer: 'Many screening venues provide projectors, screens, and AV equipment. Amenities may vary by venue.',
        },
        {
            question: 'Can I host private screenings?',
            answer: 'Yes. These venues are ideal for invite-only screenings, film clubs, and private events.',
        },
        {
            question: 'Are sound systems provided?',
            answer: 'Most screening spaces include professional sound systems for a great viewing experience.',
        },
        {
            question: 'Can food and beverages be served?',
            answer: "Many venues allow food and beverages, subject to the venue's policies.",
        },
    ],

    'art-gallery': [
        {
            question: 'Can I host an art exhibition?',
            answer: 'Yes. Art galleries are designed for exhibitions, installations, and artist showcases.',
        },
        {
            question: 'Are display systems available?',
            answer: 'Many galleries provide display walls, hanging systems, and professional exhibition lighting.',
        },
        {
            question: 'Can I organize an exhibition opening?',
            answer: 'Absolutely. Galleries are perfect for launch events, previews, and networking evenings.',
        },
        {
            question: 'Is lighting suitable for artworks?',
            answer: 'Yes. Most galleries feature lighting designed to enhance artwork displays.',
        },
        {
            question: 'How far in advance should I book?',
            answer: 'Booking 2–4 weeks in advance is recommended for exhibitions and launches.',
        },
    ],
    
    'warehouse-studio': [
        {
            question: 'What is a warehouse studio?',
            answer: 'A warehouse studio is a large industrial-style venue ideal for productions, events, and creative projects.',
        },
        {
            question: 'What productions are suitable?',
            answer: 'These studios are perfect for fashion shoots, films, commercials, music videos, and brand campaigns.',
        },
        {
            question: 'Can large equipment be brought in?',
            answer: 'Yes. Most warehouse studios can accommodate heavy equipment, props, and production vehicles.',
        },
        {
            question: 'Is vehicle access available?',
            answer: 'Many warehouse studios offer easy loading access for production teams.',
        },
        {
            question: 'Can I book for multiple days?',
            answer: 'Yes. Most venues offer flexible multi-day booking options.',
        },
    ],

    'book-launch': [
        {
            question: 'Can I host a book launch event?',
            answer: 'Yes. These venues are ideal for book launches, author talks, readings, and literary discussions.',
        },
        {
            question: 'Are microphone and seating arrangements available?',
            answer: 'Many venues provide microphones, speakers, seating, and presentation equipment.',
        },
        {
            question: 'Can I invite the media and guests?',
            answer: 'Absolutely. These venues can accommodate invited guests, readers, and media.',
        },
        {
            question: 'Is branding allowed inside the venue?',
            answer: 'Most venues allow banners, standees, and event branding with prior approval.',
        },
    ],

    'brand-pop-up': [
        {
            question: 'Are pop-up spaces suitable for product launches?',
            answer: "Absolutely. They're widely used for product launches, customer engagement campaigns, and experiential marketing events.",
        },
        {
            question: 'What types of brands can host pop-ups?',
            answer: 'Fashion, beauty, lifestyle, food, wellness, home décor, and D2C brands frequently host pop-ups.',
        },
        {
            question: 'Can I customize the venue with branding?',
            answer: 'Yes. Most venues allow custom branding, displays, banners, and product installations.',
        },
        {
            question: 'Is electricity and Wi-Fi available?',
            answer: 'Most venues provide electricity, Wi-Fi, and basic event facilities.',
        },
        {
            question: 'How early should I book a pop-up space?',
            answer: 'Booking 2–3 weeks in advance is recommended, especially during festive and holiday seasons.',
        },
    ],

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

    'fitness-wellness': [
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
