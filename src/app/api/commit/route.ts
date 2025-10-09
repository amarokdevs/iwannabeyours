import { NextResponse } from 'next/server';
import { z } from 'zod';

const commitSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be 50 characters or less." }),
  instagramId: z.string().min(1, { message: "Instagram ID is required." }).max(50, { message: "Instagram ID must be 50 characters or less." }),
});


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = commitSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
    }
    
    const { name, instagramId } = validation.data;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("Discord webhook URL is not configured.");
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    const payload = {
      content: `💖 New Commitment 💖\nName: ${name}\nInstagram: ${instagramId}`,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to send data to Discord:', response.status, errorText);
        return NextResponse.json({ message: 'Failed to send data to Discord.' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Commitment sealed successfully!' });
  } catch (error) {
    console.error('Error processing request:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
