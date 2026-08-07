import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Bypass local SSL issues for demo environments

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function seed() {
  console.log("Starting live database seed...");

  // 1. Create Retailer Auth User
  console.log("1/3 Creating retailer login (admin@nexusretail.com / SecurePassword123)...");
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: 'admin@nexusretail.com',
    password: 'SecurePassword123',
    email_confirm: true
  });

  if (authError) {
    if (authError.message.includes("already registered") || authError.message.includes("already exists")) {
      console.log("Retailer user already exists, skipping creation.");
    } else {
      console.error("Error creating user:", authError);
    }
  } else {
    console.log("Retailer user created successfully:", authData.user.id);
  }

  // 2. Read Mock Data
  const productsRaw = fs.readFileSync(path.join(__dirname, '../src/data/products.json'), 'utf8');
  const customersRaw = fs.readFileSync(path.join(__dirname, '../src/data/customers.json'), 'utf8');
  const products = JSON.parse(productsRaw);
  const customers = JSON.parse(customersRaw);

  // 3. Insert Products
  console.log("2/3 Inserting mock products into live DB...");
  const cleanProducts = products.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price
  }));
  const { error: productsError } = await supabase.from('products').upsert(cleanProducts);
  if (productsError) console.error("Error seeding products:", productsError);
  else console.log("Products seeded successfully.");

  // 4. Insert Customers
  console.log("3/3 Inserting tokenized customers into live DB...");
  // Mapping the rich mock JSON down to the strict zero-trust schema we created
  const cleanCustomers = customers.map(c => ({
    token_id: c.token_id,
    segments: c.segments,
    purchase_history: c.purchase_history,
    consent_flags: c.consent_flags
  }));

  const { error: customersError } = await supabase.from('customers').upsert(cleanCustomers);
  if (customersError) console.error("Error seeding customers:", customersError);
  else console.log("Customers seeded successfully.");

  console.log("\n✅ Seeding completely finished!");
}

seed();
