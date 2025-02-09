import { NextResponse } from 'next/server';

// This function handles POST requests to approve a user's status.
export async function POST(request) {
  // Step 1: Validate the Content-Type header to ensure the client sends JSON data.
  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    // If the content type is not JSON, respond with a 415 (Unsupported Media Type) status.
    return NextResponse.json(
      { error: 'Unsupported Media Type' },
      { status: 415 }
    );
  }

  try {
    // Step 2: Parse the JSON body from the request.
    const data = await request.json();

    // Destructure the required properties from the parsed data.
    const { userId, status, role } = data;

    // Step 3: Validate that all required fields are present.
    // NOTE: We check for !role instead of role to ensure role is provided.
    if (!userId || !status || !role) {
      // If any field is missing, return a 400 (Bad Request) response.
      return NextResponse.json(
        { error: 'userId, status, and role are required!' },
        { status: 400 }
      );
    }

    // Step 4: Forward the approval request to the backend API.
    // We're sending a POST request with the JSON payload containing userId, status, and role.
    const backendResponse = await fetch(
      `${process.env.BASEURL}/api/v1/admin/user-approval`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, status, role })
      }
    );

    // Step 5: Attempt to parse the JSON response from the backend.
    let backendData;
    try {
      backendData = await backendResponse.json();
    } catch (err) {
      // If JSON parsing fails, retrieve the raw text response for debugging.
      const text = await backendResponse.text();
      console.error('Error parsing backend JSON:', text, err);
      // Return a 500 (Internal Server Error) response with error details.
      return NextResponse.json(
        { error: 'Invalid JSON response from backend', details: text },
        { status: 500 }
      );
    }

    // Step 6: If the backend response is not OK (i.e., not in the 200 range),
    // forward the error message and status code from the backend.
    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: backendData.message || 'User approval failed' },
        { status: backendResponse.status }
      );
    }

    // Step 7: If everything is successful, send a response back with a success message.
    return NextResponse.json({
      message: backendData.message || 'User approved successfully'
    });
  } catch (error) {
    // Step 8: Catch any unexpected errors during the process and log them.
    console.error('User approval error:', error);
    // Return a 500 (Internal Server Error) response with a generic error message.
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
