import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Extract cookies from the request header
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map(cookie => {
        const [name, ...rest] = cookie.split('=');
        return [name, rest.join('=')];
      })
    );

    if (!cookies.userDetails) {
      return NextResponse.json(
        { error: 'User details not found in cookies' },
        { status: 401 }
      );
    }

    // Decode and parse the userDetails cookie
    const userDetails = JSON.parse(decodeURIComponent(cookies.userDetails));
    const userId = userDetails.id;

    // Construct the external API URL using the user id
    const apiUrl = `http://5c93-2402-a00-166-1023-4d6d-24c2-49dc-fe9.ngrok-free.app/api/v1/mentor/get-upcoming-sessions/${userId}`;

    // Fetch data from the external API
    const res = await fetch(apiUrl);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
