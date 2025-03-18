# VibeFusion

VibeFusion is an AI-powered movie recommendation system that suggests films based on your mood or vibe.

## Overview

VibeFusion provides personalized movie recommendations by analyzing your current emotional state or desired vibe. Whether you're feeling melancholic, energetic, romantic, or just want something to brighten your day, our AI matching algorithm will find the perfect films for your current mood.

## Tech Stack

- **Frontend**: Next.js
- **Backend API**: Hono
- **AI Integration**: Machine learning model for mood-to-movie matching

## Features

- Mood-based movie recommendations
- User profiles to track viewing preferences
- Personalized recommendation history
- Expandable vibe categories
- Cross-platform responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/vibefusion.git
   cd vibefusion
   ```

2. Install dependencies:

   ```
   # Install API dependencies
   cd api
   npm install

   # Install frontend dependencies
   cd ../app
   npm install
   ```

3. Set up environment variables:
   Create `.env` files in both `api` and `app` directories based on the provided `.env.example` files.

4. Run the development servers:

   ```
   # Start API (from api directory)
   npm run dev

   # Start frontend (from app directory)
   npm run dev
   ```

## Project Structure

```
vibefusion/
├── api/            # Hono backend API
└── app/            # Next.js frontend application
```

## License

[MIT](LICENSE)
