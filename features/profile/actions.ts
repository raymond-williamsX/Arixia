"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { profileSchema } from "@/lib/validation/profile";
import { requireUser } from "@/lib/auth/session";

export type ProfileActionState = {
  error?: string;
  success?: string;
};

export async function updateProfileAction(
  _state: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const parsed = profileSchema.safeParse({
    fullName: formData.get("fullName"),
    avatarUrl: formData.get("avatarUrl")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid profile details." };
  }

  const user = await requireUser();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: parsed.data.fullName,
      avatar_url: parsed.data.avatarUrl || null
    })
    .eq("auth_user_id", user.id);

  if (error) {
    return { error: "Unable to update profile." };
  }

  revalidatePath("/profile");
  return { success: "Profile updated." };
}
