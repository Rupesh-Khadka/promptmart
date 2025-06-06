import { z } from "zod";

export const shopSchema = z.object({
  name: z.string().min(2, "Shop name must be at least 2 characters"),
  description: z
    .string()
    .min(2, "Please provide more information about your shop"),
  shopProductType: z
    .string()
    .min(2, "Please provide more information about your shop product"),
  avatar: z.string().min(1, "Please upload a logo"),
});

export const promptSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  shortDescription: z
    .string()
    .min(2, "Description must be at least 2 characters"),
  description: z.string().min(5, "Please provide more product description."),
  images: z.array(z.string().url()).min(1, "Please upload at least one image"),
  attachments: z.string().min(1, "Please upload a file."),
  category: z.string().min(1, "Please select atleast one category"),
  tags: z.string().min(1, "Please provide the product tag."),
  estimatePrice: z.number().min(1, "Estimate price must be above $1I"),
  promptPrice: z.number().min(1, "Prompt price must be above $1I"),
});

export const withdrawMethodSchema = z.object({
  account_holder_name: z
    .string()
    .min(2, "Account Holder Name must be at least 2 characters"),

  bankName: z.string().min(2, "Bank Name must be at least 2 characters"),

  bankAddress: z.string().min(5, "Bank Address must be at least 5 characters"),

  account_number: z
    .string()
    .min(4, "Account Number must be at least 4 digits")
    .regex(/^\d+$/, "Account Number must be digits only"),

  routing_number: z
    .string()
    .min(4, "Routing Number must be at least 4 digits")
    .regex(/^\d+$/, "Routing Number must be digits only"),
    
  swift_code: z
    .string()
    .min(4, "SWIFT Code must be at least 4 characters")
    .max(11, "SWIFT Code must be less than or equal to 11 characters"),
});
