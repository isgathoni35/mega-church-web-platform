export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface ServiceTime {
  service: string;
  time: string;
}

export type SermonCategory =
  | 'Sunday Worship'
  | 'Monday Inspiration'
  | 'Wednesday Bible Study'
  | 'Crusade & Deliverance';

export type PrayerRequestStatus = 'pending' | 'prayed_for' | 'archived';

export type DonationProvider = 'mpesa' | 'paypal' | 'cashapp' | 'card';

export type DonationStatus = 'pending' | 'completed' | 'failed';

export interface Database {
  public: {
    Tables: {
      sermons: {
        Row: {
          id: string;
          title: string;
          slug: string;
          speaker: string;
          youtube_url: string;
          thumbnail_url: string | null;
          category: SermonCategory;
          is_featured: boolean;
          is_live: boolean;
          date_preached: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          speaker?: string;
          youtube_url: string;
          thumbnail_url?: string | null;
          category: SermonCategory;
          is_featured?: boolean;
          is_live?: boolean;
          date_preached?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          speaker?: string;
          youtube_url?: string;
          thumbnail_url?: string | null;
          category?: SermonCategory;
          is_featured?: boolean;
          is_live?: boolean;
          date_preached?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      branches: {
        Row: {
          id: string;
          name: string;
          slug: string;
          resident_pastor: string;
          city: string;
          country: string;
          address: string;
          phone: string;
          email: string | null;
          service_times: ServiceTime[] | Json;
          is_hq: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          resident_pastor: string;
          city: string;
          country?: string;
          address: string;
          phone: string;
          email?: string | null;
          service_times?: ServiceTime[] | Json;
          is_hq?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          resident_pastor?: string;
          city?: string;
          country?: string;
          address?: string;
          phone?: string;
          email?: string | null;
          service_times?: ServiceTime[] | Json;
          is_hq?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      prayer_requests: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          request: string;
          is_confidential: boolean;
          status: PrayerRequestStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          request: string;
          is_confidential?: boolean;
          status?: PrayerRequestStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          request?: string;
          is_confidential?: boolean;
          status?: PrayerRequestStatus;
          created_at?: string;
        };
        Relationships: [];
      };
      donations: {
        Row: {
          id: string;
          provider: DonationProvider;
          amount: number;
          currency: string;
          phone_number: string | null;
          checkout_request_id: string | null;
          merchant_request_id: string | null;
          mpesa_receipt_number: string | null;
          donor_name: string | null;
          status: DonationStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider: DonationProvider;
          amount: number;
          currency?: string;
          phone_number?: string | null;
          checkout_request_id?: string | null;
          merchant_request_id?: string | null;
          mpesa_receipt_number?: string | null;
          donor_name?: string | null;
          status?: DonationStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          provider?: DonationProvider;
          amount?: number;
          currency?: string;
          phone_number?: string | null;
          checkout_request_id?: string | null;
          merchant_request_id?: string | null;
          mpesa_receipt_number?: string | null;
          donor_name?: string | null;
          status?: DonationStatus;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      sermon_category: SermonCategory;
      prayer_request_status: PrayerRequestStatus;
      donation_provider: DonationProvider;
      donation_status: DonationStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Convenience Model Types
export type Sermon = Database['public']['Tables']['sermons']['Row'];
export type InsertSermon = Database['public']['Tables']['sermons']['Insert'];
export type UpdateSermon = Database['public']['Tables']['sermons']['Update'];

export type Branch = Database['public']['Tables']['branches']['Row'];
export type InsertBranch = Database['public']['Tables']['branches']['Insert'];
export type UpdateBranch = Database['public']['Tables']['branches']['Update'];

export type PrayerRequest = Database['public']['Tables']['prayer_requests']['Row'];
export type InsertPrayerRequest = Database['public']['Tables']['prayer_requests']['Insert'];
export type UpdatePrayerRequest = Database['public']['Tables']['prayer_requests']['Update'];

export type Donation = Database['public']['Tables']['donations']['Row'];
export type InsertDonation = Database['public']['Tables']['donations']['Insert'];
export type UpdateDonation = Database['public']['Tables']['donations']['Update'];
