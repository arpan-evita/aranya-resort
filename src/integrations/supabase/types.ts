export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blocked_dates: {
        Row: {
          blocked_date: string
          booking_id: string | null
          created_at: string
          id: string
          reason: string | null
          room_category_id: string
          rooms_blocked: number
        }
        Insert: {
          blocked_date: string
          booking_id?: string | null
          created_at?: string
          id?: string
          reason?: string | null
          room_category_id: string
          rooms_blocked?: number
        }
        Update: {
          blocked_date?: string
          booking_id?: string | null
          created_at?: string
          id?: string
          reason?: string | null
          room_category_id?: string
          rooms_blocked?: number
        }
        Relationships: [
          {
            foreignKeyName: "blocked_dates_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocked_dates_room_category_id_fkey"
            columns: ["room_category_id"]
            isOneToOne: false
            referencedRelation: "room_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          assigned_room_number: string | null
          booking_reference: string
          cancelled_at: string | null
          check_in_date: string
          check_out_date: string
          completed_at: string | null
          confirmed_at: string | null
          created_at: string
          discount_amount: number
          extra_guest_total: number
          grand_total: number
          guest_city: string | null
          guest_email: string
          guest_name: string
          guest_phone: string
          id: string
          internal_notes: string | null
          is_enquiry_only: boolean
          meal_plan: Database["public"]["Enums"]["meal_plan"]
          meal_plan_total: number
          num_adults: number
          num_children: number
          num_nights: number
          package_id: string | null
          package_total: number
          room_category_id: string
          room_total: number
          special_requests: string | null
          status: Database["public"]["Enums"]["booking_status"]
          taxes: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_room_number?: string | null
          booking_reference: string
          cancelled_at?: string | null
          check_in_date: string
          check_out_date: string
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          discount_amount?: number
          extra_guest_total?: number
          grand_total: number
          guest_city?: string | null
          guest_email: string
          guest_name: string
          guest_phone: string
          id?: string
          internal_notes?: string | null
          is_enquiry_only?: boolean
          meal_plan?: Database["public"]["Enums"]["meal_plan"]
          meal_plan_total?: number
          num_adults?: number
          num_children?: number
          num_nights: number
          package_id?: string | null
          package_total?: number
          room_category_id: string
          room_total: number
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          taxes?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_room_number?: string | null
          booking_reference?: string
          cancelled_at?: string | null
          check_in_date?: string
          check_out_date?: string
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          discount_amount?: number
          extra_guest_total?: number
          grand_total?: number
          guest_city?: string | null
          guest_email?: string
          guest_name?: string
          guest_phone?: string
          id?: string
          internal_notes?: string | null
          is_enquiry_only?: boolean
          meal_plan?: Database["public"]["Enums"]["meal_plan"]
          meal_plan_total?: number
          num_adults?: number
          num_children?: number
          num_nights?: number
          package_id?: string | null
          package_total?: number
          room_category_id?: string
          room_total?: number
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          taxes?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_room_category_id_fkey"
            columns: ["room_category_id"]
            isOneToOne: false
            referencedRelation: "room_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plan_prices: {
        Row: {
          adult_price: number
          child_price: number
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          meal_plan: Database["public"]["Enums"]["meal_plan"]
          name: string
          updated_at: string
        }
        Insert: {
          adult_price?: number
          child_price?: number
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          meal_plan: Database["public"]["Enums"]["meal_plan"]
          name: string
          updated_at?: string
        }
        Update: {
          adult_price?: number
          child_price?: number
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          meal_plan?: Database["public"]["Enums"]["meal_plan"]
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          applicable_room_ids: string[] | null
          created_at: string
          description: string | null
          duration_nights: number
          exclusions: Json | null
          fixed_price: number | null
          id: string
          images: Json | null
          inclusions: Json | null
          is_active: boolean
          is_featured: boolean
          is_fixed_price: boolean
          max_guests: number | null
          min_guests: number | null
          name: string
          package_type: Database["public"]["Enums"]["package_type"]
          per_night_price: number | null
          short_description: string | null
          slug: string
          sort_order: number | null
          updated_at: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          applicable_room_ids?: string[] | null
          created_at?: string
          description?: string | null
          duration_nights: number
          exclusions?: Json | null
          fixed_price?: number | null
          id?: string
          images?: Json | null
          inclusions?: Json | null
          is_active?: boolean
          is_featured?: boolean
          is_fixed_price?: boolean
          max_guests?: number | null
          min_guests?: number | null
          name: string
          package_type: Database["public"]["Enums"]["package_type"]
          per_night_price?: number | null
          short_description?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          applicable_room_ids?: string[] | null
          created_at?: string
          description?: string | null
          duration_nights?: number
          exclusions?: Json | null
          fixed_price?: number | null
          id?: string
          images?: Json | null
          inclusions?: Json | null
          is_active?: boolean
          is_featured?: boolean
          is_fixed_price?: boolean
          max_guests?: number | null
          min_guests?: number | null
          name?: string
          package_type?: Database["public"]["Enums"]["package_type"]
          per_night_price?: number | null
          short_description?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      room_categories: {
        Row: {
          amenities: Json | null
          base_occupancy: number
          base_price_per_night: number
          created_at: string
          description: string | null
          extra_adult_price: number
          extra_child_price: number
          id: string
          images: Json | null
          max_adults: number
          max_children: number
          name: string
          slug: string
          sort_order: number | null
          status: Database["public"]["Enums"]["room_status"]
          total_rooms: number
          updated_at: string
        }
        Insert: {
          amenities?: Json | null
          base_occupancy?: number
          base_price_per_night: number
          created_at?: string
          description?: string | null
          extra_adult_price?: number
          extra_child_price?: number
          id?: string
          images?: Json | null
          max_adults?: number
          max_children?: number
          name: string
          slug: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["room_status"]
          total_rooms?: number
          updated_at?: string
        }
        Update: {
          amenities?: Json | null
          base_occupancy?: number
          base_price_per_night?: number
          created_at?: string
          description?: string | null
          extra_adult_price?: number
          extra_child_price?: number
          id?: string
          images?: Json | null
          max_adults?: number
          max_children?: number
          name?: string
          slug?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["room_status"]
          total_rooms?: number
          updated_at?: string
        }
        Relationships: []
      }
      seasons: {
        Row: {
          created_at: string
          end_date: string
          id: string
          is_active: boolean
          name: string
          price_multiplier: number
          season_type: Database["public"]["Enums"]["season_type"]
          start_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          is_active?: boolean
          name: string
          price_multiplier?: number
          season_type: Database["public"]["Enums"]["season_type"]
          start_date: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          is_active?: boolean
          name?: string
          price_multiplier?: number
          season_type?: Database["public"]["Enums"]["season_type"]
          start_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      tax_config: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          percentage: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          percentage: number
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          percentage?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_booking_reference: { Args: never; Returns: string }
      get_available_rooms: {
        Args: {
          p_check_in: string
          p_check_out: string
          p_room_category_id: string
        }
        Returns: number
      }
      get_season_multiplier: { Args: { p_date: string }; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "super_admin" | "staff"
      booking_status:
        | "new_enquiry"
        | "pending_confirmation"
        | "confirmed"
        | "cancelled"
        | "completed"
      meal_plan: "EP" | "CP" | "MAP" | "AP"
      package_type:
        | "honeymoon"
        | "safari"
        | "family"
        | "corporate"
        | "weekend"
        | "wedding"
        | "seasonal"
      room_status: "active" | "inactive" | "maintenance"
      season_type: "peak" | "regular" | "off_peak"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "staff"],
      booking_status: [
        "new_enquiry",
        "pending_confirmation",
        "confirmed",
        "cancelled",
        "completed",
      ],
      meal_plan: ["EP", "CP", "MAP", "AP"],
      package_type: [
        "honeymoon",
        "safari",
        "family",
        "corporate",
        "weekend",
        "wedding",
        "seasonal",
      ],
      room_status: ["active", "inactive", "maintenance"],
      season_type: ["peak", "regular", "off_peak"],
    },
  },
} as const
