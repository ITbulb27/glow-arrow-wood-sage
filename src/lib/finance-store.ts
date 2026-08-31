import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Account,
  Budget,
  CategoryId,
  Goal,
  Notice,
  Profile,
  Transaction,
} from "./types";
import {
  SEED_ACCOUNTS,
  SEED_BUDGETS,
  SEED_GOALS,
  SEED_NOTICES,
  SEED_TRANSACTIONS,
} from "./seed";
import { currentMonthKey, monthKey } from "./format";

type FinanceState = {
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  notices: Notice[];
  profile: Profile;
  addTransaction: (input: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  addBudget: (input: Omit<Budget, "id">) => void;
  updateBudget: (id: string, patch: Partial<Budget>) => void;
  addGoal: (input: Omit<Goal, "id">) => void;
  contributeGoal: (id: string, amount: number, fromAccountId: string) => void;
  addAccount: (input: Omit<Account, "id">) => void;
  transfer: (fromId: string, toId: string, amount: number) => void;
  markNoticeRead: (id: string) => void;
  markAllNoticesRead: () => void;
  setProfile: (patch: Partial<Profile>) => void;
  resetDemo: () => void;
};

function uid() {
  return crypto.randomUUID();
}

function applyAmount(accounts: Account[], accountId: string, delta: number) {
  return accounts.map((a) =>
    a.id === accountId ? { ...a, balance: Math.round((a.balance + delta) * 100) / 100 } : a,
  );
}

const initial = {
  accounts: SEED_ACCOUNTS,
  transactions: SEED_TRANSACTIONS,
  budgets: SEED_BUDGETS,
  goals: SEED_GOALS,
  notices: SEED_NOTICES,
  profile: { name: "Alex Morgan", hideBalances: false } satisfies Profile,
};

export const useFinance = create<FinanceState>()(
  persist(
    (set, get) => ({
      ...initial,
      addTransaction: (input) => {
        const tx: Transaction = { ...input, id: uid() };
        set({
          transactions: [tx, ...get().transactions],
          accounts: applyAmount(get().accounts, tx.accountId, tx.amount),
        });
      },
      deleteTransaction: (id) => {
        const tx = get().transactions.find((t) => t.id === id);
        if (!tx) return;
        set({
          transactions: get().transactions.filter((t) => t.id !== id),
          accounts: applyAmount(get().accounts, tx.accountId, -tx.amount),
        });
      },
      addBudget: (input) => {
        set({ budgets: [...get().budgets, { ...input, id: uid() }] });
      },
      updateBudget: (id, patch) => {
        set({
          budgets: get().budgets.map((b) => (b.id === id ? { ...b, ...patch } : b)),
        });
      },
      addGoal: (input) => {
        set({ goals: [...get().goals, { ...input, id: uid() }] });
      },
      contributeGoal: (id, amount, fromAccountId) => {
        if (amount <= 0) return;
        const goal = get().goals.find((g) => g.id === id);
        if (!goal) return;
        set({
          goals: get().goals.map((g) =>
            g.id === id ? { ...g, current: Math.round((g.current + amount) * 100) / 100 } : g,
          ),
          accounts: applyAmount(get().accounts, fromAccountId, -amount),
          transactions: [
            {
              id: uid(),
              accountId: fromAccountId,
              merchant: `Goal: ${goal.name}`,
              amount: -amount,
              category: "transfer",
              date: new Date().toISOString(),
            },
            ...get().transactions,
          ],
        });
      },
      addAccount: (input) => {
        set({ accounts: [...get().accounts, { ...input, id: uid() }] });
      },
      transfer: (fromId, toId, amount) => {
        if (amount <= 0 || fromId === toId) return;
        const from = get().accounts.find((a) => a.id === fromId);
        const to = get().accounts.find((a) => a.id === toId);
        if (!from || !to) return;
        const now = new Date().toISOString();
        set({
          accounts: applyAmount(applyAmount(get().accounts, fromId, -amount), toId, amount),
          transactions: [
            {
              id: uid(),
              accountId: fromId,
              merchant: `Transfer to ${to.name}`,
              amount: -amount,
              category: "transfer",
              date: now,
            },
            {
              id: uid(),
              accountId: toId,
              merchant: `Transfer from ${from.name}`,
              amount,
              category: "transfer",
              date: now,
            },
            ...get().transactions,
          ],
        });
      },
      markNoticeRead: (id) => {
        set({
          notices: get().notices.map((n) => (n.id === id ? { ...n, read: true } : n)),
        });
      },
      markAllNoticesRead: () => {
        set({ notices: get().notices.map((n) => ({ ...n, read: true })) });
      },
      setProfile: (patch) => {
        set({ profile: { ...get().profile, ...patch } });
      },
      resetDemo: () => set({ ...initial }),
    }),
    { name: "finora-v1", skipHydration: true },
  ),
);

export function liquidBalance(accounts: Account[]) {
  return accounts
    .filter((a) => a.type !== "investment")
    .reduce((s, a) => s + a.balance, 0);
}

export function netWorth(accounts: Account[]) {
  return accounts.reduce((s, a) => s + a.balance, 0);
}

export function monthFlow(transactions: Transaction[], key = currentMonthKey()) {
  const inMonth = transactions.filter((t) => monthKey(t.date) === key);
  const income = inMonth.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expenses = inMonth.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);
  return { income, expenses, net: income + expenses, items: inMonth };
}

export function spentByCategory(
  transactions: Transaction[],
  key = currentMonthKey(),
): Record<CategoryId, number> {
  const out = {} as Record<CategoryId, number>;
  for (const t of transactions) {
    if (monthKey(t.date) !== key || t.amount >= 0) continue;
    out[t.category] = (out[t.category] ?? 0) + Math.abs(t.amount);
  }
  return out;
}

export function cashFlowSeries(transactions: Transaction[], months = 6) {
  const now = new Date();
  const points: { key: string; label: string; income: number; expenses: number }[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const { income, expenses } = monthFlow(transactions, key);
    points.push({
      key,
      label: d.toLocaleString("en-US", { month: "short" }),
      income,
      expenses: Math.abs(expenses),
    });
  }
  return points;
}
