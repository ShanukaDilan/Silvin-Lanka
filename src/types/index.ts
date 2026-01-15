// Type definitions for public pages
// Generated from Prisma schema

export interface Tour {
    id: string;
    title: string;
    description: string;
    price: number; // Prisma Decimal gets converted to number in JS
    duration: string;
    location: string;
    images?: string[];
    locations?: TourLocation[];
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TourLocation {
    lat: number;
    lng: number;
    name?: string;
}

export interface Review {
    id: string;
    name: string;
    rating: number;
    comment: string;
    facebookUrl?: string | null;
    instagramUrl?: string | null;
    tiktokUrl?: string | null;
    isApproved: boolean;
    createdAt: Date;
}

export interface Destination {
    id: string;
    title: string;
    description?: string | null;
    imageUrl?: string | null;
    images?: string[];
    latitude?: number | null;
    longitude?: number | null;
    locations?: DestinationLocation[];
    createdAt: Date;
}

export interface DestinationLocation {
    lat: number;
    lng: number;
    name?: string;
}

export interface SiteProfile {
    id: string;
    aboutText?: string | null;
    aboutImage?: string | null;
    toursHeroImage?: string | null;
    toursHeroColor?: string | null;
    galleryHeroImage?: string | null;
    galleryHeroColor?: string | null;
    aboutHeroImage?: string | null;
    aboutHeroColor?: string | null;
    contactHeroImage?: string | null;
    contactHeroColor?: string | null;
    reviewsHeroImage?: string | null;
    reviewsHeroColor?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    facebookUrl?: string | null;
    instagramUrl?: string | null;
    siteTitle?: string | null;
    siteDescription?: string | null;
    keywords?: string | null;
    navColor?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface HomePage {
    id: string;
    heroTitle?: string | null;
    heroSubtitle?: string | null;
    heroDescription?: string | null;
    heroImage?: string | null;
    whyChooseUsTitle?: string | null;
    whyChooseUsFeatures?: WhyChooseUsFeature[];
    destinationsTitle?: string | null;
    destinationsSubtitle?: string | null;
    popularDestinations?: PopularDestination[];
    featuredToursTitle?: string | null;
    featuredToursSubtitle?: string | null;
    testimonialsTitle?: string | null;
    testimonialsSubtitle?: string | null;
    testimonials?: Testimonial[];
    newsletterTitle?: string | null;
    newsletterDescription?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface WhyChooseUsFeature {
    icon: string;
    title: string;
    description: string;
}

export interface PopularDestination {
    title: string;
    image: string;
    description?: string;
}

export interface Testimonial {
    name: string;
    image?: string;
    comment: string;
    rating: number;
}
