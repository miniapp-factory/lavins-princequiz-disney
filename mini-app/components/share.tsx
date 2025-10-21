"use client";

import { useMiniAppContext } from "@/components/context/miniapp-provider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MiniAppSDK } from "@farcaster/miniapp-sdk";

export function Share({ text }: { text: string }) {
  const { sdk, isInMiniApp } = useMiniAppContext();
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShare = async () => {
    if (!isInMiniApp) return;
    setIsPosting(true);
    setError(null);
    try {
      // The SDK expects a JSON payload with the text to post
      await sdk.post({
        text,
      });
    } catch (e: any) {
      console.error("Failed to post to Farcaster:", e);
      setError(e?.message ?? "Unknown error");
    } finally {
      setIsPosting(false);
    }
  };

  if (!isInMiniApp) {
    return null;
  }

  return (
    <Button
      onClick={handleShare}
      disabled={isPosting || !text}
      variant="outline"
    >
      {isPosting ? "Sharing…" : "Share on Farcaster"}
    </Button>
  );
}
