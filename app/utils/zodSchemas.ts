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
