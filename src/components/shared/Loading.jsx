"use client";

import { Loader2 } from "lucide-react";

export function Loading({ message = "Loading..." }) {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center p-6 space-y-2">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
