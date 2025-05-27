"use client";

import { Button } from "@heroui/button";
import React from "react";
import { useFormStatus } from "react-dom";
import { TbLoaderQuarter } from "react-icons/tb";
import clsx from "clsx";

export function SubmitButton({
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
}) {
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
}

interface ClientSubmitButtonProps {
  text: string;
  icon?: React.ReactNode;
  variant?:
    | "flat"
    | "solid"
    | "bordered"
    | "light"
    | "faded"
    | "shadow"
    | "ghost";
  width?: string;
  className?: string;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function ClientSubmitButton({
  text,
  icon,
  variant = "solid",
  width = "w-full",
  className,
  loading = false,
  onClick,
  disabled = false,
}: ClientSubmitButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      className={clsx(width, className)}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? (
        <>
          <TbLoaderQuarter className="w-4 h-4 animate-spin mr-2" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <div className="mr-2">{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}
