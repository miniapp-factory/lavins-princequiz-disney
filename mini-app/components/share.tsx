"use client";

import { useMiniAppContext } from "@/components/context/miniapp-provider";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Share({ text }: { text: string }) {
  const { sdk, isInMiniApp } = useMiniAppContext();
  const [isPosting, setIsPosting] = useState(false);

  const handleShare = async () => {
    if (!isInMiniApp) return;
    setIsPosting(true);
    try {
      await sdk.post({
        text,
      });
    } catch (e: unknown) {
      console.error("Failed to post to Farcaster:", e);
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
