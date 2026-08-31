import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  Target,
  Wallet,
  BarChart3,
  Settings,
  Menu,
  Search,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useFinance } from "@/lib/finance-store";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/accounts", label: "Accounts", icon: Wallet },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/budgets", label: "Budgets", icon: PieChart },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors duration-150",
              active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/60 hover:text-fg",
            )}
          >
            <Icon className={cn("size-4", active && "text-primary")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-1">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-fg">
        F
      </span>
      <span className="text-[15px] font-semibold tracking-tight">Finora</span>
    </Link>
  );
}

function Notices() {
  const notices = useFinance((s) => s.notices);
  const mark = useFinance((s) => s.markNoticeRead);
  const markAll = useFinance((s) => s.markAllNoticesRead);
  const unread = notices.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="size-4" />
          {unread > 0 && (
            <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-primary" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-2">
        <div className="mb-1 flex items-center justify-between px-2 py-1">
          <p className="text-xs font-medium text-muted">Notifications</p>
          {unread > 0 && (
            <button
              type="button"
              className="text-xs text-primary"
              onClick={() => markAll()}
            >
              Mark all read
            </button>
          )}
        </div>
        {notices.length === 0 && (
          <p className="px-2 py-6 text-center text-sm text-muted">You are all caught up.</p>
        )}
        {notices.map((n) => (
          <DropdownMenuItem
            key={n.id}
            className="flex-col items-start gap-0.5 py-3"
            onSelect={() => mark(n.id)}
          >
            <span className={cn("text-sm", !n.read && "font-medium")}>{n.title}</span>
            <span className="text-xs text-muted">{n.body}</span>
            <span className="text-[11px] text-subtle">{formatDateTime(n.date)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const profile = useFinance((s) => s.profile);
  const [q, setQ] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    void useFinance.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col gap-6 border-r border-border bg-bg p-4 lg:flex">
        <Brand />
        <NavLinks />
      </aside>

      <div className="lg:pl-56">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-bg/90 px-4 backdrop-blur-sm">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent title="Finora">
              <NavLinks onNavigate={() => setSheetOpen(false)} />
            </SheetContent>
          </Sheet>
          <div className="lg:hidden">
            <Brand />
          </div>
          <form
            className="relative mx-auto hidden max-w-md flex-1 md:block"
            onSubmit={(e) => {
              e.preventDefault();
              void navigate({ to: "/transactions", search: { q } });
            }}
          >
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search transactions, accounts, reports…"
              className="h-10 pl-9"
              aria-label="Search"
            />
          </form>
          <div className="ml-auto flex items-center gap-1">
            <Notices />
            <Link
              to="/settings"
              className="ml-1 flex items-center gap-2 rounded-full py-1 pr-2 pl-1 hover:bg-elevated"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-elevated text-xs font-semibold">
                {profile.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className="hidden text-sm sm:inline">{profile.name}</span>
            </Link>
          </div>
        </header>

        <main className="px-4 py-6 pb-24 lg:px-8 lg:pb-8">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-bg/95 px-1 py-1 backdrop-blur-sm lg:hidden">
        {NAV.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex min-h-12 flex-col items-center justify-center gap-0.5 text-[10px] text-muted"
              activeProps={{ className: "text-primary" }}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
