import { prisma } from "@/src/lib/db/prisma";
import type { QuoteRequest } from "@prisma/client";

export async function findAllQuotes(): Promise<QuoteRequest[]> {
  return prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createQuoteRequest(data: {
  name: string;
  phone: string;
  service: string;
  message: string;
}): Promise<QuoteRequest> {
  return prisma.quoteRequest.create({
    data,
  });
}

