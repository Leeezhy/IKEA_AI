import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { projectInfo, targetGroup } = await request.json();

    const prompt = `Create a detailed persona based on the following project and target group information:

Project Information:
- Name: ${projectInfo.name}
- Description: ${projectInfo.description}
- Goals: ${projectInfo.goals.join(', ')}

Target Group Information:
- Demographics: Age ${targetGroup.demographics.age}, Gender ${targetGroup.demographics.gender}, Location ${targetGroup.demographics.location}
- Characteristics: ${targetGroup.characteristics.join(', ')}
- Needs: ${targetGroup.needs.join(', ')}

Please create a detailed persona that includes:
1. Name and basic background
2. Key characteristics and personality traits
3. Goals and motivations
4. Pain points and challenges
5. Preferences and behaviors
6. How they might interact with the project`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    });

    return NextResponse.json({ persona: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error generating persona:', error);
    return NextResponse.json(
      { error: 'Failed to generate persona' },
      { status: 500 }
    );
  }
} 