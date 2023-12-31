import { z } from "zod";
import { FONT, THEME } from "@prisma/client";

export const formSchema = z.object({
  title: z.string().min(2).max(50),
  logo: z.string().min(2).max(200).optional().or(z.literal("")),
  backdrop: z.string().min(2).max(200).optional().or(z.literal("")),
  organization: z.string().min(2).max(50).optional().or(z.literal("")),
  description: z.string().min(2).max(1000).optional().or(z.literal("")),
  address: z.string().min(2).max(100).optional().or(z.literal("")),
  faqs: z
    .array(
      z.object({ id: z.number(), question: z.string(), answer: z.string() }),
    )
    .min(1),
  theme: z.nativeEnum(THEME).optional(),
  socials: z.array(z.object({ name: z.string(), url: z.string() })),
  font: z.nativeEnum(FONT).optional(),
});
