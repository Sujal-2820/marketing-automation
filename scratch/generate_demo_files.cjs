const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\Administrator\\Desktop\\Team IP\\Retailer Demo Files';

const storeTypes = [
  {
    folder: 'apex_sports',
    prefix: 'sports',
    segments: ['Gym Freak', 'Yoga Lover', 'Weekend Warrior', 'Marathon Runner'],
    brands: [
      { brand: 'Nike', name: 'Nike ZoomX Running Shoes', category: 'Sports Wear', segment: 'Gym Freak', mrp: 8999, max_discount_pct: 15, stock_qty: 42, policy: 'Nike limits reseller discounts to 15% max.' },
      { brand: 'Under Armour', name: 'UA Compression Top', category: 'Sports Wear', segment: 'Gym Freak', mrp: 3499, max_discount_pct: 20, stock_qty: 0, policy: 'Out of stock - zero inventory available.' },
      { brand: 'Manduka', name: 'Eco Grip Yoga Mat', category: 'Yoga & Wellness', segment: 'Yoga Lover', mrp: 2499, max_discount_pct: 10, stock_qty: 25, policy: 'Manduka MAP policy restricts discounts to 10%.' },
      { brand: 'Salomon', name: 'Quest Trail Boots', category: 'Outdoor Gear', segment: 'Weekend Warrior', mrp: 7999, max_discount_pct: 25, stock_qty: 18, policy: 'Standard 25% discount allowed.' },
      { brand: 'Garmin', name: 'Forerunner 255 GPS Watch', category: 'Fitness Electronics', segment: 'Marathon Runner', mrp: 32999, max_discount_pct: 12, stock_qty: 8, policy: 'Garmin strict 12% max promo limit.' }
    ],
    items: ['Nike ZoomX', 'UA Compression Top', 'Eco Grip Yoga Mat', 'Quest Trail Boots', 'Garmin Forerunner 255', 'Whey Protein Isolate', 'Resistance Bands', 'Hydration Pack', 'Gym Duffel Bag', 'Foam Roller']
  },
  {
    folder: 'techzone',
    prefix: 'tech',
    segments: ['Gamer', 'Smart Home', 'Apple Fanboy', 'Audioophile'],
    brands: [
      { brand: 'NVIDIA', name: 'RTX 4090 GPU', category: 'Gaming Hardware', segment: 'Gamer', mrp: 159999, max_discount_pct: 5, stock_qty: 4, policy: 'NVIDIA strict 5% MAP cap.' },
      { brand: 'Razer', name: 'Razer BlackWidow V4 Pro', category: 'Peripherals', segment: 'Gamer', mrp: 22999, max_discount_pct: 15, stock_qty: 0, policy: 'Out of stock.' },
      { brand: 'Philips Hue', name: 'Smart Starter Kit', category: 'Smart Home', segment: 'Smart Home', mrp: 14999, max_discount_pct: 20, stock_qty: 15, policy: 'Philips allows up to 20% bundle promo.' },
      { brand: 'Apple', name: 'MacBook Pro M3 Max', category: 'Laptops', segment: 'Apple Fanboy', mrp: 249900, max_discount_pct: 8, stock_qty: 10, policy: 'Apple Reseller MAP policy restricts discount to 8% max.' },
      { brand: 'Sony', name: 'WH-1000XM5 ANC Headphones', category: 'Audio', segment: 'Audioophile', mrp: 29990, max_discount_pct: 18, stock_qty: 22, policy: 'Sony authorized maximum discount is 18%.' }
    ],
    items: ['RTX 4090 GPU', 'Razer Keyboard', 'Philips Hue Starter Kit', 'MacBook Pro M3', 'Sony WH-1000XM5', 'Logitech MX Master 3S', '4K Gaming Monitor', 'Elgato Stream Deck', 'Smart Plug Duo', 'MagSafe Charger']
  },
  {
    folder: 'freshmart',
    prefix: 'grocery',
    segments: ['Health Conscious', 'Snack Lover', 'Bulk Buyer', 'Vegan'],
    brands: [
      { brand: 'Organic India', name: 'Organic Almond Milk 1L', category: 'Dairy Alternatives', segment: 'Health Conscious', mrp: 299, max_discount_pct: 10, stock_qty: 85, policy: 'Organic India max discount 10%.' },
      { brand: 'Whole Truth', name: 'Protein Bars Combo (Pack of 6)', category: 'Snacks', segment: 'Snack Lover', mrp: 650, max_discount_pct: 15, stock_qty: 50, policy: 'Standard 15% promotional cap.' },
      { brand: 'Daawat', name: 'Biryani Basmati Rice 5kg', category: 'Staples', segment: 'Bulk Buyer', mrp: 1250, max_discount_pct: 20, stock_qty: 0, policy: 'Out of stock - zero inventory.' },
      { brand: 'Violife', name: 'Vegan Cheese Slices', category: 'Plant Based', segment: 'Vegan', mrp: 499, max_discount_pct: 12, stock_qty: 30, policy: 'Violife 12% max promo allowed.' },
      { brand: 'Happilo', name: 'Premium Iranian Pistachios 500g', category: 'Dry Fruits', segment: 'Health Conscious', mrp: 899, max_discount_pct: 25, stock_qty: 60, policy: 'Happilo 25% max discount.' }
    ],
    items: ['Organic Almond Milk', 'Whole Truth Protein Bars', 'Daawat Basmati Rice 5kg', 'Violife Vegan Cheese', 'Happilo Pistachios', 'Cold Pressed Olive Oil', 'Oat Milk 1L', 'Quinoa 1kg', 'Mixed Berry Granola', 'Avocado Oil']
  },
  {
    folder: 'homevibe',
    prefix: 'home',
    segments: ['New Homeowner', 'Decor', 'Kitchen Master', 'Plant Parent'],
    brands: [
      { brand: 'IKEA', name: 'STRANDMON Wing Chair', category: 'Furniture', segment: 'New Homeowner', mrp: 18990, max_discount_pct: 10, stock_qty: 12, policy: 'IKEA retail policy 10% maximum discount.' },
      { brand: 'Nordic Light', name: 'Minimalist Amber Floor Lamp', category: 'Decor', segment: 'Decor', mrp: 4500, max_discount_pct: 20, stock_qty: 28, policy: 'Decor promo cap 20%.' },
      { brand: 'Wonderchef', name: 'Granite Cookware Set 3Pc', category: 'Kitchenware', segment: 'Kitchen Master', mrp: 3999, max_discount_pct: 30, stock_qty: 0, policy: 'Out of stock.' },
      { brand: 'Nursery Live', name: 'Monstera Deliciosa with Ceramic Pot', category: 'Indoor Plants', segment: 'Plant Parent', mrp: 1299, max_discount_pct: 15, stock_qty: 40, policy: 'Live plant discount cap 15%.' },
      { brand: 'D’Decor', name: 'Velvet Cushion Covers (Set of 4)', category: 'Soft Furnishings', segment: 'Decor', mrp: 1999, max_discount_pct: 25, stock_qty: 35, policy: 'D’Decor 25% promo allowed.' }
    ],
    items: ['IKEA STRANDMON Chair', 'Nordic Amber Floor Lamp', 'Wonderchef Cookware Set', 'Monstera Ceramic Pot', 'D’Decor Cushion Covers', 'Memory Foam Pillow', 'Aromatic Soy Candle', 'Air Purifying Fern', 'Cast Iron Skillet', 'Wall Art Canvas']
  },
  {
    folder: 'general_store',
    prefix: 'gen',
    segments: ['Fashionista', 'Budget Shopper', 'Tech Enthusiast', 'Bookworm'],
    brands: [
      { brand: 'FabIndia', name: 'Chanderi Silk Kurta', category: 'Fashion', segment: 'Fashionista', mrp: 3490, max_discount_pct: 20, stock_qty: 15, policy: 'FabIndia 20% max discount.' },
      { brand: 'Boat', name: 'Airdopes 141 TWS', category: 'Electronics', segment: 'Budget Shopper', mrp: 1499, max_discount_pct: 35, stock_qty: 100, policy: 'Boat high volume 35% discount allowed.' },
      { brand: 'Kindle', name: 'Paperwhite 16GB', category: 'Gadgets', segment: 'Tech Enthusiast', mrp: 14999, max_discount_pct: 10, stock_qty: 0, policy: 'Out of stock.' },
      { brand: 'Penguin', name: 'Atomic Habits by James Clear', category: 'Books', segment: 'Bookworm', mrp: 799, max_discount_pct: 40, stock_qty: 75, policy: 'Penguin books up to 40% promo allowed.' },
      { brand: 'Bata', name: 'Formal Leather Shoes', category: 'Footwear', segment: 'Budget Shopper', mrp: 2499, max_discount_pct: 25, stock_qty: 30, policy: 'Bata 25% max discount.' }
    ],
    items: ['FabIndia Silk Kurta', 'Boat Airdopes 141', 'Kindle Paperwhite', 'Atomic Habits Book', 'Bata Leather Shoes', 'Denim Jacket', 'Stainless Steel Bottle', 'Bluetooth Speaker', 'Travel Backpack', 'Notebook Journal']
  }
];

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

storeTypes.forEach(store => {
  const storeFolderPath = path.join(baseDir, store.folder);
  if (!fs.existsSync(storeFolderPath)) {
    fs.mkdirSync(storeFolderPath, { recursive: true });
  }

  // 1. Generate products.json
  const productsData = store.brands.map((b, idx) => ({
    product_id: `PRD_${store.prefix.toUpperCase()}_00${idx + 1}`,
    brand: b.brand,
    name: b.name,
    category: b.category,
    segment: b.segment,
    mrp: b.mrp,
    max_discount_pct: b.max_discount_pct,
    stock_qty: b.stock_qty,
    brand_policy: b.policy
  }));

  fs.writeFileSync(path.join(storeFolderPath, 'products.json'), JSON.stringify(productsData, null, 2));

  // 2. Generate customers.json (50 synthetic customers with realistic tokens & consent flags)
  const customersData = [];
  
  // Explicit demo personas
  const demoTokens = [
    { token: `usr_${store.prefix}_042`, segs: [store.segments[0], store.segments[1]] },
    { token: `usr_${store.prefix}_012`, segs: [store.segments[1], store.segments[2]] },
    { token: `usr_${store.prefix}_008`, segs: [store.segments[0], store.segments[3]] },
    { token: `usr_${store.prefix}_021`, segs: [store.segments[2], store.segments[3]] }
  ];

  demoTokens.forEach((d, idx) => {
    customersData.push({
      token_id: d.token,
      segments: d.segs,
      purchase_history: [
        `1x ${store.items[idx * 2]}`,
        `2x ${store.items[(idx * 2) + 1]}`
      ],
      consent_flags: {
        location: true,
        age: true,
        purchase_history: true
      }
    });
  });

  // Additional synthetic customers
  for (let i = 5; i <= 50; i++) {
    const padId = String(i).padStart(3, '0');
    const seg1 = store.segments[i % store.segments.length];
    const seg2 = store.segments[(i + 1) % store.segments.length];
    
    customersData.push({
      token_id: `usr_${store.prefix}_${padId}`,
      segments: [seg1, seg2],
      purchase_history: [
        `${(i % 3) + 1}x ${store.items[i % store.items.length]}`,
        `1x ${store.items[(i + 4) % store.items.length]}`
      ],
      consent_flags: {
        location: i % 2 === 0,
        age: i % 3 !== 0,
        purchase_history: i % 5 !== 0 // 20% opt-out to test privacy rules
      }
    });
  }

  fs.writeFileSync(path.join(storeFolderPath, 'customers.json'), JSON.stringify(customersData, null, 2));

  console.log(`Generated synthetic demo data for [${store.folder}]: products.json & customers.json`);
});

console.log('✅ ALL DEMO DATASETS GENERATED SUCCESSFULLY IN PROJECT ROOT!');
