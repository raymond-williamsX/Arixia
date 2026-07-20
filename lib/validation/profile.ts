import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  avatarUrl: z.union([z.string().url("Enter a valid avatar URL."), z.literal("")])
});
