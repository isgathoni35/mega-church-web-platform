import { z } from "zod";

export const PRAYER_CATEGORIES = [
  "Healing & Restoration",
  "Financial Deliverance & Breakthrough",
  "Family & Marriage Peace",
  "Spiritual Growth & Guidance",
  "General Thanksgiving & Petitions",
  "Other",
] as const;

export type PrayerCategory = (typeof PRAYER_CATEGORIES)[number] | (string & {});

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
  category: z
    .string()
    .trim()
    .min(2, "Please select or specify a prayer category")
    .max(120, "Prayer category cannot exceed 120 characters"),
  request: z
    .string()
    .trim()
    .min(10, "Please share at least a few words so our pastoral team can pray specifically")
    .max(3000, "Prayer request cannot exceed 3000 characters"),
  isConfidential: z.boolean().default(true),
});

export type PrayerRequestInput = z.infer<typeof prayerRequestSchema>;

export const INQUIRY_TYPES = [
  "General inquiry",
  "Men of Valor Fellowship",
  "Women of Destiny Ministry",
  "Youth & Young Adults Ministry",
  "Kings Kids Children's Church",
  "Children's Home & Orphanage Visit",
  "Prayer Mountain Retreat Booking",
  "Pastoral Counsel & Deliverance",
  "Media & Broadcast",
  "Other",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number] | (string & {});

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
  inquiryType: z
    .string()
    .trim()
    .min(2, "Please select or specify an inquiry category")
    .max(120, "Inquiry category cannot exceed 120 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message cannot exceed 3000 characters"),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

export const VISIT_SERVICES = [
  "Sunday Explosive Worship (10:00 AM)",
  "Monday Live Miracle Service (6:00 PM)",
  "Wednesday Bible Study & Deliverance (6:00 PM)",
  "Upcoming All-Night Kesha",
] as const;

export type VisitService = (typeof VISIT_SERVICES)[number];

export const visitPlanSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address for visit confirmation"),
  phone: z
    .string()
    .trim()
    .min(7, "Please provide a phone number so our hospitality hosts can welcome you"),
  expectedService: z.string().optional().default("Sunday Main Service"),
  guestsCount: z.coerce.number().int().min(1).max(20).default(1),
  hasChildren: z.boolean().default(false),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type VisitPlanInput = z.infer<typeof visitPlanSchema>;
