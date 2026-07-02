"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { basePath } from "@/lib/basepath";

const links = [
  { href: "/", label: "Now" },
  { href: "/lab/", label: "Lab" },
  { href: "/builds/", label: "Builds" },
  { href: "/tools/", label: "Tools" },
  { href: "/thoughts/", label: "Thoughts" },
  { href: "/about/", label: "About Me" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={close}
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground hover:text-foreground/70 transition-colors shrink-0"
        >
          <Image
            src={`${basePath}/avatars/avatar.jpeg`}
            alt="Wenjing Zhan"
            width={36}
            height={36}
            className="rounded-lg object-cover object-center aspect-square"
          />
          Wenjing Zhan
        </Link>

        {/* Desktop links */}
        <ul className="hidden sm:flex items-center gap-1.5 sm:gap-2">
          {links.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href.replace(/\/$/, ""));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="sm:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {links.map(({ href, label }) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(href.replace(/\/$/, ""));
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={close}
                      className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "text-foreground bg-secondary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
