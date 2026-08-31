import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { ContributeDialog, GoalDialog } from "@/components/finance/dialogs";
import { Money } from "@/components/finance/money";
import { Button } from "@/components/ui/button";
import { useFinance } from "@/lib/finance-store";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/goals")({ component: GoalsPage });

export function GoalsPage() {
  const goals = useFinance((s) => s.goals);
  const hide = useFinance((s) => s.profile.hideBalances);
  const total = goals.reduce((s, g) => s + g.current, 0);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Savings goals</h1>
          <p className="text-sm text-muted">
            Total saved <Money value={total} hidden={hide} />
          </p>
        </div>
        <GoalDialog
          trigger={
            <Button>
              <Plus className="size-4" /> New goal
            </Button>
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {goals.map((g) => {
          const pct = Math.min(100, Math.round((g.current / g.target) * 100));
          return (
            <article key={g.id} className="flex flex-col rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-sm font-semibold">{g.name}</h2>
                <span className="text-xs tabular-nums text-muted">{pct}%</span>
              </div>
              <p className="mt-3 text-xl font-semibold">
                <Money value={g.current} hidden={hide} />
                <span className="text-sm font-normal text-muted">
                  {" "}
                  / <Money value={g.target} hidden={hide} />
                </span>
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-elevated">
                <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-xs text-subtle">Target {formatDate(g.deadline)}</p>
              <ContributeDialog
                goalId={g.id}
                trigger={
                  <Button variant="secondary" className="mt-4">
                    Add money
                  </Button>
                }
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}
