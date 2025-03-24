import { NextResponse } from "next/server";

export const BASE_URL = "https://api.magicthegathering.io/v1";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "24";
    const name = searchParams.get("name");

    let apiUrl = `${BASE_URL}/cards`;
    if (name) {
      apiUrl += `?name=${name}`;
    } else apiUrl += `?page=${page}&pageSize=${pageSize}`;
    const response = await fetch(apiUrl, {
      cache: "no-cache",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch cards" },
        { status: response.status }
      );
    }
    const data = await response.json();

    const linkHeader = response.headers.get("Link");

    return NextResponse.json({
      cards: data,
      linkHeader,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
