"use client";

import { Heart, Users, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface GrantCardProps {
  title: string;
  description: string;
  raised: number;
  goal: number;
  donors: number;
  category: string;
  image?: string;
}

export function GrantCard({
  title,
  description,
  raised,
  goal,
  donors,
  category,
}: GrantCardProps) {
  const progress = (raised / goal) * 100;

  return (
    <Card className="group overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {category}
            </span>
            <h3 className="text-lg font-semibold leading-tight text-foreground">
              {title}
            </h3>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">
              {raised.toFixed(1)}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                / {goal} XLM
              </span>
            </span>
            <span className="text-sm font-medium text-primary">
              {progress.toFixed(0)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{donors} donors</span>
        </div>

        <Button
          size="sm"
          className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Heart className="h-3.5 w-3.5" />
          Donate
        </Button>
      </CardFooter>
    </Card>
  );
}
