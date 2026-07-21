'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    url: string;
}

export default function Breadcrumbs() {
    const pathname = usePathname();

    if (!pathname) return null;

    // Excluded pages (No Breadcrumbs Shown)
    const excludedPages = ['/', '/guest/home', '/login', '/sign-up', '/forgot-password'];
    const isExcluded = excludedPages.some(
        (page) => pathname === page || pathname.startsWith(page + '/'),
    );

    if (isExcluded) return null;

    const isHost = pathname.startsWith('/host');
    const rootItem: BreadcrumbItem = isHost
        ? { label: 'Host', url: '/host/space/reservations' }
        : { label: 'Home', url: '/' };

    const formatSlug = (slug: string) => {
        return slug
            .split(/[-_]+/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const getBreadcrumbs = (): BreadcrumbItem[] => {
        // Host / Dashboard pages
        if (pathname === '/host/space/reservations') {
            return [rootItem, { label: 'Reservations', url: '/host/space/reservations' }];
        }
        if (pathname === '/host/space/your-listings') {
            return [rootItem, { label: 'My Listings', url: '/host/space/your-listings' }];
        }
        if (pathname.startsWith('/host/space/your-listings/list-space')) {
            return [
                rootItem,
                { label: 'My Listings', url: '/host/space/your-listings' },
                { label: 'List a Space', url: pathname },
            ];
        }
        if (pathname.startsWith('/host/space/your-listings/space-details')) {
            return [
                rootItem,
                { label: 'My Listings', url: '/host/space/your-listings' },
                { label: 'Space Detail', url: pathname },
            ];
        }
        if (pathname.startsWith('/host/space/your-listings/deactivate-space')) {
            return [
                rootItem,
                { label: 'My Listings', url: '/host/space/your-listings' },
                { label: 'Deactivate Listing', url: pathname },
            ];
        }
        if (pathname === '/host/space/earnings/analytics') {
            return [rootItem, { label: 'Earnings', url: '/host/space/earnings/analytics' }];
        }
        if (pathname === '/host/space/earnings/time-wise-reports') {
            return [
                rootItem,
                { label: 'Earnings', url: '/host/space/earnings/analytics' },
                {
                    label: 'Time-Wise Reports',
                    url: '/host/space/earnings/time-wise-reports',
                },
            ];
        }
        if (pathname.startsWith('/host/space/earnings/time-wise-reports/details')) {
            return [
                rootItem,
                { label: 'Earnings', url: '/host/space/earnings/analytics' },
                { label: 'Details', url: pathname },
            ];
        }
        if (pathname === '/host/space/earnings/property-wise-reports') {
            return [
                rootItem,
                { label: 'Earnings', url: '/host/space/earnings/analytics' },
                {
                    label: 'Property-Wise Reports',
                    url: '/host/space/earnings/property-wise-reports',
                },
            ];
        }
        if (pathname.startsWith('/host/space/earnings/property-wise-reports/details')) {
            return [
                rootItem,
                { label: 'Earnings', url: '/host/space/earnings/analytics' },
                { label: 'Details', url: pathname },
            ];
        }
        if (pathname === '/host/space/calendar') {
            return [rootItem, { label: 'Calendar', url: '/host/space/calendar' }];
        }
        if (pathname === '/host/space/booking-requests') {
            return [rootItem, { label: 'Booking Requests', url: '/host/space/booking-requests' }];
        }
        if (pathname === '/host/space/chat-messages') {
            return [rootItem, { label: 'Messages', url: '/host/space/chat-messages' }];
        }
        if (pathname === '/host/account/profile') {
            return [
                rootItem,
                { label: 'Account', url: '/host/account/profile' },
                { label: 'Profile', url: '/host/account/profile' },
            ];
        }
        if (pathname === '/host/account/verification') {
            return [
                rootItem,
                { label: 'Account', url: '/host/account/profile' },
                { label: 'Verification', url: '/host/account/verification' },
            ];
        }
        if (pathname === '/host/account/link-payout') {
            return [
                rootItem,
                { label: 'Account', url: '/host/account/profile' },
                { label: 'Payout Setup', url: '/host/account/link-payout' },
            ];
        }

        // Guest / Booking Side pages
        if (pathname === '/space-list') {
            return [rootItem, { label: 'Space List', url: '/space-list' }];
        }

        const exploreMatch = pathname.match(/^\/explore\/(?:[^/]+\/)?([^/]+)/);
        if (exploreMatch) {
            const category = exploreMatch[1];
            return [
                rootItem,
                { label: formatSlug(category), url: pathname },
            ];
        }

        if (pathname.startsWith('/space-details/')) {
            return [
                rootItem,
                { label: 'Space List', url: '/space-list' },
                { label: 'Space Detail', url: pathname },
            ];
        }

        if (pathname.startsWith('/booking-review/')) {
            const slug = pathname.split('/').pop() || '';
            return [
                rootItem,
                { label: 'Space List', url: '/space-list' },
                { label: 'Space Detail', url: `/space-details/${slug}` },
                { label: 'Review Booking', url: pathname },
            ];
        }

        if (pathname === '/my-bookings') {
            return [rootItem, { label: 'My Bookings', url: '/my-bookings' }];
        }

        if (pathname === '/wishlists') {
            return [rootItem, { label: 'Wishlists', url: '/wishlists' }];
        }

        if (pathname === '/chat-messages') {
            return [rootItem, { label: 'Messages', url: '/chat-messages' }];
        }

        if (pathname === '/account/profile') {
            return [
                rootItem,
                { label: 'Account', url: '/account/profile' },
                { label: 'Profile', url: '/account/profile' },
            ];
        }

        if (pathname === '/account/verification') {
            return [
                rootItem,
                { label: 'Account', url: '/account/profile' },
                { label: 'Verification', url: '/account/verification' },
            ];
        }

        if (pathname === '/account/gst') {
            return [
                rootItem,
                { label: 'Account', url: '/account/profile' },
                { label: 'GST Details', url: '/account/gst' },
            ];
        }

        const guestDetailsMatch = pathname.match(/^\/guest-details\/([^/]+)/);
        if (guestDetailsMatch) {
            return [rootItem, { label: 'Guest Profile', url: pathname }];
        }

        const hostProfileMatch = pathname.match(/^\/guest\/host-profile\/([^/]+)/);
        if (hostProfileMatch) {
            return [rootItem, { label: 'Host Profile', url: pathname }];
        }

        // Public & Marketing pages
        if (pathname === '/about') {
            return [rootItem, { label: 'About Us', url: '/about' }];
        }

        if (pathname === '/contact-us') {
            return [rootItem, { label: 'Contact Us', url: '/contact-us' }];
        }

        if (pathname === '/faq') {
            return [rootItem, { label: 'FAQ', url: '/faq' }];
        }

        if (pathname === '/terms') {
            return [rootItem, { label: 'Terms & Conditions', url: '/terms' }];
        }

        if (pathname === '/privacy') {
            return [rootItem, { label: 'Privacy Policy', url: '/privacy' }];
        }

        if (pathname === '/cancellationPolicy') {
            return [rootItem, { label: 'Cancellation Policy', url: '/cancellationPolicy' }];
        }

        if (pathname === '/blogs') {
            return [rootItem, { label: 'Blogs', url: '/blogs' }];
        }

        const blogMatch = pathname.match(/^\/blogs\/([^/]+)/);
        if (blogMatch) {
            const slug = blogMatch[1];
            return [
                rootItem,
                { label: 'Blogs', url: '/blogs' },
                { label: formatSlug(slug), url: pathname },
            ];
        }

        if (pathname === '/proudly-not-ai') {
            return [rootItem, { label: 'Proudly Not AI', url: '/proudly-not-ai' }];
        }

        // Dynamic fallback fallback
        const segments = pathname.split('/').filter(Boolean);
        const trail = [rootItem];
        let currentUrl = '';
        segments.forEach((seg, i) => {
            if (isHost && i === 0) return; // Skip '/host' prefix
            currentUrl += `/${seg}`;
            trail.push({
                label: formatSlug(seg),
                url: isHost ? `/host${currentUrl}` : currentUrl,
            });
        });
        return trail;
    };

    const breadcrumbs = getBreadcrumbs();

    if (breadcrumbs.length <= 1) return null;

    const previousItem = breadcrumbs[breadcrumbs.length - 2];

    return (
        <div className="w-full px-4 md:px-20 py-2 font-figtree select-none">
            <nav className="flex flex-wrap items-center space-x-1.5 text-base text-[#A8A8A8] font-medium">
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                        <React.Fragment key={index}>
                            {index > 0 && <ChevronRight className="h-4 w-4 text-[#A8A8A8]/60 shrink-0" />}
                            {isLast ? (
                                <span className="text-gray-800 font-semibold truncate">{item.label}</span>
                            ) : (
                                <Link
                                    href={item.url}
                                    className="hover:text-[#D89D03] transition-colors duration-200 shrink-0"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </React.Fragment>
                    );
                })}
            </nav>
        </div>
    );
}
