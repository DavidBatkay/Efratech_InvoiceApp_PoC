import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

// Create a new user
export async function createUser(data: Prisma.UserCreateInput) {
  return await prisma.user.create({
    data,
  });
}

// Get a user by their unique email
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: { invoices: true }, // Include related invoices if needed
  });
}

// Get a user by their unique ID
export async function getUserById(user_id: number) {
  return await prisma.user.findUnique({
    where: { user_id },
    include: { invoices: true }, // Include related invoices if needed
  });
}

// Retrieve all users
export async function getAllUsers() {
  return await prisma.user.findMany({
    include: { invoices: true }, // Include related invoices if needed
  });
}

// Update a user by their ID
export async function updateUser(
  user_id: number,
  data: Prisma.UserUpdateInput
) {
  return await prisma.user.update({
    where: { user_id },
    data,
  });
}

// Delete a user by their ID
export async function deleteUser(user_id: number) {
  return await prisma.user.delete({
    where: { user_id },
  });
}
