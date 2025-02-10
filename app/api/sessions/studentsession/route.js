// app/api/sessions/student/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // Synchronously get cookies (no await needed)
  const cookieStore = cookies();
  const userDetailsCookie = cookieStore.get('userDetails');

  if (!userDetailsCookie) {
    return NextResponse.json(
      { error: 'Unauthorized: missing cookie' },
      { status: 401 }
    );
  }

  try {
    // Decode and parse cookie
    const decodedCookie = decodeURIComponent(userDetailsCookie.value);
    const userDetails = JSON.parse(decodedCookie);
    const { id } = userDetails;

    if (!id) {
      return NextResponse.json(
        { error: 'User ID not found in cookie' },
        { status: 400 }
      );
    }

    // Construct external API URL
    const externalApiUrl = `${process.env.BASEURL}/api/v1/student/get-upcoming-sessions/${id}`;

    // Add necessary headers for ngrok
    const response = await fetch(externalApiUrl, {
      headers: {
        'ngrok-skip-browser-warning': 'true' // Required for ngrok free tier
      }
    });

    if (!response.ok) {
      console.error('External API failed:', response.status, await response.text());
      return NextResponse.json(
        { error: 'External API request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Internal error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}