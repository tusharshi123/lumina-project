"use client";

import { Wallet, Sparkles, Menu, X, LogOut, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useWallet } from "@/contexts/wallet-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isConnected, isConnecting, connect, disconnect, truncatedAddress, address } = useWallet();

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="gap-2 border-primary/30 bg-primary/10 text-foreground hover:bg-primary/20"
                  >
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    {truncatedAddress}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={copyAddress} className="cursor-pointer gap-2">
                    {copied ? (
                      <Check className="h-4 w-4 text-accent" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "Copied!" : "Copy Address"}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={disconnect} 
                    className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={connect}
                disabled={isConnecting}
                className="gap-2 bg-primary px-5 text-primary-foreground hover:bg-primary/90"
              >
                <Wallet className="h-4 w-4" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
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
              {isConnected ? (
                <div className="mt-2 flex flex-col gap-2">
                  <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-sm font-medium text-foreground">{truncatedAddress}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={copyAddress}
                    className="gap-2"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy Address"}
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={disconnect}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={connect}
                  disabled={isConnecting}
                  className="mt-2 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Wallet className="h-4 w-4" />
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
