import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Extract and parse cookies
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map((cookie) => {
        const [name, ...rest] = cookie.split('=');
        return [name, rest.join('=')];
      })
    );

    if (!cookies.userDetails) {
      return NextResponse.json({ error: 'User details not found in cookies' }, { status: 401 });
    }

    const userDetails = JSON.parse(decodeURIComponent(cookies.userDetails));
    const mentorId = userDetails.id;

    // Parse incoming JSON body
    const body = await request.json();
    const { sessionId, sessionStatus, sessionJoinLink } = body;
    if (!sessionId || !sessionStatus || !sessionJoinLink) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Construct external API URL using mentorId from the cookie
    const apiUrl = `https://5c93-2402-a00-166-1023-4d6d-24c2-49dc-fe9.ngrok-free.app/api/v1/mentor/session-approve/${mentorId}`;

    // Forward the payload to the external API
    const externalRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, sessionStatus, sessionJoinLink }),
    });

    // Check response content type for debugging
    const contentType = externalRes.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await externalRes.text();
      console.error('External API did not return JSON:', text);
      return NextResponse.json({ error: 'External API error', details: text }, { status: externalRes.status });
    }

    const data = await externalRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in session-approve API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
