"use client";

import { addWithDrawMethod } from "@/app/action";
import { withdrawMethodSchema } from "@/app/utils/zodSchemas";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TbLoaderQuarter } from "react-icons/tb";
import { z } from "zod";

interface AddMethodProps {
  onSuccess: () => void;
}

export function AddMethod({ onSuccess }: AddMethodProps) {
  const [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof withdrawMethodSchema>>({
    resolver: zodResolver(withdrawMethodSchema),
    defaultValues: {
      bankName: "",
      bankAddress: "",
      account_holder_name: "",
      account_number: "",
      routing_number: "",
      swift_code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof withdrawMethodSchema>) => {
    try {
      setPending(true);
      await addWithDrawMethod(data);
      toast.success("Prompt created successfully.");
      onSuccess();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("You already have a shop. You can only have one.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="account_holder_name"
            className="block py-2 pl-1 text-left"
          >
            Account Holder Name
          </label>
          <Input
            id="account_holder_name"
            {...register("account_holder_name")}
            variant="bordered"
          />
          {errors.account_holder_name && (
            <p className="text-red-500 text-sm">
              {errors.account_holder_name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="bankName" className="block py-2 pl-1 text-left">
            Bank Name
          </label>
          <Input id="bankName" {...register("bankName")} variant="bordered" />
          {errors.bankName && (
            <p className="text-red-500 text-sm">{errors.bankName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="account_number" className="block py-2 pl-1 text-left">
            Account Number
          </label>
          <Input
            id="account_number"
            {...register("account_number")}
            type="text"
            variant="bordered"
          />
          {errors.account_number && (
            <p className="text-red-500 text-sm">
              {errors.account_number.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="routing_number" className="block py-2 pl-1 text-left">
            Routing Number
          </label>
          <Input
            id="routing_number"
            {...register("routing_number")}
            type="text"
            variant="bordered"
          />
          {errors.routing_number && (
            <p className="text-red-500 text-sm">
              {errors.routing_number.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="swift_code" className="block py-2 pl-1 text-left">
            Swift Code
          </label>
          <Input
            // label="Swift Code"
            id="swift_code"
            {...register("swift_code")}
            type="text"
            variant="bordered"
          />
          {errors.swift_code && (
            <p className="text-red-500 text-sm">{errors.swift_code.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="bankAddress" className="block py-2 pl-1 text-left">
            Bank Address
          </label>
          <Input
            id="bankAddress"
            {...register("bankAddress")}
            variant="bordered"
          />
          {errors.bankAddress && (
            <p className="text-red-500 text-sm">{errors.bankAddress.message}</p>
          )}
        </div>
      </div>

      <br />

      <Button
        type="submit"
        color="primary"
        variant="bordered"
        className="w-full mt-4 cursor-pointer"
        disabled={pending}
      >
        {pending ? (
          <div className="flex text-white gap-4">
            <TbLoaderQuarter className="w-4 h-4 animate-spin" />
            <span>Submitting...</span>
          </div>
        ) : (
          <div className="text-[18px] p-5 font-[600] font-Inter rounded-[8px] text-white ">
            Add Withdraw Method
          </div>
        )}
      </Button>
    </form>
  );
}
