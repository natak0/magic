import { NextResponse } from "next/server";

const BASE_URL = "https://api.magicthegathering.io/v1";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const response = await fetch(`${BASE_URL}/${id}`, {
      cache: "no-cache",
    });
    console.log("id", id, response);
    if (!response.ok) {
      console.log("not ok", response);
      return NextResponse.json(
        { error: "Failed to fetch cards" },
        { status: response.status }
      );
    }
    const data = await response.json();
    console.log("data", data, response);
    return NextResponse.json(data);
  } catch (error) {
    console.log("errorrrrrrr", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
