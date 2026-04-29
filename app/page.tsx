import { Navbar } from "@/components/navbar";
import { ImpactFeed } from "@/components/impact-feed";
import { ContractExplorer } from "@/components/contract-explorer";
import { ChatDrawer } from "@/components/chat-drawer";
import { Sparkles, Shield, Globe, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border py-16 sm:py-24">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Built on Stellar
              </span>
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Transparent Giving,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Real Impact
              </span>
            </h1>

            <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
              Lumina connects donors with verified causes through blockchain
              transparency. Every donation is tracked, every milestone verified,
              every impact measured.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl">
                <Globe className="h-4 w-4" />
                Explore Grants
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted">
                <Shield className="h-4 w-4" />
                How It Works
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                Verified Causes
              </h3>
              <p className="text-sm text-muted-foreground">
                Every grant is vetted and verified through our decentralized
                validation network.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/30">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                Instant Transfers
              </h3>
              <p className="text-sm text-muted-foreground">
                Stellar&apos;s fast settlement ensures funds reach causes in
                seconds, not days.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                Global Reach
              </h3>
              <p className="text-sm text-muted-foreground">
                Support causes worldwide with minimal fees and full
                transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Feed */}
      <ImpactFeed />

      {/* Contract Explorer */}
      <ContractExplorer />

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Lumina</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Lumina. Built on Stellar for transparent philanthropy.
            </p>
          </div>
        </div>
      </footer>

      {/* Chat Drawer */}
      <ChatDrawer />
    </div>
  );
}
