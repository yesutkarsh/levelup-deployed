// app/api/slots/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  // Parse the query parameter from the URL
  const { searchParams } = new URL(request.url);
  const selectedCourse = searchParams.get('course');

  if (!selectedCourse) {
    return NextResponse.json(
      { success: false, error: 'Missing "course" parameter.' },
      { status: 400 }
    );
  }

  try {
    // Call the external API with the selected course
    const externalResponse = await fetch(
      process.env.BASEURL+`/api/v1/student/get-slots-by-course/${selectedCourse}`
    );


    // If the external API returns an error status, forward it
    if (!externalResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Error from external API' },
        { status: externalResponse.status }
      );
    }

    const data = await externalResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from external API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data from external API' },
      { status: 500 }
    );
  }
}
