"use server";

import { revalidatePath } from "next/cache";
import { getCurrentProfile } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { preferencesSchema } from "@/lib/validation/preferences";

export type PreferencesActionState = {
  error?: string;
  success?: string;
};

export async function updatePreferencesAction(
  _state: PreferencesActionState,
  formData: FormData
): Promise<PreferencesActionState> {
  const parsed = preferencesSchema.safeParse({
    budgetMin: formData.get("budgetMin"),
    budgetMax: formData.get("budgetMax"),
    currency: formData.get("currency"),
    favoriteCategories: formData.get("favoriteCategories"),
    preferredMarketplaces: formData.get("preferredMarketplaces"),
    preferredBrands: formData.get("preferredBrands"),
    prioritizePrice: formData.get("prioritizePrice") === "on",
    prioritizeQuality: formData.get("prioritizeQuality") === "on",
    prioritizeShipping: formData.get("prioritizeShipping") === "on",
    prioritizeSeller: formData.get("prioritizeSeller") === "on",
    prioritizeReviews: formData.get("prioritizeReviews") === "on",
    darkMode: formData.get("darkMode") === "on"
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid preferences." };
  }

  const profile = await getCurrentProfile();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("preferences")
    .update({
      budget_min: parsed.data.budgetMin ?? null,
      budget_max: parsed.data.budgetMax ?? null,
      currency: parsed.data.currency.toUpperCase(),
      favorite_categories: parsed.data.favoriteCategories,
      preferred_marketplaces: parsed.data.preferredMarketplaces,
      preferred_brands: parsed.data.preferredBrands,
      prioritize_price: parsed.data.prioritizePrice,
      prioritize_quality: parsed.data.prioritizeQuality,
      prioritize_shipping: parsed.data.prioritizeShipping,
      prioritize_seller: parsed.data.prioritizeSeller,
      prioritize_reviews: parsed.data.prioritizeReviews,
      dark_mode: parsed.data.darkMode
    })
    .eq("profile_id", profile.id);

  if (error) {
    return { error: "Unable to update preferences." };
  }

  revalidatePath("/preferences");
  revalidatePath("/settings");
  return { success: "Preferences updated." };
}
