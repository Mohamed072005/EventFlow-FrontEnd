# EventFlow - Modern Event Platform Frontend

## Overview
EventFlow is a Next.js-powered frontend application for the EventFlow platform, providing users with a seamless interface to discover, organize, and participate in events. Built with React 19 and Material UI, it offers a responsive and intuitive user experience with real-time notifications and interactive features.

## Features

### User Experience
- Responsive design optimized for all devices
- Intuitive event browsing and discovery
- Interactive calendar integration

### Technical Capabilities
- JWT authentication and secure API communication
- State management with Zustand
- Material UI components for consistent design language
- TypeScript for type safety and better development experience

## Tech Stack

- **Framework**: Next.js 15.1.7
- **UI Library**: React 19.0.0
- **Component Library**: Material UI 6.4.4
- **State Management**: Zustand 5.0.3
- **HTTP Client**: Axios 1.7.9
- **Date Utilities**: date-fns 4.1.0 & dayjs 1.11.13
- **Authentication**: jwt-decode 4.0.0
- **Styling**: Tailwind CSS 3.4.1
- **Language**: TypeScript 5

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Backend API endpoint configured

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Mohamed072005/EventFlow-FrontEnd.git
   cd EventFlow-FrontEnd
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Application Structure

```
EventFlow-FrontEnd/
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── config/             # Configuration files and constants
├── public/             # Static assets
├── lib/                # API services and utility functions
├── store/              # Zustand state management
├── app/                # Next.js App Router pages and layouts
├── types/              # TypeScript type definitions
└── context/            # React Context providers
```

## How to Use the Application

EventFlow features a role-based permission system with three main user types:

### Regular Users
- **Sign Up/Login**: Create an account or log in to access the platform
- **Browse Events**: Discover and search for events by category, date, or location
- **Create Events**: Submit new events for review by administrators
- **Event Participation**: Register for events, save favorites, and manage event calendar
- **Profile Management**: Update personal details and preferences

### Organizers
Regular users become organizers once an administrator approves their submitted event.

- **Dashboard Access**: Gain access to a dedicated organizer dashboard
- **Event Statistics**: View metrics for published events (attendance, registrations, engagement)
- **Manage Events**: Edit event details, respond to attendee questions, and update event status
- **Pending Events**: Track status of submitted events awaiting approval
- **Attendee Management**: View and manage event registrations and check-ins

### Administrators
- **Platform Overview**: Access comprehensive dashboard with platform-wide statistics
- **Event Moderation**: Review and approve/reject submitted events
- **User Management**: Manage user accounts and role assignments
- **Content Management**: Control featured events and promotional content
- **Analytics**: View platform-wide metrics including user growth, event popularity, and engagement

### Workflow Example
1. A new user signs up and creates an event
2. The event is submitted for review and appears in "Pending" status
3. An administrator reviews and approves the event
4. The user automatically receives organizer privileges
5. The event becomes visible to all users on the platform
6. The organizer can now access the dashboard to track event performance

## Development Status and Incomplete Features

**Note:** This application is still under active development. The following features are not yet fully implemented:

### User Features
- **Event Registration**: The functionality for users to register for events is currently under development

### Organizer Features
- **Event Management**: The ability for organizers to update and delete events is not yet implemented
- **Comprehensive Event Analytics**: Detailed metrics for organizers are partially implemented

### Admin Features
- **User Management**: The admin dashboard's user management section is still in development
- **Advanced Reporting**: Some administrative reporting features are not yet complete

These features are planned for upcoming releases. Developers working on the project should refer to the issues section of the repository for current development priorities.

## Key Features Implementation

### Authentication Flow
The application uses JWT for secure authentication with token storage in localStorage and automatic token refresh capabilities.

### Real-time Notifications
Notifications appear instantly using a custom notification system built with Zustand and Material UI components.

### Event Management
Users can create, edit, and manage events with an intuitive interface built using Material UI form components and date pickers.

### Responsive Design
The application is fully responsive with adaptive layouts using a combination of Material UI's Grid system and Tailwind CSS.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint