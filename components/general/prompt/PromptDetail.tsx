import {
  getPromptByCategory,
  getPromptById,
  stripePaymentIntegration,
} from "@/app/action";

import SellerBanner from "../SellerBanner";
import PromptDetailsCard from "./PromptDetailCard";
import PromptInformation from "./PromptInfo";
import { RelatedPrompt } from "./RelatedPrompt";

interface Props {
  id: string;
}

export async function PromptDetails({ id }: Props) {
  const prompt = await getPromptById(id);
  const data = await getPromptByCategory(prompt?.category as string);

  if (!prompt) return <p>No prompt found.</p>;
  if (!data) return <p>No related prompt found.</p>;

  const relatedPrompt = data && data.filter((value) => value.id !== prompt.id);

  return (
    <div>
      {/* <PromptCard /> */}
      <PromptDetailsCard promptData={prompt} key={id} />
      <br />
      <br />
      {/* <PRomptInfo /> */}
      <PromptInformation promptData={prompt} />
      <br />
      <h1 className="text-4xl font-[700] font-Inter text-white">
        Related Prompts
      </h1>
      <div className="flex flex-wrap">
        {/* PromptCARd */}
        <RelatedPrompt data={relatedPrompt} />
        {relatedPrompt.length === 0 && (
          <p className="text-[14px] text-[#b1b0b6] font-Inter font-[500] text-center w-full my-5">
            No prompt found with this category!
          </p>
        )}
      </div>
      <br />
      <br />
      <SellerBanner />
      <br />
    </div>
  );
}
