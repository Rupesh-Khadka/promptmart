"use client";

import { useEffect, useState } from "react";
import PromptCardLoader from "../../loaders/PromptCardLoader";
import PromptCard from "./PromptCard";

interface Prompt {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: {
    name: string | null;
    image: string | null;
  };
  rating: number;
  orders: any[];
  reviews: any[];
  promptImageUrl: string[];
  promptFileUrl: string;
  tags: string;
}

export default function LatestPrompt({
  initialPrompts,
}: {
  initialPrompts: Prompt[];
}) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPrompts(initialPrompts);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [initialPrompts]);

  return (
    <div className="">
      <h1 className="text-4xl font-[700] text-white p-2 font-Monserrat">
        Latest Prompts
      </h1>
      <div className="flex flex-wrap">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <PromptCardLoader key={i} />
            ))
          : prompts.map((prompt) => (
              <PromptCard prompt={prompt} key={prompt.id} />
            ))}
      </div>
    </div>
  );
}
