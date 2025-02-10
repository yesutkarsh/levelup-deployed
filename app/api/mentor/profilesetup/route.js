import { NextResponse } from 'next/server';

export async function POST(request) {
  // Validate the Content-Type header
  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return NextResponse.json(
      { error: 'Unsupported Media Type' },
      { status: 415 }
    );
  }

  try {
    // Parse the JSON body from the request
    const data = await request.json();
    const { currentCourses, userId, skills } = data;

    if (!currentCourses || !userId || !skills) {
      return NextResponse.json(
        { error: 'currentCourses, skills and userId are required' },
        { status: 400 }
      );
    }

    // Forward the login request to your Node backend
    const backendResponse = await fetch(process.env.BASEURL+'/api/v1/mentor/profile-setup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentCourses, userId, skills  })
      }
    );

    // Attempt to parse the backend JSON response
    let backendData;
    try {
      backendData = await backendResponse.json();
    } catch (err) {
      const text = await backendResponse.text();
      console.error('Error parsing backend JSON:', text, err);
      return NextResponse.json(
        { error: 'Invalid JSON response from backend', details: text },
        { status: 500 }
      );
    }

    // Relay any error from the backend
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: backendData.message || 'Profile Setup Failed' },
        { status: backendResponse.status }
      );
    }

    // Create the response object
    const response = NextResponse.json({
      message: backendData.message || 'Profile Setup Done',
    });

  


    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}