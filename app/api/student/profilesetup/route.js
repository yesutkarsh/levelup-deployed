import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields in request body
    if (!body.studentCode || !body.currentCourses || !body.skills) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Get userId from cookie
    const userDetailsCookie = request.cookies.get('userDetails')?.value;
    let userId;

    if (!userDetailsCookie) {
      return NextResponse.json({ 
        error: 'User not authenticated' 
      }, { status: 401 });
    }

    try {
      // Remove the "userDetails:" prefix if present
      const jsonPart = userDetailsCookie.replace('userDetails:', '');
      const decoded = decodeURIComponent(jsonPart);
      const userDetails = JSON.parse(decoded);
      userId = userDetails.id;
    } catch (parseError) {
      console.error('Cookie parsing error:', parseError);
      return NextResponse.json({ 
        error: 'Invalid user session' 
      }, { status: 401 });
    }

    // Build the payload exactly like the Postman example
    const payload = {
      userId,
      studentCode: body.studentCode,
      currentCourses: body.currentCourses,
      skills: body.skills,
    };

    // Make the request to the exact ngrok URL
    const externalRes = await fetch("http://5c93-2402-a00-166-1023-4d6d-24c2-49dc-fe9.ngrok-free.app/api/v1/student/profile-setup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      redirect: 'follow'  // Adding this to match Postman config
    });

    // Parse response as text first (matching Postman)
    const responseText = await externalRes.text();
    
    try {
      // Try to parse as JSON if possible
      const data = JSON.parse(responseText);
      return NextResponse.json(data, { status: externalRes.status });
    } catch (e) {
      // If not JSON, return text response
      console.log(e)
      return NextResponse.json({ 
        message: responseText 
      }, { status: externalRes.status });
    }

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}