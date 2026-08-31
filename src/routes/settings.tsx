import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFinance } from "@/lib/finance-store";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

export function SettingsPage() {
  const profile = useFinance((s) => s.profile);
  const setProfile = useFinance((s) => s.setProfile);
  const resetDemo = useFinance((s) => s.resetDemo);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted">Profile and demo data</p>
      </div>
      <section className="flex flex-col gap-4 rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Display name</Label>
          <Input
            id="name"
            value={profile.name}
            onChange={(e) => setProfile({ name: e.target.value })}
          />
        </div>
        <label className="flex min-h-11 items-center justify-between gap-3 text-sm">
          Hide balances
          <input
            type="checkbox"
            className="size-4 accent-primary"
            checked={profile.hideBalances}
            onChange={(e) => setProfile({ hideBalances: e.target.checked })}
          />
        </label>
      </section>
      <section className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
        <p className="text-sm text-muted">
          Restore the sample accounts, transactions, budgets, and goals.
        </p>
        <Button variant="secondary" className="mt-4" onClick={() => resetDemo()}>
          Reset demo data
        </Button>
      </section>
    </div>
  );
}
