"use client";

import { styles } from "@/utils/styles";
import { Button } from "@heroui/button";
import { useState } from "react";

const categories = ["All", "Chatgpt", "Midjourney", "Bard", "Dalle"];

interface Seller {
  name: string | null;
  image: string | null;
}

interface PromptItem {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: Seller;
  rating: number;
  orders: any[];
  reviews: any[];
  promptImageUrl: string[];
  promptFileUrl: string;
  tags: string;
}

interface FilterPromptProps {
  totalPrompts: PromptItem[];
  setPrompts: (prompts: PromptItem[]) => void;
}

const FilterPrompt = ({ totalPrompts, setPrompts }: FilterPromptProps) => {
  const [selected, setSelected] = useState<string>("All");

  const handleFilter = (category: string) => {
    setSelected(category);
    if (category === "All") {
      setPrompts(totalPrompts);
    } else {
      const filtered = totalPrompts.filter(
        (prompt) => prompt.category === category
      );
      setPrompts(filtered);
    }
  };

  return (
    <div className="w-full flex flex-wrap rounded shadow my-5">
      {categories.map((category, index) => (
        <Button
          key={index}
          className={`h-[32px] px-4 rounded-2xl mr-4 mb-2 transition-colors ${
            selected === category ? "bg-[#3ab05b]" : "bg-[#2251ac]"
          }`}
          onClick={() => handleFilter(category)}
        >
          <p className={`${styles.paragraph} text-white`}>{category}</p>
        </Button>
      ))}
    </div>
  );
};

export default FilterPrompt;
