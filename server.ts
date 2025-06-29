import { createServer } from "http";
import next from "next";
import { Server as SocketIOServer } from "socket.io";
import { openai } from "./app/lib/openai";

const port = parseInt(process.env.SocketPort || "4000", 10);
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

    socket.on("send_message", async (msg: string) => {
      try {
        const res = await openai.chat.completions.create({
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: msg },
          ],
          temperature: 0.7,
        });

        const reply = res.choices[0]?.message?.content || "🤖 No reply.";
        socket.emit("receive_message", reply);
      } catch (e) {
        console.error("AI Error:", e);
        socket.emit("receive_message", "⚠️ Error generating response.");
      }
    });
    
    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log(`🚀 Ready on http://localhost:${port}`);
  });
});
