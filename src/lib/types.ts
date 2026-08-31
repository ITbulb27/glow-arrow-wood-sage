export type AccountType = "checking" | "savings" | "credit" | "investment";

export type CategoryId =
  | "food"
  | "transport"
  | "shopping"
  | "bills"
  | "housing"
  | "entertainment"
  | "salary"
  | "transfer"
  | "other";

export type Account = {
  id: string;
  name: string;
  institution: string;
  type: AccountType;
  balance: number;
};

export type Transaction = {
  id: string;
  accountId: string;
  merchant: string;
  amount: number;
  category: CategoryId;
  date: string;
  note?: string;
};

export type Budget = {
  id: string;
  category: CategoryId;
  limit: number;
};

export type Goal = {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
};

export type Notice = {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
};

export type Profile = {
  name: string;
  hideBalances: boolean;
};
