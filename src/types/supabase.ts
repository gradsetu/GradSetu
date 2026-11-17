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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      aspirant_profiles: {
        Row: {
          budget: string | null
          city: string | null
          created_at: string
          current_education_level: string | null
          entrance_exams: string[] | null
          hostel_preference: string | null
          id: string
          preferred_branch: string | null
          preferred_course: string | null
          target_year: number | null
          updated_at: string
        }
        Insert: {
          budget?: string | null
          city?: string | null
          created_at?: string
          current_education_level?: string | null
          entrance_exams?: string[] | null
          hostel_preference?: string | null
          id: string
          preferred_branch?: string | null
          preferred_course?: string | null
          target_year?: number | null
          updated_at?: string
        }
        Update: {
          budget?: string | null
          city?: string | null
          created_at?: string
          current_education_level?: string | null
          entrance_exams?: string[] | null
          hostel_preference?: string | null
          id?: string
          preferred_branch?: string | null
          preferred_course?: string | null
          target_year?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "aspirant_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          amount: number | null
          aspirant_id: string
          college_name: string | null
          course: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          meet_link: string | null
          mentor_id: string
          payment_method: string | null
          payment_status: string | null
          session_date: string
          session_time: string
          session_type: string
          status: string | null
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          amount?: number | null
          aspirant_id: string
          college_name?: string | null
          course?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          meet_link?: string | null
          mentor_id: string
          payment_method?: string | null
          payment_status?: string | null
          session_date: string
          session_time: string
          session_type?: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number | null
          aspirant_id?: string
          college_name?: string | null
          course?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          meet_link?: string | null
          mentor_id?: string
          payment_method?: string | null
          payment_status?: string | null
          session_date?: string
          session_time?: string
          session_type?: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_aspirant_id_fkey"
            columns: ["aspirant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      colleges: {
        Row: {
          about: string | null
          admission_criteria: string | null
          avg_package: string | null
          avg_package_num: number | null
          campus_images: Json | null
          campus_size: string | null
          city: string
          courses: Json | null
          crawl_source: string | null
          created_at: string
          established_year: number | null
          facilities: string[] | null
          featured_image: string | null
          has_hostel: boolean | null
          highest_package: string | null
          highest_package_num: number | null
          id: string
          last_crawled_at: string | null
          name: string
          nirf_rank: number | null
          placement_rate: number | null
          rating: number | null
          review_count: number | null
          search_vector: unknown
          short_name: string
          state: string
          tuition_fee_num: number | null
          tuition_fee_per_year: string | null
          type: string
          website_url: string | null
        }
        Insert: {
          about?: string | null
          admission_criteria?: string | null
          avg_package?: string | null
          avg_package_num?: number | null
          campus_images?: Json | null
          campus_size?: string | null
          city: string
          courses?: Json | null
          crawl_source?: string | null
          created_at?: string
          established_year?: number | null
          facilities?: string[] | null
          featured_image?: string | null
          has_hostel?: boolean | null
          highest_package?: string | null
          highest_package_num?: number | null
          id: string
          last_crawled_at?: string | null
          name: string
          nirf_rank?: number | null
          placement_rate?: number | null
          rating?: number | null
          review_count?: number | null
          search_vector?: unknown
          short_name: string
          state: string
          tuition_fee_num?: number | null
          tuition_fee_per_year?: string | null
          type: string
          website_url?: string | null
        }
        Update: {
          about?: string | null
          admission_criteria?: string | null
          avg_package?: string | null
          avg_package_num?: number | null
          campus_images?: Json | null
          campus_size?: string | null
          city?: string
          courses?: Json | null
          crawl_source?: string | null
          created_at?: string
          established_year?: number | null
          facilities?: string[] | null
          featured_image?: string | null
          has_hostel?: boolean | null
          highest_package?: string | null
          highest_package_num?: number | null
          id?: string
          last_crawled_at?: string | null
          name?: string
          nirf_rank?: number | null
          placement_rate?: number | null
          rating?: number | null
          review_count?: number | null
          search_vector?: unknown
          short_name?: string
          state?: string
          tuition_fee_num?: number | null
          tuition_fee_per_year?: string | null
          type?: string
          website_url?: string | null
        }
        Relationships: []
      }
      mentor_profiles: {
        Row: {
          available_days: string[] | null
          available_time_slots: string[] | null
          avatar: string | null
          bio: string | null
          branch: string | null
          college_id: string | null
          college_location: string | null
          college_name: string | null
          course: string | null
          created_at: string
          current_year: string | null
          enrollment_number: string | null
          expertise: string[] | null
          graduation_year: string | null
          id: string
          is_publicly_listed: boolean | null
          rating: number | null
          review_count: number | null
          session_duration: number | null
          session_price: number | null
          state: string | null
          total_earnings: number | null
          total_sessions: number | null
          updated_at: string
          verification_document_url: string | null
          verification_remarks: string | null
          verification_status: string | null
          verification_submitted_at: string | null
        }
        Insert: {
          available_days?: string[] | null
          available_time_slots?: string[] | null
          avatar?: string | null
          bio?: string | null
          branch?: string | null
          college_id?: string | null
          college_location?: string | null
          college_name?: string | null
          course?: string | null
          created_at?: string
          current_year?: string | null
          enrollment_number?: string | null
          expertise?: string[] | null
          graduation_year?: string | null
          id: string
          is_publicly_listed?: boolean | null
          rating?: number | null
          review_count?: number | null
          session_duration?: number | null
          session_price?: number | null
          state?: string | null
          total_earnings?: number | null
          total_sessions?: number | null
          updated_at?: string
          verification_document_url?: string | null
          verification_remarks?: string | null
          verification_status?: string | null
          verification_submitted_at?: string | null
        }
        Update: {
          available_days?: string[] | null
          available_time_slots?: string[] | null
          avatar?: string | null
          bio?: string | null
          branch?: string | null
          college_id?: string | null
          college_location?: string | null
          college_name?: string | null
          course?: string | null
          created_at?: string
          current_year?: string | null
          enrollment_number?: string | null
          expertise?: string[] | null
          graduation_year?: string | null
          id?: string
          is_publicly_listed?: boolean | null
          rating?: number | null
          review_count?: number | null
          session_duration?: number | null
          session_price?: number | null
          state?: string | null
          total_earnings?: number | null
          total_sessions?: number | null
          updated_at?: string
          verification_document_url?: string | null
          verification_remarks?: string | null
          verification_status?: string | null
          verification_submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentor_profiles_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          aspirant_avatar: string | null
          aspirant_id: string | null
          aspirant_name: string
          comment: string
          created_at: string
          id: string
          is_moderated: boolean | null
          is_visible: boolean | null
          mentor_id: string
          rating: number
        }
        Insert: {
          aspirant_avatar?: string | null
          aspirant_id?: string | null
          aspirant_name: string
          comment: string
          created_at?: string
          id?: string
          is_moderated?: boolean | null
          is_visible?: boolean | null
          mentor_id: string
          rating: number
        }
        Update: {
          aspirant_avatar?: string | null
          aspirant_id?: string | null
          aspirant_name?: string
          comment?: string
          created_at?: string
          id?: string
          is_moderated?: boolean | null
          is_visible?: boolean | null
          mentor_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_aspirant_id_fkey"
            columns: ["aspirant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          aspirant_id: string | null
          aspirant_rating: number | null
          booking_id: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          meeting_link: string | null
          mentor_id: string | null
          mentor_rating: number | null
          notes: string | null
          scheduled_at: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          aspirant_id?: string | null
          aspirant_rating?: number | null
          booking_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          meeting_link?: string | null
          mentor_id?: string | null
          mentor_rating?: number | null
          notes?: string | null
          scheduled_at?: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          aspirant_id?: string | null
          aspirant_rating?: number | null
          booking_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          meeting_link?: string | null
          mentor_id?: string | null
          mentor_rating?: number | null
          notes?: string | null
          scheduled_at?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_aspirant_id_fkey"
            columns: ["aspirant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_verifications: {
        Row: {
          college_name: string
          created_at: string
          document_r2_path: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          college_name: string
          created_at?: string
          document_r2_path: string
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          college_name?: string
          created_at?: string
          document_r2_path?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          created_at: string
          id: string
          message: string
          priority: string | null
          status: string | null
          subject: string
          user_id: string | null
          user_name: string
          user_role: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          priority?: string | null
          status?: string | null
          subject: string
          user_id?: string | null
          user_name: string
          user_role: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          priority?: string | null
          status?: string | null
          subject?: string
          user_id?: string | null
          user_name?: string
          user_role?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      search_colleges: {
        Args: {
          filter_state?: string
          filter_type?: string
          max_fee?: number
          min_placement?: number
          page_limit?: number
          page_offset?: number
          search_query?: string
          sort_by?: string
          sort_direction?: string
        }
        Returns: {
          about: string | null
          admission_criteria: string | null
          avg_package: string | null
          avg_package_num: number | null
          campus_images: Json | null
          campus_size: string | null
          city: string
          courses: Json | null
          crawl_source: string | null
          created_at: string
          established_year: number | null
          facilities: string[] | null
          featured_image: string | null
          has_hostel: boolean | null
          highest_package: string | null
          highest_package_num: number | null
          id: string
          last_crawled_at: string | null
          name: string
          nirf_rank: number | null
          placement_rate: number | null
          rating: number | null
          review_count: number | null
          search_vector: unknown
          short_name: string
          state: string
          tuition_fee_num: number | null
          tuition_fee_per_year: string | null
          type: string
          website_url: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "colleges"
          isOneToOne: false
          isSetofReturn: true
        }
      }
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

