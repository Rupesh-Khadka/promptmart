"use client";

import { shopSchema } from "@/app/utils/zodSchemas";
import { Input, Textarea } from "@heroui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { UploadDropzone } from "../general/UploadThingReexported";
import Image from "next/image";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { createShop } from "@/app/action";

import { TbLoaderQuarter } from "react-icons/tb";
import toast from "react-hot-toast";

const CreateShopForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof shopSchema>>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      avatar: "",
      description: "",
      name: "",
      shopProductType: "",
    },
  });

  const [pending, setPending] = useState(false);

  const onSubmit = async (data: z.infer<typeof shopSchema>) => {
    try {
      setPending(true);
      await createShop(data);
      toast.success("Shop created successfully.");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("You already have a shop. You can only have one.");
    } finally {
      setPending(false);
    }
  };

  const avatar = watch("avatar");

  return (
    <div className="w-full my-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          className="w-full text-[16px] text-[#b1b0b6] font-Inter font-[500]"
          label="Shop name"
          type="text"
          {...register("name")}
          size="md"
          variant="bordered"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        <Textarea
          className="w-full text-[16px] text-[#b1b0b6] font-Inter font-[500]"
          label="Shop description"
          {...register("description")}
          size="md"
          variant="bordered"
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}

        <Textarea
          className="w-full text-[16px] text-[#b1b0b6] font-Inter font-[500]"
          label="What do you wanna sell with us?"
          {...register("shopProductType")}
          size="md"
          variant="bordered"
        />
        {errors.shopProductType && (
          <span className="text-red-500">{errors.shopProductType.message}</span>
        )}

        {/* <Input
          className="w-full text-[16px] text-[#b1b0b6] font-Inter font-[500]"
          label="Shop Logo (Avatar URL)"
          type="text"
          {...register("avatar")}
          size="md"
          variant="bordered"
        />
        {errors.avatar && (
          <span className="text-red-500">{errors.avatar.message}</span>
        )} */}

        {avatar ? (
          <div className="relative w-fit text-white">
            <Image
              src={avatar}
              alt="Shop Logo"
              width={100}
              height={100}
              className="rounded-lg"
            />
            <Button
              type="button"
              variant="ghost"
              size="md"
              className="absolute -top-2 -right-2 border-none "
              onClick={() => setValue("avatar", "")}
            >
              <RiDeleteBin6Fill className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setValue("avatar", res[0].url);
              // toast.success("Logo uploaded successfully!");
            }}
            onUploadError={() => {
              // toast.error("Something went wrong. Please try again.");
            }}
            
            className="ut-button:bg-primary   ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-button:p-4 ut-button:my-2 ut-allowed-content:text-muted-foreground border-white"
          />
        )}
        {errors.avatar && (
          <span className="text-red-500">{errors.avatar.message}</span>
        )}
        <Button type="submit" variant="bordered" className="w-full mt-4">
          {pending ? (
            <div className="flex text-white gap-4">
              <TbLoaderQuarter className="w-4 h-4 animate-spin" />
              <span>Submitting...</span>
            </div>
          ) : (
            <span className="text-[#6dff4b] font-Inter">Create Shop</span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateShopForm;
