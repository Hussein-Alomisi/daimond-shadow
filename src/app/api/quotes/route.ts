import { NextResponse } from "next/server";
import { getAllQuotes, createQuote } from "@/src/server/quotes/quotes.service";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, service, message } = body;

    // Validation
    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: "الاسم ورقم الهاتف والخدمة مطلوبة" },
        { status: 400 }
      );
    }

    const quote = await createQuote({
      name,
      phone,
      service,
      message: message || "",
    });

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error("[QUOTES_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

