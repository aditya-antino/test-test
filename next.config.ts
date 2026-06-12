/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'spacespare.s3.ap-south-1.amazonaws.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'sparespace-fe-objects.s3.ap-south-1.amazonaws.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'wordpress.antino.ca',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'secure.gravatar.com',
                pathname: '/**',
            },
        ],
    },

    async redirects() {
        return [
            {
                source: '/guest/account/:path*',
                destination: '/account/:path*',
                permanent: true,
            },
            {
                source: '/guest/booking-review/:slug*',
                destination: '/booking-review/:slug*',
                permanent: true,
            },
            {
                source: '/guest/chat-messages',
                destination: '/chat-messages',
                permanent: true,
            },
            {
                source: '/guest/guest-details/:id*',
                destination: '/guest-details/:id*',
                permanent: true,
            },
            {
                source: '/guest/my-bookings',
                destination: '/my-bookings',
                permanent: true,
            },
            {
                source: '/guest/space-details/:slug*',
                destination: '/space-details/:slug*',
                permanent: true,
            },
            {
                source: '/guest/space-list',
                destination: '/space-list',
                permanent: true,
            },
            {
                source: '/guest/wishlists',
                destination: '/wishlists',
                permanent: true,
            },
            // Handlers for nested legacy redirections inside `/guest/guest/`
            {
                source: '/guest/guest/host-profile/:hostId*',
                destination: '/guest/host-profile/:hostId*',
                permanent: true,
            },
            {
                source: '/guest/guest/home',
                destination: '/guest/home',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
