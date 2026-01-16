-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteProfile` (
    `id` VARCHAR(191) NOT NULL,
    `aboutText` TEXT NOT NULL,
    `aboutImage` VARCHAR(191) NULL,
    `toursHeroImage` VARCHAR(191) NULL,
    `toursHeroColor` VARCHAR(191) NULL DEFAULT '#172554',
    `galleryHeroImage` VARCHAR(191) NULL,
    `galleryHeroColor` VARCHAR(191) NULL DEFAULT '#042f2e',
    `aboutHeroImage` VARCHAR(191) NULL,
    `aboutHeroColor` VARCHAR(191) NULL DEFAULT '#0f172a',
    `contactHeroImage` VARCHAR(191) NULL,
    `contactHeroColor` VARCHAR(191) NULL DEFAULT '#0f172a',
    `reviewsHeroImage` VARCHAR(191) NULL,
    `reviewsHeroColor` VARCHAR(191) NULL DEFAULT '#f59e0b',
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `whatsappNumber` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `facebookUrl` VARCHAR(191) NULL,
    `instagramUrl` VARCHAR(191) NULL,
    `siteTitle` VARCHAR(191) NULL DEFAULT 'Silvin Lanka - Explore Sri Lanka',
    `siteDescription` TEXT NULL,
    `keywords` TEXT NULL,
    `navColor` VARCHAR(191) NULL DEFAULT '#ffffff',
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visit` (
    `id` VARCHAR(191) NOT NULL,
    `page` VARCHAR(191) NOT NULL,
    `ipHash` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tour` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `images` JSON NULL,
    `locations` JSON NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Destination` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `images` JSON NULL,
    `locations` JSON NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` TEXT NOT NULL,
    `facebookUrl` VARCHAR(191) NULL,
    `instagramUrl` VARCHAR(191) NULL,
    `tiktokUrl` VARCHAR(191) NULL,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HomePage` (
    `id` VARCHAR(191) NOT NULL,
    `heroTitle` VARCHAR(191) NOT NULL DEFAULT 'Travel Beyond The Ordinary',
    `heroSubtitle` VARCHAR(191) NOT NULL DEFAULT 'Welcome to Sri Lanka',
    `heroDescription` TEXT NOT NULL,
    `heroImage` VARCHAR(191) NOT NULL DEFAULT '/images/hero.png',
    `whyChooseUsTitle` VARCHAR(191) NOT NULL DEFAULT 'Why Choose Silvin Lanka?',
    `whyChooseUsFeatures` JSON NULL,
    `newsletterTitle` VARCHAR(191) NOT NULL DEFAULT 'Ready to start your adventure?',
    `newsletterDescription` TEXT NOT NULL,
    `destinationsTitle` VARCHAR(191) NOT NULL DEFAULT 'Popular Destinations',
    `destinationsSubtitle` VARCHAR(191) NOT NULL DEFAULT 'Explore our most visited locations, curated just for you.',
    `popularDestinations` JSON NULL,
    `featuredToursTitle` VARCHAR(191) NOT NULL DEFAULT 'Featured Packages',
    `featuredToursSubtitle` VARCHAR(191) NOT NULL DEFAULT 'Hand-picked experiences tailored to perfection.',
    `testimonialsTitle` VARCHAR(191) NOT NULL DEFAULT 'What Our Guests Say',
    `testimonialsSubtitle` VARCHAR(191) NOT NULL DEFAULT 'Real stories from real travelers.',
    `testimonials` JSON NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactSubmission` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('NEW', 'READ', 'ARCHIVED') NOT NULL DEFAULT 'NEW',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
