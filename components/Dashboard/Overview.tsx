"use client";

import React from "react";
import { DateRangePicker } from "../ui/date-range-picker";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DateToUTCDate } from "@/lib/helpers";

const Overview = () => {
  const today = new Date();
  const [dateRange, setDateRange] = React.useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(today.getFullYear(), today.getMonth() + 1),
    to: new Date(today.getFullYear(), today.getMonth() + 1),
  });

  const statsQuery = useQuery({
    queryKey: ["overview", "stats", dateRange],
    queryFn: async () => {
      const res = await fetch(
        `/api/stats/balance?from=${DateToUTCDate(dateRange.from)}&to=${DateToUTCDate(dateRange.to)}`,
      );
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const income = statsQuery.data?.income || 0;
  const expense = statsQuery.data?.expense || 0;
  const balance = income - expense;

  if (statsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (statsQuery.isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex flex-col p-8 gap-8">
      <div className="flex justify-between items-center">
        <h3 className="text-4xl font-bold text-[#09090B]">Overview</h3>
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          showCompare={false}
          onUpdate={(values) => {
            const { from, to } = values.range;
            if (!from || !to) {
              setDateRange({
                from: new Date(today.getFullYear(), today.getMonth() + 1),
                to: new Date(today.getFullYear(), today.getMonth() + 1),
              });
              return;
            }

            setDateRange({ from, to });
          }}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex p-4 items-center justify-start border border-gray-300 gap-2 w-full">
          <TrendingUp size={60} className="text-green-500 bg-green-100 p-3" />
          <div>
            <label className="text-gray-500 font-bold">Income</label>
            <p className="text-2xl font-light">${income}</p>
          </div>
        </div>
        <div className="flex p-4 items-center border border-gray-300 gap-2 w-full justify-start">
          <TrendingDown size={60} className="text-red-500 bg-red-100 p-3" />
          <div>
            <label className="text-gray-500 font-bold">Expense</label>
            <p className="text-2xl font-light">${expense}</p>
          </div>
        </div>
        <div className="flex p-4 items-center border border-gray-300 gap-2 w-full justify-start">
          <Wallet size={60} className="text-purple-500 bg-purple-100 p-3" />
          <div>
            <label className="text-gray-500 font-bold">Balance</label>
            <p className="text-2xl font-light">${balance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
