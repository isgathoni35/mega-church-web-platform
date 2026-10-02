import { z } from "zod";

export const PRAYER_CATEGORIES = [
  "Healing & Restoration",
  "Financial Deliverance & Breakthrough",
  "Family & Marriage Peace",
  "Spiritual Growth & Guidance",
  "General Thanksgiving & Petitions",
] as const;

export type PrayerCategory = (typeof PRAYER_CATEGORIES)[number];

export const prayerRequestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address for pastoral confirmation"),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  category: z.string().refine(
    (val): val is PrayerCategory =>
      PRAYER_CATEGORIES.includes(val as PrayerCategory),
    { message: "Please select a valid prayer category" }
  ),
  request: z
    .string()
    .trim()
    .min(10, "Please share at least a few words so our pastoral team can pray specifically")
    .max(3000, "Prayer request cannot exceed 3000 characters"),
  isConfidential: z.boolean().default(true),
});

export type PrayerRequestInput = z.infer<typeof prayerRequestSchema>;

export const INQUIRY_TYPES = [
  "First-time visitor",
  "Pastoral counsel",
  "Media & Broadcast",
  "General inquiry",
  "Children's Home & Orphanage Visit",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const contactInquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address so we can reply"),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  inquiryType: z.string().refine(
    (val): val is InquiryType => INQUIRY_TYPES.includes(val as InquiryType),
    { message: "Please select an inquiry category" }
  ),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message cannot exceed 3000 characters"),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
