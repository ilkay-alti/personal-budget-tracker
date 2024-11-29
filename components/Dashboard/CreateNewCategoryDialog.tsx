import React, { useCallback } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { EmojiType } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCategory } from "@/app/(user)/(dashboard)/_actions/categories";
import { Category } from "@prisma/client";
import { toast } from "sonner";
import { CreateCategorySchemaType } from "@/schema/categories";

interface Props {
  type: "income" | "expense";
  setIsOpenNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateNewCategoryDialog = ({ type, setIsOpenNewCategory }: Props) => {
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryIcon, setCategoryIcon] = React.useState("");
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = React.useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: async (data: Category) => {
      toast.success(`Category ${data.name} created successfully`, {
        id: "create-category",
      });

      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      setIsOpenNewCategory(false);
    },
    onError: (error) => {
      toast.error(`Failed to create category - ${error.message}`, {
        id: "create-category",
      });
    },
  });

  const handleCreateCategory = useCallback(
    (data: CreateCategorySchemaType) => {
      if (!data.name || !data.icon) {
        return toast.error("Please fill all the fields", {
          id: "create-category",
        });
      }

      toast.loading("Creating Category...", { id: "create-category" });

      mutate(data);
    },
    [mutate],
  );

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold ">
        Create a new{" "}
        <span
          className={type === "income" ? "text-[#10B981]" : "text-[#F43F5E]"}
        >
          {type}
        </span>
      </h2>
      {/* Category Name Picker */}
      <div className="flex flex-col gap-2 text-sm">
        <h3 className="font-medium text-base">Name</h3>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="px-3 py-2 w-full h-10 border border-[#D1D5DB] rounded-lg"
        />
        <p className="text-[#71717A]">
          This is how your category will appear in the app
        </p>
      </div>

      {/* Category Emoji  */}
      <div className="flex flex-col gap-2 text-sm ">
        <h3 className="font-medium text-base">Icon</h3>
        <button
          className="w-full h-28 border border-[#D1D5DB] rounded-lg flex  flex-col items-center justify-center gap-2"
          onClick={() => {
            setIsEmojiPickerVisible(!isEmojiPickerVisible);
          }}
        >
          <label className="text-5xl">{categoryIcon || "☕"}</label>
          <label className="text-[#71717A]">Click on the change</label>
        </button>

        {isEmojiPickerVisible && (
          <div className="fixed top-0">
            <Picker
              title="Pick your emoji…"
              data={data}
              onEmojiSelect={(emoji: EmojiType) => {
                setCategoryIcon(emoji.native);
                setIsEmojiPickerVisible(false);
              }}
            />
          </div>
        )}

        <p className="text-[#71717A]">
          This is how your category will appear in the app
        </p>
      </div>
      {/* action button */}
      <div className="flex  items-center gap-2 justify-end">
        <button
          className="flex items-center justify-center px-4 py-2 bg-white text-[#18181Bff]"
          onClick={() => setIsOpenNewCategory(false)}
        >
          Cancel
        </button>
        <button
          className="flex items-center justify-center px-4 py-2 text-white bg-[#18181Bff] rounded-lg"
          onClick={() =>
            handleCreateCategory({
              name: categoryName,
              icon: categoryIcon,
              type: type,
            })
          }
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreateNewCategoryDialog;
