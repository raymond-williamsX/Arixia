export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          auth_user_id: string;
          full_name: string;
          avatar_url: string | null;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id: string;
          full_name: string;
          avatar_url?: string | null;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          avatar_url?: string | null;
          email?: string;
          updated_at?: string;
        };
      };
      preferences: {
        Row: {
          id: string;
          profile_id: string;
          budget_min: number | null;
          budget_max: number | null;
          currency: string;
          favorite_categories: string[];
          preferred_marketplaces: string[];
          preferred_brands: string[];
          prioritize_price: boolean;
          prioritize_quality: boolean;
          prioritize_shipping: boolean;
          prioritize_seller: boolean;
          prioritize_reviews: boolean;
          dark_mode: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          budget_min?: number | null;
          budget_max?: number | null;
          currency?: string;
          favorite_categories?: string[];
          preferred_marketplaces?: string[];
          preferred_brands?: string[];
          prioritize_price?: boolean;
          prioritize_quality?: boolean;
          prioritize_shipping?: boolean;
          prioritize_seller?: boolean;
          prioritize_reviews?: boolean;
          dark_mode?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          budget_min?: number | null;
          budget_max?: number | null;
          currency?: string;
          favorite_categories?: string[];
          preferred_marketplaces?: string[];
          preferred_brands?: string[];
          prioritize_price?: boolean;
          prioritize_quality?: boolean;
          prioritize_shipping?: boolean;
          prioritize_seller?: boolean;
          prioritize_reviews?: boolean;
          dark_mode?: boolean;
          updated_at?: string;
        };
      };
      search_sessions: {
        Row: {
          id: string;
          profile_id: string;
          query: string;
          search_type: "text" | "image";
          image_url: string | null;
          status: "processing" | "completed" | "failed";
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          query: string;
          search_type: "text" | "image";
          image_url?: string | null;
          status?: "processing" | "completed" | "failed";
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          status?: "processing" | "completed" | "failed";
          completed_at?: string | null;
        };
      };
      conversations: {
        Row: {
          id: string;
          profile_id: string;
          title: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          title: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          active?: boolean;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          created_at?: string;
        };
        Update: never;
      };
      products: {
        Row: {
          id: string;
          product_name: string;
          normalized_name: string;
          brand: string | null;
          category: string | null;
          image_url: string | null;
          description: string | null;
          specifications: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_name: string;
          normalized_name: string;
          brand?: string | null;
          category?: string | null;
          image_url?: string | null;
          description?: string | null;
          specifications?: Json;
          created_at?: string;
        };
        Update: never;
      };
      recommendations: {
        Row: {
          id: string;
          search_session_id: string;
          recommended_product_id: string | null;
          confidence_score: number;
          recommendation_reason: string;
          tradeoffs: string | null;
          alternatives: Json;
          ai_summary: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          search_session_id: string;
          recommended_product_id?: string | null;
          confidence_score?: number;
          recommendation_reason: string;
          tradeoffs?: string | null;
          alternatives?: Json;
          ai_summary: string;
          created_at?: string;
        };
        Update: never;
      };
      marketplace_results: {
        Row: {
          id: string;
          product_id: string;
          recommendation_id: string;
          marketplace: string;
          listing_url: string;
          title: string;
          seller_name: string | null;
          seller_rating: number | null;
          price: number;
          currency: string;
          shipping_price: number | null;
          shipping_days: number | null;
          product_rating: number | null;
          review_count: number | null;
          availability: boolean;
          condition: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          recommendation_id: string;
          marketplace: string;
          listing_url: string;
          title: string;
          seller_name?: string | null;
          seller_rating?: number | null;
          price: number;
          currency: string;
          shipping_price?: number | null;
          shipping_days?: number | null;
          product_rating?: number | null;
          review_count?: number | null;
          availability?: boolean;
          condition?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: never;
      };
      review_analysis: {
        Row: {
          id: string;
          marketplace_result_id: string;
          summary: string;
          positives: string[];
          negatives: string[];
          sentiment_score: number;
          authenticity_score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          marketplace_result_id: string;
          summary: string;
          positives?: string[];
          negatives?: string[];
          sentiment_score?: number;
          authenticity_score?: number;
          created_at?: string;
        };
        Update: never;
      };
      seller_analysis: {
        Row: {
          id: string;
          marketplace_result_id: string;
          trust_score: number;
          risk_level: string;
          reasoning: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          marketplace_result_id: string;
          trust_score?: number;
          risk_level: string;
          reasoning: string;
          created_at?: string;
        };
        Update: never;
      };
      saved_items: {
        Row: {
          id: string;
          profile_id: string;
          recommendation_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          recommendation_id: string;
          created_at?: string;
        };
        Update: never;
      };
      search_history: {
        Row: {
          id: string;
          profile_id: string;
          search_session_id: string;
          query: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          search_session_id: string;
          query: string;
          created_at?: string;
        };
        Update: never;
      };
      notifications: {
        Row: {
          id: string;
          profile_id: string;
          title: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          title: string;
          message: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          read?: boolean;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      current_profile_id: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
