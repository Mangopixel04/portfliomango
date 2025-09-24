# Portfolio Website

## Overview

This is an advanced, interactive portfolio website built as a full-stack application showcasing modern web development techniques. The project features a React-based frontend with sophisticated UI components, 3D animations, real-time analytics, and an Express.js backend with PostgreSQL database integration. The portfolio demonstrates cutting-edge web technologies including WebGL graphics, AI integrations, voice navigation, and advanced interaction patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool providing fast development and optimized production builds
- **Wouter** for lightweight client-side routing instead of React Router

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- **CSS Variables** for dynamic theming with support for multiple color schemes
- **Class Variance Authority** for component variant management

**Advanced Interactions**
- **Three.js integration** (infrastructure prepared) for 3D graphics and WebGL rendering
- **Custom magnetic hover effects** using React hooks for interactive UI elements
- **Particle background systems** with canvas-based animations
- **Voice navigation** using Web Speech API for accessibility
- **Custom cursor** with smooth tracking and interaction feedback
- **Typewriter animations** for dynamic text display

**State Management**
- **TanStack Query** for server state management, caching, and synchronization
- **React hooks** for local component state and custom behavior encapsulation

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for REST API development
- **Custom middleware** for request logging, error handling, and JSON parsing
- **Development middleware** integration with Vite for seamless full-stack development

**Database Layer**
- **Drizzle ORM** for type-safe database operations and schema management
- **PostgreSQL** as the primary database with Neon serverless hosting
- **Zod validation** for runtime type checking and API request validation

**API Design**
- **RESTful endpoints** for contact messages, analytics, skills, and projects
- **Modular storage interface** abstracting database operations
- **Comprehensive error handling** with structured JSON responses

### Data Models

**Core Entities**
- **Users**: Authentication and profile management
- **Contact Messages**: Form submissions with status tracking and project categorization
- **Analytics Events**: User interaction tracking with session management
- **Skills**: Technical capabilities with proficiency ratings and categorization
- **Projects**: Portfolio items with metadata, images, and external links

**Schema Design**
- **UUID primary keys** for all entities ensuring uniqueness and security
- **Timestamp tracking** for audit trails and temporal data analysis
- **Flexible JSON fields** for extensible metadata storage
- **Enum-style text fields** for status and categorization management

### Development Infrastructure

**Configuration Management**
- **TypeScript configuration** with path aliases for clean imports
- **ESM modules** throughout the stack for modern JavaScript practices
- **Environment-based configuration** for database connections and API keys

**Development Tools**
- **Replit integration** with specialized plugins for development banner and error handling
- **Hot module replacement** for rapid development feedback
- **Custom logging** with structured output for API monitoring

**Build & Deployment**
- **Separate client/server builds** with shared type definitions
- **Static asset serving** with production-optimized bundling
- **Database migration system** using Drizzle Kit for schema evolution

## External Dependencies

### Database & Hosting
- **Neon Database** - Serverless PostgreSQL hosting with automatic scaling
- **Drizzle ORM** - Type-safe database operations and migrations

### UI & Styling
- **Radix UI** - Comprehensive primitive components for accessibility
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Lucide React** - Consistent icon library for user interface elements

### Analytics & Tracking
- **Google Analytics** - User behavior tracking and site performance metrics
- **Custom analytics system** - Real-time interaction tracking and session management

### Development & Build
- **Vite** - Fast build tool with HMR and optimized production builds
- **TanStack Query** - Server state management and caching layer
- **React Hook Form** - Form handling with validation and error management

### Advanced Features
- **Web Speech API** - Voice navigation and accessibility features
- **Canvas API** - Custom particle systems and interactive backgrounds
- **Intersection Observer** - Scroll-based animations and lazy loading
- **Web Audio API** (infrastructure prepared) - Sound effects and audio feedback

### Validation & Security
- **Zod** - Runtime type validation for API requests and responses
- **CORS handling** - Cross-origin request management for API security
- **Input sanitization** - Protection against XSS and injection attacks