import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
console.log("📅 Cron job file loaded!");
//NOTE
// curl http://localhost:3000/api/start-cron
// command to start cron server function
const prisma = new PrismaClient();

const updateOverdueInvoices = async () => {
  const today = new Date();

  try {
    const updatedInvoices = await prisma.invoice.updateMany({
      where: {
        status: "PENDING",
        dueDate: { lt: today },
      },
      data: {
        status: "OVERDUE",
      },
    });

    console.log(`Updated ${updatedInvoices.count} overdue invoices.`);
  } catch (error) {
    console.error("Error updating overdue invoices:", error);
  }
};

// Declare global variable to prevent duplicate jobs
declare global {
  // eslint-disable-next-line no-var
  var __cronJobStarted: boolean | undefined;
}

// Ensure the cron job starts only once when the server starts
if (!global.__cronJobStarted) {
  global.__cronJobStarted = true;
  console.log("Starting invoice overdue cron job...");
  //update scheduling for midnight
  cron.schedule("0 0 * * *", () => {
    console.log("Running daily invoice check...");
    updateOverdueInvoices();
  });

  updateOverdueInvoices();
  //   cron.schedule("*/1 * * * *", () => {
  //     console.log("Running invoice overdue check...");
  //     updateOverdueInvoices();
  //   });

  //NOTE update scheduling for once a minute (testing purposes)
}
