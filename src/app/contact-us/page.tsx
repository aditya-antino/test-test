'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { postContactUSQuery } from '@/services/contactus.services';
import { handleApiError } from '@/hooks/handleApiError';
import { aboutUsImage, hostIllustration } from '@/assets/landingImages';
import { PATHS } from '@/constants/path';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const BUDGET_OPTIONS = [
    { label: '₹1,500 – ₹3,000', value: '1500-3000' },
    { label: '₹3,000 – ₹5,000', value: '3000-5000' },
    { label: '₹5,000 – ₹10,000', value: '5000-10000' },
    { label: '₹10,000+', value: '10000+' },
];

const SPACE_CATEGORIES = [
    'Resedential Spaces',
    'Event Spaces',
    'Workshop Area',
    'Photo & Film Studio',
    'Fitness & Wellness Spaces',
    'Dining Spaces',
    'Outdoor Spaces',
];

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        category: '',
        budget: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (value: string) => {
        setFormData((prev) => ({ ...prev, category: value }));
    };

    const handleBudgetSelect = (value: string) => {
        setFormData((prev) => ({ ...prev, budget: prev.budget === value ? '' : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            category: formData.category,
            budget: formData.budget,
            message: formData.message,
        };

        try {
            const response = await postContactUSQuery(payload);
            if (response.status === 200 || response.data?.success) {
                setSubmitStatus('success');
                const successMsg = response.data?.data?.message || response.data?.message || 'Thank you for contacting us! We will get back to you soon.';
                toast.success(successMsg);
                setFormData({ firstName: '', lastName: '', email: '', category: '', budget: '', message: '' });
            }
        } catch (error) {
            handleApiError(error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="w-full bg-white pt-12 pb-0 px-4 md:px-16 relative overflow-hidden">
                {/* Ambient glow */}
                <div className="w-96 h-96 opacity-25 bg-amber-200 absolute z-0 -top-20 left-[5%] rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        {/* Left */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Figtree'] text-zinc-800 leading-tight mb-6">
                                Let&apos;s{' '}
                                <span className="text-[#F7D13A]">Talk</span>
                            </h1>
                            <p className="text-gray-500 text-lg leading-relaxed mb-2 max-w-md">
                                Whether you&apos;re looking for the right space, want to list your
                                property, or simply have a question - we&apos;re here to help.
                                Our team is ready to assist you every step of the way.
                            </p>
                            <p className="text-gray-400 text-sm">
                                Get in touch, and we&apos;ll respond as soon as possible.
                            </p>

                            {/* Decorative image */}
                            <div className="hidden sm:flex">
                                <div className="relative w-full md:w-[400px] h-[400px]">
                                    <Image
                                        src={aboutUsImage}
                                        alt="Spare Space Illustration"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right – form card*/}
                        <div className="bg-white border border-gray-100 rounded-3xl shadow-[0px_8px_40px_rgba(0,0,0,0.07)] p-8 lg:p-10">

                            {submitStatus === 'success' && (
                                <div className="mb-6 flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700">
                                    <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                                    <p className="text-sm font-medium">
                                        Thank you! Your message has been sent. We&apos;ll get back to you shortly.
                                    </p>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
                                    Something went wrong. Please try again.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        name="firstName"
                                        label="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Aarav"
                                        required
                                    />
                                    <Input
                                        name="lastName"
                                        label="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Sharma"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <Input
                                    name="email"
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="you@email.com"
                                    required
                                />

                                {/* Space Category */}
                                <div className="flex flex-col gap-1">
                                    <Label className="text-zinc-800 text-base font-semibold">
                                        What category of space are you looking for?
                                    </Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={handleCategoryChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {SPACE_CATEGORIES.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Budget */}
                                <div className="flex flex-col gap-2">
                                    <Label className="text-zinc-800 text-base font-semibold">
                                        Budget
                                    </Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {BUDGET_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => handleBudgetSelect(opt.value)}
                                                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 text-left cursor-pointer ${
                                                    formData.budget === opt.value
                                                        ? 'border-[#F6CD28] bg-[#FFF9E5] text-zinc-800 font-semibold shadow-sm'
                                                        : 'border-gray-200 bg-white text-gray-600 hover:border-[#F6CD28]/60 hover:bg-[#FFFDF0]'
                                                }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Message */}
                                <Textarea
                                    name="message"
                                    label="Any message for us (optional)"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Tell us a bit about what you're looking for..."
                                    rows={4}
                                />

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-12 text-base font-semibold flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* List Your Space CTA */}
            <section className="w-full mt-20">
                <div className="w-full bg-gray-50 py-16 px-8 md:px-16 flex flex-col items-center text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 font-['Figtree'] leading-tight mb-4">
                        Looking to List Your{' '}
                        <span className="text-yellow-400">Space</span>?
                    </h2>

                    <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-xl">
                        Own an Event Venue, Photography Studio, Workshop Area, or any other Creative Space?
                        List your space on Spare Space and get discovered by people looking to book spaces like yours.
                    </p>

                    <Link href={PATHS.LIST_YOUR_SPACE}>
                        <Button
                            variant="default"
                            className="select-none text-black rounded-full px-6 py-2 cursor-pointer font-semibold text-base gap-2"
                        >
                            Sign up here
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </section>

            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
};

export default ContactUs;
