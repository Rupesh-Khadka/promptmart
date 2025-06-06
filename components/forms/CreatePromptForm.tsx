"use client";

import { promptSchema } from "@/app/utils/zodSchemas";
import { Input, Textarea } from "@heroui/input";
import { Button, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { TbLoaderQuarter } from "react-icons/tb";
import { z } from "zod";
import { UploadDropzone } from "../general/UploadThingReexported";
import Pdf from "@/public/pdf.png";
import { createPrompt } from "@/app/action";

const categorieItem = [
  { title: "Chatgpt" },
  { title: "Midjourney" },
  { title: "Bard" },
  { title: "Dalle" },
];

export function CreatePromptForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof promptSchema>>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      tags: "",
      estimatePrice: 0,
      promptPrice: 0,
      category: "",
      images: [],
      attachments: "",
    },
  });

  const uploadedImages = watch("images") || [];
  const uploadfile = watch("attachments") || "";

  const [pending, setPending] = useState(false);

  const onSubmit = async (data: z.infer<typeof promptSchema>) => {
    try {
      setPending(true);
      await createPrompt(data);
      toast.success("Prompt created successfully.");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("You already have a shop. You can only have one.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <form
        className="w-[90%] m-auto text-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name */}
        <Input
          size="md"
          type="text"
          placeholder="Enter your prompt title"
          {...register("name")}
          variant="bordered"
          className="text-white font-Inter"
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <br />
        {/* Short Description */}
        <Input
          size="md"
          type="text"
          placeholder="Enter a short description for your prompt*"
          {...register("shortDescription")}
          variant="bordered"
          className="text-white font-Inter"
          isInvalid={!!errors.shortDescription}
          errorMessage={errors.shortDescription?.message}
        />
        <br />

        {/* Description */}
        <Textarea
          size="lg"
          label="Write one detailed description for your prompt*"
          {...register("description")}
          variant="bordered"
          className="text-white font-Inter"
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
        />
        <br />
        {/* Price */}
        <div className="md:flex md:w-full md:gap-10 space-y-6 md:space-y-0">
          <Input
            size="md"
            type="number"
            // label="Prompt estimate price"
            placeholder="Prompt estimate price : $20"
            {...register("estimatePrice", { valueAsNumber: true })}
            variant="bordered"
            className="text-white font-Inter "
            isInvalid={!!errors.estimatePrice}
            errorMessage={errors.estimatePrice?.message}
          />
          <Input
            size="md"
            type="number"
            // label="Prompt price"
            placeholder="Prompt price : $15.99"
            {...register("promptPrice", { valueAsNumber: true })}
            variant="bordered"
            className="text-white font-Inter"
            isInvalid={!!errors.promptPrice}
            errorMessage={errors.promptPrice?.message}
          />
        </div>
        <br />

        {/* Category */}
        <div className="md:flex md:w-full gap-4">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                label="Choose one category"
                variant="bordered"
                // placeholder="Select one category"
                selectedKeys={field.value ? new Set([field.value]) : new Set()}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0])
                }
                className="max-w-xs mb-5 md:mb-[0]"
                isInvalid={!!errors.category}
                errorMessage={errors.category?.message}
              >
                {categorieItem.map((item) => (
                  <SelectItem
                    key={item.title}
                    className="text-black  font-Inter font-[600]"
                  >
                    {item.title}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Input
            label="Enter tags (comma separated)"
            size="md"
            type="text"
            {...register("tags")}
            variant="bordered"
            className="text-white font-Inter"
            isInvalid={!!errors.tags}
            errorMessage={errors.tags?.message}
          />
        </div>
        <br />

        {/* Images */}
        <div>
          <label>Prompt Images</label>
          {uploadedImages.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {uploadedImages.map((img, idx) => (
                <div key={idx} className="relative w-fit text-white">
                  <Image
                    src={img}
                    alt={`Uploaded image ${idx + 1}`}
                    width={500}
                    height={400}
                    className="rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    className="absolute -top-2 -right-2 border-none"
                    onClick={() => {
                      const updated = uploadedImages.filter(
                        (_, i) => i !== idx
                      );
                      setValue("images", updated);
                    }}
                  >
                    <RiDeleteBin6Fill className="h-6 w-6 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <UploadDropzone
              endpoint="promptUploader"
              onClientUploadComplete={(res) => {
                const urls = res.map((file) => file.url);
                setValue("images", [...uploadedImages, ...urls]);
              }}
              onUploadError={() => {
                toast.error("Something went wrong. Please try again.");
              }}
              className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-button:p-4 ut-button:my-2 ut-allowed-content:text-muted-foreground border-white"
            />
          )}
          {errors.images && (
            <span className="text-red-500">{errors.images.message}</span>
          )}
        </div>

        <br />
        <br />

        {/* file */}
        <div>
          <label>Prompt File</label>
          {uploadfile ? (
            <div className="relative w-fit text-white">
              <Image
                src={Pdf}
                alt="Shop Logo"
                width={100}
                height={100}
                className="rounded-lg"
              />
              <Button
                type="button"
                variant="ghost"
                size="md"
                className="absolute -top-2 -right-14 border-none "
                onClick={() => setValue("attachments", "")}
              >
                <RiDeleteBin6Fill className="h-6 w-6 text-red-500" />
              </Button>
            </div>
          ) : (
            <UploadDropzone
              endpoint="fileUploader"
              onClientUploadComplete={(res) => {
                setValue("attachments", res[0].url);
                toast.success("Logo uploaded successfully!");
              }}
              onUploadError={() => {
                toast.error("Something went wrong. Please try again.");
              }}
              className="ut-button:bg-primary   ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-button:p-4 ut-button:my-2 ut-allowed-content:text-muted-foreground border-white"
            />
          )}
          {errors.attachments && (
            <span className="text-red-500">{errors.attachments.message}</span>
          )}
        </div>

        {/* Button */}
        <Button type="submit" variant="bordered" className="w-full mt-4">
          {pending ? (
            <div className="flex text-white gap-4">
              <TbLoaderQuarter className="w-4 h-4 animate-spin" />
              <span>Submitting...</span>
            </div>
          ) : (
            <span className="text-[#6dff4b] font-Inter">Create Prompt</span>
          )}
        </Button>
      </form>
    </div>
  );
}
