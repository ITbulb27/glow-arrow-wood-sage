import type { CategoryId } from "./types";

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  tone: "teal" | "coral" | "indigo" | "amber" | "green" | "slate";
}[] = [
  { id: "food", label: "Food & Dining", tone: "teal" },
  { id: "transport", label: "Transport", tone: "coral" },
  { id: "shopping", label: "Shopping", tone: "indigo" },
  { id: "bills", label: "Bills", tone: "amber" },
  { id: "housing", label: "Housing", tone: "indigo" },
  { id: "entertainment", label: "Entertainment", tone: "coral" },
  { id: "salary", label: "Income", tone: "green" },
  { id: "transfer", label: "Transfer", tone: "slate" },
  { id: "other", label: "Other", tone: "slate" },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, (typeof CATEGORIES)[number]>;

export const EXPENSE_CATEGORIES: CategoryId[] = [
  "food",
  "transport",
  "shopping",
  "bills",
  "housing",
  "entertainment",
  "other",
];
