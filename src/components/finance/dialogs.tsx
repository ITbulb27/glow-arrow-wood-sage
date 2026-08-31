import { useState, type ReactNode, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, EXPENSE_CATEGORIES } from "@/lib/categories";
import { useFinance } from "@/lib/finance-store";
import type { AccountType, CategoryId } from "@/lib/types";

export function AddTransactionDialog({
  trigger,
  defaultKind = "expense",
}: {
  trigger: ReactNode;
  defaultKind?: "income" | "expense";
}) {
  const accounts = useFinance((s) => s.accounts);
  const addTransaction = useFinance((s) => s.addTransaction);
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<"income" | "expense">(defaultKind);
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? "");
  const [category, setCategory] = useState<CategoryId>(kind === "income" ? "salary" : "food");

  function submit(e: FormEvent) {
    e.preventDefault();
    const n = Number(amount);
    if (!merchant.trim() || !Number.isFinite(n) || n <= 0 || !accountId) return;
    addTransaction({
      merchant: merchant.trim(),
      amount: kind === "income" ? n : -n,
      accountId,
      category: kind === "income" ? "salary" : category,
      date: new Date().toISOString(),
    });
    setMerchant("");
    setAmount("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent title="Add transaction">
        <form className="flex flex-col gap-3" onSubmit={submit}>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={kind === "expense" ? "default" : "secondary"}
              onClick={() => {
                setKind("expense");
                setCategory("food");
              }}
            >
              Expense
            </Button>
            <Button
              type="button"
              variant={kind === "income" ? "default" : "secondary"}
              onClick={() => {
                setKind("income");
                setCategory("salary");
              }}
            >
              Income
            </Button>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="merchant">Merchant</Label>
            <Input
              id="merchant"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder="e.g. Urban Bistro"
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Account</Label>
            <Select value={accountId} onValueChange={setAccountId}>
              <SelectTrigger>
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name} · {a.institution}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {kind === "expense" && (
            <div className="grid gap-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as CategoryId)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((id) => (
                    <SelectItem key={id} value={id}>
                      {CATEGORIES.find((c) => c.id === id)?.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button type="submit" className="mt-2">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function TransferDialog({ trigger }: { trigger: React.ReactNode }) {
  const accounts = useFinance((s) => s.accounts);
  const transfer = useFinance((s) => s.transfer);
  const [open, setOpen] = useState(false);
  const [fromId, setFromId] = useState(accounts[0]?.id ?? "");
  const [toId, setToId] = useState(accounts[1]?.id ?? accounts[0]?.id ?? "");
  const [amount, setAmount] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) return;
    transfer(fromId, toId, n);
    setAmount("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent title="Transfer">
        <form className="flex flex-col gap-3" onSubmit={submit}>
          <div className="grid gap-1.5">
            <Label>From</Label>
            <Select value={fromId} onValueChange={setFromId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label>To</Label>
            <Select value={toId} onValueChange={setToId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="t-amount">Amount</Label>
            <Input
              id="t-amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="mt-2">
            Move money
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function BudgetDialog({ trigger }: { trigger: React.ReactNode }) {
  const addBudget = useFinance((s) => s.addBudget);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoryId>("food");
  const [limit, setLimit] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const n = Number(limit);
    if (!Number.isFinite(n) || n <= 0) return;
    addBudget({ category, limit: n });
    setLimit("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent title="Create budget">
        <form className="flex flex-col gap-3" onSubmit={submit}>
          <div className="grid gap-1.5">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as CategoryId)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((id) => (
                  <SelectItem key={id} value={id}>
                    {CATEGORIES.find((c) => c.id === id)?.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="limit">Monthly limit</Label>
            <Input
              id="limit"
              type="number"
              min="1"
              step="1"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="mt-2">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function GoalDialog({ trigger }: { trigger: React.ReactNode }) {
  const addGoal = useFinance((s) => s.addGoal);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const n = Number(target);
    if (!name.trim() || !Number.isFinite(n) || n <= 0) return;
    addGoal({
      name: name.trim(),
      target: n,
      current: 0,
      deadline: deadline || new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10),
    });
    setName("");
    setTarget("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent title="New savings goal">
        <form className="flex flex-col gap-3" onSubmit={submit}>
          <div className="grid gap-1.5">
            <Label htmlFor="g-name">Name</Label>
            <Input id="g-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="g-target">Target</Label>
            <Input
              id="g-target"
              type="number"
              min="1"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="g-date">Deadline</Label>
            <Input
              id="g-date"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-2">
            Create goal
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AccountDialog({ trigger }: { trigger: React.ReactNode }) {
  const addAccount = useFinance((s) => s.addAccount);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [type, setType] = useState<AccountType>("checking");
  const [balance, setBalance] = useState("0");

  function submit(e: FormEvent) {
    e.preventDefault();
    const n = Number(balance);
    if (!name.trim() || !institution.trim() || !Number.isFinite(n)) return;
    addAccount({ name: name.trim(), institution: institution.trim(), type, balance: n });
    setName("");
    setInstitution("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent title="Link account">
        <form className="flex flex-col gap-3" onSubmit={submit}>
          <div className="grid gap-1.5">
            <Label htmlFor="a-name">Name</Label>
            <Input id="a-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="a-inst">Institution</Label>
            <Input
              id="a-inst"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as AccountType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="a-bal">Starting balance</Label>
            <Input
              id="a-bal"
              type="number"
              step="0.01"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-2">
            Add account
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ContributeDialog({
  goalId,
  trigger,
}: {
  goalId: string;
  trigger: ReactNode;
}) {
  const accounts = useFinance((s) => s.accounts);
  const contributeGoal = useFinance((s) => s.contributeGoal);
  const [open, setOpen] = useState(false);
  const [fromId, setFromId] = useState(accounts[0]?.id ?? "");
  const [amount, setAmount] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) return;
    contributeGoal(goalId, n, fromId);
    setAmount("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent title="Add money">
        <form className="flex flex-col gap-3" onSubmit={submit}>
          <div className="grid gap-1.5">
            <Label>From account</Label>
            <Select value={fromId} onValueChange={setFromId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accounts
                  .filter((a) => a.type !== "credit")
                  .map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="c-amt">Amount</Label>
            <Input
              id="c-amt"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="mt-2">
            Contribute
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
