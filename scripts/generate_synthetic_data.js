import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Generate Synthetic Products
const products = [
  { id: "PROD_101", name: "Wireless Noise-Canceling Headphones", category: "Electronics", price: 299.99 },
  { id: "PROD_102", name: "Minimalist Leather Wallet", category: "Accessories", price: 45.00 },
  { id: "PROD_103", name: "Ergonomic Office Chair", category: "Furniture", price: 199.50 },
  { id: "PROD_104", name: "Smart Fitness Watch", category: "Electronics", price: 150.00 },
  { id: "PROD_105", name: "Organic Cotton T-Shirt", category: "Apparel", price: 25.00 },
  { id: "PROD_106", name: "Stainless Steel Water Bottle", category: "Fitness", price: 30.00 },
  { id: "PROD_107", name: "Mechanical Keyboard", category: "Electronics", price: 120.00 },
  { id: "PROD_108", name: "Running Shoes - ZoomX", category: "Apparel", price: 140.00 },
  { id: "PROD_109", name: "Yoga Mat with Alignment Lines", category: "Fitness", price: 40.00 },
  { id: "PROD_110", name: "Smart Home Security Camera", category: "Electronics", price: 89.99 }
];

// 2. Generate Synthetic Customers for various use cases
const customers = [
  // Use Case 1: Full Consent, High-Spender (Good for hyper-personalized luxury ads)
  {
    token_id: "usr_full_consent_001",
    segments: ["High-Spender", "Tech Enthusiast", "Early Adopter"],
    purchase_history: ["PROD_101", "PROD_104", "PROD_107"],
    consent_flags: {
      location: true,
      age: true,
      purchase_history: true
    }
  },
  // Use Case 2: Privacy-Conscious (Location & Age hidden, good for generic/contextual ads only)
  {
    token_id: "usr_private_002",
    segments: ["Discount Seeker", "Casual Buyer"],
    purchase_history: ["PROD_105"],
    consent_flags: {
      location: false,
      age: false,
      purchase_history: true
    }
  },
  // Use Case 3: Purchase History Revoked (Can only use segments for targeting)
  {
    token_id: "usr_no_history_003",
    segments: ["Fitness Buff"],
    purchase_history: ["PROD_106", "PROD_109"], // Real history exists, but AI shouldn't see it if consent is false
    consent_flags: {
      location: true,
      age: true,
      purchase_history: false
    }
  },
  // Use Case 4: Complete Opt-Out (Zero data shared)
  {
    token_id: "usr_opt_out_004",
    segments: ["Unknown"],
    purchase_history: ["PROD_102"],
    consent_flags: {
      location: false,
      age: false,
      purchase_history: false
    }
  },
  // Use Case 5: Apparel & Fitness Enthusiast (Good for cross-selling)
  {
    token_id: "usr_fitness_005",
    segments: ["Active Lifestyle", "Millennial"],
    purchase_history: ["PROD_105", "PROD_108", "PROD_109"],
    consent_flags: {
      location: true,
      age: false,
      purchase_history: true
    }
  }
];

// Write to files
fs.writeFileSync(
  path.join(__dirname, '../src/data/products.json'),
  JSON.stringify(products, null, 2)
);

fs.writeFileSync(
  path.join(__dirname, '../src/data/customers.json'),
  JSON.stringify(customers, null, 2)
);

console.log("✅ Synthetic data successfully generated and written to src/data/");
