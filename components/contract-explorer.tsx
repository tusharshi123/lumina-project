"use client";

import { FileCode, ExternalLink, CheckCircle2, Clock, Hash, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const transactions = [
  {
    id: "0x8f3a...e72b",
    type: "Donation",
    from: "G4H2...K9M",
    to: "Clean Water Initiative",
    amount: "2.5 XLM",
    status: "confirmed",
    time: "2 min ago",
  },
  {
    id: "0x2c9d...a841",
    type: "Grant Release",
    from: "Lumina Treasury",
    to: "Education Tech",
    amount: "5.0 XLM",
    status: "confirmed",
    time: "8 min ago",
  },
  {
    id: "0x7b1e...f394",
    type: "Donation",
    from: "H8J5...L2N",
    to: "Medical Supplies",
    amount: "1.2 XLM",
    status: "pending",
    time: "12 min ago",
  },
  {
    id: "0x4f6c...d257",
    type: "Milestone Verified",
    from: "Validator Node",
    to: "Renewable Energy",
    amount: "--",
    status: "confirmed",
    time: "18 min ago",
  },
  {
    id: "0x9a3b...c182",
    type: "Donation",
    from: "K3P7...Q4R",
    to: "Food Security",
    amount: "0.8 XLM",
    status: "confirmed",
    time: "25 min ago",
  },
];

export function ContractExplorer() {
  return (
    <section id="explorer" className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <FileCode className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Blockchain</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Contract Explorer
          </h2>
          <p className="mt-1 text-muted-foreground">
            Transparent ledger of all platform transactions
          </p>
        </div>

        {/* Ledger View */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Hash className="h-5 w-5 text-muted-foreground" />
                Recent Transactions
              </CardTitle>
              <span className="flex items-center gap-1.5 text-sm text-accent">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                Live
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Table Header */}
            <div className="hidden border-b border-border bg-secondary/50 px-6 py-3 md:grid md:grid-cols-6 md:gap-4">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Tx Hash
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Type
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                From
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                To
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Amount
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </span>
            </div>

            {/* Transactions */}
            <div className="divide-y divide-border">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="group cursor-pointer px-6 py-4 transition-colors hover:bg-secondary/30"
                >
                  {/* Mobile View */}
                  <div className="flex flex-col gap-3 md:hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-primary">
                        {tx.id}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          tx.status === "confirmed"
                            ? "bg-accent/10 text-accent"
                            : "bg-chart-3/10 text-chart-3"
                        }`}
                      >
                        {tx.status === "confirmed" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        {tx.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{tx.type}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-foreground">{tx.to}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        {tx.amount}
                      </span>
                      <span className="text-muted-foreground">{tx.time}</span>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden items-center md:grid md:grid-cols-6 md:gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-primary">
                        {tx.id}
                      </span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <span className="text-sm text-foreground">{tx.type}</span>
                    <span className="font-mono text-sm text-muted-foreground">
                      {tx.from}
                    </span>
                    <span className="truncate text-sm text-foreground">
                      {tx.to}
                    </span>
                    <span className="font-medium text-foreground">
                      {tx.amount}
                    </span>
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          tx.status === "confirmed"
                            ? "bg-accent/10 text-accent"
                            : "bg-chart-3/10 text-chart-3"
                        }`}
                      >
                        {tx.status === "confirmed" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        {tx.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {tx.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
