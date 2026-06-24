'use client';
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import logo from '@/assets/logo.svg';
import { CONTACT } from '@/constants/contact';
import { PATHS } from '@/constants/path';

interface MobileFooterSectionProps {
    title: string;
    children: React.ReactNode;
    sectionKey: string;
    isOpen: boolean;
    onToggle: (key: string) => void;
}

const MobileFooterSection = React.memo(function MobileFooterSection({
    title,
    children,
    sectionKey,
    isOpen,
    onToggle,
}: MobileFooterSectionProps) {
    return (
        <div className="w-full">
            {/* Mobile accordion header */}
            <div className="lg:hidden">
                <button
                    onClick={() => onToggle(sectionKey)}
                    className="w-full flex justify-between items-center py-5 pl-6"
                >
                    <span className="text-gray-800 text-sm font-bold text-center flex-1">{title}</span>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </div>
                </button>

                {/* Animated content container */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="pb-4">{children}</div>
                </div>

                <div className="w-full h-px bg-gray-300"></div>
            </div>
        </div>
    );
});

interface DesktopFooterSectionProps {
    title: string;
    children: React.ReactNode;
}

const DesktopFooterSection = React.memo(function DesktopFooterSection({
    title,
    children,
}: DesktopFooterSectionProps) {
    return (
        <div className="w-full">
            {/* Desktop layout */}
            <div className="hidden lg:block flex-1">
                <h3 className="text-gray-800 text-sm font-bold leading-5 mb-5">{title}</h3>
                {children}
            </div>
        </div>
    );
});

const Footer = React.memo(function Footer() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        company: true,
        support: true,
        legal: true,
        connect: true,
        explore: true,
    });

    const toggleSection = useCallback((section: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    }, []);

    return (
        <div className="w-full">
            {/* Show Map CTA - Only for mobile, just above footer */}

            {/* Top divider line */}
            <div className="w-full h-px bg-gray-300"></div>

            {/* Main footer content */}
            <div className="w-full px-4 lg:px-8 xl:px-16">
                <div className="lg:max-w-[1280px] lg:mx-auto lg:py-28 py-8">
                    <div className="lg:flex lg:justify-between lg:gap-10">
                        {/* Left section: Logo and contact info */}
                        <div className="flex flex-col items-center lg:items-start gap-8 mb-10 lg:mb-0">
                            {/* Logo */}
                            <div className="w-48 h-auto">
                                <Image
                                    src={logo}
                                    alt="Spare Space Logo"
                                    width={192}
                                    height={98}
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Contact info */}
                            <div className="flex flex-col items-center lg:items-start gap-2 w-full lg:w-[212px]">
                                {/* Email */}
                                <div className="flex items-center justify-center lg:justify-start gap-4 w-full">
                                    <Mail className="w-4 h-4 text-gray-600" />
                                    <span className="text-gray-600 text-sm font-medium leading-5">
                                        {CONTACT.EMAIL}
                                    </span>
                                </div>

                                {/* Phone */}
                                {/* <div className="flex items-center justify-center lg:justify-start gap-4 w-full">
                                    <Phone className="w-4 h-4 text-gray-600" />
                                    <span className="text-gray-600 text-sm font-medium leading-5">
                                        {CONTACT.PHONE}
                                    </span>
                                </div> */}
                            </div>
                        </div>

                        {/* Right section: Navigation columns */}
                        <div className="w-full lg:w-[927px]">
                            {/* Mobile accordion layout */}
                            <div className="lg:hidden flex flex-col">
                                <MobileFooterSection title="Company" sectionKey="company" isOpen={openSections.company} onToggle={toggleSection}>
                                    <div className="flex flex-col gap-4 items-center animate-fade-in">
                                        <Link
                                            href={PATHS.ABOUT}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            About Us
                                        </Link>
                                        <Link
                                            href={PATHS.BLOG}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Blog
                                        </Link>
                                        <Link
                                            href={PATHS.ARTICLES}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Articles
                                        </Link>
                                        <Link
                                            href={PATHS.LIST_YOUR_SPACE}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            List your Space
                                        </Link>
                                    </div>
                                </MobileFooterSection>

                                <MobileFooterSection title="Support" sectionKey="legal" isOpen={openSections.legal} onToggle={toggleSection}>
                                    <div className="flex flex-col gap-4 items-center animate-fade-in">
                                        <Link
                                            href={PATHS.TERMS}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Terms of Use
                                        </Link>
                                        <Link
                                            href={PATHS.PRIVACY}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Privacy Policy
                                        </Link>
                                        <Link
                                            href={PATHS.CANCELLATION_POLICY}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Cancellation Policy
                                        </Link>
                                        {/* <Link
                                            href={PATHS.COOKIES}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Cookie Policy
                                        </Link> */}
                                    </div>
                                </MobileFooterSection>

                                <MobileFooterSection title="Connect with Us" sectionKey="connect" isOpen={openSections.connect} onToggle={toggleSection}>
                                    <div className="flex flex-col gap-4 items-center animate-fade-in">
                                        <Link
                                            href={PATHS.SOCIAL_INSTAGRAM}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                            target="_blank"
                                        >
                                            Instagram
                                        </Link>
                                        {/* <Link
                                            href={PATHS.SOCIAL_TWITTER}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                            target="_blank"
                                        >
                                            Twitter (X)
                                        </Link> */}
                                        {/* <Link
                                            href={PATHS.SOCIAL_LINKEDIN}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                            target="_blank"
                                        >
                                            LinkedIn
                                        </Link> */}
                                        <Link
                                            href={PATHS.SOCIAL_FACEBOOK}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                            target="_blank"
                                        >
                                            Facebook
                                        </Link>
                                        <Link
                                            href={PATHS.SOCIAL_YT}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                            target="_blank"
                                        >
                                            Youtube
                                        </Link>
                                    </div>
                                </MobileFooterSection>

                                <MobileFooterSection title="Explore Spaces in Delhi NCR" sectionKey="explore" isOpen={openSections.explore} onToggle={toggleSection}>
                                    <div className="flex flex-col gap-4 items-center animate-fade-in">
                                        <Link
                                            href="/explore/delhi-ncr/baithaks"
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Baithak Venues
                                        </Link>
                                        <Link
                                            href="/explore/delhi-ncr/workshops"
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Workshop Spaces
                                        </Link>
                                        <Link
                                            href="/explore/delhi-ncr/cyclorama-studios"
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Cyclorama Studios
                                        </Link>
                                        <Link
                                            href="/explore/delhi-ncr/event-venues"
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Event Venues
                                        </Link>
                                        <Link
                                            href="/explore/delhi-ncr/photography-studios"
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Photography Studios
                                        </Link>
                                    </div>
                                </MobileFooterSection>
                            </div>

                            {/* Desktop grid layout */}
                            <div className="hidden lg:flex lg:gap-10">
                                {/* Company */}
                                <DesktopFooterSection title="Company">
                                    <div className="flex flex-col gap-4">
                                        <Link
                                            href={PATHS.ABOUT}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            About Us
                                        </Link>
                                        {/* <Link
                                            href={PATHS.MISSION}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Our Mission
                                        </Link> */}
                                        <Link
                                            href={PATHS.BLOG}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Blogs
                                        </Link>
                                        <Link
                                            href={PATHS.ARTICLES}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Articles
                                        </Link>
                                        <Link
                                            href={PATHS.LIST_YOUR_SPACE}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            List your Space
                                        </Link>
                                    </div>
                                </DesktopFooterSection>

                                {/* Support */}
                                <DesktopFooterSection title="Support">
                                    <div className="flex flex-col gap-4">
                                        <Link
                                            href={PATHS.TERMS}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Terms of Use
                                        </Link>
                                        <Link
                                            href={PATHS.PRIVACY}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Privacy Policy
                                        </Link>
                                        <Link
                                            href={PATHS.CANCELLATION_POLICY}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Cancellation Policy
                                        </Link>
                                    </div>
                                </DesktopFooterSection>

                                {/* Connect with Us */}
                                <DesktopFooterSection title="Connect with Us">
                                    <div className="flex flex-col gap-4">
                                        <Link
                                            href={PATHS.SOCIAL_INSTAGRAM}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                            target="_blank"
                                        >
                                            Instagram
                                        </Link>
                                        {/* <Link
                                            href={PATHS.SOCIAL_TWITTER}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                            target="_blank"
                                        >
                                            Twitter (X)
                                        </Link> */}
                                        {/* <Link
                                            href={PATHS.SOCIAL_LINKEDIN}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                            target="_blank"
                                        >
                                            LinkedIn
                                        </Link> */}
                                        <Link
                                            href={PATHS.SOCIAL_FACEBOOK}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                            target="_blank"
                                        >
                                            Facebook
                                        </Link>
                                        <Link
                                            href={PATHS.SOCIAL_YT}
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                            target="_blank"
                                        >
                                            Youtube
                                        </Link>
                                    </div>
                                </DesktopFooterSection>

                                {/* Explore Spaces in Delhi NCR */}
                                <DesktopFooterSection title="Explore Spaces in Delhi NCR">
                                    <div className="flex flex-col gap-4">
                                        <Link
                                            href="/explore/delhi-ncr/baithaks"
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Baithak Venues
                                        </Link>
                                        <Link
                                            href="/explore/delhi-ncr/workshops"
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Workshop Spaces
                                        </Link>
                                        <Link
                                            href="/explore/delhi-ncr/cyclorama-studios"
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Cyclorama Studios
                                        </Link>
                                        <Link
                                            href="/explore/delhi-ncr/event-venues"
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Event Venues
                                        </Link>
                                        <Link
                                            href="/explore/delhi-ncr/photography-studios"
                                            className="text-gray-600 text-sm font-normal leading-5 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Photography Studios
                                        </Link>
                                    </div>
                                </DesktopFooterSection>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright notice */}
            <div className="w-full px-4 text-gray-400 text-sm leading-[1.2] font-normal text-center lg:px-8 xl:px-16 pb-4">
                Copyright © Spare Space Private Limited - All Rights Reserved
            </div>
        </div>
    );
});

export default Footer;
