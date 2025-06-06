# IKEA AI Persona Evaluator

A Next.js application that helps IKEA teams generate AI personas and evaluate them through simulated surveys.

## Features

- Generate AI personas based on project and target group information
- Create custom surveys with different question types
- Simulate persona responses to survey questions
- Simple linear flow from project setup to results

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI GPT-4 API

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app/project` - Project and target group information input
- `/src/app/persona` - AI persona generation and review
- `/src/app/survey` - Survey question creation
- `/src/app/results` - Survey results display
- `/src/app/api` - API routes for persona generation and survey simulation

## Usage

1. Enter project and target group information
2. Review and regenerate the AI persona if needed
3. Create survey questions
4. View simulated persona responses to the survey

## License

MIT 