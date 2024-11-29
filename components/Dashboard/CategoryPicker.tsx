import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { TransactionType } from "@/lib/types";
import { Category } from "@prisma/client";
import CategoryPickerItem from "./CategoryPickerItem";
import { Search } from "lucide-react";
import CreateNewCategoryDialog from "./CreateNewCategoryDialog";

interface Props {
  type: TransactionType;
}

const CategoryPicker = ({ type }: Props) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpenNewCategory, setIsOpenNewCategory] = useState(false);

  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === value,
  );
  useEffect(() => {
    console.log(categoriesQuery.data);
    console.log(selectedCategory);
  }, [value]);

  return (
    <div>
      <button
        className="px-3 py-2 w-full h-10 border border-[#D1D5DB] rounded-lg text-black"
        onClick={() => setIsOpen(true)}
      >
        {selectedCategory ? (
          <CategoryPickerItem
            selectedCategory={selectedCategory}
            showIcon={true}
          />
        ) : (
          "Select a category"
        )}
      </button>
      {isOpen && (
        <div className="absolute w-[207px] mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 ">
          {/* search */}
          <div className="flex  items-center border border-gray-300 text-[#09090B] ">
            <Search className="absolute w-4 h-4 m-2" />
            <input
              type="text"
              className="w-full pl-8 py-2"
              placeholder="Search Category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* new category */}
          <div
            className="px-4 py-2 group hover:bg-gray-300 cursor-pointer border-x border-b border-gray-300 text-gray-400 hover:text-[#09090B]"
            onMouseDown={() => {
              setIsOpenNewCategory(!isOpenNewCategory);
            }}
          >
            <div className="flex items-center gap-2 w-full ">
              <span className=" flex start-0">+</span>
              <span className=" flex-grow flex justify-start text-gray-400 group-hover:text-[#09090B]">
                Create New
              </span>
            </div>
          </div>

          {/* Create New Category */}
          {isOpenNewCategory && (
            <div
              className="fixed inset-0 z-0 bg-black/80 flex items-center justify-center text-[#09090B]"
              onClick={() => setIsOpenNewCategory(false)}
            >
              <div
                className="fixed z-50 bg-white border p-6 w-[512px] flex flex-col gap-4 rounded-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <CreateNewCategoryDialog
                  type={type}
                  setIsOpenNewCategory={setIsOpenNewCategory}
                />
              </div>
            </div>
          )}

          {/* categoryList */}
          <div className="border-b border-x border-gray-300">
            {categoriesQuery.data
              ?.filter((ctx: Category) =>
                ctx.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((category: Category) => (
                <div
                  key={category.name}
                  className="px-4 py-2 hover:bg-gray-300 hover:text-white cursor-pointer  "
                  onMouseDown={() => {
                    setValue(category.name);
                    setIsOpen(false);
                  }}
                >
                  <CategoryPickerItem
                    selectedCategory={{
                      name: category.name,
                      type: type,
                      icon: category.icon,
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPicker;
