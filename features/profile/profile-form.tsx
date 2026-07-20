"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileAction, type ProfileActionState } from "@/features/profile/actions";

type ProfileFormProps = {
  fullName: string;
  avatarUrl: string | null;
};

const initialState: ProfileActionState = {};

export function ProfileForm({ fullName, avatarUrl }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(updateProfileAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Name</Label>
        <Input id="fullName" name="fullName" defaultValue={fullName} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="avatarUrl">Avatar</Label>
        <Input id="avatarUrl" name="avatarUrl" defaultValue={avatarUrl ?? ""} placeholder="https://..." />
      </div>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-green-600">{state.success}</p> : null}
      <Button type="submit" disabled={pending}>
        Save Profile
      </Button>
    </form>
  );
}
