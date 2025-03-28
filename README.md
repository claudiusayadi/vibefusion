# VibeFusion

VibeFusion is an AI-powered movie recommendation system that suggests films based on your mood or vibe.

## Overview

VibeFusion provides personalized movie recommendations by analyzing your current emotional state or desired vibe. Whether you're feeling melancholic, energetic, romantic, or just want something to brighten your day, our AI matching algorithm will find the perfect films for your current mood.

## Tech Stack

- **Frontend**: Next.js, TailwindCSS, Shadcn UI
- **Backend**: Hono, Drizzle-ORM, Zod, PostgreSQL
- **AI Integration**: Gemini 2.0 Flash

## Features

- Mood-based movie recommendations
- User profiles to track viewing preferences
- Personalized recommendation history
- Cross-platform responsive design

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/claudiusayadi/vibefusion.git
   cd vibefusion
   ```

2. Install dependencies:

   ```bash
   # Install API dependencies
   cd api
   bun install

   # Install app dependencies
   cd ../app
   bun install
   ```

3. Set up environment variables:
   Create `.env` file in the root dir based on the provided `.env.example` files.

4. Run the development servers:

   ```bash
   # From the root dir
   docker compose -f compose.dev.yml up
   ```

## Project Structure

```yml
vibefusion/
├── .github/workflows/       # CI/CD workflow
├── api/                                  # Hono backend API
├── app/                                # Next.js frontend application
├── .env.example                # Environment variables
├── .gitignore                      # Git ignore
├── compose.dev.yml        # Docker compose for development
├── compose.yml               # Docker compose for deployment
└── README.md                # README file
```

## License

[MIT](LICENSE)
