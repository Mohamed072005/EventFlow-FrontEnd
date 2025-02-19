# EventFlow - Modern Event Platform Frontend

## Overview
EventFlow is a Next.js-powered frontend application for the EventHub platform, providing users with a seamless interface to discover, organize, and participate in events. Built with React 19 and Material UI, it offers a responsive and intuitive user experience with real-time notifications and interactive features.

## Features

### User Experience
- Responsive design optimized for all devices
- Intuitive event browsing and discovery
- Personal dashboard showing hosted and attended events
- Real-time notifications for event updates
- Interactive calendar integration

### Technical Capabilities
- JWT authentication and secure API communication
- State management with Zustand
- Advanced date handling with Date-FN and DayJS
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
   git clone <repository-url>
   cd event-flow
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
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
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
event-flow/
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Next.js pages
├── public/             # Static assets
├── services/           # API services
├── store/              # Zustand state management
├── styles/             # Global styles
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

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

## Future Enhancements

- Implement WebSocket for real-time chat between event participants
- Add social sharing capabilities
- Integrate with mapping services for location-based event discovery
- Implement advanced filtering and search functionality
- Add PWA capabilities for offline access

## Deployment

The application is optimized for deployment on Vercel, but can be deployed to any hosting platform that supports Next.js applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
