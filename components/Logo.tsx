"use Client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { QrCode } from "lucide-react";

function Logo({
  fontSize = "2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "text-xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
        <QrCode size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
            Simple
        </span>
        <span className="text-stone-700 dark:text-stone-300">QR</span>
      </div>
    </Link>
  );
}

export default Logo;
