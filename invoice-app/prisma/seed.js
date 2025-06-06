import { InvoiceStatus, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const initialUsers = [
  {
    email: "john.doe@example.com",
    password: "password123",
    createdAt: new Date("2024-12-12"),
  },
  {
    email: "jane.smith@example.com",
    password: "password456",
    createdAt: new Date("2025-01-15"),
  },
];

const initialCustomers = [
  {
    email: "companyEmail@example.com",
    customerName: "Example Company Inc.",
    createdAt: new Date("2024-11-30"),
  },
  {
    email: "ueo@example.com",
    customerName: "UEO Inc.",
    createdAt: new Date("2024-12-20"),
  },
  {
    email: "companyEmail2@example.com",
    customerName: "Example Company 2 Inc.",
    createdAt: new Date("2025-01-10"),
  },
];

const initialInvoices = [
  {
    customerIndex: 0,
    totalValue: 5000.0,
    invoiceNumber: "INV-2024-001",
    dueDate: new Date("2024-11-30"),
    status: InvoiceStatus.PENDING,
    notes: "Payment due within 30 days",
    lineItems: [
      { description: "Web Development Services", quantity: 50, unitPrice: 100 },
      { description: "Cloud Hosting (Monthly)", quantity: 1, unitPrice: 200 },
    ],
  },
  {
    customerIndex: 0,
    totalValue: 1500.0,
    invoiceNumber: "INV-2024-002",
    dueDate: new Date("2024-12-15"),
    status: InvoiceStatus.PAID,
    notes: "Paid on time",
    lineItems: [
      { description: "SEO Services", quantity: 10, unitPrice: 100 },
      { description: "Content Creation", quantity: 5, unitPrice: 200 },
    ],
  },
  {
    customerIndex: 1,
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
];

const seed = async () => {
  await prisma.payment.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  // Create users and store their IDs
  const users = [];
  for (const user of initialUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await prisma.user.create({
      data: { ...user, password: hashedPassword },
    });
    users.push(createdUser);
  }

  if (users.length === 0) {
    throw new Error("User creation failed. Seeding aborted.");
  }

  // Create customers linked to users
  const customers = [];
  for (let i = 0; i < initialCustomers.length; i++) {
    const user = users[i % users.length]; // Ensure valid user exists
    const createdCustomer = await prisma.customer.create({
      data: {
        ...initialCustomers[i],
        user: { connect: { user_id: user.user_id } },
      },
    });
    customers.push(createdCustomer);
  }

  if (customers.length === 0) {
    throw new Error("Customer creation failed. Seeding aborted.");
  }

  // Create invoices linked to customers
  const invoices = [];
  for (const invoice of initialInvoices) {
    const customer = customers[invoice.customerIndex];
    if (!customer) {
      console.error("Invalid customer reference for invoice:", invoice);
      continue;
    }

    const createdInvoice = await prisma.invoice.create({
      data: {
        totalValue: invoice.totalValue,
        invoiceNumber: invoice.invoiceNumber,
        dueDate: invoice.dueDate,
        status: invoice.status,
        notes: invoice.notes,
        customer: { connect: { id: customer.id } },
        customerName: customer.customerName, // Store customerName
        customerEmail: customer.email, // Store customer email
        user: { connect: { user_id: customer.user_id } },
        lineItems: { create: invoice.lineItems },
      },
    });
    invoices.push(createdInvoice);
  }

  // Create payments for paid invoices
  for (const invoice of invoices) {
    if (invoice.status === InvoiceStatus.PAID) {
      await prisma.payment.create({
        data: {
          invoiceId: invoice.id,
          amount: invoice.totalValue,
          customer: { connect: { id: invoice.customerId } }, // Replace company with customerId
          user: { connect: { user_id: invoice.user_id } },
          createdAt: invoice.updatedAt || new Date(),
        },
      });
    }
  }

  console.log("Seeding completed successfully!");
};

seed()
  .catch((e) => console.error("Error seeding data:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });

//NOTE BUG TODO DO NOT TOUCH, HIGHLY FLAMMABLE
