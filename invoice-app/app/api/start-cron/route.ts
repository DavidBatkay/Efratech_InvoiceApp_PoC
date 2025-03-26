import "@/utils/cron"; // Import the whole file to start the cron job
import { NextResponse } from "next/server";

// GET method to start the cron job
export const GET = async () => {
  try {
    // The cron job will be started when the file is imported
    return NextResponse.json({ message: "Cron job started successfully." });
  } catch (error) {
    console.error("Error starting cron job:", error);
    return NextResponse.json(
      { error: "Failed to start cron job" },
      { status: 500 }
    );
  }
};
