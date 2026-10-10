"use client";


import { useMyPayments } from "@/src/feature/payments/get-mypayments";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowDownLeft,
  Receipt,
} from "lucide-react";

export default function TenantPaymentsPage() {
  const { data: rawData, isLoading, isError, refetch } = useMyPayments();

 
  const payments = (rawData as any)?.data || rawData || [];

  const money = (amount: number = 0) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (date: string) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl p-6 text-center">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="font-semibold text-slate-800">
            Could not load your payment history.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  
  const totalPaid = payments
    .filter(
      (p: any) =>
        p.status?.toUpperCase() === "COMPLETED" ||
        p.status?.toUpperCase() === "PAID"
    )
    .reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Payment History
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View all your rent payments and transaction statements.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Total Spent</p>
            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
              <ArrowDownLeft size={20} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {money(totalPaid)}
          </p>
          <p className="mt-1 text-xs text-slate-400">Total completed rent payments</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Total Transactions</p>
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
              <Receipt size={20} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {payments.length}
          </p>
          <p className="mt-1 text-xs text-slate-400">Recorded payment records</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
        </div>

        {payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((item: any) => {
                  const status = item.status?.toUpperCase() || "PENDING";

                  const statusConfig: Record<
                    string,
                    { bg: string; icon: any; text: string }
                  > = {
                    COMPLETED: {
                      bg: "bg-emerald-50 text-emerald-700",
                      icon: CheckCircle2,
                      text: "Completed",
                    },
                    PAID: {
                      bg: "bg-emerald-50 text-emerald-700",
                      icon: CheckCircle2,
                      text: "Paid",
                    },
                    PENDING: {
                      bg: "bg-amber-50 text-amber-700",
                      icon: Clock,
                      text: "Pending",
                    },
                    FAILED: {
                      bg: "bg-rose-50 text-rose-700",
                      icon: XCircle,
                      text: "Failed",
                    },
                  };

                  const currentStatus =
                    statusConfig[status] || statusConfig["PENDING"];
                  const StatusIcon = currentStatus.icon;

                  return (
                    <tr
                      key={item.id}
                      className="transition hover:bg-slate-50/50"
                    >
                      <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-800">
                        {item.id || item.transactionId || "N/A"}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {money(item.amount)}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {formatDate(item.createdAt || item.date)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${currentStatus.bg}`}
                        >
                          <StatusIcon size={13} />
                          {currentStatus.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <CreditCard size={28} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No payment history found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Your payment history and invoices will appear here once you make
              payments.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}