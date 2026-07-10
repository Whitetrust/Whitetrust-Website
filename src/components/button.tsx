import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "outline-ivory";
type Size = "md" | "lg";

const base =
  "inline-flex items-center gap-2 font-medium transition-colors duration-200 group";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-ink text-ivory hover:bg-ink-2 border border-ink",
  secondary:
    "bg-bronze text-ivory hover:bg-bronze-3 border border-bronze",
  ghost:
    "text-ink hover:text-bronze",
  "outline-ivory":
    "border border-ivory/30 text-ivory hover:border-bronze hover:text-bronze",
};

const sizeStyles: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function CTA({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = true,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  external?: boolean;
}) {
  const cls = cn(base, variantStyles[variant], sizeStyles[size], className);
  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
