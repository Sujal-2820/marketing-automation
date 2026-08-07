const fs = require('fs');
const path = require('path');

const outputDir = 'C:\\Users\\Administrator\\Desktop\\Retailer Demo Files';

// Ensure dir exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helpers
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomBool = () => Math.random() > 0.5;

const generateUsers = (storeType, segments, products, count = 100) => {
  const users = [];
  for (let i = 1; i <= count; i++) {
    // Determine 1-2 random segments
    const userSegments = [...new Set([randomFrom(segments), randomFrom(segments)])];
    
    // Determine 1-5 random products with quantities
    const numProducts = Math.floor(Math.random() * 5) + 1;
    const history = [];
    for (let j = 0; j < numProducts; j++) {
      const prod = randomFrom(products);
      const qty = Math.floor(Math.random() * 3) + 1;
      history.push(`${qty}x ${prod}`);
    }
    
    users.push({
      token_id: `usr_${storeType}_${String(i).padStart(3, '0')}`,
      segments: userSegments,
      purchase_history: [...new Set(history)],
      consent_flags: {
        location: randomBool(),
        age: randomBool(),
        purchase_history: Math.random() > 0.1 // 90% have purchase history enabled
      }
    });
  }
  return users;
};

// 1. Amazon General
const amazonUsers = generateUsers('gen', 
  ['Tech Enthusiast', 'Bookworm', 'Fashionista', 'Budget Shopper', 'Impulse Buyer'],
  ['MacBook Pro', 'Levi Jeans', 'Atomic Habits Book', 'Sony Headphones', 'Nike Sneakers', 'Samsung TV', 'Coffee Maker']
);
fs.writeFileSync(path.join(outputDir, 'amazon_general.json'), JSON.stringify(amazonUsers, null, 2));

// 2. Sports Wear
const sportsUsers = generateUsers('sports', 
  ['Gym Freak', 'Marathon Runner', 'Yoga Lover', 'Weekend Warrior', 'Athleisure Trendster'],
  ['Under Armour Compression', 'Nike ZoomX', 'Whey Protein Isolate', 'Yoga Mat', 'Resistance Bands', 'Adidas Trackpants']
);
fs.writeFileSync(path.join(outputDir, 'sports_wear.json'), JSON.stringify(sportsUsers, null, 2));

// 3. Electronics Hub
const techUsers = generateUsers('tech', 
  ['Gamer', 'Smart Home Geek', 'Apple Fanboy', 'PC Builder', 'Audioophile'],
  ['RTX 4090 GPU', 'PS5 Console', 'AirPods Pro', 'Philips Hue Bulbs', 'Mechanical Keyboard', '4K Gaming Monitor']
);
fs.writeFileSync(path.join(outputDir, 'electronics_hub.json'), JSON.stringify(techUsers, null, 2));

// 4. Home Essentials
const homeUsers = generateUsers('home', 
  ['New Homeowner', 'Decor Enthusiast', 'Minimalist', 'Kitchen Master', 'Plant Parent'],
  ['IKEA Sofa', 'Dyson Vacuum', 'Non-stick Pan Set', 'Monstera Plant', 'Aesthetic Lamp', 'Memory Foam Mattress']
);
fs.writeFileSync(path.join(outputDir, 'home_essentials.json'), JSON.stringify(homeUsers, null, 2));

// 5. Grocery Mart
const groceryUsers = generateUsers('grocery', 
  ['Health Conscious', 'Bulk Buyer', 'Snack Lover', 'Vegan', 'Organic Shopper'],
  ['Almond Milk', 'Maggie Noodles', 'Fresh Avocados', 'Oatmeal', 'Lays Chips', 'Protein Bars', 'Brown Rice']
);
fs.writeFileSync(path.join(outputDir, 'grocery_mart.json'), JSON.stringify(groceryUsers, null, 2));

console.log('Successfully generated 5 massive JSON files in Retailer Demo Files!');
