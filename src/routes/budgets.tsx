import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { BudgetDialog } from "@/components/finance/dialogs";
import { Money } from "@/components/finance/money";
import { Button } from "@/components/ui/button";
import { CATEGORY_MAP } from "@/lib/categories";
import { spentByCategory, useFinance } from "@/lib/finance-store";

export const Route = createFileRoute("/budgets")({ component: BudgetsPage });

export function BudgetsPage() {
  const budgets = useFinance((s) => s.budgets);
  const transactions = useFinance((s) => s.transactions);
  const hide = useFinance((s) => s.profile.hideBalances);
  const spent = spentByCategory(transactions);
  const totalLimit = budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgets.reduce((s, b) => s + (spent[b.category] ?? 0), 0);
  const used = totalLimit ? Math.min(100, Math.round((totalSpent / totalLimit) * 100)) : 0;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Budgets</h1>
          <p className="text-sm text-muted">Spending limits for this month</p>
        </div>
        <BudgetDialog
          trigger={
            <Button>
              <Plus className="size-4" /> Create budget
            </Button>
          }
        />
      </div>

      <section className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
        <p className="text-xs font-medium text-muted">Monthly budget</p>
        <p className="mt-1 text-2xl font-semibold">
          <Money value={totalSpent} hidden={hide} />
          <span className="text-base font-normal text-muted">
            {" "}
            of <Money value={totalLimit} hidden={hide} />
          </span>
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-elevated">
          <div className="h-full rounded-full bg-primary" style={{ width: `${used}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted">{used}% used</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {budgets.map((b) => {
          const usedAmt = spent[b.category] ?? 0;
          const pct = Math.min(100, Math.round((usedAmt / b.limit) * 100));
          const over = usedAmt > b.limit;
          const meta = CATEGORY_MAP[b.category];
          return (
            <article key={b.id} className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold">{meta.label}</h2>
                  <p className="mt-2 text-xl font-semibold">
                    <Money value={usedAmt} hidden={hide} />
                    <span className="text-sm font-normal text-muted">
                      {" "}
                      / <Money value={b.limit} hidden={hide} />
                    </span>
                  </p>
                </div>
                <div
                  className="relative size-14 shrink-0"
                  aria-hidden
                >
                  <svg viewBox="0 0 36 36" className="-rotate-90">
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="currentColor"
                      className="text-elevated"
                      strokeWidth="4"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="currentColor"
                      className={over ? "text-expense" : "text-primary"}
                      strokeWidth="4"
                      strokeDasharray={`${(pct / 100) * 88} 88`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted">
                Remaining <Money value={Math.max(0, b.limit - usedAmt)} hidden={hide} />
              </p>
              {over && (
                <p className="mt-1 text-xs text-expense">
                  Over by <Money value={usedAmt - b.limit} hidden={hide} />
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
