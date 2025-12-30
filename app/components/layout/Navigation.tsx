"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";

interface NavigationProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/routes/about", label: "About" },
  { href: "/routes/book", label: "The Book" },
  { href: "/routes/characters", label: "Characters" },
  { href: "/routes/blog", label: "Blog" },
  { href: "/routes/contact", label: "Contact" },
];

export default function Navigation({
  mobile = false,
  onLinkClick,
}: NavigationProps) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onLinkClick}
              className={cn(
                "px-4 py-3 rounded-lg font-medium transition-colors",
                isActive
                  ? "bg-accent text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/routes/ask-noor"
          onClick={onLinkClick}
          className="mt-2 px-4 py-3 bg-[#F2C94C] text-[#3D5A6C] rounded-full font-semibold border-2 border-[#3D5A6C] hover:bg-[#E0B63A] transition-colors text-center"
        >
          Ask Noor AI
        </Link>
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-1">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              isActive
                ? "text-primary bg-accent/20"
                : "text-gray-700 hover:text-primary hover:bg-gray-100"
            )}
          >
            {link.label}
          </Link>
        );
      })}
      <Link
        href="/routes/ask-noor"
        className="ml-4 px-6 py-2 bg-[#F2C94C] hover:bg-[#E0B63A] text-[#3D5A6C] font-semibold rounded-full border-2 border-[#3D5A6C] transition-all duration-200"
      >
        Ask Noor AI
      </Link>
    </nav>
  );
}
