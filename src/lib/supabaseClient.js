import { createClient } from '@supabase/supabase-js'

// Fallback to hardcoded credentials if .env variables are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hyspvvzydtmzerkaxzke.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5c3B2dnp5ZHRtemVya2F4emtlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjA5ODk1MywiZXhwIjoyMTAxNjc0OTUzfQ.FZ3GcfL3edtCHhNPWF9tQRAVCgwosYrke4cpEvMDRL0"

// Initialize the live Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Enterprise Supabase Backend Service Layer
 * Manages database persistence, real-time campaign sync, customer vault tokens,
 * vector embedding storage, and AI generation audit logs.
 */
export const SupabaseBackendService = {
  /**
   * Fetch active campaigns from Supabase database
   */
  async fetchCampaigns() {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('id', { ascending: true });
      if (error) {
        console.warn('[Supabase Backend] Campaign fetch fallback:', error.message);
        return null;
      }
      return data;
    } catch (e) {
      console.warn('[Supabase Backend] Exception during fetchCampaigns:', e.message);
      return null;
    }
  },

  /**
   * Sync/Upsert modified campaign state to Supabase table
   */
  async saveCampaign(campaign) {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .upsert(campaign, { onConflict: 'id' });
      if (error) console.warn('[Supabase Backend] Campaign upsert warning:', error.message);
      return { success: !error, data };
    } catch (e) {
      console.warn('[Supabase Backend] Campaign upsert exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  /**
   * Vector Embeddings Table Service (RAG Context Retrieval)
   * Queries Supabase pgvector store for semantic similarity matches
   */
  async matchCustomerEmbeddings(embeddingVector, matchThreshold = 0.78, matchCount = 5) {
    try {
      const { data, error } = await supabase.rpc('match_customer_embeddings', {
        query_embedding: embeddingVector,
        similarity_threshold: matchThreshold,
        match_count: matchCount
      });
      if (error) return [];
      return data || [];
    } catch (e) {
      return [];
    }
  },

  /**
   * Log AI Campaign Generation Event to Audit DB
   */
  async logAiGenerationEvent(campaignId, promptText, modelName, guardrailPassed) {
    try {
      await supabase.from('ai_generation_logs').insert([{
        campaign_id: campaignId,
        prompt: promptText,
        model_name: modelName || 'Pollinations-FLUX.1-schnell',
        guardrail_status: guardrailPassed ? 'PASSED' : 'SANITIZED',
        created_at: new Date().toISOString()
      }]);
    } catch (e) {
      // Non-blocking log operation
    }
  }
};
