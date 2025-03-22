import "@/utils/cron.ts"; // Import the cron job here so it starts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Dashboard data" });
}
