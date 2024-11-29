import { z } from "zod";

export const CreateTransactionSchema = z.object({
  description: z.string().optional(),
  amount: z.number().positive().multipleOf(0.01),
  currency: z.string().optional(),
  date: z.date(),
  category: z.string(),
  type: z.enum(["income", "expense"]),
});

export type CreateTransactionSchemaType = z.infer<
  typeof CreateTransactionSchema
>;
