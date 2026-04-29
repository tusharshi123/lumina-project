"use client";

import { Wallet, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              Lumina
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#impact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Impact Feed
            </a>
            <a
              href="#explorer"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contract Explorer
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </a>
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <Button className="gap-2 bg-primary px-5 text-primary-foreground hover:bg-primary/90">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#impact"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Impact Feed
              </a>
              <a
                href="#explorer"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Contract Explorer
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </a>
              <Button className="mt-2 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
