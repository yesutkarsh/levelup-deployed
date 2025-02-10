// app/api/book-session/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the JSON payload from the incoming request
    const bookingData = await request.json();

    // (Optional) Validate bookingData here if needed

    // Forward the bookingData to the external booking endpoint
    const externalResponse = await fetch(process.env.BASEURL+'/api/v1/student/book-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      }
    );

    const externalData = await externalResponse.json();

    // Return the external API response with the appropriate status code using NextResponse
    return NextResponse.json(externalData, { status: externalResponse.status });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
