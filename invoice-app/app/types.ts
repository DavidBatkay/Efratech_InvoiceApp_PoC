export interface StatisticsData {
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
