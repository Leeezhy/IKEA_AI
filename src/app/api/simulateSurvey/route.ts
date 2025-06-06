import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { persona, questions } = await request.json();

    const prompt = `Based on the following persona, please answer these survey questions:

Persona:
${persona}

Questions:
${questions
  .map(
    (q: any) => `
Question: ${q.question}
Type: ${q.type}
${q.options ? `Options: ${q.options.join(', ')}` : ''}`
  )
  .join('\n')}

Please provide answers that are consistent with the persona's characteristics, preferences, and behaviors.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    });

    return NextResponse.json({ answers: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error simulating survey:', error);
    return NextResponse.json(
      { error: 'Failed to simulate survey' },
      { status: 500 }
    );
  }
} 