import { useCallback } from "react";
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
export function useStatsAPI() {
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error("Failed to fetch statistics");
      const data: StatisticsData = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }, []);

  return { fetchStats };
}
