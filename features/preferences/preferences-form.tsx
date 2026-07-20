"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePreferencesAction, type PreferencesActionState } from "@/features/preferences/actions";
import type { Database } from "@/types/database";

type Preferences = Database["public"]["Tables"]["preferences"]["Row"];

type PreferencesFormProps = {
  preferences: Preferences;
};

const initialState: PreferencesActionState = {};

export function PreferencesForm({ preferences }: PreferencesFormProps) {
  const [state, formAction, pending] = useActionState(updatePreferencesAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field id="budgetMin" label="Budget Min" name="budgetMin" defaultValue={preferences.budget_min ?? ""} />
        <Field id="budgetMax" label="Budget Max" name="budgetMax" defaultValue={preferences.budget_max ?? ""} />
        <Field id="currency" label="Currency" name="currency" defaultValue={preferences.currency} />
      </div>
      <Field
        id="preferredBrands"
        label="Favorite brands"
        name="preferredBrands"
        defaultValue={preferences.preferred_brands.join(", ")}
      />
      <Field
        id="preferredMarketplaces"
        label="Preferred marketplaces"
        name="preferredMarketplaces"
        defaultValue={preferences.preferred_marketplaces.join(", ")}
      />
      <Field
        id="favoriteCategories"
        label="Favorite categories"
        name="favoriteCategories"
        defaultValue={preferences.favorite_categories.join(", ")}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Toggle name="prioritizePrice" label="Prioritize price" defaultChecked={preferences.prioritize_price} />
        <Toggle name="prioritizeQuality" label="Prioritize quality" defaultChecked={preferences.prioritize_quality} />
        <Toggle
          name="prioritizeShipping"
          label="Prioritize shipping"
          defaultChecked={preferences.prioritize_shipping}
        />
        <Toggle name="prioritizeSeller" label="Prioritize seller" defaultChecked={preferences.prioritize_seller} />
        <Toggle name="prioritizeReviews" label="Prioritize reviews" defaultChecked={preferences.prioritize_reviews} />
        <Toggle name="darkMode" label="Dark mode preference" defaultChecked={preferences.dark_mode} />
      </div>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-green-600">{state.success}</p> : null}
      <Button type="submit" disabled={pending}>
        Save Preferences
      </Button>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  name: string;
  defaultValue: string | number;
};

function Field({ id, label, name, defaultValue }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} defaultValue={defaultValue} />
    </div>
  );
}

type ToggleProps = {
  name: string;
  label: string;
  defaultChecked: boolean;
};

function Toggle({ name, label, defaultChecked }: ToggleProps) {
  return (
    <label className="flex items-center gap-3 rounded-lg border border-neutral-200 p-3 text-sm dark:border-neutral-800">
      <Checkbox name={name} defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}
