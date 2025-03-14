import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";
    const pageSize = url.searchParams.get("pageSize") || "25";
    const response = await fetch(
      `https://api.magicthegathering.io/v1/cards?page=${page}&pageSize=${pageSize}`,
      {
        cache: "no-cache",
      },
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch cards" },
        { status: response.status },
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
