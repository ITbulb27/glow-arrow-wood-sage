import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Eye, EyeOff, Plus, Repeat, Wallet } from "lucide-react";
import { CashFlowChart } from "@/components/finance/charts";
import {
  AddTransactionDialog,
  BudgetDialog,
  TransferDialog,
} from "@/components/finance/dialogs";
import { Money } from "@/components/finance/money";
import { Button } from "@/components/ui/button";
import { CATEGORY_MAP } from "@/lib/categories";
import {
  cashFlowSeries,
  liquidBalance,
  monthFlow,
  spentByCategory,
  useFinance,
} from "@/lib/finance-store";
import { pctChange } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const TONE_BAR: Record<string, string> = {
  teal: "bg-teal",
  coral: "bg-coral",
  indigo: "bg-indigo",
  amber: "bg-amber",
  green: "bg-green",
  slate: "bg-slate",
};

function Home() {
  const accounts = useFinance((s) => s.accounts);
  const transactions = useFinance((s) => s.transactions);
  const hide = useFinance((s) => s.profile.hideBalances);
  const setProfile = useFinance((s) => s.setProfile);

  const liquid = liquidBalance(accounts);
  const { income, expenses } = monthFlow(transactions);
  const spent = spentByCategory(transactions);
  const spentEntries = Object.entries(spent)
    .filter(([cat]) => cat !== "transfer" && cat !== "salary")
    .sort((a, b) => b[1] - a[1]);
  const spentTotal = spentEntries.reduce((s, [, v]) => s + v, 0) || 1;
  const series = cashFlowSeries(transactions, 6);
  const change = pctChange(liquid, liquid - (income + expenses));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted">This month at a glance</p>
      </div>

      <section className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
        <p className="flex items-center gap-2 text-xs font-medium text-muted">
          Total balance
          <button
            type="button"
            className="text-subtle hover:text-fg"
            aria-label={hide ? "Show balances" : "Hide balances"}
            onClick={() => setProfile({ hideBalances: !hide })}
          >
            {hide ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
        </p>
        <p className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          <Money value={liquid} hidden={hide} />
        </p>
        <p className="mt-2 flex items-center gap-1 text-xs">
          {change >= 0 ? (
            <ArrowUpRight className="size-3.5 text-income" />
          ) : (
            <ArrowDownRight className="size-3.5 text-expense" />
          )}
          <span className={change >= 0 ? "text-income" : "text-expense"}>
            {change >= 0 ? "+" : ""}
            {change.toFixed(1)}% vs last month
          </span>
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
          <p className="flex items-center gap-2 text-xs font-medium text-muted">
            <span className="flex size-7 items-center justify-center rounded-full bg-income/15 text-income">
              <ArrowDownRight className="size-3.5" />
            </span>
            Income
          </p>
          <p className="mt-3 text-2xl font-semibold">
            <Money value={income} hidden={hide} />
          </p>
          <p className="mt-1 text-xs text-subtle">this month</p>
        </article>
        <article className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
          <p className="flex items-center gap-2 text-xs font-medium text-muted">
            <span className="flex size-7 items-center justify-center rounded-full bg-expense/15 text-expense">
              <ArrowUpRight className="size-3.5" />
            </span>
            Expenses
          </p>
          <p className="mt-3 text-2xl font-semibold">
            <Money value={Math.abs(expenses)} hidden={hide} />
          </p>
          <p className="mt-1 text-xs text-subtle">this month</p>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Spending overview</h2>
            <Link to="/reports" className="text-xs text-primary">
              View full report
            </Link>
          </div>
          <ul className="flex flex-col gap-3">
            {spentEntries.slice(0, 5).map(([cat, value]) => {
              const meta = CATEGORY_MAP[cat as keyof typeof CATEGORY_MAP];
              const pct = Math.round((value / spentTotal) * 100);
              return (
                <li key={cat} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
                  <span className="text-sm text-muted">{meta?.label ?? cat}</span>
                  <span className="text-sm tabular-nums">
                    <Money value={value} hidden={hide} />
                  </span>
                  <div className="col-span-2 h-1.5 overflow-hidden rounded-full bg-elevated">
                    <div
                      className={cn("h-full rounded-full", TONE_BAR[meta?.tone ?? "slate"])}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
        <article className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
          <h2 className="mb-2 text-sm font-semibold">Cash flow</h2>
          <CashFlowChart data={series} />
        </article>
      </div>

      <section className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-card)]">
        <h2 className="mb-3 px-1 text-sm font-semibold">Quick actions</h2>
        <div className="grid gap-2 sm:grid-cols-3">
          <AddTransactionDialog
            trigger={
              <Button variant="secondary" className="h-12 justify-start">
                <Plus className="size-4" /> Add transaction
              </Button>
            }
          />
          <TransferDialog
            trigger={
              <Button variant="secondary" className="h-12 justify-start">
                <Repeat className="size-4" /> Transfer
              </Button>
            }
          />
          <BudgetDialog
            trigger={
              <Button variant="secondary" className="h-12 justify-start">
                <Wallet className="size-4" /> Set budget
              </Button>
            }
          />
        </div>
      </section>
    </div>
  );
}
