import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY in environment variables.");
}

export const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});
