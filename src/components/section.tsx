import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "ivory",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "ivory" | "ivory-2" | "ink" | "ink-2";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28",
        tone === "ivory" && "bg-[var(--surface)] text-[var(--on-surface)]",
        tone === "ivory-2" && "bg-[var(--surface-2)] text-[var(--on-surface)]",
        tone === "ink" && "bg-[var(--surface-deep)] text-ivory dark:text-ivory",
        tone === "ink-2" && "bg-[var(--surface-deeper)] text-ivory dark:text-ivory",
        className
      )}
    >
      {children}
    </section>
  );
}
