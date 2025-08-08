import { CreatePromptForm } from "@/components/forms/CreatePromptForm";

export default function createPrompt() {
  return (
    <div>
      <h1 className="text-4xl font-[700] font-Inter text-white text-center py-5">
        Upload Your Prompt
      </h1>
      <br />
      <CreatePromptForm />
    </div>
  );
}
