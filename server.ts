import { createServer } from "http";
import next from "next";
import { Server as SocketIOServer } from "socket.io";
import { qaPairs, websiteDescription } from "./app/lib/QA.ts";  
import { openai } from "./app/lib/openai.ts";                    


const port = parseInt(process.env.SocketPort || "4000", 10);
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

function buildContext(): string {
  const faqs = qaPairs
    .map((qa, idx) => `Q${idx + 1}: ${qa.question}\nA${idx + 1}: ${qa.answer}`)
    .join("\n\n");

  return `${websiteDescription.trim()}\n\nFAQs:\n\n${faqs}`;
}

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res); // Next.js handles all HTTP requests
  });

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*", // Replace with your frontend URL in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

    socket.on("send_message", async (msg: string) => {
      try {
        const context = buildContext();

        const res = await openai.chat.completions.create({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: `You are an assistant for the PromptMart.

Only answer questions based on the information below. If the question is unrelated, say: "I'm sorry, I can only help with questions about PromptMart."

Website Info:
${context}`,
            },
            { role: "user", content: msg },
          ],
          temperature: 0.3,
        });

        const reply =
          res.choices?.[0]?.message?.content?.trim() || "🤖 No reply.";
        socket.emit("receive_message", reply);
      } catch (error) {
        console.error("❌ Error generating response:", error);
        socket.emit(
          "receive_message",
          "⚠️ Error generating response. Please try again."
        );
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log(
      `🚀 Server with Next.js + Socket.IO running at http://localhost:${port}`
    );
  });
});
