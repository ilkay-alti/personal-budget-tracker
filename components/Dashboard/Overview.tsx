"use client";

import React from "react";
import { DateRangePicker } from "../ui/date-range-picker";

const Overview = () => {
  const [dateRange, setDateRange] = React.useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <div className="flex justify-between items-center p-8 ">
      <h3 className="text-4xl font-bold text-[#09090B]">Overview</h3>
      <DateRangePicker
        initialDateFrom={dateRange.from}
        initialDateTo={dateRange.to}
        showCompare={false}
        onUpdate={(values) => {
          const { from, to } = values.range;
          if (!from || !to) return;

          setDateRange({ from, to });
        }}
      />
    </div>
  );
};

export default Overview;
