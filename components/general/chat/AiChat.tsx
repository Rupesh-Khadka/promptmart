"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import AIImage from "@/public/Ai.png";
import { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import io from "socket.io-client";

export function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [{ role: "assistant", content: "Hello! How can I help you today?" }]
  );

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:4000");

    socketRef.current.on("receive_message", (data: string) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: data }]);
        setLoading(false);
      }, 2000);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);

    socketRef.current?.emit("send_message", input);
    setLoading(true);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 ">
      {open ? (
        <div className="flex flex-col h-[500px] w-[360px] rounded-lg shadow-lg border bg-[#030015] overflow-hidden">
          <div className=" p-4 flex items-center justify-between">
            <div></div>
            <h2 className="font-bold text-2xl  text-white">AI Assistant</h2>
            <Button
              size="sm"
              onClick={() => setOpen(false)}
              className="bg-none border-none m-0  text-white p-0"
              variant="bordered"
            >
              <IoIosClose className="text-4xl p-0" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-xl text-sm max-w-[75%] font-semibold ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-xl text-sm max-w-[75%] font-semibold bg-gray-200 text-gray-900 animate-pulse">
                  {/* <TypingDots /> */} loading
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="p-2 text-white flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-md text-white "
            />
            <Button
              onClick={handleSend}
              variant="bordered"
              className="text-white bg-primary border-none"
            >
              Send
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="h-[60px] w-[60px] rounded-full shadow-lg bg-white p-0 border-2 border-black" 
        >
          <Image
            src={AIImage}
            alt="Ai Image"
            height={50}
            width={50}
            className="h-full w-full object-cover rounded-full"
          />
        </button>
      )}
    </div>
  );
}
