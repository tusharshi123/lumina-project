"use client";

import { useState } from "react";
import { Heart, Users, ArrowUpRight, Loader, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { contractService, TransactionStatus } from "@/services/contract-service";
import { handleStellarError } from "@/services/error-handler";

interface GrantCardProps {
  title: string;
  description: string;
  raised: number;
  goal: number;
  donors: number;
  category: string;
  image?: string;
  grantId?: number;
}

export function GrantCard({
  title,
  description,
  raised,
  goal,
  donors,
  category,
  grantId = 0,
}: GrantCardProps) {
  const progress = (raised / goal) * 100;
  const [isLoading, setIsLoading] = useState(false);
  const [txStatus, setTxStatus] = useState<TransactionStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDonate = async () => {
    setIsLoading(true);
    setError(null);
    setTxStatus(null);

    try {
      const status = await contractService.callDonate(grantId, 10); // 10 XLM donation
      setTxStatus(status);

      // Poll for transaction status
      const pollInterval = setInterval(() => {
        const updated = contractService.getTransaction(status.id);
        if (updated && updated.status !== 'pending') {
          setTxStatus(updated);
          clearInterval(pollInterval);
          setIsLoading(false);
        }
      }, 1000);

      setTimeout(() => clearInterval(pollInterval), 30000); // Stop polling after 30s
    } catch (err) {
      const { type, message } = handleStellarError(err);
      setError(`${type.toUpperCase()}: ${message}`);
      setIsLoading(false);
    }
  };

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

        {/* Transaction Status */}
        {txStatus && (
          <div className={`mt-4 rounded-lg p-3 ${
            txStatus.status === 'success'
              ? 'bg-green-50 text-green-800'
              : txStatus.status === 'failed'
              ? 'bg-red-50 text-red-800'
              : 'bg-blue-50 text-blue-800'
          }`}>
            <div className="flex items-start gap-2">
              {txStatus.status === 'pending' && (
                <Loader className="mt-0.5 h-4 w-4 animate-spin" />
              )}
              {txStatus.status === 'success' && (
                <CheckCircle className="mt-0.5 h-4 w-4" />
              )}
              {txStatus.status === 'failed' && (
                <AlertCircle className="mt-0.5 h-4 w-4" />
              )}
              <div className="flex-1 text-sm">
                <p className="font-medium">
                  {txStatus.status === 'pending' && 'Transaction Pending...'}
                  {txStatus.status === 'success' && 'Donation Received!'}
                  {txStatus.status === 'failed' && 'Transaction Failed'}
                </p>
                {txStatus.hash && (
                  <p className="mt-1 break-all font-mono text-xs opacity-75">
                    Hash: {txStatus.hash}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-red-800">
            <div className="flex gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{donors} donors</span>
        </div>

        <Button
          size="sm"
          onClick={handleDonate}
          disabled={isLoading || txStatus?.status === 'pending'}
          className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader className="h-3.5 w-3.5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Heart className="h-3.5 w-3.5" />
              Donate 10 XLM
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
