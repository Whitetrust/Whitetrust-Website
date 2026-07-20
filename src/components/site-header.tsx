"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, Search } from "lucide-react";
import { nav } from "@/lib/site";
import { Container } from "./container";
import { cn } from "@/lib/utils";
import { useCommandMenu } from "./command-menu-context";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const { open: openCommand } = useCommandMenu();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
      return;
    }
    lastFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const panel = mobilePanelRef.current;
    if (panel) {
      const first = panel.querySelector<HTMLElement>("a,button,[tabindex]:not([tabindex='-1'])");
      first?.focus();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
      if (e.key === "Tab" && panel) {
        const focusables = panel.querySelectorAll<HTMLElement>(
          "a,button,[tabindex]:not([tabindex='-1'])"
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] backdrop-blur-md border-b border-[var(--line-rule)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Container width="wide">
        <div className="flex h-22 items-center justify-between">
          <Link href="/" className="flex items-center min-h-11" aria-label="CAWT home">
            <Image
              src="/cawt-logo-blue.png"
              alt="CAWT — Cap Alpha WhiteTrust"
              className="h-12 md:h-14 w-auto"
              width={1364}
              height={802}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
            {nav.primary.map((item) => {
              const hasChildren = "children" in item && item.children;
              if (!hasChildren) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center min-h-11 px-2.5 text-xs xl:text-sm text-[var(--on-surface)] hover:text-bronze transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              }
              const open = openMenu === item.label;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onFocus={() => setOpenMenu(item.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOpenMenu(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="menu"
                    onClick={() => setOpenMenu(open ? null : item.label)}
                    className="inline-flex items-center gap-1 min-h-11 px-2.5 text-xs xl:text-sm text-[var(--on-surface)] hover:text-bronze transition-colors"
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <div
                    role="menu"
                    aria-label={item.label}
                    className={cn(
                      "absolute left-0 top-full pt-2 min-w-[260px] transition-all duration-150",
                      open ? "opacity-100 visible" : "opacity-0 invisible"
                    )}
                  >
                    <div className="bg-[var(--surface)] border border-[var(--line-rule)] shadow-xl py-2">
                      <Link
                        href={item.href}
                        role="menuitem"
                        className="block min-h-11 px-5 py-3 text-sm font-medium text-[var(--on-surface)] hover:text-bronze hover:bg-[var(--surface-2)] transition-colors"
                      >
                        Overview ›
                      </Link>
                      {item.children!.filter((c) => c.href !== item.href).map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className="block min-h-11 px-5 py-3 text-sm text-[var(--on-surface)] hover:text-bronze hover:bg-[var(--surface-2)] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-1">
            <button
              type="button"
              aria-label="Search (Ctrl+K)"
              onClick={openCommand}
              className="inline-flex items-center justify-center w-11 h-11 text-[var(--on-surface)] hover:text-bronze transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
            <Link
              href="https://outlook.office.com/book/WhiteTrust@cawt.ai/?ismsaljsauthenabled"
              className="inline-flex items-center min-h-11 text-xs xl:text-sm text-[var(--on-surface)] hover:text-bronze border-b border-[var(--on-surface)] hover:border-bronze pb-0.5 transition-colors ml-2"
            >
              Book An Appointment
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[var(--on-surface)]"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div
          ref={mobilePanelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 bg-ink text-ivory lg:hidden overflow-y-auto"
        >
          <Container width="wide">
            <div className="flex h-22 items-center justify-between">
              <Image
                src="/cawt-logo-white.png"
                alt="CAWT"
                className="h-11 w-auto"
                width={4695}
                height={2761}
              />
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center w-11 h-11"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="pt-8 pb-12 space-y-6" aria-label="Mobile navigation">
              {nav.primary.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block min-h-11 font-display text-3xl text-ivory hover:text-bronze"
                  >
                    {item.label}
                  </Link>
                  {"children" in item && item.children && (
                    <div className="mt-3 ml-1 space-y-2">
                      {item.children.filter((c) => c.href !== item.href).map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block min-h-11 py-2 text-sm text-ivory/70 hover:text-bronze"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-6 mt-6 border-t border-ivory/15 text-sm text-ivory/70">
                <Link
                  href="https://outlook.office.com/book/WhiteTrust@cawt.ai/?ismsaljsauthenabled"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center min-h-11 text-bronze border-b border-bronze pb-0.5 hover:text-bronze-3"
                >
                  Book An Appointment
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
