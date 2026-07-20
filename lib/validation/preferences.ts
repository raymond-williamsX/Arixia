import { z } from "zod";

const listSchema = z
  .string()
  .transform((value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );

export const preferencesSchema = z
  .object({
    budgetMin: z.coerce.number().min(0).optional().or(z.literal("").transform(() => undefined)),
    budgetMax: z.coerce.number().min(0).optional().or(z.literal("").transform(() => undefined)),
    currency: z.string().trim().min(3).max(3),
    favoriteCategories: listSchema,
    preferredMarketplaces: listSchema,
    preferredBrands: listSchema,
    prioritizePrice: z.coerce.boolean().default(false),
    prioritizeQuality: z.coerce.boolean().default(false),
    prioritizeShipping: z.coerce.boolean().default(false),
    prioritizeSeller: z.coerce.boolean().default(false),
    prioritizeReviews: z.coerce.boolean().default(false),
    darkMode: z.coerce.boolean().default(false)
  })
  .refine(
    (value) =>
      value.budgetMin === undefined || value.budgetMax === undefined || value.budgetMin <= value.budgetMax,
    {
      message: "Minimum budget must be less than maximum budget.",
      path: ["budgetMax"]
    }
  );
