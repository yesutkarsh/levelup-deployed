import { NextResponse } from 'next/server';

export async function POST(request) {
  // Check if the Content-Type is application/json
  const contentType = request.headers.get('content-type');
  if (contentType !== 'application/json') {
    return NextResponse.json(
      { error: 'Unsupported Media Type' },
      { status: 415 }
    );
  }

  try {
    // Parse the JSON body from the request
    const data = await request.json();
    const { name, email, password, phoneNumber } = data;

    // Basic validation to ensure all fields are provided
    if (!name || !email || !password || !phoneNumber) {
      return NextResponse.json(
        { error: 'All fields (name, email, password, phoneNumber) are required' },
        { status: 400 }
      );
    }

    // Prepare data to forward to the backend as URL-encoded form data
    const formBody = new URLSearchParams();
    formBody.append('name', name);
    formBody.append('email', email);
    formBody.append('password', password);
    formBody.append('phoneNumber', phoneNumber);

    // Forward the registration request to your backend endpoint
    const backendResponse = await fetch('http://localhost:3000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody.toString()
    });

    const backendData = await backendResponse.json();

    // If the backend responds with an error, return that error
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: backendData.message || 'Registration failed' },
        { status: backendResponse.status }
      );
    }

    // Since no tokens are returned on registration, simply return a success message
    return NextResponse.json({ message: 'Successfully Registered' });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json(
      { error: 'Invalid JSON or server error' },
      { status: 400 }
    );
  }
}
