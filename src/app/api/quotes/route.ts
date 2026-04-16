import { NextResponse } from "next/server";
import { getAllQuotes } from "@/src/server/quotes/quotes.service";

export async function GET() {
  try {
    const quotes = await getAllQuotes();
    return NextResponse.json(quotes);
  } catch (error) {
    console.error("[QUOTES_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
