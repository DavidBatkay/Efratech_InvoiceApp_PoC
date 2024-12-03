import { PrismaClient } from "@prisma/client";
import { connect } from "http2";
const prisma = new PrismaClient();

const initialUsers = [
  {
    user_id: 1,
    email: "john.doe@example.com",
    password: "password123", //NOTE without hash only outside of production
  },
  {
    user_id: 2,
    email: "jane.smith@example.com",
    password: "password456",
  },
];

const initialInvoices = [
  {
    user: initialUsers[1],
    user_id: user.user_id,
    companyName: "Acme Corp",
    totalValue: 5000.0,
    invoiceNumber: "INV-2024-001",
    dueDate: new Date("2024-11-30"),
    status: "PENDING",
    notes: "Payment due within 30 days",
    lineItems: [
      { description: "Web Development Services", quantity: 50, unitPrice: 100 },
      { description: "Cloud Hosting (Monthly)", quantity: 1, unitPrice: 200 },
    ],
  },
  {
    user: initialUsers[1],
    user_id: user.user_id,
    companyName: "Beta LLC",
    totalValue: 1500.0,
    invoiceNumber: "INV-2024-002",
    dueDate: new Date("2024-12-15"),
    status: "PAID",
    notes: "Paid on time",
    lineItems: [
      { description: "SEO Services", quantity: 10, unitPrice: 100 },
      { description: "Content Creation", quantity: 5, unitPrice: 200 },
    ],
  },
  {
    user: initialUsers[1],
    user_id: 1,
    companyName: "Gamma Inc.",
    totalValue: 3200.5,
    invoiceNumber: "INV-2024-003",
    dueDate: new Date("2024-12-01"),
    status: "OVERDUE",
    notes: "Please pay ASAP",
    lineItems: [
      { description: "Social Media Management", quantity: 3, unitPrice: 500 },
      { description: "Graphic Design", quantity: 2, unitPrice: 600 },
    ],
  },
  {
    user_id: 1,
    companyName: "Delta Co.",
    totalValue: 980.0,
    invoiceNumber: "INV-2024-004",
    dueDate: new Date("2024-11-20"),
    status: "PENDING",
    notes: "Discount applied",
    lineItems: [
      { description: "Consultation Services", quantity: 2, unitPrice: 400 },
      { description: "Follow-up Support", quantity: 1, unitPrice: 180 },
    ],
  },
  {
    user_id: 1,
    companyName: "Epsilon Group",
    totalValue: 4500.75,
    invoiceNumber: "INV-2024-005",
    dueDate: new Date("2024-12-10"),
    status: "PAID",
    notes: "Thank you for your prompt payment",
    lineItems: [
      { description: "Software Development", quantity: 15, unitPrice: 300 },
      { description: "Hosting Services", quantity: 1, unitPrice: 750 },
    ],
  },
];

const seed = async () => {
  // Clean up existing data (optional)
  await prisma.invoice.deleteMany();
  await prisma.user.deleteMany(); // Clear users before seeding

  // Seed users individually
  for (const user of initialUsers) {
    await prisma.user.create({ data: user });
  }

  // Get the first user to associate invoices
  const firstUser = await prisma.user.findFirst();

  if (!firstUser) {
    console.error("No user found to associate invoices. Exiting.");
    return; // Exit if no user exists
  }

  // Seed invoices associated with the first user
  for (const invoice of initialInvoices) {
    await prisma.invoice.create({
      data: {
        companyName: invoice.companyName,
        totalValue: invoice.totalValue,
        invoiceNumber: invoice.invoiceNumber,
        dueDate: invoice.dueDate,
        status: invoice.status,
        notes: invoice.notes,
        user: {
          connect: { user_id: firstUser.user_id }, // Replace `id` with your primary key field name if different
        },
        lineItems: {
          create: invoice.lineItems,
        },
      },
    });
  }

  console.log("Seeding completed successfully!");
};

seed()
  .catch((e) => {
    console.error("Error seeding data:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
