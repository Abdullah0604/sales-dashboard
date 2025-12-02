"use client";

import { AlertTriangle } from "lucide-react";
import { Card } from "../ui/card";

export function Error({ message = "Something went wrong!" }) {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center ">
      <Card className="p-6 space-y-2 flex flex-col items-center justify-center">
        <AlertTriangle className="w-20 h-20 text-destructive" />
        <p className="text-destructive text-xl">{message}</p>
      </Card>
    </div>
  );
}
