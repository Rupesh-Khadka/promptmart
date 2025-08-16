"use client";

import { useState, useEffect } from "react";
import FilterPrompt from "./prompt/FilterPrompt";
import PromptCard from "./prompt/PromptCard";
import { Pagination } from "@heroui/react";
import { useRouter } from "next/navigation";
import PromptCardLoader from "../loaders/PromptCardLoader";

interface MarketplaceProps {
  prompts: Array<{
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
  }>;
  totalPages: number;
  currentPage: number;
}

export default function Marketplace({
  prompts,
  totalPages,
  currentPage,
}: MarketplaceProps) {
  const router = useRouter();

  const [filteredPrompts, setFilteredPrompts] = useState<
    MarketplaceProps["prompts"]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setFilteredPrompts(prompts);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [prompts]);

  function handlePageChange(page: number) {
    const params = new URLSearchParams();
    params.set("page", page.toString());

    router.push(`/marketplace?${params.toString()}`);
  }

  return (
    <div className="my-12">
      <div className="w-full">
        <FilterPrompt setPrompts={setFilteredPrompts} totalPrompts={prompts} />
      </div>
      <div className="w-full flex flex-wrap my-5">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <PromptCardLoader key={i} />)
        ) : filteredPrompts.length > 0 ? (
          filteredPrompts.map((item) => (
            <PromptCard prompt={item} key={item.id} />
          ))
        ) : (
          <div className="w-full text-center py-10 text-gray-500 text-lg">
            No prompts available.
          </div>
        )}
      </div>

      {prompts?.length > 0 && (
        <div className="mt-4 flex items-center justify-center">
          <Pagination
            loop
            showControls
            total={totalPages}
            initialPage={currentPage}
            classNames={{
              wrapper: "mx-2",
              item: "mx-2",
            }}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
