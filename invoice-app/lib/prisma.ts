import { PrismaClient } from "@prisma/client";

// Create a single PrismaClient instance and export it
const prisma = new PrismaClient();

export default prisma;
