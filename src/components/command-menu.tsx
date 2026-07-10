"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useCommandMenu } from "./command-menu-context";
import { nav } from "@/lib/site";
import { useEffect, useRef } from "react";
import { ArrowRight, Search, FileText, Users, BookOpen, Building2, Briefcase, Phone } from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  About: Building2,
  Leadership: Users,
  "About Us": Building2,
  "Private Clients": Briefcase,
  "Fund Services": Briefcase,
  "Corporate Services": Building2,
  "News & Insights": BookOpen,
  "Contact Us": Phone,
};

export function CommandMenu() {
  const { isOpen, close } = useCommandMenu();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  if (!isOpen) return null;

  function go(href: string) {
    close();
    router.push(href);
  }

  return (
    <div
      className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4"
      onClick={close}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl">
        <Command
          loop
          className="bg-[var(--surface)] border border-[var(--line-rule)] shadow-2xl overflow-hidden"
        >
          <div className="flex items-center gap-3 border-b border-[var(--line-rule)] px-4">
            <Search className="h-4 w-4 text-[var(--on-surface-muted)]" />
            <Command.Input
              ref={inputRef}
              placeholder="Search pages, services, founders…"
              className="w-full bg-transparent py-4 text-base text-[var(--on-surface)] placeholder:text-[var(--on-surface-muted)] focus:outline-none"
            />
            <kbd className="hidden sm:inline-block text-[10px] uppercase tracking-[0.15em] text-[var(--on-surface-muted)] border border-[var(--line-rule)] px-2 py-0.5">
              Esc
            </kbd>
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="px-4 py-6 text-sm text-[var(--on-surface-muted)] text-center">
              No matches.
            </Command.Empty>

            <Command.Group heading="Navigate" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[0.65rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:text-bronze">
              {nav.primary.map((item) => {
                const Icon = ICONS[item.label] ?? FileText;
                return (
                  <Item key={item.href} icon={<Icon className="h-4 w-4" />} onSelect={() => go(item.href)} label={item.label} />
                );
              })}
            </Command.Group>

            <Command.Group heading="Private Client" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[0.65rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:text-bronze">
              <Item icon={<FileText className="h-4 w-4" />} label="Wills & Execution" onSelect={() => go("/private-client/wills-execution")} />
              <Item icon={<FileText className="h-4 w-4" />} label="Family Trust" onSelect={() => go("/private-client/family-trust")} />
              <Item icon={<FileText className="h-4 w-4" />} label="Business Holding Trust" onSelect={() => go("/private-client/business-holding-trust")} />
              <Item icon={<FileText className="h-4 w-4" />} label="Family Constitution & Council" onSelect={() => go("/private-client/family-constitution-council")} />
              <Item icon={<FileText className="h-4 w-4" />} label="Cross Border Structuring Solutions" onSelect={() => go("/private-client/cross-border-structuring-solutions")} />
              <Item icon={<FileText className="h-4 w-4" />} label="Citizenship & Residency" onSelect={() => go("/private-client/citizenship-residency")} />
              <Item icon={<FileText className="h-4 w-4" />} label="Wealth Protection Structures" onSelect={() => go("/private-client/wealth-protection-structures")} />
            </Command.Group>

            <Command.Group heading="Fund Services" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[0.65rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:text-bronze">
              <Item icon={<FileText className="h-4 w-4" />} label="GIFT City Platform Services" onSelect={() => go("/fund-services/gift-city-platform-services")} />
              <Item icon={<FileText className="h-4 w-4" />} label="GIFT City Fund Setup" onSelect={() => go("/fund-services/gift-city-fund-setup")} />
              <Item icon={<FileText className="h-4 w-4" />} label="Global Fund Structures & Solutions" onSelect={() => go("/fund-services/global-fund-structures-solutions")} />
              <Item icon={<FileText className="h-4 w-4" />} label="Fund Accounting & Administration" onSelect={() => go("/fund-services/fund-accounting-administration")} />
            </Command.Group>

            <Command.Group heading="Corporate Services" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[0.65rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:text-bronze">
              <Item icon={<FileText className="h-4 w-4" />} label="India Entry Strategy" onSelect={() => go("/corporate-services/india-entry-strategy")} />
              <Item icon={<FileText className="h-4 w-4" />} label="Setup Of Entity" onSelect={() => go("/corporate-services/setup-of-entity")} />
              <Item icon={<FileText className="h-4 w-4" />} label="Annual Administration & Compliance" onSelect={() => go("/corporate-services/annual-administration-compliance")} />
              <Item icon={<FileText className="h-4 w-4" />} label="Directorship Services" onSelect={() => go("/corporate-services/directorship-services")} />
              <Item icon={<FileText className="h-4 w-4" />} label="Registered Office Services" onSelect={() => go("/corporate-services/registered-office-services")} />
            </Command.Group>

            <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[0.65rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:text-bronze">
              <Item icon={<Phone className="h-4 w-4" />} label="Book a conversation" onSelect={() => go("/contact")} />
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

function Item({
  icon,
  label,
  onSelect,
}: {
  icon: React.ReactNode;
  label: string;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center justify-between gap-3 px-3 py-3 text-sm text-[var(--on-surface)] cursor-pointer aria-selected:bg-[var(--surface-2)] aria-selected:text-bronze"
    >
      <span className="flex items-center gap-3">
        <span className="text-[var(--on-surface-muted)]">{icon}</span>
        <span>{label}</span>
      </span>
      <ArrowRight className="h-3.5 w-3.5 opacity-50" />
    </Command.Item>
  );
}
