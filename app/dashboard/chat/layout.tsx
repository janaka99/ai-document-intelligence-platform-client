"use client";

import { usePathname } from "next/navigation";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full overflow-hidden bg-background border border-border rounded-xl shadow-sm">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative bg-card">{children}</div>
    </div>
  );
}
