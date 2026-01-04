# Silvin Lanka 🇱🇰
> *Travel Beyond The Ordinary - Explore Sri Lanka with Us*

Welcome to the Silvin Lanka Wiki!
Silvin Lanka is a robust web application built to serve as a comprehensive guide for tourism in Sri Lanka. It bridges the gap between travelers and the rich experiences Sri Lanka has to offer through a unified digital platform.

🌟 Vision
To create a "Travel Beyond The Ordinary" experience where users can seamlessly explore destinations, book tours, and read authentic reviews, while administrators have full control over the platform's content.

**Silvin Lanka** is a modern, full-stack tourism platform designed to showcase the beauty of Sri Lanka. It features a high-performance public website for tourists to browse tours and destinations, and a comprehensive admin dashboard for easier content management.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Key Features

### Public Portal
- **Dynamic Content**: Home page, tours, and destinations are fully dynamic and managed via the dashboard.
- **Tour Packages**: Browse detailed tour packages with itineraries, pricing, and locations.
- **Interactive Maps**: Integrated maps (Leaflet) to show tour locations and destinations.
- **Tours Gallery**: Visual galleries for destinations.
- **Reviews**: User-submitted reviews with approval workflow.
- **Responsive Design**: Mobile-first architecture using Tailwind CSS.

### Admin Dashboard
- **Content Management**: Update Home page sections (Hero, Why Choose Us, Testimonials).
- **Tour Management**: Create, edit, and delete tour packages.
- **Site Profile**: Manage global site settings like contact info, social links, and SEO metadata.
- **Analytics**: Basic visit tracking.
- **Secure Access**: Protected routes with credentials-based authentication.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Database**: MySQL 8.0
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Containerization**: Docker & Docker Compose
- **Maps**: Leaflet / React-Leaflet

## 🐳 Getting Started (Docker)

The easiest way to run the application is using Docker.

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShanukaDilan/Silvin-Lanka.git
   cd Silvin-Lanka
   ```

2. **Setup Environment Variables**
   Create a `.env` file in the root directory (or use the existing one):
   ```bash
   DATABASE_URL=mysql://root:password@db:3306/silvin_lanka
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the App**
   - Public Site: [http://localhost:3000](http://localhost:3000)
   - Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 💻 Local Development

If you prefer running without Docker:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   Ensure you have a local MySQL instance running and update `DATABASE_URL` in `.env`.
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

3. **Run Dev Server**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/app/(public)`: Public-facing pages (Home, Tours, About, Contact).
- `src/app/(admin)`: Protected admin dashboard pages.
- `src/components`: Reusable UI components.
- `src/lib`: Utilities, database clients, and validation schemas.
- `prisma`: Database schema and seed data.
