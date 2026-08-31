import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { AddTransactionDialog } from "@/components/finance/dialogs";
import { Money } from "@/components/finance/money";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_MAP } from "@/lib/categories";
import { useFinance } from "@/lib/finance-store";
import { formatDateTime } from "@/lib/format";

type Search = { q?: string };

export const Route = createFileRoute("/transactions")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : "",
  }),
  component: TransactionsPage,
});

export function TransactionsPage() {
  const { q: initialQ } = Route.useSearch();
  const transactions = useFinance((s) => s.transactions);
  const accounts = useFinance((s) => s.accounts);
  const hide = useFinance((s) => s.profile.hideBalances);
  const remove = useFinance((s) => s.deleteTransaction);
  const [q, setQ] = useState(initialQ ?? "");
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  const accountName = useMemo(
    () => Object.fromEntries(accounts.map((a) => [a.id, a.name])),
    [accounts],
  );

  const rows = transactions.filter((t) => {
    if (filter === "income" && t.amount <= 0) return false;
    if (filter === "expense" && t.amount >= 0) return false;
    if (!q.trim()) return true;
    const hay = `${t.merchant} ${t.category} ${accountName[t.accountId] ?? ""}`.toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Transactions</h1>
          <p className="text-sm text-muted">Track and manage every movement</p>
        </div>
        <AddTransactionDialog
          trigger={
            <Button>
              <Plus className="size-4" /> Add transaction
            </Button>
          }
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search transactions…"
          className="sm:max-w-xs"
        />
        <div className="flex gap-1">
          {(["all", "income", "expense"] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "secondary"}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f === "income" ? "Income" : "Expenses"}
            </Button>
          ))}
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {rows.length === 0 && (
          <li className="rounded-2xl bg-surface px-4 py-10 text-center text-sm text-muted shadow-[var(--shadow-card)]">
            No transactions match.
          </li>
        )}
        {rows.map((t) => {
          const cat = CATEGORY_MAP[t.category];
          return (
            <li
              key={t.id}
              className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-card)]"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{t.merchant}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <Badge tone={cat.tone}>{cat.label}</Badge>
                  <span>{accountName[t.accountId]}</span>
                  <span>{formatDateTime(t.date)}</span>
                </p>
              </div>
              <Money value={t.amount} signed hidden={hide} className="text-sm font-semibold" />
              <Button
                variant="ghost"
                size="icon"
                className="size-10 shrink-0 text-muted hover:text-expense"
                aria-label="Delete"
                onClick={() => remove(t.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
