"use client";

import { Button } from "@heroui/button";
import React from "react";
import { useFormStatus } from "react-dom";
import { TbLoaderQuarter } from "react-icons/tb";
import clsx from "clsx";

const SubmitButton = ({
  text,
  icon,
  variant,
  width = "w-full",
  className,
}: {
  text: string;
  icon?: React.ReactNode;
  variant?:
    | "flat"
    | "solid"
    | "bordered"
    | "light"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;

  width?: string;
  className?: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={variant}
      disabled={pending}
      className={clsx(width, className)}
    >
      {pending ? (
        <>
          <TbLoaderQuarter className="w-4 h-4 animate-spin " />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <div className="">{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
