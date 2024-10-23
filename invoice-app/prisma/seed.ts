import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

const initialInvoices = [
  {
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
  // NOTE Clean up before seeding (optional)
  await prisma.invoice.deleteMany();

  for (const invoice of initialInvoices) {
    await prisma.invoice.create({
      data: {
        ...invoice,
        lineItems: {
          create: invoice.lineItems,
        },
      },
    });
  }
};

seed();
