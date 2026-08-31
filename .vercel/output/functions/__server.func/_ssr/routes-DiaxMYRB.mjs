import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as Repeat, f as Eye, l as Plus, n as Wallet, p as EyeOff, x as ArrowDownRight, y as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { a as BudgetDialog, c as cashFlowSeries, d as spentByCategory, f as useFinance, h as cn, i as AddTransactionDialog, l as liquidBalance, m as Button, n as CashFlowChart, o as TransferDialog, p as pctChange, r as Money, s as CATEGORY_MAP, u as monthFlow } from "./router-Cmkzliye.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DiaxMYRB.js
var import_jsx_runtime = require_jsx_runtime();
var TONE_BAR = {
	teal: "bg-teal",
	coral: "bg-coral",
	indigo: "bg-indigo",
	amber: "bg-amber",
	green: "bg-green",
	slate: "bg-slate"
};
function Home() {
	const accounts = useFinance((s) => s.accounts);
	const transactions = useFinance((s) => s.transactions);
	const hide = useFinance((s) => s.profile.hideBalances);
	const setProfile = useFinance((s) => s.setProfile);
	const liquid = liquidBalance(accounts);
	const { income, expenses } = monthFlow(transactions);
	const spent = spentByCategory(transactions);
	const spentEntries = Object.entries(spent).filter(([cat]) => cat !== "transfer" && cat !== "salary").sort((a, b) => b[1] - a[1]);
	const spentTotal = spentEntries.reduce((s, [, v]) => s + v, 0) || 1;
	const series = cashFlowSeries(transactions, 6);
	const change = pctChange(liquid, liquid - (income + expenses));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold tracking-tight",
				children: "Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "This month at a glance"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-xs font-medium text-muted",
						children: ["Total balance", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-subtle hover:text-fg",
							"aria-label": hide ? "Show balances" : "Hide balances",
							onClick: () => setProfile({ hideBalances: !hide }),
							children: hide ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-3xl font-semibold tracking-tight sm:text-4xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
							value: liquid,
							hidden: hide
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex items-center gap-1 text-xs",
						children: [change >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5 text-income" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "size-3.5 text-expense" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: change >= 0 ? "text-income" : "text-expense",
							children: [
								change >= 0 ? "+" : "",
								change.toFixed(1),
								"% vs last month"
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-xs font-medium text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-7 items-center justify-center rounded-full bg-income/15 text-income",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "size-3.5" })
							}), "Income"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-2xl font-semibold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
								value: income,
								hidden: hide
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: "this month"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-xs font-medium text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-7 items-center justify-center rounded-full bg-expense/15 text-expense",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })
							}), "Expenses"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-2xl font-semibold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
								value: Math.abs(expenses),
								hidden: hide
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: "this month"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: "Spending overview"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/reports",
							className: "text-xs text-primary",
							children: "View full report"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-3",
						children: spentEntries.slice(0, 5).map(([cat, value]) => {
							const meta = CATEGORY_MAP[cat];
							const pct = Math.round(value / spentTotal * 100);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted",
										children: meta?.label ?? cat
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm tabular-nums",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
											value,
											hidden: hide
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "col-span-2 h-1.5 overflow-hidden rounded-full bg-elevated",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("h-full rounded-full", TONE_BAR[meta?.tone ?? "slate"]),
											style: { width: `${pct}%` }
										})
									})
								]
							}, cat);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm font-semibold",
						children: "Cash flow"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CashFlowChart, { data: series })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-surface p-4 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 px-1 text-sm font-semibold",
					children: "Quick actions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddTransactionDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							className: "h-12 justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add transaction"]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransferDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							className: "h-12 justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "size-4" }), " Transfer"]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							className: "h-12 justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" }), " Set budget"]
						}) })
					]
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
