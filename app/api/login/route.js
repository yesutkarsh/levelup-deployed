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
    const { email, password } = data;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Forward the login request to your Node backend
    const backendResponse = await fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    // Attempt to parse the backend JSON response
    let backendData;
    try {
      backendData = await backendResponse.json();
    } catch (err) {
      const text = await backendResponse.text();
      console.log(err)
      console.error('Error parsing backend JSON:', text);
      return NextResponse.json(
        { error: 'Invalid JSON response from backend', details: text },
        { status: 500 }
      );
    }

    // Relay any error from the backend
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: backendData.message || 'Login failed' },
        { status: backendResponse.status }
      );
    }

    // Collect the 'set-cookie' headers from the backend response.
    // Since headers.raw() is unavailable, iterate over the headers.
    let cookies = [];
    backendResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'set-cookie') {
        cookies.push(value);
      }
    });

    // Build the response JSON
    const response = NextResponse.json({
      message: backendData.message || 'Login successful',
      user: backendData.data || backendData
    });

    // Append the cookies received from the backend to the response
    cookies.forEach(cookieStr => {
      response.headers.append('Set-Cookie', cookieStr);
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
