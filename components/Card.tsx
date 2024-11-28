"use client";
import { Currencies, Currency } from "@/lib/currencies";
import React, { useState } from "react";

const CardComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("Set Currency");
  //   const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>();

  return (
    <div className="flex flex-col w-[600px] border rounded-xl border-[#e4e4e7] p-6 gap-6">
      <div className="flex flex-col gap-2 ">
        <h3 className="text-2xl font-semibold">Currency</h3>
        <p className="text-sm text-[#71717A]">
          Set your default currency for transactions
        </p>
      </div>
      <div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="relative w-full border border-[#E4E4E7] px-4 py-2"
        >
          <label className="flex">{inputValue}</label>
        </button>
        {/* dropdown secitıon */}
        <div className="relative w-64">
          {isOpen && (
            <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {Currencies.map((currency: Currency) => (
                <li
                  key={currency.value}
                  className="px-4 py-2 hover:bg-gray-700 hover:text-white cursor-pointer"
                  onMouseDown={() => {
                    setInputValue(currency.value);
                    // setSelectedCurrency(currency);
                    setIsOpen(false);
                  }}
                >
                  {currency.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md w-full">
        Save
      </button>
    </div>
  );
};

export default CardComponent;
