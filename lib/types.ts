export type TransactionType = "income" | "expense";

export type CategoryType = {
  name: string;
  type: TransactionType;
  icon: string;
};

export type EmojiType = {
  native: string;
};
