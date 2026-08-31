import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as ChartColumn, a as Target, b as ArrowLeftRight, d as LayoutDashboard, g as ChartPie, h as Check, i as Trash2, l as Plus, m as ChevronDown, n as Wallet, o as Settings, r as TriangleAlert, s as Search, t as X, u as Menu, v as Bell } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent$1, s as DialogTrigger$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Trigger, i as Root2, n as Item2, r as Portal2, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cmkzliye.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[opacity,transform,background-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:opacity-90",
			secondary: "bg-elevated text-fg shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]",
			ghost: "text-muted hover:bg-elevated hover:text-fg",
			outline: "bg-transparent text-fg shadow-[var(--shadow-card)] hover:bg-elevated",
			danger: "bg-expense/15 text-expense hover:bg-expense/25"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset: 8,
		className: cn("z-50 min-w-56 overflow-hidden rounded-xl bg-surface p-1 shadow-[var(--shadow-card)]", className),
		...props
	}) });
}
function DropdownMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm outline-none data-[highlighted]:bg-elevated", className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-lg bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-card)] placeholder:text-subtle outline-none transition-[box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-primary/60", className),
		...props
	});
}
var Sheet = Dialog$1;
var SheetTrigger = DialogTrigger$1;
function SheetContent({ className, children, title, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)] flex-col bg-surface p-4 shadow-[var(--shadow-card)] outline-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-sm font-semibold",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				className: "flex size-10 items-center justify-center rounded-lg text-muted hover:bg-elevated hover:text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}), children]
	})] });
}
function iso(y, m, d, h = 12, min = 0) {
	return new Date(y, m - 1, d, h, min).toISOString();
}
var SEED_ACCOUNTS = [
	{
		id: "acc-checking",
		name: "Checking",
		institution: "Chase",
		type: "checking",
		balance: 14210.57
	},
	{
		id: "acc-savings",
		name: "Savings",
		institution: "Ally",
		type: "savings",
		balance: 11880.15
	},
	{
		id: "acc-credit",
		name: "Credit Card",
		institution: "Amex",
		type: "credit",
		balance: -1240.3
	},
	{
		id: "acc-invest",
		name: "Investment",
		institution: "Fidelity",
		type: "investment",
		balance: 45680
	}
];
var SEED_TRANSACTIONS = [
	{
		id: "tx-1",
		accountId: "acc-checking",
		merchant: "Northwind Payroll",
		amount: 3850,
		category: "salary",
		date: iso(2026, 8, 23, 9, 15)
	},
	{
		id: "tx-2",
		accountId: "acc-checking",
		merchant: "Studio invoice",
		amount: 2390,
		category: "salary",
		date: iso(2026, 8, 8, 11, 2)
	},
	{
		id: "tx-3",
		accountId: "acc-credit",
		merchant: "Urban Bistro",
		amount: -32.5,
		category: "food",
		date: iso(2026, 8, 24, 19, 42)
	},
	{
		id: "tx-4",
		accountId: "acc-credit",
		merchant: "Uber Ride",
		amount: -18.9,
		category: "transport",
		date: iso(2026, 8, 24, 17, 31)
	},
	{
		id: "tx-5",
		accountId: "acc-checking",
		merchant: "Amazon",
		amount: -67.49,
		category: "shopping",
		date: iso(2026, 8, 22, 20, 7)
	},
	{
		id: "tx-6",
		accountId: "acc-credit",
		merchant: "Shell Fuel",
		amount: -45,
		category: "transport",
		date: iso(2026, 8, 22, 18, 18)
	},
	{
		id: "tx-7",
		accountId: "acc-checking",
		merchant: "Whole Foods",
		amount: -128.4,
		category: "food",
		date: iso(2026, 8, 20, 16, 10)
	},
	{
		id: "tx-8",
		accountId: "acc-checking",
		merchant: "PG&E",
		amount: -142,
		category: "bills",
		date: iso(2026, 8, 18, 8, 0)
	},
	{
		id: "tx-9",
		accountId: "acc-checking",
		merchant: "Net",
		amount: -18.99,
		category: "entertainment",
		date: iso(2026, 8, 15, 7, 12)
	},
	{
		id: "tx-10",
		accountId: "acc-credit",
		merchant: "Apple Store",
		amount: -189,
		category: "shopping",
		date: iso(2026, 8, 14, 15, 40)
	},
	{
		id: "tx-11",
		accountId: "acc-checking",
		merchant: "Blue Bottle",
		amount: -6.75,
		category: "food",
		date: iso(2026, 8, 13, 8, 22)
	},
	{
		id: "tx-12",
		accountId: "acc-checking",
		merchant: "BART",
		amount: -86,
		category: "transport",
		date: iso(2026, 8, 12, 9, 5)
	},
	{
		id: "tx-13",
		accountId: "acc-checking",
		merchant: "Spotify",
		amount: -11.99,
		category: "entertainment",
		date: iso(2026, 8, 11, 6, 0)
	},
	{
		id: "tx-14",
		accountId: "acc-checking",
		merchant: "Landlord LLC",
		amount: -1850,
		category: "housing",
		date: iso(2026, 8, 1, 9, 0)
	},
	{
		id: "tx-15",
		accountId: "acc-checking",
		merchant: "Trader Joe's",
		amount: -64.2,
		category: "food",
		date: iso(2026, 8, 9, 18, 30)
	},
	{
		id: "tx-16",
		accountId: "acc-checking",
		merchant: "AT&T",
		amount: -89,
		category: "bills",
		date: iso(2026, 8, 5, 10, 0)
	},
	{
		id: "tx-17",
		accountId: "acc-checking",
		merchant: "Northwind Payroll",
		amount: 3850,
		category: "salary",
		date: iso(2026, 7, 23, 9, 15)
	},
	{
		id: "tx-18",
		accountId: "acc-checking",
		merchant: "Whole Foods",
		amount: -154.1,
		category: "food",
		date: iso(2026, 7, 19, 17, 0)
	},
	{
		id: "tx-19",
		accountId: "acc-checking",
		merchant: "Landlord LLC",
		amount: -1850,
		category: "housing",
		date: iso(2026, 7, 1, 9, 0)
	},
	{
		id: "tx-20",
		accountId: "acc-checking",
		merchant: "Northwind Payroll",
		amount: 3850,
		category: "salary",
		date: iso(2026, 6, 23, 9, 15)
	},
	{
		id: "tx-21",
		accountId: "acc-checking",
		merchant: "Landlord LLC",
		amount: -1850,
		category: "housing",
		date: iso(2026, 6, 1, 9, 0)
	},
	{
		id: "tx-22",
		accountId: "acc-checking",
		merchant: "Northwind Payroll",
		amount: 3700,
		category: "salary",
		date: iso(2026, 5, 23, 9, 15)
	},
	{
		id: "tx-23",
		accountId: "acc-checking",
		merchant: "Landlord LLC",
		amount: -1800,
		category: "housing",
		date: iso(2026, 5, 1, 9, 0)
	},
	{
		id: "tx-24",
		accountId: "acc-checking",
		merchant: "Northwind Payroll",
		amount: 3700,
		category: "salary",
		date: iso(2026, 4, 23, 9, 15)
	},
	{
		id: "tx-25",
		accountId: "acc-checking",
		merchant: "Landlord LLC",
		amount: -1800,
		category: "housing",
		date: iso(2026, 4, 1, 9, 0)
	},
	{
		id: "tx-26",
		accountId: "acc-checking",
		merchant: "Northwind Payroll",
		amount: 3600,
		category: "salary",
		date: iso(2026, 3, 23, 9, 15)
	},
	{
		id: "tx-27",
		accountId: "acc-checking",
		merchant: "Landlord LLC",
		amount: -1800,
		category: "housing",
		date: iso(2026, 3, 1, 9, 0)
	}
];
var SEED_BUDGETS = [
	{
		id: "b-food",
		category: "food",
		limit: 600
	},
	{
		id: "b-transport",
		category: "transport",
		limit: 250
	},
	{
		id: "b-shopping",
		category: "shopping",
		limit: 400
	},
	{
		id: "b-entertainment",
		category: "entertainment",
		limit: 150
	},
	{
		id: "b-bills",
		category: "bills",
		limit: 280
	}
];
var SEED_GOALS = [
	{
		id: "g-emergency",
		name: "Emergency Fund",
		target: 12e3,
		current: 8400,
		deadline: "2026-12-31"
	},
	{
		id: "g-laptop",
		name: "New Laptop",
		target: 1800,
		current: 1150,
		deadline: "2026-10-15"
	},
	{
		id: "g-vacation",
		name: "Vacation",
		target: 5e3,
		current: 3200,
		deadline: "2026-11-01"
	},
	{
		id: "g-house",
		name: "House Down Payment",
		target: 5e4,
		current: 22500,
		deadline: "2028-03-01"
	}
];
var SEED_NOTICES = [
	{
		id: "n-1",
		title: "Amex payment due",
		body: "Minimum payment of $45 is due in 4 days.",
		date: iso(2026, 8, 31, 8, 0),
		read: false
	},
	{
		id: "n-2",
		title: "Shopping budget at 80%",
		body: "You have $80 remaining in Shopping this month.",
		date: iso(2026, 8, 28, 12, 0),
		read: false
	},
	{
		id: "n-3",
		title: "Salary deposited",
		body: "Northwind Payroll +$3,850.00 posted to Checking.",
		date: iso(2026, 8, 23, 9, 20),
		read: true
	}
];
var money = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 2
});
var moneyCompact = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	notation: "compact",
	maximumFractionDigits: 1
});
var dateFmt = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric"
});
var dateTimeFmt = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
	hour: "numeric",
	minute: "2-digit"
});
function formatMoney(n) {
	return money.format(n);
}
function formatMoneyCompact(n) {
	return moneyCompact.format(n);
}
function formatSigned(n) {
	const abs = money.format(Math.abs(n));
	if (n > 0) return `+${abs}`;
	if (n < 0) return `-${abs}`;
	return abs;
}
function formatDate(iso) {
	return dateFmt.format(new Date(iso));
}
function formatDateTime(iso) {
	return dateTimeFmt.format(new Date(iso));
}
function monthKey(iso) {
	const d = new Date(iso);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function currentMonthKey() {
	return monthKey((/* @__PURE__ */ new Date()).toISOString());
}
function pctChange(current, previous) {
	if (previous === 0) return current === 0 ? 0 : 100;
	return (current - previous) / Math.abs(previous) * 100;
}
function uid() {
	return crypto.randomUUID();
}
function applyAmount(accounts, accountId, delta) {
	return accounts.map((a) => a.id === accountId ? {
		...a,
		balance: Math.round((a.balance + delta) * 100) / 100
	} : a);
}
var initial = {
	accounts: SEED_ACCOUNTS,
	transactions: SEED_TRANSACTIONS,
	budgets: SEED_BUDGETS,
	goals: SEED_GOALS,
	notices: SEED_NOTICES,
	profile: {
		name: "Alex Morgan",
		hideBalances: false
	}
};
var useFinance = create()(persist((set, get) => ({
	...initial,
	addTransaction: (input) => {
		const tx = {
			...input,
			id: uid()
		};
		set({
			transactions: [tx, ...get().transactions],
			accounts: applyAmount(get().accounts, tx.accountId, tx.amount)
		});
	},
	deleteTransaction: (id) => {
		const tx = get().transactions.find((t) => t.id === id);
		if (!tx) return;
		set({
			transactions: get().transactions.filter((t) => t.id !== id),
			accounts: applyAmount(get().accounts, tx.accountId, -tx.amount)
		});
	},
	addBudget: (input) => {
		set({ budgets: [...get().budgets, {
			...input,
			id: uid()
		}] });
	},
	updateBudget: (id, patch) => {
		set({ budgets: get().budgets.map((b) => b.id === id ? {
			...b,
			...patch
		} : b) });
	},
	addGoal: (input) => {
		set({ goals: [...get().goals, {
			...input,
			id: uid()
		}] });
	},
	contributeGoal: (id, amount, fromAccountId) => {
		if (amount <= 0) return;
		const goal = get().goals.find((g) => g.id === id);
		if (!goal) return;
		set({
			goals: get().goals.map((g) => g.id === id ? {
				...g,
				current: Math.round((g.current + amount) * 100) / 100
			} : g),
			accounts: applyAmount(get().accounts, fromAccountId, -amount),
			transactions: [{
				id: uid(),
				accountId: fromAccountId,
				merchant: `Goal: ${goal.name}`,
				amount: -amount,
				category: "transfer",
				date: (/* @__PURE__ */ new Date()).toISOString()
			}, ...get().transactions]
		});
	},
	addAccount: (input) => {
		set({ accounts: [...get().accounts, {
			...input,
			id: uid()
		}] });
	},
	transfer: (fromId, toId, amount) => {
		if (amount <= 0 || fromId === toId) return;
		const from = get().accounts.find((a) => a.id === fromId);
		const to = get().accounts.find((a) => a.id === toId);
		if (!from || !to) return;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		set({
			accounts: applyAmount(applyAmount(get().accounts, fromId, -amount), toId, amount),
			transactions: [
				{
					id: uid(),
					accountId: fromId,
					merchant: `Transfer to ${to.name}`,
					amount: -amount,
					category: "transfer",
					date: now
				},
				{
					id: uid(),
					accountId: toId,
					merchant: `Transfer from ${from.name}`,
					amount,
					category: "transfer",
					date: now
				},
				...get().transactions
			]
		});
	},
	markNoticeRead: (id) => {
		set({ notices: get().notices.map((n) => n.id === id ? {
			...n,
			read: true
		} : n) });
	},
	markAllNoticesRead: () => {
		set({ notices: get().notices.map((n) => ({
			...n,
			read: true
		})) });
	},
	setProfile: (patch) => {
		set({ profile: {
			...get().profile,
			...patch
		} });
	},
	resetDemo: () => set({ ...initial })
}), {
	name: "finora-v1",
	skipHydration: true
}));
function liquidBalance(accounts) {
	return accounts.filter((a) => a.type !== "investment").reduce((s, a) => s + a.balance, 0);
}
function netWorth(accounts) {
	return accounts.reduce((s, a) => s + a.balance, 0);
}
function monthFlow(transactions, key = currentMonthKey()) {
	const inMonth = transactions.filter((t) => monthKey(t.date) === key);
	const income = inMonth.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
	const expenses = inMonth.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);
	return {
		income,
		expenses,
		net: income + expenses,
		items: inMonth
	};
}
function spentByCategory(transactions, key = currentMonthKey()) {
	const out = {};
	for (const t of transactions) {
		if (monthKey(t.date) !== key || t.amount >= 0) continue;
		out[t.category] = (out[t.category] ?? 0) + Math.abs(t.amount);
	}
	return out;
}
function cashFlowSeries(transactions, months = 6) {
	const now = /* @__PURE__ */ new Date();
	const points = [];
	for (let i = months - 1; i >= 0; i--) {
		const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
		const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
		const { income, expenses } = monthFlow(transactions, key);
		points.push({
			key,
			label: d.toLocaleString("en-US", { month: "short" }),
			income,
			expenses: Math.abs(expenses)
		});
	}
	return points;
}
var NAV = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/accounts",
		label: "Accounts",
		icon: Wallet
	},
	{
		to: "/transactions",
		label: "Transactions",
		icon: ArrowLeftRight
	},
	{
		to: "/budgets",
		label: "Budgets",
		icon: ChartPie
	},
	{
		to: "/goals",
		label: "Goals",
		icon: Target
	},
	{
		to: "/reports",
		label: "Reports",
		icon: ChartColumn
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function NavLinks({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-1",
		children: NAV.map((item) => {
			const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: cn("flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors duration-150", active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/60 hover:text-fg"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4", active && "text-primary") }), item.label]
			}, item.to);
		})
	});
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-2.5 px-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-fg",
			children: "F"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[15px] font-semibold tracking-tight",
			children: "Finora"
		})]
	});
}
function Notices() {
	const notices = useFinance((s) => s.notices);
	const mark = useFinance((s) => s.markNoticeRead);
	const markAll = useFinance((s) => s.markAllNoticesRead);
	const unread = notices.filter((n) => !n.read).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon",
			"aria-label": "Notifications",
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2.5 right-2.5 size-1.5 rounded-full bg-primary" })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		className: "w-80 p-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-center justify-between px-2 py-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium text-muted",
					children: "Notifications"
				}), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs text-primary",
					onClick: () => markAll(),
					children: "Mark all read"
				})]
			}),
			notices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 py-6 text-center text-sm text-muted",
				children: "You are all caught up."
			}),
			notices.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				className: "flex-col items-start gap-0.5 py-3",
				onSelect: () => mark(n.id),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-sm", !n.read && "font-medium"),
						children: n.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: n.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-subtle",
						children: formatDateTime(n.date)
					})
				]
			}, n.id))
		]
	})] });
}
function AppShell({ children }) {
	const profile = useFinance((s) => s.profile);
	const [q, setQ] = (0, import_react.useState)("");
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		useFinance.persist.rehydrate();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-56 flex-col gap-6 border-r border-border bg-bg p-4 lg:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-56",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-bg/90 px-4 backdrop-blur-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open: sheetOpen,
							onOpenChange: setSheetOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "lg:hidden",
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
								title: "Finora",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, { onNavigate: () => setSheetOpen(false) })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "relative mx-auto hidden max-w-md flex-1 md:block",
							onSubmit: (e) => {
								e.preventDefault();
								navigate({
									to: "/transactions",
									search: { q }
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search transactions, accounts, reports…",
								className: "h-10 pl-9",
								"aria-label": "Search"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notices, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/settings",
								className: "ml-1 flex items-center gap-2 rounded-full py-1 pr-2 pl-1 hover:bg-elevated",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-8 items-center justify-center rounded-full bg-elevated text-xs font-semibold",
									children: profile.name.split(" ").map((p) => p[0]).slice(0, 2).join("")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-sm sm:inline",
									children: profile.name
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-4 py-6 pb-24 lg:px-8 lg:pb-8",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-bg/95 px-1 py-1 backdrop-blur-sm lg:hidden",
				children: NAV.slice(0, 5).map((item) => {
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[10px] text-muted",
						activeProps: { className: "text-primary" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
					}, item.to);
				})
			})
		]
	});
}
var styles_default = "/assets/styles-BkQCw1hI.css";
var APP_NAME = "Finora";
var Route$7 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0a1018"
			},
			{
				name: "description",
				content: "Finora — track income, expenses, budgets, and savings in one calm dashboard."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter = () => import("./routes-DiaxMYRB.mjs");
var Route$6 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
function DialogContent({ className, children, title, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)] outline-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-base font-semibold tracking-tight",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				className: "flex size-9 items-center justify-center rounded-lg text-muted hover:bg-elevated hover:text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}), children]
	})] });
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-xs font-medium text-muted", className),
		...props
	});
}
var Select = Select$1;
var SelectValue = SelectValue$1;
function SelectTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		className: cn("flex h-11 w-full items-center justify-between gap-2 rounded-lg bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-card)] outline-none focus-visible:ring-2 focus-visible:ring-primary/60", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted" }) })]
	});
}
function SelectContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
		className: cn("z-50 overflow-hidden rounded-xl bg-surface p-1 shadow-[var(--shadow-card)]", className),
		position: "popper",
		sideOffset: 6,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: "min-w-[var(--radix-select-trigger-width)]",
			children
		})
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		className: cn("relative flex h-10 cursor-pointer items-center rounded-lg px-3 pr-8 text-sm outline-none data-[highlighted]:bg-elevated", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, {
			className: "absolute right-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-primary" })
		})]
	});
}
var CATEGORIES = [
	{
		id: "food",
		label: "Food & Dining",
		tone: "teal"
	},
	{
		id: "transport",
		label: "Transport",
		tone: "coral"
	},
	{
		id: "shopping",
		label: "Shopping",
		tone: "indigo"
	},
	{
		id: "bills",
		label: "Bills",
		tone: "amber"
	},
	{
		id: "housing",
		label: "Housing",
		tone: "indigo"
	},
	{
		id: "entertainment",
		label: "Entertainment",
		tone: "coral"
	},
	{
		id: "salary",
		label: "Income",
		tone: "green"
	},
	{
		id: "transfer",
		label: "Transfer",
		tone: "slate"
	},
	{
		id: "other",
		label: "Other",
		tone: "slate"
	}
];
var CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
var EXPENSE_CATEGORIES = [
	"food",
	"transport",
	"shopping",
	"bills",
	"housing",
	"entertainment",
	"other"
];
function AddTransactionDialog({ trigger, defaultKind = "expense" }) {
	const accounts = useFinance((s) => s.accounts);
	const addTransaction = useFinance((s) => s.addTransaction);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [kind, setKind] = (0, import_react.useState)(defaultKind);
	const [merchant, setMerchant] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [accountId, setAccountId] = (0, import_react.useState)(accounts[0]?.id ?? "");
	const [category, setCategory] = (0, import_react.useState)(kind === "income" ? "salary" : "food");
	function submit(e) {
		e.preventDefault();
		const n = Number(amount);
		if (!merchant.trim() || !Number.isFinite(n) || n <= 0 || !accountId) return;
		addTransaction({
			merchant: merchant.trim(),
			amount: kind === "income" ? n : -n,
			accountId,
			category: kind === "income" ? "salary" : category,
			date: (/* @__PURE__ */ new Date()).toISOString()
		});
		setMerchant("");
		setAmount("");
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: "Add transaction",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: kind === "expense" ? "default" : "secondary",
							onClick: () => {
								setKind("expense");
								setCategory("food");
							},
							children: "Expense"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: kind === "income" ? "default" : "secondary",
							onClick: () => {
								setKind("income");
								setCategory("salary");
							},
							children: "Income"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "merchant",
							children: "Merchant"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "merchant",
							value: merchant,
							onChange: (e) => setMerchant(e.target.value),
							placeholder: "e.g. Urban Bistro",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "amount",
							children: "Amount"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "amount",
							type: "number",
							min: "0.01",
							step: "0.01",
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							placeholder: "0.00",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Account" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: accountId,
							onValueChange: setAccountId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Account" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: a.id,
								children: [
									a.name,
									" · ",
									a.institution
								]
							}, a.id)) })]
						})]
					}),
					kind === "expense" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: category,
							onValueChange: (v) => setCategory(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: EXPENSE_CATEGORIES.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: id,
								children: CATEGORIES.find((c) => c.id === id)?.label
							}, id)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2",
						children: "Save"
					})
				]
			})
		})]
	});
}
function TransferDialog({ trigger }) {
	const accounts = useFinance((s) => s.accounts);
	const transfer = useFinance((s) => s.transfer);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [fromId, setFromId] = (0, import_react.useState)(accounts[0]?.id ?? "");
	const [toId, setToId] = (0, import_react.useState)(accounts[1]?.id ?? accounts[0]?.id ?? "");
	const [amount, setAmount] = (0, import_react.useState)("");
	function submit(e) {
		e.preventDefault();
		const n = Number(amount);
		if (!Number.isFinite(n) || n <= 0) return;
		transfer(fromId, toId, n);
		setAmount("");
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: "Transfer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "From" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: fromId,
							onValueChange: setFromId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: a.id,
								children: a.name
							}, a.id)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "To" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: toId,
							onValueChange: setToId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: a.id,
								children: a.name
							}, a.id)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "t-amount",
							children: "Amount"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "t-amount",
							type: "number",
							min: "0.01",
							step: "0.01",
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2",
						children: "Move money"
					})
				]
			})
		})]
	});
}
function BudgetDialog({ trigger }) {
	const addBudget = useFinance((s) => s.addBudget);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("food");
	const [limit, setLimit] = (0, import_react.useState)("");
	function submit(e) {
		e.preventDefault();
		const n = Number(limit);
		if (!Number.isFinite(n) || n <= 0) return;
		addBudget({
			category,
			limit: n
		});
		setLimit("");
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: "Create budget",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: category,
							onValueChange: (v) => setCategory(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: EXPENSE_CATEGORIES.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: id,
								children: CATEGORIES.find((c) => c.id === id)?.label
							}, id)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "limit",
							children: "Monthly limit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "limit",
							type: "number",
							min: "1",
							step: "1",
							value: limit,
							onChange: (e) => setLimit(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2",
						children: "Create"
					})
				]
			})
		})]
	});
}
function GoalDialog({ trigger }) {
	const addGoal = useFinance((s) => s.addGoal);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [target, setTarget] = (0, import_react.useState)("");
	const [deadline, setDeadline] = (0, import_react.useState)("");
	function submit(e) {
		e.preventDefault();
		const n = Number(target);
		if (!name.trim() || !Number.isFinite(n) || n <= 0) return;
		addGoal({
			name: name.trim(),
			target: n,
			current: 0,
			deadline: deadline || new Date(Date.now() + 15552e6).toISOString().slice(0, 10)
		});
		setName("");
		setTarget("");
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: "New savings goal",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "g-name",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "g-name",
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "g-target",
							children: "Target"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "g-target",
							type: "number",
							min: "1",
							value: target,
							onChange: (e) => setTarget(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "g-date",
							children: "Deadline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "g-date",
							type: "date",
							value: deadline,
							onChange: (e) => setDeadline(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2",
						children: "Create goal"
					})
				]
			})
		})]
	});
}
function AccountDialog({ trigger }) {
	const addAccount = useFinance((s) => s.addAccount);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [institution, setInstitution] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("checking");
	const [balance, setBalance] = (0, import_react.useState)("0");
	function submit(e) {
		e.preventDefault();
		const n = Number(balance);
		if (!name.trim() || !institution.trim() || !Number.isFinite(n)) return;
		addAccount({
			name: name.trim(),
			institution: institution.trim(),
			type,
			balance: n
		});
		setName("");
		setInstitution("");
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: "Link account",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "a-name",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "a-name",
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "a-inst",
							children: "Institution"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "a-inst",
							value: institution,
							onChange: (e) => setInstitution(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: type,
							onValueChange: (v) => setType(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "checking",
									children: "Checking"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "savings",
									children: "Savings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "credit",
									children: "Credit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "investment",
									children: "Investment"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "a-bal",
							children: "Starting balance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "a-bal",
							type: "number",
							step: "0.01",
							value: balance,
							onChange: (e) => setBalance(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2",
						children: "Add account"
					})
				]
			})
		})]
	});
}
function ContributeDialog({ goalId, trigger }) {
	const accounts = useFinance((s) => s.accounts);
	const contributeGoal = useFinance((s) => s.contributeGoal);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [fromId, setFromId] = (0, import_react.useState)(accounts[0]?.id ?? "");
	const [amount, setAmount] = (0, import_react.useState)("");
	function submit(e) {
		e.preventDefault();
		const n = Number(amount);
		if (!Number.isFinite(n) || n <= 0) return;
		contributeGoal(goalId, n, fromId);
		setAmount("");
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: "Add money",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "From account" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: fromId,
							onValueChange: setFromId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: accounts.filter((a) => a.type !== "credit").map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: a.id,
								children: a.name
							}, a.id)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "c-amt",
							children: "Amount"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "c-amt",
							type: "number",
							min: "0.01",
							step: "0.01",
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2",
						children: "Contribute"
					})
				]
			})
		})]
	});
}
function Money({ value, signed = false, hidden = false, className }) {
	const text = hidden ? "••••••" : signed ? formatSigned(value) : formatMoney(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("tabular-nums tracking-tight", signed && !hidden ? value > 0 ? "text-income" : value < 0 ? "text-expense" : "text-fg" : void 0, className),
		children: text
	});
}
var Route$5 = createFileRoute("/accounts")({ component: AccountsPage });
var TYPE_LABEL = {
	checking: "Checking",
	savings: "Savings",
	credit: "Credit",
	investment: "Investment"
};
function AccountsPage() {
	const accounts = useFinance((s) => s.accounts);
	const hide = useFinance((s) => s.profile.hideBalances);
	const worth = netWorth(accounts);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: "Accounts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: ["Net worth ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
					value: worth,
					hidden: hide
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransferDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					children: "Transfer"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Link account"] }) })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted",
						children: TYPE_LABEL[a.type]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-base font-semibold",
						children: a.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: a.institution
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-2xl font-semibold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
							value: a.balance,
							hidden: hide
						})
					})
				]
			}, a.id))
		})]
	});
}
var Route$4 = createFileRoute("/budgets")({ component: BudgetsPage });
function BudgetsPage() {
	const budgets = useFinance((s) => s.budgets);
	const transactions = useFinance((s) => s.transactions);
	const hide = useFinance((s) => s.profile.hideBalances);
	const spent = spentByCategory(transactions);
	const totalLimit = budgets.reduce((s, b) => s + b.limit, 0);
	const totalSpent = budgets.reduce((s, b) => s + (spent[b.category] ?? 0), 0);
	const used = totalLimit ? Math.min(100, Math.round(totalSpent / totalLimit * 100)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight",
					children: "Budgets"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Spending limits for this month"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Create budget"] }) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted",
						children: "Monthly budget"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-2xl font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
							value: totalSpent,
							hidden: hide
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-base font-normal text-muted",
							children: [
								" ",
								"of ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
									value: totalLimit,
									hidden: hide
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-2 overflow-hidden rounded-full bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-primary",
							style: { width: `${used}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted",
						children: [used, "% used"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: budgets.map((b) => {
					const usedAmt = spent[b.category] ?? 0;
					const pct = Math.min(100, Math.round(usedAmt / b.limit * 100));
					const over = usedAmt > b.limit;
					const meta = CATEGORY_MAP[b.category];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-semibold",
									children: meta.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xl font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
										value: usedAmt,
										hidden: hide
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-normal text-muted",
										children: [
											" ",
											"/ ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
												value: b.limit,
												hidden: hide
											})
										]
									})]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative size-14 shrink-0",
									"aria-hidden": true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										viewBox: "0 0 36 36",
										className: "-rotate-90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "18",
											cy: "18",
											r: "14",
											fill: "none",
											stroke: "currentColor",
											className: "text-elevated",
											strokeWidth: "4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "18",
											cy: "18",
											r: "14",
											fill: "none",
											stroke: "currentColor",
											className: over ? "text-expense" : "text-primary",
											strokeWidth: "4",
											strokeDasharray: `${pct / 100 * 88} 88`,
											strokeLinecap: "round"
										})]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs text-muted",
								children: ["Remaining ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
									value: Math.max(0, b.limit - usedAmt),
									hidden: hide
								})]
							}),
							over && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-expense",
								children: ["Over by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
									value: usedAmt - b.limit,
									hidden: hide
								})]
							})
						]
					}, b.id);
				})
			})
		]
	});
}
var Route$3 = createFileRoute("/goals")({ component: GoalsPage });
function GoalsPage() {
	const goals = useFinance((s) => s.goals);
	const hide = useFinance((s) => s.profile.hideBalances);
	const total = goals.reduce((s, g) => s + g.current, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-5xl flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: "Savings goals"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: ["Total saved ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
					value: total,
					hidden: hide
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New goal"] }) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: goals.map((g) => {
				const pct = Math.min(100, Math.round(g.current / g.target * 100));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-col rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: g.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs tabular-nums text-muted",
								children: [pct, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xl font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
								value: g.current,
								hidden: hide
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-normal text-muted",
								children: [
									" ",
									"/ ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
										value: g.target,
										hidden: hide
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 h-2 overflow-hidden rounded-full bg-elevated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary",
								style: { width: `${pct}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-subtle",
							children: ["Target ", formatDate(g.deadline)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContributeDialog, {
							goalId: g.id,
							trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								className: "mt-4",
								children: "Add money"
							})
						})
					]
				}, g.id);
			})
		})]
	});
}
var tooltipStyle = {
	background: "#121a26",
	border: "1px solid rgba(232,238,247,0.1)",
	borderRadius: 12,
	fontSize: 12,
	color: "#e8eef7"
};
function CashFlowChart({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-52 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "inc",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#2ec9b3",
							stopOpacity: .35
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#2ec9b3",
							stopOpacity: 0
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "rgba(232,238,247,0.06)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "#8b97a8",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "#8b97a8",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						tickFormatter: (v) => formatMoneyCompact(Number(v)),
						width: 48
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: tooltipStyle,
						formatter: (v) => formatMoneyCompact(Number(v))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "income",
						stroke: "#2ec9b3",
						fill: "url(#inc)",
						strokeWidth: 2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "expenses",
						stroke: "#f07178",
						fill: "none",
						strokeWidth: 2
					})
				]
			})
		})
	});
}
function SpendBars({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-52 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "rgba(232,238,247,0.06)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "#8b97a8",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "#8b97a8",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						tickFormatter: (v) => formatMoneyCompact(Number(v)),
						width: 48
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: tooltipStyle,
						formatter: (v) => formatMoneyCompact(Number(v))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "income",
						fill: "#2ec9b3",
						radius: [
							6,
							6,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "expenses",
						fill: "#f07178",
						radius: [
							6,
							6,
							0,
							0
						]
					})
				]
			})
		})
	});
}
var PIE_COLORS = [
	"#2ec9b3",
	"#f07178",
	"#7b8cff",
	"#e8b86d",
	"#8b97a8"
];
function CategoryDonut({ data }) {
	const total = data.reduce((s, d) => s + d.value, 0) || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-56 items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full min-w-0 flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
					data,
					dataKey: "value",
					nameKey: "name",
					innerRadius: 52,
					outerRadius: 78,
					paddingAngle: 3,
					stroke: "none",
					children: data.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: PIE_COLORS[i % PIE_COLORS.length] }, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					contentStyle: tooltipStyle,
					formatter: (v) => formatMoneyCompact(Number(v))
				})] })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex w-36 flex-col gap-2 text-xs",
			children: data.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2 rounded-full",
						style: { background: PIE_COLORS[i % PIE_COLORS.length] }
					}), d.name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums text-fg",
					children: [Math.round(d.value / total * 100), "%"]
				})]
			}, d.name))
		})]
	});
}
var Route$2 = createFileRoute("/reports")({ component: ReportsPage });
function ReportsPage() {
	const transactions = useFinance((s) => s.transactions);
	const series = cashFlowSeries(transactions, 6);
	const spent = spentByCategory(transactions);
	const donut = Object.entries(spent).filter(([cat, v]) => v > 0 && cat !== "transfer" && cat !== "salary").sort((a, b) => b[1] - a[1]).slice(0, 5).map(([cat, value]) => ({
		name: CATEGORY_MAP[cat]?.label ?? cat,
		value
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-semibold tracking-tight",
			children: "Reports"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Spending mix and cash flow"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm font-semibold",
						children: "Spending by category"
					}), donut.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryDonut, { data: donut }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-sm text-muted",
						children: "No expenses this month."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm font-semibold",
						children: "Income vs expenses"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpendBars, { data: series })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)] lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm font-semibold",
						children: "Cash flow"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CashFlowChart, { data: series })]
				})
			]
		})]
	});
}
var Route$1 = createFileRoute("/settings")({ component: SettingsPage });
function SettingsPage() {
	const profile = useFinance((s) => s.profile);
	const setProfile = useFinance((s) => s.setProfile);
	const resetDemo = useFinance((s) => s.resetDemo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-lg flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Profile and demo data"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4 rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "name",
						children: "Display name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "name",
						value: profile.name,
						onChange: (e) => setProfile({ name: e.target.value })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-h-11 items-center justify-between gap-3 text-sm",
					children: ["Hide balances", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: "size-4 accent-primary",
						checked: profile.hideBalances,
						onChange: (e) => setProfile({ hideBalances: e.target.checked })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Restore the sample accounts, transactions, budgets, and goals."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "mt-4",
					onClick: () => resetDemo(),
					children: "Reset demo data"
				})]
			})
		]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium", {
	variants: { tone: {
		teal: "bg-teal/15 text-teal",
		coral: "bg-coral/15 text-coral",
		indigo: "bg-indigo/15 text-indigo",
		amber: "bg-amber/15 text-amber",
		green: "bg-green/15 text-green",
		slate: "bg-elevated text-muted"
	} },
	defaultVariants: { tone: "slate" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({
			tone,
			className
		})),
		...props
	});
}
var Route = createFileRoute("/transactions")({
	validateSearch: (s) => ({ q: typeof s.q === "string" ? s.q : "" }),
	component: TransactionsPage
});
function TransactionsPage() {
	const { q: initialQ } = Route.useSearch();
	const transactions = useFinance((s) => s.transactions);
	const accounts = useFinance((s) => s.accounts);
	const hide = useFinance((s) => s.profile.hideBalances);
	const remove = useFinance((s) => s.deleteTransaction);
	const [q, setQ] = (0, import_react.useState)(initialQ ?? "");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const accountName = (0, import_react.useMemo)(() => Object.fromEntries(accounts.map((a) => [a.id, a.name])), [accounts]);
	const rows = transactions.filter((t) => {
		if (filter === "income" && t.amount <= 0) return false;
		if (filter === "expense" && t.amount >= 0) return false;
		if (!q.trim()) return true;
		return `${t.merchant} ${t.category} ${accountName[t.accountId] ?? ""}`.toLowerCase().includes(q.trim().toLowerCase());
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-4xl flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight",
					children: "Transactions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Track and manage every movement"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddTransactionDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add transaction"] }) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search transactions…",
					className: "sm:max-w-xs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: [
						"all",
						"income",
						"expense"
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: filter === f ? "default" : "secondary",
						onClick: () => setFilter(f),
						children: f === "all" ? "All" : f === "income" ? "Income" : "Expenses"
					}, f))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex flex-col gap-2",
				children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-2xl bg-surface px-4 py-10 text-center text-sm text-muted shadow-[var(--shadow-card)]",
					children: "No transactions match."
				}), rows.map((t) => {
					const cat = CATEGORY_MAP[t.category];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-card)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: t.merchant
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: cat.tone,
											children: cat.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: accountName[t.accountId] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDateTime(t.date) })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
								value: t.amount,
								signed: true,
								hidden: hide,
								className: "text-sm font-semibold"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-10 shrink-0 text-muted hover:text-expense",
								"aria-label": "Delete",
								onClick: () => remove(t.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						]
					}, t.id);
				})]
			})
		]
	});
}
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AccountsRoute: Route$5.update({
		id: "/accounts",
		path: "/accounts",
		getParentRoute: () => Route$7
	}),
	BudgetsRoute: Route$4.update({
		id: "/budgets",
		path: "/budgets",
		getParentRoute: () => Route$7
	}),
	GoalsRoute: Route$3.update({
		id: "/goals",
		path: "/goals",
		getParentRoute: () => Route$7
	}),
	ReportsRoute: Route$2.update({
		id: "/reports",
		path: "/reports",
		getParentRoute: () => Route$7
	}),
	SettingsRoute: Route$1.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$7
	}),
	TransactionsRoute: Route.update({
		id: "/transactions",
		path: "/transactions",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { BudgetDialog as a, cashFlowSeries as c, spentByCategory as d, useFinance as f, cn as h, AddTransactionDialog as i, liquidBalance as l, Button as m, CashFlowChart as n, TransferDialog as o, pctChange as p, Money as r, CATEGORY_MAP as s, router_exports as t, monthFlow as u };
