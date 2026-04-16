import * as quotesRepository from "./quotes.repository";
import type { QuoteRequest } from "@prisma/client";

export async function getAllQuotes(): Promise<QuoteRequest[]> {
  return quotesRepository.findAllQuotes();
}
