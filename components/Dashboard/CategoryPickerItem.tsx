import { CategoryType } from "@/lib/types";
import { ChevronsUpDown } from "lucide-react";
import React from "react";

interface Props {
  selectedCategory: CategoryType;
  showIcon?: boolean | false;
}

const CategoryPickerItem = ({ selectedCategory, showIcon }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2 w-full ">
        <span className=" flex start-0">{selectedCategory.icon}</span>
        <span className="text-black flex-grow flex justify-start">
          {selectedCategory.name}
        </span>
        {showIcon && <ChevronsUpDown className="flex  w-3 h-3" />}
      </div>
    </div>
  );
};

export default CategoryPickerItem;
