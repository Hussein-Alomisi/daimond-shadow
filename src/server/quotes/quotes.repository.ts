import { prisma } from "@/src/lib/db/prisma";
import type { QuoteRequest } from "@prisma/client";

export async function findAllQuotes(): Promise<QuoteRequest[]> {
  return prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
}
