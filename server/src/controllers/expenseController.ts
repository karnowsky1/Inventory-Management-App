import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ExpenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
      orderBy: {
        date: "desc"
      }
    })
    const ExpenseByCategorySummary = ExpenseByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString()
      })
    )

    res.json(ExpenseByCategorySummary)
  } catch(error) {
    res.status(500).json({message: "Error retrieving expenses by category"})
  }
}