import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

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
    const backendResponse = await fetch(process.env.BASEURL+'/api/v1/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
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
        { error: backendData.message || 'Login failed' },
        { status: backendResponse.status }
      );
    }

    // Get user details from the response
    const userDetails = backendData.data || backendData;
    console.log(userDetails)
    // Create the response object
    const response = NextResponse.json({
      message: backendData.message || 'Login successful',
      user: userDetails
    });

    // Collect and set the secure cookies (tokens) from the backend response
    let secureTokenCookies = [];
    backendResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'set-cookie') {
        secureTokenCookies.push(value);
      }
    });

    // Add the secure token cookies to the response
    secureTokenCookies.forEach(cookieStr => {
      response.headers.append('Set-Cookie', cookieStr);
    });

    // Set user details in an unencrypted cookie
    // Remove sensitive information before storing
    const userForCookie = {
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      role: userDetails.role,
      "status":userDetails.status
      // Add any other non-sensitive fields you want to store
    };

    const userDetailsCookie = serialize('userDetails', JSON.stringify(userForCookie), {
      path: '/',
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    response.headers.append('Set-Cookie', userDetailsCookie);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}