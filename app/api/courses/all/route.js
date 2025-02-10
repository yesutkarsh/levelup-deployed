// app/api/courses/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch data from the external API (using https)
    const response = await fetch(
      process.env.BASEURL+'/api/v1/course/get-all-courses'
    );
    
    // Parse the JSON response
    const data = await response.json();

    // Return the data in JSON format using NextResponse
    return NextResponse.json(data);
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
