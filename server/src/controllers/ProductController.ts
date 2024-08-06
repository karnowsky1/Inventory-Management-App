import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const getProducts = async(req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search // will search on the string if provided, otherwise returns everything
        }
      }
    })
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retreiving products" });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body; // this is what body parser is used for 
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};