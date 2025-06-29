import Chat from "@/components/general/chat/Chat";
import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";
import AIImage from "@/public/Ai.png";

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
          <Button className="h-[80px] w-[85px] rounded-full p-0">
            <Image
              src={AIImage}
              alt="Ai Image"
              height={500}
              width={500}
              className="h-full w-full "
            />
          </Button>
        </div>
      </main>
    </div>
  );
}
