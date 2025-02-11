export async function POST(req) {
    try {
      const response = new Response(JSON.stringify({ message: 'Logged out successfully' }), {
        headers: {
          'Content-Type': 'application/json',
          // Clear HTTP-only cookies
          'Set-Cookie': [
            'accessToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
            'refreshToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
          ],
        },
      });
      
      return response;
    } catch (error) {
        console.log(error)
      return new Response(JSON.stringify({ error: 'Logout failed' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }