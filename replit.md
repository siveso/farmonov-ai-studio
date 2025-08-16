# Akram Farmonov Portfolio

## Overview

This is a full-stack web portfolio application for Akram Farmonov, a web developer specializing in business automation, Telegram bots, and AI chatbots for the Uzbek market. The application serves as both a professional portfolio and a comprehensive service showcase, featuring multiple pages including services, portfolio, blog, case studies, and contact forms. The site is built with modern technologies and optimized for the Uzbek audience with Uzbek language content throughout.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight, hook-based routing
- **Styling**: Tailwind CSS with custom design system and CSS variables for consistent theming
- **UI Components**: Radix UI primitives with shadcn/ui component library for accessible, customizable components
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server Framework**: Express.js with TypeScript for the REST API
- **Development Setup**: Custom Vite integration for SSR-like development experience
- **Data Layer**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Storage Interface**: Abstract storage pattern with in-memory implementation for development and database implementation for production
- **Middleware**: Custom logging, error handling, and request/response transformation

### Database Design
- **ORM**: Drizzle ORM for type-safe database queries and schema management
- **Schema**: User management schema with validation using Zod
- **Database**: PostgreSQL with Neon Database as the cloud provider
- **Migrations**: Drizzle Kit for database schema versioning and migrations

### Styling and Design System
- **Design Philosophy**: Modern, professional design with gradients and elegant shadows
- **Color System**: HSL-based color palette with primary (blue), secondary (purple), and accent (yellow) colors
- **Typography**: Custom font system with consistent spacing and hierarchy
- **Components**: Comprehensive UI component library with variants for different use cases
- **Responsive Design**: Mobile-first approach with breakpoint-based responsive design

### Content Management
- **Internationalization**: Uzbek language content throughout the application
- **Content Structure**: Static content with structured data for services, portfolio, blog posts, and case studies
- **SEO Optimization**: React Helmet for meta tags, structured data, and Open Graph integration
- **Performance**: Optimized images, lazy loading, and efficient bundle splitting

### Development Workflow
- **TypeScript**: Strict type checking across frontend and backend
- **Path Aliases**: Clean import paths using TypeScript path mapping
- **Development Server**: Hot reload with Vite and custom Express integration
- **Build Process**: Separate client and server builds with production optimizations

### Database Migration Status (Aug 16, 2025)
- **Schema Design**: Complete PostgreSQL schema with 7 tables (users, posts, projects, services, leads, analytics, blog_scheduler)
- **Storage Layer**: Dual implementation - MemStorage (current) and DatabaseStorage (production-ready)
- **Migration Files**: Generated with Drizzle Kit - migrations/0000_grey_inertia.sql
- **Connection Setup**: Neon PostgreSQL provider with fallback mechanism
- **Current State**: Using memory storage, ready to switch to PostgreSQL when DATABASE_URL is provided
- **Admin Authentication**: Updated password to secure production password
- **Next Steps**: Database provisioning and data migration to persistent storage

### Production Deployment Readiness (Aug 16, 2025)
- **Admin Security**: Admin password updated to production-level security
- **Deployment Guide**: Complete Render.com deployment instructions added to README.md
- **Environment Variables**: All necessary env vars documented for production deployment
- **API Keys**: Google Gemini AI and Telegram Bot APIs configured and documented
- **Contact Information**: Updated throughout application with correct contact details
- **Blog Editing**: Fixed admin interface blog post editing functionality
- **Google Site Verification**: Added meta tag for Google Search Console verification
- **Migration Complete**: Successfully migrated from Replit Agent to standard Replit environment
- **Production Ready**: Application ready for Render.com deployment

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Helmet Async for meta management
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching

### UI and Styling
- **Component Library**: Extensive Radix UI primitives collection for accessible components
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Animations**: Class Variance Authority for component variants

### Backend and Database
- **Web Framework**: Express.js for server-side API
- **Database**: Neon Database (PostgreSQL) as cloud database provider
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for runtime type validation and schema definition
- **Session Management**: Connect-pg-simple for PostgreSQL-based sessions

### Development Tools
- **Build Tools**: Vite for frontend build, esbuild for backend bundling
- **Development**: TSX for TypeScript execution, custom Vite plugins
- **Utilities**: Date-fns for date manipulation, clsx and tailwind-merge for className utilities
- **Replit Integration**: Specialized plugins for Replit development environment

### AI and Automation
- **AI Integration**: Google GenAI for AI-powered features and chatbot capabilities
- **Form Handling**: React Hook Form with Hookform Resolvers for form validation

### Performance and Analytics
- **Bundle Analysis**: Custom Vite configuration for optimized builds
- **Error Handling**: Runtime error overlays for development
- **Logging**: Custom logging middleware for API monitoring