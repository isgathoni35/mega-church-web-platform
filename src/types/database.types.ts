export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];



export type SermonCategory =
  | 'Sunday Worship'
  | 'Monday Inspiration'
  | 'Wednesday Bible Study'
  | 'Crusade & Deliverance'
  | 'Sunday Service'
  | 'Midweek Service'
  | 'Revival & Deliverance'
  | 'Youth Service'
  | 'Worship Night'
  | 'Shorts';

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
      site_settings: {
        Row: {
          id: string;
          pastor_name: string;
          pastor_title: string;
          pastor_image_url: string;
          pastor_bio: string;
          pastor_national_id: string;
          church_motto: string;
          church_slogan: string;
          postal_address: string;
          physical_location: string;
          hero_headline_1?: string;
          hero_headline_2?: string;
          hero_headline_3?: string;
          hero_subtitle?: string;
          hero_promise?: string;
          hero_image_url?: string;
          hero_stat_branches?: string;
          hero_stat_lives?: string;
          hero_stat_years?: string;
          mission_statement?: string;
          vision_statement?: string;
          construction_title?: string;
          construction_subtitle?: string;
          construction_narrative?: string;
          construction_image_url?: string;
          construction_badge?: string;
          orphanage_title?: string;
          orphanage_subtitle?: string;
          orphanage_narrative?: string;
          orphanage_image_url?: string;
          orphanage_badge?: string;
          community_title?: string;
          community_narrative?: string;
          community_image_url?: string;
          pillar_1_title?: string;
          pillar_1_desc?: string;
          pillar_1_image?: string;
          pillar_2_title?: string;
          pillar_2_desc?: string;
          pillar_2_image?: string;
          pillar_3_title?: string;
          pillar_3_desc?: string;
          pillar_3_image?: string;
          pillar_4_title?: string;
          pillar_4_desc?: string;
          pillar_4_image?: string;
          impact_stat_1_val?: string;
          impact_stat_1_lbl?: string;
          impact_stat_2_val?: string;
          impact_stat_2_lbl?: string;
          impact_stat_3_val?: string;
          impact_stat_3_lbl?: string;
          events_json?: Json;
          mpesa_phone: string;
          contact_email: string;
          facebook_url: string;
          instagram_url: string;
          youtube_channel_url?: string;
          kcb_account_number: string;

          kcb_account_name: string;
          kcb_branch: string;
          kcb_swift: string;
          mpesa_paybill: string;
          mpesa_till_number?: string;
          mpesa_till_name?: string;
          western_union_recipient: string;
          orphanage_photos_json?: Json;
          orphanage_videos_json?: Json;
          topbar_live_active?: boolean;
          topbar_live_label?: string;
          topbar_live_url?: string;
          topbar_announcement?: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          pastor_name?: string;
          pastor_title?: string;
          pastor_image_url?: string;
          pastor_bio?: string;
          pastor_national_id?: string;
          church_motto?: string;
          church_slogan?: string;
          postal_address?: string;
          physical_location?: string;
          hero_headline_1?: string;
          hero_headline_2?: string;
          hero_headline_3?: string;
          hero_subtitle?: string;
          hero_promise?: string;
          hero_image_url?: string;
          hero_stat_branches?: string;
          hero_stat_lives?: string;
          hero_stat_years?: string;
          mission_statement?: string;
          vision_statement?: string;
          construction_title?: string;
          construction_subtitle?: string;
          construction_narrative?: string;
          construction_image_url?: string;
          construction_badge?: string;
          orphanage_title?: string;
          orphanage_subtitle?: string;
          orphanage_narrative?: string;
          orphanage_image_url?: string;
          orphanage_badge?: string;
          community_title?: string;
          community_narrative?: string;
          community_image_url?: string;
          pillar_1_title?: string;
          pillar_1_desc?: string;
          pillar_1_image?: string;
          pillar_2_title?: string;
          pillar_2_desc?: string;
          pillar_2_image?: string;
          pillar_3_title?: string;
          pillar_3_desc?: string;
          pillar_3_image?: string;
          pillar_4_title?: string;
          pillar_4_desc?: string;
          pillar_4_image?: string;
          impact_stat_1_val?: string;
          impact_stat_1_lbl?: string;
          impact_stat_2_val?: string;
          impact_stat_2_lbl?: string;
          impact_stat_3_val?: string;
          impact_stat_3_lbl?: string;
          events_json?: Json;
          mpesa_phone?: string;
          contact_email?: string;
          facebook_url?: string;
          instagram_url?: string;
          youtube_channel_url?: string;
          kcb_account_number?: string;
          kcb_account_name?: string;
          kcb_branch?: string;
          kcb_swift?: string;
          mpesa_paybill?: string;
          mpesa_till_number?: string;
          mpesa_till_name?: string;
          western_union_recipient?: string;
          orphanage_photos_json?: Json;
          orphanage_videos_json?: Json;
          topbar_live_active?: boolean;
          topbar_live_label?: string;
          topbar_live_url?: string;
          topbar_announcement?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          pastor_name?: string;
          pastor_title?: string;
          pastor_image_url?: string;
          pastor_bio?: string;
          pastor_national_id?: string;
          church_motto?: string;
          church_slogan?: string;
          postal_address?: string;
          physical_location?: string;
          hero_headline_1?: string;
          hero_headline_2?: string;
          hero_headline_3?: string;
          hero_subtitle?: string;
          hero_promise?: string;
          hero_image_url?: string;
          hero_stat_branches?: string;
          hero_stat_lives?: string;
          hero_stat_years?: string;
          mission_statement?: string;
          vision_statement?: string;
          construction_title?: string;
          construction_subtitle?: string;
          construction_narrative?: string;
          construction_image_url?: string;
          construction_badge?: string;
          orphanage_title?: string;
          orphanage_subtitle?: string;
          orphanage_narrative?: string;
          orphanage_image_url?: string;
          orphanage_badge?: string;
          community_title?: string;
          community_narrative?: string;
          community_image_url?: string;
          pillar_1_title?: string;
          pillar_1_desc?: string;
          pillar_1_image?: string;
          pillar_2_title?: string;
          pillar_2_desc?: string;
          pillar_2_image?: string;
          pillar_3_title?: string;
          pillar_3_desc?: string;
          pillar_3_image?: string;
          pillar_4_title?: string;
          pillar_4_desc?: string;
          pillar_4_image?: string;
          impact_stat_1_val?: string;
          impact_stat_1_lbl?: string;
          impact_stat_2_val?: string;
          impact_stat_2_lbl?: string;
          impact_stat_3_val?: string;
          impact_stat_3_lbl?: string;
          events_json?: Json;
          mpesa_phone?: string;
          contact_email?: string;
          facebook_url?: string;
          instagram_url?: string;
          youtube_channel_url?: string;
          kcb_account_number?: string;
          kcb_account_name?: string;
          kcb_branch?: string;
          kcb_swift?: string;
          mpesa_paybill?: string;
          mpesa_till_number?: string;
          mpesa_till_name?: string;
          western_union_recipient?: string;
          orphanage_photos_json?: Json;
          orphanage_videos_json?: Json;
          topbar_live_active?: boolean;
          topbar_live_label?: string;
          topbar_live_url?: string;
          topbar_announcement?: string;
          updated_at?: string;
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



export type PrayerRequest = Database['public']['Tables']['prayer_requests']['Row'];
export type InsertPrayerRequest = Database['public']['Tables']['prayer_requests']['Insert'];
export type UpdatePrayerRequest = Database['public']['Tables']['prayer_requests']['Update'];

export type Donation = Database['public']['Tables']['donations']['Row'];
export type InsertDonation = Database['public']['Tables']['donations']['Insert'];
export type UpdateDonation = Database['public']['Tables']['donations']['Update'];
