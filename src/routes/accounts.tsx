import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AccountDialog, TransferDialog } from "@/components/finance/dialogs";
import { Money } from "@/components/finance/money";
import { Button } from "@/components/ui/button";
import { netWorth, useFinance } from "@/lib/finance-store";

export const Route = createFileRoute("/accounts")({ component: AccountsPage });

const TYPE_LABEL: Record<string, string> = {
  checking: "Checking",
  savings: "Savings",
  credit: "Credit",
  investment: "Investment",
};

export function AccountsPage() {
  const accounts = useFinance((s) => s.accounts);
  const hide = useFinance((s) => s.profile.hideBalances);
  const worth = netWorth(accounts);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Accounts</h1>
          <p className="text-sm text-muted">
            Net worth <Money value={worth} hidden={hide} />
          </p>
        </div>
        <div className="flex gap-2">
          <TransferDialog trigger={<Button variant="secondary">Transfer</Button>} />
          <AccountDialog
            trigger={
              <Button>
                <Plus className="size-4" /> Link account
              </Button>
            }
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {accounts.map((a) => (
          <article key={a.id} className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
            <p className="text-xs font-medium text-muted">{TYPE_LABEL[a.type]}</p>
            <h2 className="mt-1 text-base font-semibold">{a.name}</h2>
            <p className="text-xs text-subtle">{a.institution}</p>
            <p className="mt-4 text-2xl font-semibold">
              <Money value={a.balance} hidden={hide} />
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
