import { AiChat } from "@/components/general/chat/AiChat";
import React from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning>
      <main className=" relative min-h-screen">
        {children}
        <div className="fixed bottom-4 right-4">
          <AiChat />
        </div>
      </main>
    </div>
  );
}
