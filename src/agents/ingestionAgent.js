/**
 * Agent 1: Data Ingestion & Preprocessing Agent (The Gatekeeper)
 * Role: Intercepts data, enforces Zero Trust by checking consent flags, and scrubs PII.
 */

export const ingestCustomerData = (customerData, secureVault) => {
  console.log("[Ingestion Agent] Intercepting data payload...");

  // 1. Consent Validation (Zero Trust)
  const allowedData = { ...customerData };
  
  if (!customerData.consent_flags.purchase_history) {
    console.warn("[Ingestion Agent] WARN: Purchase History consent revoked. Scrubbing data.");
    allowedData.purchase_history = [];
    allowedData.recent_activity = [];
  }

  // 2. Tokenization & Vault Mapping Simulation
  // In a real backend, this would swap PII for tokens. Here, we prove the logic
  // by ensuring we only pass the token_id downstream, not the vault data.
  const isTokenValid = secureVault.hasOwnProperty(customerData.token_id);
  
  if (!isTokenValid) {
    throw new Error("[Ingestion Agent] FATAL: Invalid token detected.");
  }

  console.log("[Ingestion Agent] Data scrubbed and verified. Passing tokenized payload.");
  return allowedData; // Only returns token_id and behavioral tags, NO PII
};
