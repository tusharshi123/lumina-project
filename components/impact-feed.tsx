"use client";

import { useEffect, useState } from "react";
import { GrantCard } from "./grant-card";
import { TrendingUp, Filter, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContractEvents } from "@/hooks/use-contract-events";
import { useTransactionTracker } from "@/hooks/use-transaction-tracker";

const grants = [
  {
    id: 1,
    title: "Clean Water Initiative for Rural Communities",
    description:
      "Providing sustainable clean water solutions to underserved villages through solar-powered filtration systems.",
    raised: 7.5,
    goal: 10,
    donors: 142,
    category: "Environment",
  },
  {
    id: 2,
    title: "Education Technology for Refugee Children",
    description:
      "Equipping refugee camps with tablets and educational software to ensure continuous learning for displaced youth.",
    raised: 15.2,
    goal: 20,
    donors: 287,
    category: "Education",
  },
  {
    id: 3,
    title: "Medical Supplies for Remote Clinics",
    description:
      "Delivering essential medical equipment and supplies to remote healthcare facilities in developing regions.",
    raised: 8.9,
    goal: 15,
    donors: 193,
    category: "Healthcare",
  },
  {
    id: 4,
    title: "Renewable Energy Microgrids",
    description:
      "Installing community-owned solar microgrids to bring reliable electricity to off-grid communities.",
    raised: 22.1,
    goal: 25,
    donors: 456,
    category: "Energy",
  },
  {
    id: 5,
    title: "Food Security Program",
    description:
      "Supporting local farmers with sustainable agriculture training and seed distribution programs.",
    raised: 5.3,
    goal: 12,
    donors: 98,
    category: "Agriculture",
  },
  {
    id: 6,
    title: "Women Entrepreneurship Fund",
    description:
      "Providing microloans and business training to women entrepreneurs in emerging economies.",
    raised: 18.7,
    goal: 30,
    donors: 324,
    category: "Economic",
  },
];

export function ImpactFeed() {
  const { events } = useContractEvents();
  const { transactions } = useTransactionTracker();
  const [totalRaised, setTotalRaised] = useState(2.4);
  const [totalDonors, setTotalDonors] = useState(1247);

  // Update stats based on real transactions
  useEffect(() => {
    const successTransactions = transactions.filter((tx) => tx.status === "success");
    const totalAmount = successTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const uniqueDonors = new Set(successTransactions.map((tx) => tx.wallet)).size;

    if (totalAmount > 0) {
      setTotalRaised((prev) => prev + totalAmount);
    }
    if (uniqueDonors > 0) {
      setTotalDonors((prev) => prev + uniqueDonors);
    }
  }, [transactions]);

  return (
    <section id="impact" className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-accent">Live Feed</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Impact Feed
            </h2>
            <p className="mt-1 text-muted-foreground">
              Active grants making a difference worldwide
            </p>
          </div>

          <Button variant="outline" className="gap-2 border-border bg-secondary text-foreground hover:bg-muted">
            <Filter className="h-4 w-4" />
            Filter Grants
          </Button>
        </div>

        {/* Live Events Indicator */}
        {events.length > 0 && (
          <div className="mb-6 rounded-lg border border-accent/20 bg-accent/5 p-4 flex items-center gap-3">
            <Activity className="h-5 w-5 text-accent animate-pulse" />
            <p className="text-sm text-accent">
              {events.length} live donation{events.length === 1 ? "" : "s"} received
            </p>
          </div>
        )}

        {/* Stats Bar */}
        <div className="mb-8 grid grid-cols-2 gap-4 rounded-xl border border-border bg-card p-4 sm:grid-cols-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              ${totalRaised.toFixed(1)}M
            </p>
            <p className="text-sm text-muted-foreground">Total Raised</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{totalDonors.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Active Donors</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">89</p>
            <p className="text-sm text-muted-foreground">Funded Projects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">34</p>
            <p className="text-sm text-muted-foreground">Countries</p>
          </div>
        </div>

        {/* Grant Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grants.map((grant) => (
            <GrantCard key={grant.id} {...grant} grantId={grant.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
