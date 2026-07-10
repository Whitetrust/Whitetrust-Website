import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  tone = "bronze",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "bronze" | "ivory" | "ink";
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 text-[0.72rem] uppercase",
        tone === "bronze" && "text-bronze",
        tone === "ivory" && "text-ivory/80",
        tone === "ink" && "text-ink/70",
        className
      )}
      style={{ letterSpacing: "0.18em" }}
    >
      <span
        className={cn(
          "h-px w-8",
          tone === "bronze" && "bg-bronze",
          tone === "ivory" && "bg-ivory/60",
          tone === "ink" && "bg-ink/40"
        )}
      />
      <span className="font-medium">{children}</span>
    </div>
  );
}
