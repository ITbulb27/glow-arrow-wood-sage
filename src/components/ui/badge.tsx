import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
  {
    variants: {
      tone: {
        teal: "bg-teal/15 text-teal",
        coral: "bg-coral/15 text-coral",
        indigo: "bg-indigo/15 text-indigo",
        amber: "bg-amber/15 text-amber",
        green: "bg-green/15 text-green",
        slate: "bg-elevated text-muted",
      },
    },
    defaultVariants: { tone: "slate" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone, className }))} {...props} />;
}
