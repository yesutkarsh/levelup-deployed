// app/api/sessions/student/route.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // Await cookies() to retrieve the cookie store
  const cookieStore = await cookies();
  const userDetailsCookie = cookieStore.get('userDetails');

  if (!userDetailsCookie) {
    return NextResponse.json(
      { error: 'Unauthorized: missing cookie' },
      { status: 401 }
    );
  }

  try {
    // Decode the URL‑encoded cookie value and parse the JSON
    const decodedCookie = decodeURIComponent(userDetailsCookie.value);
    const userDetails = JSON.parse(decodedCookie);
    const { id } = userDetails;

    if (!id) {
      return NextResponse.json(
        { error: 'User ID not found in cookie' },
        { status: 400 }
      );
    }

    // Build the external API URL by replacing {id} with the actual user id
    const externalApiUrl = `https://5c93-2402-a00-166-1023-4d6d-24c2-49dc-fe9.ngrok-free.app/api/v1/student/get-upcoming-sessions/67a92c8c038859d154a38b38`;

    // Fetch data from the external API
    const externalResponse = await fetch(externalApiUrl);
    if (!externalResponse.ok) {
        console.log("this is id", id)
      return NextResponse.json(
        { error: 'Failed to fetch external API data' },
        { status: externalResponse.status }
      );
    }

    // Parse the external API response
    const data = await externalResponse.json();
    console.log(data)
    // Return the external API data directly
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
