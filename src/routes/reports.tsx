import { createFileRoute } from "@tanstack/react-router";
import { CashFlowChart, CategoryDonut, SpendBars } from "@/components/finance/charts";
import { CATEGORY_MAP } from "@/lib/categories";
import { cashFlowSeries, spentByCategory, useFinance } from "@/lib/finance-store";

export const Route = createFileRoute("/reports")({ component: ReportsPage });

export function ReportsPage() {
  const transactions = useFinance((s) => s.transactions);
  const series = cashFlowSeries(transactions, 6);
  const spent = spentByCategory(transactions);
  const donut = Object.entries(spent)
    .filter(([cat, v]) => v > 0 && cat !== "transfer" && cat !== "salary")
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([cat, value]) => ({
      name: CATEGORY_MAP[cat as keyof typeof CATEGORY_MAP]?.label ?? cat,
      value,
    }));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Reports</h1>
        <p className="text-sm text-muted">Spending mix and cash flow</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
          <h2 className="mb-2 text-sm font-semibold">Spending by category</h2>
          {donut.length ? (
            <CategoryDonut data={donut} />
          ) : (
            <p className="py-10 text-center text-sm text-muted">No expenses this month.</p>
          )}
        </article>
        <article className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]">
          <h2 className="mb-2 text-sm font-semibold">Income vs expenses</h2>
          <SpendBars data={series} />
        </article>
        <article className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)] lg:col-span-2">
          <h2 className="mb-2 text-sm font-semibold">Cash flow</h2>
          <CashFlowChart data={series} />
        </article>
      </div>
    </div>
  );
}
