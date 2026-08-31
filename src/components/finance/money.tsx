import { formatMoney, formatSigned } from "@/lib/format";
import { cn } from "@/lib/utils";

export function Money({
  value,
  signed = false,
  hidden = false,
  className,
}: {
  value: number;
  signed?: boolean;
  hidden?: boolean;
  className?: string;
}) {
  const text = hidden ? "••••••" : signed ? formatSigned(value) : formatMoney(value);
  const color =
    signed && !hidden
      ? value > 0
        ? "text-income"
        : value < 0
          ? "text-expense"
          : "text-fg"
      : undefined;
  return <span className={cn("tabular-nums tracking-tight", color, className)}>{text}</span>;
}
