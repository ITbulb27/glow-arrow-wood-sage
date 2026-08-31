import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatMoneyCompact } from "@/lib/format";

const tooltipStyle = {
  background: "#121a26",
  border: "1px solid rgba(232,238,247,0.1)",
  borderRadius: 12,
  fontSize: 12,
  color: "#e8eef7",
};

export function CashFlowChart({
  data,
}: {
  data: { label: string; income: number; expenses: number }[];
}) {
  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="inc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2ec9b3" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#2ec9b3" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(232,238,247,0.06)" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "#8b97a8", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: "#8b97a8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formatMoneyCompact(Number(v))}
            width={48}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatMoneyCompact(Number(v))} />
          <Area type="monotone" dataKey="income" stroke="#2ec9b3" fill="url(#inc)" strokeWidth={2} />
          <Area type="monotone" dataKey="expenses" stroke="#f07178" fill="none" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpendBars({
  data,
}: {
  data: { label: string; income: number; expenses: number }[];
}) {
  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(232,238,247,0.06)" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "#8b97a8", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: "#8b97a8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formatMoneyCompact(Number(v))}
            width={48}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatMoneyCompact(Number(v))} />
          <Bar dataKey="income" fill="#2ec9b3" radius={[6, 6, 0, 0]} />
          <Bar dataKey="expenses" fill="#f07178" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const PIE_COLORS = ["#2ec9b3", "#f07178", "#7b8cff", "#e8b86d", "#8b97a8"];

export function CategoryDonut({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  return (
    <div className="flex h-56 items-center gap-4">
      <div className="h-full min-w-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatMoneyCompact(Number(v))} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="flex w-36 flex-col gap-2 text-xs">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-muted">
              <span
                className="size-2 rounded-full"
                style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
              />
              {d.name}
            </span>
            <span className="tabular-nums text-fg">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
