"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStatsAPI } from "@/app/api/__calls__/useStatsAPI";

interface StatisticsData {
  totalInvoices: number | string;
  pendingInvoices: number | string;
  paidInvoices: number | string;
  overdueInvoices: number | string;
  archivedInvoices: number | string;
  totalCustomers: number | string;
  totalRevenue: number | string;
  totalOutstanding: number | string;
  favoriteCustomer: string | "No data";
}

const Statistics = () => {
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const { fetchStats } = useStatsAPI();
  useEffect(() => {
    const handleFetchStats = async () => {
      try {
        const data: StatisticsData = await fetchStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    handleFetchStats();
  }, [fetchStats]);

  if (!stats)
    return (
      <div className="overflow-hidden whitespace-nowrap w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 rounded-lg">
        <p className="text-white text-center">⏳ Loading statistics...</p>
      </div>
    );

  const statsArray = [
    { label: "📜 Total Invoices", value: stats.totalInvoices },
    { label: "⏳ Pending Invoices", value: stats.pendingInvoices },
    { label: "✅ Paid Invoices", value: stats.paidInvoices },
    { label: "⚠️ Overdue Invoices", value: stats.overdueInvoices },
    { label: "📂 Archived Invoices", value: stats.archivedInvoices },
    { label: "👥 Total Customers", value: stats.totalCustomers },
    { label: "💰 Total Revenue", value: `${stats.totalRevenue} $` },
    { label: "💳 Total Outstanding", value: `${stats.totalOutstanding} $` },
    { label: "⭐ Favorite Customer", value: stats.favoriteCustomer },
  ];

  // Duplicate statistics for a seamless looping effect
  const repeatedStats = [...statsArray, ...statsArray];

  return (
    <div className="overflow-hidden whitespace-nowrap w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 rounded-lg shadow-md">
      <motion.div
        className="flex space-x-12 w-max"
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 18,
          ease: "linear",
        }}
      >
        {repeatedStats.map((stat, index) => (
          <div key={index} className="text-lg font-semibold">
            {stat.label}: <span className="text-yellow-400">{stat.value}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Statistics;
