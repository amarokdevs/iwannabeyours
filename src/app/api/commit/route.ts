import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, instagramId } = await request.json();

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("Discord webhook URL is not configured.");
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    const payload = {
      content: `New commitment:\nName: ${name}\nInstagram: ${instagramId}`,
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
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
