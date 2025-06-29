"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

export default function Chat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket = io();

    socket.on("receive_message", (data: string) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data }]);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    socket.emit("send_message", input);
    setLoading(true);
    setInput("");
  };

  return (
    <main style={{ padding: 20 }} >
      <h1>Chat with AI</h1>
      <div
        style={{
          height: 300,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
          marginBottom: 10,
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
        {loading && (
          <div>
            <strong>assistant:</strong> typing...
          </div>
        )}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message"
        style={{ width: 300, marginRight: 10 }}
      />
      <button onClick={sendMessage} disabled={loading}>
        Send
      </button>
    </main>
  );
}
