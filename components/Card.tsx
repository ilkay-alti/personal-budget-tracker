"use client";
import { Currencies, Currency } from "@/lib/currencies";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useCallback } from "react";
import SkeletonWrapper from "./SkeletonWrapper";
import { UserSettings } from "@prisma/client";
import { UpdateUserCurrency } from "@/app/wizard/_actions/userSetting";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const CardComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>();

  const userSettings = useQuery<UserSettings>({
    queryKey: ["userSettings"], // The unique key to identify the query
    queryFn: () => fetch("/api/user-settings").then((res) => res.json()), // The function to fetch data from the API
  });

  const mutation = useMutation({
    mutationFn: UpdateUserCurrency,

    onSuccess: (data: UserSettings) => {
      toast.success("Currency updated successfully  🎊", {
        id: "update-currency",
      });
      setSelectedCurrency(
        Currencies.find((c) => c.value === data.currency) || null,
      );
    },
    onError: (error) => {
      toast.error(`Failed to update currency ${error}`, {
        id: "update-currency",
      });
    },
  });

  const selectOption = useCallback(
    (currency: Currency | null) => {
      if (!currency) {
        toast.error("Please select a currency");
        return;
      }

      toast.loading("Updating currency...", {
        id: "update-currency",
      });
      mutation.mutate(currency.value); // This should now execute correctly.
    },
    [mutation],
  );

  return (
    <div className="flex flex-col w-[600px] border rounded-xl border-[#e4e4e7] p-6 gap-6">
      <div className="flex flex-col gap-2 ">
        <h3 className="text-2xl font-semibold">Currency</h3>
        <p className="text-sm text-[#71717A]">
          Set your default currency for transactions
        </p>
      </div>
      <div>
        <SkeletonWrapper isLoading={userSettings.isFetching}>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="relative w-full border border-[#E4E4E7] px-4 py-2"
            disabled={mutation.isPending}
          >
            <label className="flex">
              {!selectedCurrency || null
                ? "Choose Currency"
                : selectedCurrency.label}
            </label>
          </button>
          {/* dropdown secitıon */}
          <div className="relative w-64">
            {isOpen && (
              <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {Currencies.map((currency: Currency) => (
                  <li
                    key={currency.label}
                    className="px-4 py-2 hover:bg-gray-700 hover:text-white cursor-pointer"
                    onMouseDown={() => {
                      selectOption(currency);
                      setIsOpen(false);
                    }}
                  >
                    {currency.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </SkeletonWrapper>
      </div>

      <button
        onClick={() => redirect("/")}
        className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md w-full"
      >
        Save
      </button>
    </div>
  );
};

export default CardComponent;
