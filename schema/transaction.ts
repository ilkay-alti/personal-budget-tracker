import { z } from "zod";

// Define the transaction schema
export const CreateTransactionSchema = z.object({
  description: z.string().default("").optional(),
  amount: z.number().positive().multipleOf(0.01),
  date: z.date(),
  category: z.string(),
  type: z.enum(["income", "expense"]),
});

export type CreateTransactionSchemaType = z.infer<
  typeof CreateTransactionSchema
>;
