import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-svh items-center justify-center">
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
  );
}
