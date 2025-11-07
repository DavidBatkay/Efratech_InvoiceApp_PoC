"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStatsAPI } from "@/app/api/__calls__/useStatsAPI";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Archive,
  Users,
  DollarSign,
  CreditCard,
  Star,
} from "lucide-react";

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

const icons = {
  totalInvoices: FileText,
  pendingInvoices: Clock,
  paidInvoices: CheckCircle,
  overdueInvoices: AlertTriangle,
  archivedInvoices: Archive,
  totalCustomers: Users,
  totalRevenue: DollarSign,
  totalOutstanding: CreditCard,
  favoriteCustomer: Star,
};

export default function Statistics({ compact = false }: { compact?: boolean }) {
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
      <div className="text-center text-gray-400 animate-pulse py-4">
        Loading...
      </div>
    );

  const entries = Object.entries(stats) as [
    keyof StatisticsData,
    string | number
  ][];

  return (
    <div
      className={`grid ${
        compact
          ? "grid-cols-1 sm:grid-cols-2 gap-3"
          : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
      }`}
    >
      {entries.map(([key, value], index) => {
        const Icon = icons[key];
        const label = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s) => s.toUpperCase());

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ scale: 1.04 }}
            className={`flex items-center gap-3 bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600/40 rounded-xl p-3 transition-all ${
              compact ? "hover:shadow-blue-400/10" : "hover:shadow-blue-500/20"
            }`}
          >
            <Icon className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <p className="text-xs text-gray-400">{label}</p>
              <p className="text-sm font-semibold text-white">
                {typeof value === "string" && value.endsWith("$")
                  ? value
                  : String(value)}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
