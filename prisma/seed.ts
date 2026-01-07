import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('admin123', 10)

    const admin = await prisma.admin.upsert({
        where: { email: 'admin@silvinlanka.com' },
        update: {},
        create: {
            email: 'admin@silvinlanka.com',
            name: 'Admin User',
            password,
        },
    })

    console.log({ admin })

    // Seed Home Page Data
    const homePage = await prisma.homePage.create({
        data: {
            heroTitle: "Travel Beyond The Ordinary",
            heroSubtitle: "Welcome to Sri Lanka",
            heroDescription: "Discover the hidden gems of the pearl of the Indian Ocean. From mist-covered mountains to pristine beaches, your journey begins here.",
            heroImage: "/images/hero.png",
            whyChooseUsTitle: "Why Choose Silvin Lanka?",
            whyChooseUsFeatures: [
                {
                    icon: "Leaf",
                    title: "Sustainable Travel",
                    description: "We prioritize eco-friendly practices and support local communities to ensure your visit has a positive impact."
                },
                {
                    icon: "ShieldCheck",
                    title: "Expert Local Guides",
                    description: "Our guides are certified experts who know the island's secrets, ensuring a safe and authentic experience."
                },
                {
                    icon: "Tag",
                    title: "Best Value Guaranteed",
                    description: "We offer competitive pricing without compromising on quality, giving you the best memories for your budget."
                }
            ],
            newsletterTitle: "Ready to start your adventure?",
            newsletterDescription: "Sign up for our newsletter to get the latest travel tips, special offers, and hidden gems of Sri Lanka delivered to your inbox.",
            destinationsTitle: "Popular Destinations",
            destinationsSubtitle: "Explore our most visited locations, curated just for you.",
            popularDestinations: [
                {
                    title: "Sigiriya Rock Fortress",
                    image: "https://images.unsplash.com/photo-1580665961601-5d4617e914bf?auto=format&fit=crop&q=80&w=2070",
                    tag: "Cultural",
                    size: "large"
                },
                {
                    title: "Ella Nine Arch Bridge",
                    image: "https://images.unsplash.com/photo-1570375836894-3d0724835848?auto=format&fit=crop&q=80&w=2070",
                    tag: null,
                    size: "normal"
                },
                {
                    title: "Mirissa Beach",
                    image: "https://images.unsplash.com/photo-1533555543163-f4728d844c80?auto=format&fit=crop&q=80&w=2070",
                    tag: null,
                    size: "normal"
                },
                {
                    title: "Yala National Park",
                    image: "https://images.unsplash.com/photo-1517173950666-ac286df9c2c6?auto=format&fit=crop&q=80&w=2070",
                    tag: "Wildlife",
                    size: "wide"
                }
            ],
            featuredToursTitle: "Featured Packages",
            featuredToursSubtitle: "Hand-picked experiences tailored to perfection.",
            testimonialsTitle: "What Our Guests Say",
            testimonialsSubtitle: "Real stories from real travelers.",
            testimonials: [
                {
                    name: "Sarah Jenkins",
                    role: "Adventure Traveler",
                    comment: "The trip of a lifetime! Silvin Lanka took care of every detail, from the moment we landed until we left. The guides were incredibly knowledgeable.",
                    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
                },
                {
                    name: "David Chen",
                    role: "Photography Enthusiast",
                    comment: "Sri Lanka is a photographer's paradise. The tour was perfectly paced, allowing me to capture stunning shots of wildlife and landscapes.",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                },
                {
                    name: "Emily & Michael",
                    role: "Honeymooners",
                    comment: "We couldn't have asked for a better honeymoon. Romantic dinners, private tours, and luxury accommodation. Highly recommended!",
                    avatar: "https://i.pravatar.cc/200?img=5"
                }
            ]
        }
    })

    // Seed Site Profile
    const siteProfile = await prisma.siteProfile.upsert({
        where: { id: 'initial-profile' },
        update: {},
        create: {
            id: 'initial-profile',
            aboutText: 'Welcome to Silvin Lanka. We offer the best tours in Sri Lanka.',
            aboutImage: '',
            toursHeroImage: '',
            toursHeroColor: '#172554',
            galleryHeroImage: '',
            galleryHeroColor: '#042f2e',
            aboutHeroImage: '',
            aboutHeroColor: '#0f172a',
            contactHeroImage: '',
            contactHeroColor: '#0f172a',
            reviewsHeroImage: '',
            reviewsHeroColor: '#f59e0b',
            email: 'info@silvinlanka.com',
            phone: '+94 77 123 4567',
            address: '123, Main Street, Colombo, Sri Lanka',
            facebookUrl: '',
            instagramUrl: '',
            siteTitle: 'Silvin Lanka - Explore Sri Lanka',
            siteDescription: 'Discover the hidden gems of Sri Lanka with our expert guides.',
            keywords: 'travel, tours, sri lanka, guide',
            navColor: '#ffffff',
        }
    })

    console.log({ siteProfile })
    console.log({ homePage })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
