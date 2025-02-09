import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.BASEURL}/api/v1/admin/pending-user-list`);

    if (!response.ok) {
      // Throw an error to be caught below if the response isn't successful
      throw new Error(`Failed to fetch pending users. Status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching pending users:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
