"use client";

import { TransactionType } from "@/lib/types";
import React from "react";
import CategoryPicker from "./CategoryPicker";

interface Props {
  type: TransactionType;
}
const CreateTransactionDialog = ({ type }: Props) => {
  const [showDialog, setShowDialog] = React.useState(false);

  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [date, setDate] = React.useState(new Date());

  return (
    <div>
      <button
        className={
          type === "income"
            ? `flex items-center justify-center h-11 px-4 py-2 rounded-xl ease-in duration-300 bg-[#10B981] hover:bg-[#022C22] border border-[#022C22]`
            : `flex items-center justify-center h-11 px-4 py-2 rounded-xl ease-in duration-300 bg-[#F43F5E] hover:bg-[#4C0519] border border-[#4C0519]`
        }
        onClick={() => setShowDialog(true)}
      >
        New {type} {type === "income" ? ` 💰` : " 💸"}
      </button>
      {showDialog && (
        <div
          className="fixed inset-0 z-0 bg-black/80 flex items-center justify-center text-[#09090B]"
          onClick={() => setShowDialog(false)}
        >
          <div
            className="fixed z-50 bg-white border p-6 w-[512px] flex flex-col gap-4 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold">
              Create a new{" "}
              <span
                className={
                  type === "income" ? "text-[#10B981]" : "text-[#F43F5E]"
                }
              >
                {type}
              </span>
            </h2>
            {/* Description Picker */}
            <div className="flex flex-col gap-2 text-sm">
              <h3 className="font-medium text-base">Description</h3>
              <input
                type="text"
                placeholder=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-3 py-2 w-full h-10 border border-[#D1D5DB] rounded-lg"
              />
              <p className="text-[#71717A]">
                Transaction description (optional)
              </p>
            </div>
            {/* Amount Picker */}
            <div className="flex flex-col gap-2 text-sm">
              <h3 className="font-medium text-base">Amount</h3>
              <input
                type="number"
                placeholder=""
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="px-3 py-2 w-full h-10 border border-[#D1D5DB] rounded-lg"
              />
              <p className="text-[#71717A]">Transaction amount (required)</p>
            </div>
            <div className="flex gap-12 items-center justify-between">
              {/* Category Picker */}
              <div className="flex flex-col gap-2 text-sm w-full">
                <h3 className="font-medium text-base">Category</h3>
                <CategoryPicker type={type} />
                <p className="text-[#71717A]">
                  Select a category for this transaction
                </p>
              </div>
              {/* Time Picker */}
              <div className="flex flex-col gap-2 text-sm w-full">
                <h3 className="font-medium text-base">Transaction date</h3>
                <input
                  type="date"
                  placeholder=""
                  value={date.toISOString().split("T")[0]}
                  onChange={(e) => setDate(new Date(e.target.value))}
                  className="px-3 py-2 w-full h-10 border border-[#D1D5DB] rounded-lg"
                />
                <p className="text-[#71717A]">Select a date for this</p>
              </div>
            </div>
            {/* action button */}
            <div className="flex  items-center gap-2 justify-end">
              <button className="flex items-center justify-center px-4 py-2 bg-white text-[#18181Bff]">
                Cancel
              </button>
              <button className="flex items-center justify-center px-4 py-2 text-white bg-[#18181Bff] rounded-lg">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTransactionDialog;
