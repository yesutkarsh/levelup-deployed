import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    // Log received cookies for verification
    const cookieHeader = request.headers.get('cookie') || '';
    console.log('Received cookies:', cookieHeader);

    // Parse cookies
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map(cookie => {
        const [name, ...rest] = cookie.split('=');
        return [name, rest.join('=')];
      })
    );

    if (!cookies.userDetails) {
      console.error('No userDetails cookie found');
      return NextResponse.json(
        { error: 'User details not found in cookies' }, 
        { status: 401 }
      );
    }

    // Log parsed user details
    const userDetails = JSON.parse(decodeURIComponent(cookies.userDetails));
    console.log('Parsed user details:', userDetails);
    
    const mentorId = userDetails.id;
    console.log('Extracted mentor ID:', mentorId);

    // Parse request body
    const body = await request.json();
    console.log('Request body:', body);

    // Validate body
    const { sessionId, sessionStatus, sessionJoinLink } = body;
    if (!sessionId || !sessionStatus || !sessionJoinLink) {
      console.error('Missing fields in body:', body);
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Verify BASE_URL environment variable
    if (!process.env.BASEURL) {
      console.error('BASEURL environment variable is missing');
      return NextResponse.json(
        { error: 'Server configuration error' }, 
        { status: 500 }
      );
    }

    // Construct and verify the external API URL
    const apiUrl = `${process.env.BASEURL}/api/v1/mentor/session-approve/${mentorId}`;
    console.log('Constructed API URL:', apiUrl);

    // Make external request
    const externalRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, sessionStatus, sessionJoinLink }),
    });

    // Log external API response details
    console.log('External API response status:', externalRes.status);
    console.log('External API response headers:', [...externalRes.headers.entries()]);

    // Handle non-JSON responses
    const contentType = externalRes.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await externalRes.text();
      console.error('External API returned non-JSON response:', text);
      return NextResponse.json(
        { 
          error: 'External API format error',
          details: `Received ${externalRes.status} response`,
          responsePreview: text.slice(0, 100) 
        },
        { status: 502 }
      );
    }

    const data = await externalRes.json();
    console.log('External API response data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Full error stack:', error.stack);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }, 
      { status: 500 }
    );
  }
}