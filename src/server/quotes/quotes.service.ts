import * as quotesRepository from "./quotes.repository";
import type { QuoteRequest } from "@prisma/client";

export async function getAllQuotes(): Promise<QuoteRequest[]> {
  return quotesRepository.findAllQuotes();
}

export async function createQuote(data: {
  name: string;
  phone: string;
  service: string;
  message: string;
}): Promise<QuoteRequest> {
  // Add any validation or business logic here
  return quotesRepository.createQuoteRequest(data);
}

