import React, { useState } from 'react';
import { Edit2, Check, Sparkles, Loader2, PlayCircle, Store, MessageSquare, Image as ImageIcon, Upload, AlignLeft, AlignCenter, AlignRight, KeyRound, ExternalLink, Info, X, ShieldAlert, CheckCircle2, RefreshCw, AlertTriangle, ThumbsUp } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { validateCampaignsAgainstCatalog } from '../../agents/campaignGuardrail';

export default function LiveFeed() {
  const { campaigns, setCampaigns, customers, productCatalog } = useAppContext();
  
  // States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  
  // Language selector for content generation
  const [contentLanguage, setContentLanguage] = useState('hinglish');

  // Editor state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', subtitle: '', cta: '', textPosition: 'center', smsCopy: '', imageUrl: '' });

  // View state (Banner vs SMS)
  const [viewMode, setViewMode] = useState({});

  // Active Demo Info Popover (campaignId)
  const [activeGuideId, setActiveGuideId] = useState(null);

  // Approval Warning Toast State
  const [toastWarning, setToastWarning] = useState(null);

  // AI Prompt Regeneration Drawer States
  const [aiRegenId, setAiRegenId] = useState(null);
  const [aiPromptText, setAiPromptText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState({});

  // Store inference
  const storeType = customers.length > 0 ? customers[0].token_id.split('_')[1] : 'gen';

  const simulateGeneration = () => {
    setIsGenerating(true);
    setGenerationStep(0);
    setCampaigns([]);
    
    // Simulate steps
    setTimeout(() => setGenerationStep(1), 1500); 
    setTimeout(() => setGenerationStep(2), 3000);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationStep(3);
      generateCampaigns(contentLanguage);
    }, 4500);
  };

  // Persona guides for demo presenter
  const getDemoGuide = (targetSegment) => {
    const guideMap = {
      'Gym Freak': { persona: 'Rahul (Gym Freak)', token: 'usr_sports_042', credentials: 'rahul@nexus.vault' },
      'Yoga Lover': { persona: 'Priya (Yoga & Wellness)', token: 'usr_sports_018', credentials: 'priya@nexus.vault' },
      'Weekend Warrior': { persona: 'Vikram (Weekend Outdoor)', token: 'usr_sports_055', credentials: 'vikram@nexus.vault' },
      'Marathon Runner': { persona: 'Amit (Marathon Runner)', token: 'usr_sports_089', credentials: 'amit@nexus.vault' },
      
      'Gamer': { persona: 'Ananya (Tech & Gaming)', token: 'usr_tech_012', credentials: 'ananya@nexus.vault' },
      'Smart Home': { persona: 'Siddharth (Smart Home)', token: 'usr_tech_045', credentials: 'siddharth@nexus.vault' },
      'Apple Fanboy': { persona: 'Rohan (Apple Fanboy)', token: 'usr_tech_077', credentials: 'rohan@nexus.vault' },
      'Audioophile': { persona: 'Kabir (Audiophile)', token: 'usr_tech_092', credentials: 'kabir@nexus.vault' },

      'Health Conscious': { persona: 'Vikram (Gourmet Grocery)', token: 'usr_grocery_008', credentials: 'vikram@nexus.vault' },
      'Snack Lover': { persona: 'Neha (Midnight Snacks)', token: 'usr_grocery_034', credentials: 'neha@nexus.vault' },
      'Bulk Buyer': { persona: 'Ramesh (Family Ration)', token: 'usr_grocery_061', credentials: 'ramesh@nexus.vault' },
      'Vegan': { persona: 'Maya (Plant Based)', token: 'usr_grocery_088', credentials: 'maya@nexus.vault' },

      'New Homeowner': { persona: 'Sneha (Home Decor)', token: 'usr_home_021', credentials: 'sneha@nexus.vault' },
      'Decor': { persona: 'Pooja (Decor Enthusiast)', token: 'usr_home_043', credentials: 'pooja@nexus.vault' },
      'Kitchen Master': { persona: 'Chef Arjun (Kitchen)', token: 'usr_home_067', credentials: 'arjun@nexus.vault' },
      'Plant Parent': { persona: 'Ritu (Plant Parent)', token: 'usr_home_090', credentials: 'ritu@nexus.vault' }
    };

    return guideMap[targetSegment] || { persona: 'Rahul (Gym Freak)', token: 'usr_sports_042', credentials: 'rahul@nexus.vault' };
  };

  // Language-aware copy variants
  const copyVariants = {
    hinglish: {
      sports: [
        { title: 'Gym Freak Ho?', subtitle: 'Bhaag ke aao, naya activewear collection is here. Flat 30% off!', cta: 'Shop Now', smsCopy: 'Bhai gym apparel ka naya stock aagaya hai! Surprize flat 30% discount sirf aaj ke liye valid hai. Abhi claim karo: apexsports.store/gym' },
        { title: 'Find Your Zen, Yaar', subtitle: 'Premium yoga mats that won\'t slip. Perfect for your daily surya namaskar.', cta: 'Buy Mat', smsCopy: 'Yoga session mein slip hone ka jhanjhat khatam! Get non-slip eco mats with special member pricing today: apexsports.store/yoga' },
        { title: 'Weekend Plans Sort Kar!', subtitle: 'Trekking shoes jo chalenge saalo saal. Check out the new range.', cta: 'Explore Shoes', smsCopy: 'Trekking ka plan hai? Rugged trail grip shoes ab flat 25% discount pe available hain. Adventure start karo: apexsports.store/trek' },
        { title: 'Run Like The Wind', subtitle: 'Lightweight running gear for your next big marathon. Stock limited hai!', cta: 'Upgrade Gear', smsCopy: 'Marathon preparation chalu hai? Ultra-breathable running gear for long runs is back in stock. Order now: apexsports.store/run' }
      ],
      tech: [
        { title: 'Game On, Boss!', subtitle: 'RTX 4090 GPUs in stock. Lag free gaming ka maza lo.', cta: 'Buy GPU', smsCopy: 'Zero lag, ultra high FPS gaming! RTX 4090 GPUs in-stock hain with instant cashback. Units limited hain, claim karo: techzone.store/rtx' },
        { title: 'Ghar Ko Smart Banao', subtitle: 'Control lights with your voice. Smart bulbs at lowest prices.', cta: 'Upgrade Home', smsCopy: 'Ek aawaaz pe poora ghar lightup karo! Smart voice RGB bulbs ab combo pack discount pe. Today\'s offer: techzone.store/smart' },
        { title: 'Naya iPhone Aagaya!', subtitle: 'Zero cost EMI pe apna dream phone ghar le aao.', cta: 'Pre-book Now', smsCopy: 'Upgrade to the newest iPhone with No-Cost EMI & instant ₹5000 exchange bonus! Offer ends tonight: techzone.store/iphone' },
        { title: 'Music Ka Asli Maza', subtitle: 'Noise cancelling headphones for that perfect commute. Try it today.', cta: 'Hear The Magic', smsCopy: 'Daily commute ko concert banao! Active noise cancelling headphones with 40h battery now at special price: techzone.store/audio' }
      ],
      grocery: [
        { title: 'Healthy Khao, Fit Raho', subtitle: 'Organic oats and almond milk combo on discount today.', cta: 'Add to Cart', smsCopy: 'Clean eating made affordable! Organic oats & unsweetened almond milk bundle on 20% off today. Grab health deal: freshmart.store/health' },
        { title: 'Midnight Cravings?', subtitle: 'Munchies delivered in 10 minutes. Binge watching just got better.', cta: 'Order Snacks', smsCopy: 'Late night binge-watching sessions? Crunchiest protein & gourmet snacks delivered in 10 mins. Order now: freshmart.store/snacks' },
        { title: 'Mahine Ka Ration, Sasta!', subtitle: 'Buy 5kg rice and get 1kg free. Offer valid till weekend.', cta: 'Stock Up', smsCopy: 'Ghar ka monthly grocery budget bachao! Buy 5kg premium Basmati, get 1kg free today. Order: freshmart.store/ration' },
        { title: '100% Plant Based', subtitle: 'Delicious vegan alternatives that taste amazing. Try kar ke dekho.', cta: 'Go Vegan', smsCopy: 'Guilt-free plant-based goodness! Discover delicious dairy-free cheeses & vegan meats on sale: freshmart.store/vegan' }
      ],
      home: [
        { title: 'Ghar Naya, Furniture Naya', subtitle: 'Complete living room sets at wholesale prices. Sahi daam, badhiya kaam.', cta: 'View Sets', smsCopy: 'Naye ghar ko sajane ki taiyari? Premium solid wood living room sets at factory wholesale prices. Free assembly: homevibe.store/furniture' },
        { title: 'Vibe Set Karo', subtitle: 'Aesthetic lamps and wall art to make your room pop.', cta: 'Shop Decor', smsCopy: 'Room ki aesthetic badal do! Touch dimmable Nordic lamps & wall art on flash sale today. Check collection: homevibe.store/decor' },
        { title: 'Masterchef Bano', subtitle: 'Non-stick pan sets that make cooking a breeze. Clean up is easy too.', cta: 'Upgrade Kitchen', smsCopy: 'Cooking experience ko effortless banao! Non-stick granite cookware combo set on 30% discount: homevibe.store/kitchen' },
        { title: 'Green Living, Yaar', subtitle: 'Indoor plants that are hard to kill. Perfect for your desk.', cta: 'Adopt a Plant', smsCopy: 'Ghar mein positive green vibes lao! Low-maintenance indoor plants with ceramic pots now on sale: homevibe.store/plants' }
      ],
      gen: [
        { title: 'Trend Set Kar', subtitle: 'Latest ethnic and western wear. Diwali aane wali hai, ready raho!', cta: 'Shop Looks', smsCopy: 'Diwali festive looks are live! Designer ethnic kurtas and western dresses at flat 35% off. Elevate style: store.com/fashion' },
        { title: 'Sasta Aur Tikau', subtitle: 'Under ₹499 store. Sab kuch budget mein, bina compromise ke.', cta: 'Shop Under 499', smsCopy: 'Super savings zone! Everything under ₹499 store open now. Premium quality on budget prices: store.com/499' },
        { title: 'Gadgets Jo Deewane Bana De', subtitle: 'Latest smartwatches and TWS earbuds. Don\'t miss out.', cta: 'Explore Tech', smsCopy: 'Smart lifestyle upgrade! ANC wireless earbuds & AMOLED smartwatches at unbeatable prices: store.com/gadgets' },
        { title: 'Padhai Chalu Rakh', subtitle: 'Bestselling fiction and self-help books at 40% off.', cta: 'Buy Books', smsCopy: 'Weekend reading sorted! Top self-help bestsellers & fiction paperbacks at 40% off today: store.com/books' }
      ]
    },
    english: {
      sports: [
        { title: 'Unleash Your Inner Athlete', subtitle: 'New activewear collection just dropped. Flat 30% off today only!', cta: 'Shop Now', smsCopy: 'New gym apparel in stock! Flat 30% off today only. Claim your deal now: apexsports.store/gym' },
        { title: 'Find Your Balance', subtitle: 'Premium non-slip yoga mats for your daily practice.', cta: 'Buy Mat', smsCopy: 'Non-slip eco yoga mats now available at special member pricing. Shop today: apexsports.store/yoga' },
        { title: 'Weekend Adventure Awaits', subtitle: 'Trekking shoes built to last. Explore the new range.', cta: 'Explore Shoes', smsCopy: 'Rugged trail grip trekking shoes at 25% off. Start your adventure: apexsports.store/trek' },
        { title: 'Born to Run', subtitle: 'Lightweight running gear for your next marathon. Limited stock!', cta: 'Upgrade Gear', smsCopy: 'Ultra-breathable marathon running gear is back in stock. Order now: apexsports.store/run' }
      ],
      tech: [
        { title: 'Level Up Your Game', subtitle: 'RTX 4090 GPUs now in stock. Zero lag, maximum performance.', cta: 'Buy GPU', smsCopy: 'RTX 4090 GPUs in stock with instant cashback. Limited units available: techzone.store/rtx' },
        { title: 'Make Your Home Smart', subtitle: 'Voice-controlled smart bulbs at the lowest prices ever.', cta: 'Upgrade Home', smsCopy: 'Smart RGB bulbs with Alexa & Google support now on combo discount: techzone.store/smart' },
        { title: 'The New iPhone is Here', subtitle: 'Zero-cost EMI. Take your dream phone home today.', cta: 'Pre-book Now', smsCopy: 'Newest iPhone with No-Cost EMI & ₹5000 exchange bonus. Offer ends tonight: techzone.store/iphone' },
        { title: 'Pure Sound, Zero Noise', subtitle: 'Active noise-cancelling headphones for the perfect commute.', cta: 'Hear The Magic', smsCopy: 'ANC headphones with 40-hour battery at special price: techzone.store/audio' }
      ],
      grocery: [
        { title: 'Eat Clean, Stay Fit', subtitle: 'Organic oats and almond milk combo at 20% off today.', cta: 'Add to Cart', smsCopy: 'Organic oats & almond milk bundle at 20% off. Grab the deal: freshmart.store/health' },
        { title: 'Late Night Cravings?', subtitle: 'Snacks delivered in 10 minutes. Binge-watching just got better.', cta: 'Order Snacks', smsCopy: 'Protein & gourmet snacks delivered in 10 minutes. Order now: freshmart.store/snacks' },
        { title: 'Monthly Groceries, Best Prices', subtitle: 'Buy 5kg rice and get 1kg free. This weekend only.', cta: 'Stock Up', smsCopy: 'Buy 5kg premium Basmati, get 1kg free. Order today: freshmart.store/ration' },
        { title: '100% Plant Based', subtitle: 'Delicious vegan alternatives that taste amazing.', cta: 'Go Vegan', smsCopy: 'Dairy-free cheeses & vegan meats now on sale: freshmart.store/vegan' }
      ],
      home: [
        { title: 'New Home, Fresh Start', subtitle: 'Complete living room sets at wholesale prices.', cta: 'View Sets', smsCopy: 'Premium living room sets at factory prices with free assembly: homevibe.store/furniture' },
        { title: 'Set the Mood', subtitle: 'Aesthetic lamps and wall art to transform your space.', cta: 'Shop Decor', smsCopy: 'Nordic lamps & wall art on flash sale today: homevibe.store/decor' },
        { title: 'Cook Like a Pro', subtitle: 'Non-stick pan sets for effortless cooking and easy cleanup.', cta: 'Upgrade Kitchen', smsCopy: 'Non-stick granite cookware combo at 30% off: homevibe.store/kitchen' },
        { title: 'Go Green Indoors', subtitle: 'Low-maintenance indoor plants perfect for any desk.', cta: 'Adopt a Plant', smsCopy: 'Indoor plants with ceramic pots on sale: homevibe.store/plants' }
      ],
      gen: [
        { title: 'Set the Trend', subtitle: 'Latest ethnic and western wear. Get Diwali-ready!', cta: 'Shop Looks', smsCopy: 'Designer ethnic kurtas and dresses at 35% off: store.com/fashion' },
        { title: 'Everything Under ₹499', subtitle: 'Quality products at budget-friendly prices.', cta: 'Shop Under 499', smsCopy: 'Under ₹499 store is open. Premium quality, budget prices: store.com/499' },
        { title: 'Gadgets You\'ll Love', subtitle: 'Smartwatches and wireless earbuds at unbeatable prices.', cta: 'Explore Tech', smsCopy: 'ANC earbuds & AMOLED smartwatches at best prices: store.com/gadgets' },
        { title: 'Books That Inspire', subtitle: 'Bestselling fiction and self-help titles at 40% off.', cta: 'Buy Books', smsCopy: 'Top bestsellers at 40% off today: store.com/books' }
      ]
    },
    hindi: {
      sports: [
        { title: 'जिम के दीवानो, सुनो!', subtitle: 'नया एक्टिववियर कलेक्शन आ गया है। सीधा 30% छूट!', cta: 'अभी खरीदें', smsCopy: 'जिम के कपड़ों का नया स्टॉक आ गया है! आज ही 30% छूट का फायदा उठाएं: apexsports.store/gym' },
        { title: 'योग से जुड़ो', subtitle: 'फिसलन-रोधी योग मैट। रोज़ाना के अभ्यास के लिए सबसे अच्छी।', cta: 'मैट खरीदें', smsCopy: 'इको-फ्रेंडली नॉन-स्लिप योग मैट विशेष कीमत पर उपलब्ध: apexsports.store/yoga' },
        { title: 'वीकेंड का प्लान बनाओ!', subtitle: 'ट्रेकिंग के जूते जो सालों साल चलें। नई रेंज देखें।', cta: 'जूते देखें', smsCopy: 'ट्रेकिंग शूज़ पर 25% की छूट! अपना एडवेंचर शुरू करें: apexsports.store/trek' },
        { title: 'हवा से बातें करो', subtitle: 'अगली मैराथन के लिए हल्के रनिंग गियर। सीमित स्टॉक!', cta: 'गियर अपग्रेड करें', smsCopy: 'मैराथन की तैयारी? अल्ट्रा-ब्रीदेबल रनिंग गियर वापस स्टॉक में: apexsports.store/run' }
      ],
      tech: [
        { title: 'गेमिंग का असली मज़ा!', subtitle: 'RTX 4090 GPU स्टॉक में है। बिना लैग के गेमिंग।', cta: 'GPU खरीदें', smsCopy: 'RTX 4090 GPU स्टॉक में! तुरंत कैशबैक के साथ: techzone.store/rtx' },
        { title: 'घर को स्मार्ट बनाओ', subtitle: 'आवाज़ से लाइट कंट्रोल करो। स्मार्ट बल्ब सबसे सस्ते दाम पर।', cta: 'होम अपग्रेड', smsCopy: 'स्मार्ट RGB बल्ब कॉम्बो डिस्काउंट पर: techzone.store/smart' },
        { title: 'नया iPhone आ गया!', subtitle: 'ज़ीरो कॉस्ट EMI पर अपना ड्रीम फोन घर ले जाओ।', cta: 'प्री-बुक करें', smsCopy: 'नया iPhone नो-कॉस्ट EMI और ₹5000 एक्सचेंज बोनस के साथ: techzone.store/iphone' },
        { title: 'संगीत का असली आनंद', subtitle: 'नॉइज़ कैंसलिंग हेडफ़ोन्स। 40 घंटे की बैटरी।', cta: 'सुनो जादू', smsCopy: 'ANC हेडफ़ोन्स विशेष कीमत पर: techzone.store/audio' }
      ],
      grocery: [
        { title: 'स्वस्थ खाओ, फिट रहो', subtitle: 'ऑर्गेनिक ओट्स और बादाम दूध कॉम्बो पर छूट।', cta: 'कार्ट में डालें', smsCopy: 'ऑर्गेनिक ओट्स और बादाम दूध बंडल 20% छूट पर: freshmart.store/health' },
        { title: 'रात की भूख?', subtitle: '10 मिनट में स्नैक्स डिलीवरी। बिंज वॉचिंग और मज़ेदार!', cta: 'स्नैक्स ऑर्डर करें', smsCopy: 'प्रोटीन स्नैक्स 10 मिनट में डिलीवरी: freshmart.store/snacks' },
        { title: 'महीने का राशन, सस्ता!', subtitle: '5 किलो चावल खरीदो, 1 किलो मुफ़्त। वीकेंड तक ऑफर।', cta: 'स्टॉक करें', smsCopy: '5 किलो प्रीमियम बासमती पर 1 किलो मुफ़्त: freshmart.store/ration' },
        { title: '100% प्लांट बेस्ड', subtitle: 'स्वादिष्ट शाकाहारी विकल्प। ज़रूर आज़माएं।', cta: 'वीगन ट्राई करें', smsCopy: 'डेयरी-फ्री चीज़ और वीगन मीट सेल पर: freshmart.store/vegan' }
      ],
      home: [
        { title: 'नया घर, नया फ़र्नीचर', subtitle: 'लिविंग रूम सेट थोक दाम पर। बढ़िया काम, सही दाम।', cta: 'सेट देखें', smsCopy: 'प्रीमियम लिविंग रूम सेट फ़ैक्टरी कीमत पर, मुफ़्त असेंबली: homevibe.store/furniture' },
        { title: 'माहौल बनाओ', subtitle: 'एस्थेटिक लैंप और वॉल आर्ट से कमरा सजाओ।', cta: 'डेकोर खरीदें', smsCopy: 'नॉर्डिक लैंप और वॉल आर्ट फ़्लैश सेल पर: homevibe.store/decor' },
        { title: 'मास्टरशेफ़ बनो', subtitle: 'नॉन-स्टिक पैन सेट। खाना बनाना आसान, सफ़ाई और भी।', cta: 'किचन अपग्रेड', smsCopy: 'नॉन-स्टिक ग्रेनाइट कुकवेयर कॉम्बो 30% छूट पर: homevibe.store/kitchen' },
        { title: 'हरी-भरी ज़िंदगी', subtitle: 'आसान देखभाल वाले इंडोर प्लांट्स। डेस्क के लिए परफ़ेक्ट।', cta: 'पौधा अपनाएं', smsCopy: 'इंडोर प्लांट्स सिरेमिक पॉट के साथ सेल पर: homevibe.store/plants' }
      ],
      gen: [
        { title: 'ट्रेंड सेट करो', subtitle: 'एथनिक और वेस्टर्न वियर। दिवाली की तैयारी करो!', cta: 'लुक देखें', smsCopy: 'डिज़ाइनर एथनिक कुर्ते और ड्रेस 35% छूट पर: store.com/fashion' },
        { title: 'सस्ता और टिकाऊ', subtitle: '₹499 से कम का स्टोर। बजट में सब कुछ।', cta: '₹499 में खरीदें', smsCopy: '₹499 से कम का स्टोर खुला है। प्रीमियम क्वालिटी: store.com/499' },
        { title: 'गैजेट्स जो दीवाना बना दें', subtitle: 'स्मार्टवॉच और TWS इयरबड्स। बेहतरीन कीमत पर।', cta: 'टेक देखें', smsCopy: 'ANC इयरबड्स और AMOLED स्मार्टवॉच बेस्ट प्राइस पर: store.com/gadgets' },
        { title: 'पढ़ाई जारी रखो', subtitle: 'बेस्टसेलिंग फ़िक्शन और सेल्फ-हेल्प किताबें 40% छूट पर।', cta: 'किताबें खरीदें', smsCopy: 'टॉप बेस्टसेलर किताबें 40% छूट पर: store.com/books' }
      ]
    }
  };

  const generateCampaigns = (lang = 'hinglish') => {
    const langCopy = copyVariants[lang] || copyVariants.hinglish;
    const storeCopy = langCopy[storeType] || langCopy.gen;
    
    const targets = {
      sports: ['Gym Freak', 'Yoga Lover', 'Weekend Warrior', 'Marathon Runner'],
      tech: ['Gamer', 'Smart Home', 'Apple Fanboy', 'Audioophile'],
      grocery: ['Health Conscious', 'Snack Lover', 'Bulk Buyer', 'Vegan'],
      home: ['New Homeowner', 'Decor', 'Kitchen Master', 'Plant Parent'],
      gen: ['Fashionista', 'Budget Shopper', 'Tech Enthusiast', 'Bookworm']
    };
    const images = {
      sports: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=800&auto=format&fit=crop'
      ],
      tech: [
        'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1603792907191-89e55f70099a?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop'
      ],
      grocery: [
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop'
      ],
      home: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556910103-1c02745a8728?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1416879598555-220f8bb10864?q=80&w=800&auto=format&fit=crop'
      ],
      gen: [
        'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1572584642822-8f151c4a03ee?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop'
      ]
    };
    const positions = ['center', 'flex-start', 'flex-end', 'center'];
    const demographics = {
      sports: [
        { age: '18-35', gender: 'All', factor: 'High Fitness Intent' },
        { age: '25-45', gender: 'Female Skewed', factor: 'Wellness Focus' },
        { age: '28-50', gender: 'All', factor: 'Outdoor Hobbyist' },
        { age: '22-40', gender: 'All', factor: 'Performance Driven' }
      ],
      tech: [
        { age: '16-30', gender: 'Male Skewed', factor: 'High Disposable Income' },
        { age: '30-55', gender: 'All', factor: 'Homeowners' },
        { age: '18-45', gender: 'All', factor: 'Brand Loyal' },
        { age: '25-45', gender: 'All', factor: 'Commuter / Professional' }
      ],
      grocery: [
        { age: '25-50', gender: 'All', factor: 'Dietary Restrictions' },
        { age: '18-35', gender: 'All', factor: 'Late Night Shopper' },
        { age: '35-60', gender: 'All', factor: 'Family Household' },
        { age: '20-40', gender: 'All', factor: 'Lifestyle Choice' }
      ],
      home: [
        { age: '28-45', gender: 'All', factor: 'Recently Moved' },
        { age: '20-35', gender: 'Female Skewed', factor: 'Trend Conscious' },
        { age: '30-55', gender: 'All', factor: 'Cooking Enthusiast' },
        { age: '22-40', gender: 'All', factor: 'Urban Dweller' }
      ],
      gen: [
        { age: '18-35', gender: 'Female Skewed', factor: 'Frequent Buyer' },
        { age: 'All', gender: 'All', factor: 'Price Sensitive' },
        { age: '16-40', gender: 'Male Skewed', factor: 'Early Adopter' },
        { age: '20-50', gender: 'All', factor: 'Avid Reader' }
      ]
    };

    const storeTargets = targets[storeType] || targets.gen;
    const storeImages = images[storeType] || images.gen;
    const storeDemos = demographics[storeType] || demographics.gen;

    const newCampaigns = storeCopy.map((copy, i) => ({
      id: i + 1,
      target: storeTargets[i],
      title: copy.title,
      subtitle: copy.subtitle,
      cta: copy.cta,
      smsCopy: copy.smsCopy,
      imageUrl: storeImages[i],
      textPosition: positions[i],
      demographics: storeDemos[i],
      isApproved: false
    }));

    // Run Campaign Guardrail Validation Engine against Product Catalog
    const { validatedCampaigns } = validateCampaignsAgainstCatalog(newCampaigns, productCatalog);

    setCampaigns(validatedCampaigns);
    
    // Initialize view modes to banner
    const views = {};
    newCampaigns.forEach(c => views[c.id] = 'banner');
    setViewMode(views);
  };

  const toggleApprove = (campaignId) => {
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, isApproved: !c.isApproved } : c));
  };

  const handlePreviewClick = (e, campaign) => {
    if (!campaign.isApproved) {
      e.preventDefault();
      setToastWarning(`⚠️ Campaign for [${campaign.target}] is not approved yet! Click "Approve" to publish it before previewing on the Customer Dashboard.`);
      setTimeout(() => setToastWarning(null), 5000);
    }
  };

  const handleAiRegenerate = (campaignId, promptText) => {
    if (!promptText || !promptText.trim()) return;

    setIsAiLoading(prev => ({ ...prev, [campaignId]: true }));

    setTimeout(() => {
      const lowerPrompt = promptText.toLowerCase();

      // Dynamic image selection from keyword analysis
      let newImageUrl = null;
      if (lowerPrompt.includes('mountain') || lowerPrompt.includes('nature') || lowerPrompt.includes('outdoor') || lowerPrompt.includes('trail')) {
        newImageUrl = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop';
      } else if (lowerPrompt.includes('runner') || lowerPrompt.includes('shoes') || lowerPrompt.includes('nike') || lowerPrompt.includes('footwear')) {
        newImageUrl = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop';
      } else if (lowerPrompt.includes('gym') || lowerPrompt.includes('fitness') || lowerPrompt.includes('workout') || lowerPrompt.includes('body')) {
        newImageUrl = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop';
      } else if (lowerPrompt.includes('tech') || lowerPrompt.includes('laptop') || lowerPrompt.includes('gaming') || lowerPrompt.includes('gpu')) {
        newImageUrl = 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop';
      } else if (lowerPrompt.includes('food') || lowerPrompt.includes('organic') || lowerPrompt.includes('health') || lowerPrompt.includes('snack')) {
        newImageUrl = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop';
      } else if (lowerPrompt.includes('home') || lowerPrompt.includes('lamp') || lowerPrompt.includes('decor') || lowerPrompt.includes('room')) {
        newImageUrl = 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop';
      }

      setCampaigns(prev => prev.map(c => {
        if (c.id === campaignId) {
          const pctMatch = promptText.match(/(\d+)%/);
          const discountText = pctMatch ? `Flat ${pctMatch[1]}% OFF` : 'Special AI Offer';

          let updatedTitle = c.title;
          let updatedSubtitle = c.subtitle;
          let updatedSms = c.smsCopy;

          if (lowerPrompt.includes('urgent') || lowerPrompt.includes('hurry') || lowerPrompt.includes('fast') || lowerPrompt.includes('limited')) {
            updatedTitle = `🔥 HURRY! ${c.target} ${discountText}!`;
            updatedSubtitle = `Limited stock remaining! ${promptText}`;
            updatedSms = `🔥 URGENT DEAL: ${c.target} collection on ${discountText}! Claim before stock ends: store.link/deal`;
          } else if (lowerPrompt.includes('festive') || lowerPrompt.includes('diwali') || lowerPrompt.includes('celebrate')) {
            updatedTitle = `✨ Festive Dhamaka for ${c.target}!`;
            updatedSubtitle = `Celebrate with premium choices. ${discountText} valid this week.`;
            updatedSms = `✨ Festive Offer for ${c.target}! Claim ${discountText} on top collections: store.link/festive`;
          } else {
            updatedTitle = `${c.target}: ${discountText}`;
            updatedSubtitle = `AI Refined: ${promptText}`;
            updatedSms = `Special AI Custom Deal for ${c.target}! ${discountText} on active selection: store.com/custom`;
          }

          const candidate = {
            ...c,
            title: updatedTitle,
            subtitle: updatedSubtitle,
            smsCopy: updatedSms,
            imageUrl: newImageUrl || c.imageUrl,
            isApproved: false // Requires re-approval after AI regeneration
          };

          const { validatedCampaigns } = validateCampaignsAgainstCatalog([candidate], productCatalog);
          return validatedCampaigns[0];
        }
        return c;
      }));

      setIsAiLoading(prev => ({ ...prev, [campaignId]: false }));
      setAiRegenId(null);
      setAiPromptText('');
    }, 1200);
  };

  const startEditing = (campaign) => {
    setEditForm({ ...campaign });
    setEditingId(campaign.id);
  };

  const saveEdit = () => {
    setCampaigns(campaigns.map(c => c.id === editingId ? { ...c, ...editForm } : c));
    setEditingId(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditForm({ ...editForm, imageUrl: url });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>Campaigns</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Create personalised banner ads and SMS messages for each customer segment.</p>
      
      <div style={{ display: 'flex', gap: '3rem' }}>
        
        {/* Left Side: Auto Pilot Control */}
        <div style={{ width: '350px', flexShrink: 0 }}>
          
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
             <Sparkles size={48} style={{ color: 'var(--accent-vibrant)', margin: '0 auto 1.5rem auto' }} />
             <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.4rem' }}>Campaign Generator</h3>
             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.92rem', lineHeight: '1.5' }}>
                Analyses your {customers.length} customers, identifies buying patterns, and creates targeted banner + SMS campaigns.
              </p>

              {/* Language Selector */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '0.6rem', textAlign: 'left' }}>
                  Content Language
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[{ key: 'english', label: 'English' }, { key: 'hindi', label: 'हिंदी' }, { key: 'hinglish', label: 'Hinglish' }].map(lang => (
                    <button
                      key={lang.key}
                      type="button"
                      onClick={() => setContentLanguage(lang.key)}
                      style={{
                        flex: 1,
                        padding: '0.6rem 0.5rem',
                        borderRadius: '10px',
                        border: contentLanguage === lang.key ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                        background: contentLanguage === lang.key ? 'rgba(79, 70, 229, 0.08)' : 'white',
                        color: contentLanguage === lang.key ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        fontWeight: contentLanguage === lang.key ? '700' : '500',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
             
             <button 
               onClick={simulateGeneration} 
               disabled={isGenerating || customers.length === 0}
               className="btn-primary" 
               style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
             >
               {isGenerating ? <><Loader2 className="animate-spin" size={20} /> Generating...</> : <><PlayCircle size={20} /> Generate Campaigns</>}
             </button>
          </div>

          {/* Console Output */}
          <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem', background: '#0f172a', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.85rem' }}>
             <p style={{ color: '#94a3b8', margin: '0 0 1rem 0' }}>// SYSTEM TERMINAL</p>
             {generationStep >= 0 && <div style={{ marginBottom: '0.5rem' }}>&gt; Waiting for operator input...</div>}
             {generationStep >= 1 && <div style={{ marginBottom: '0.5rem', color: '#c678dd' }}>&gt; Analyzing {customers.length} users for distinct buying patterns... OK</div>}
             {generationStep >= 2 && <div style={{ marginBottom: '0.5rem', color: '#98c379' }}>&gt; Cross-referencing external Indian market trends & seasonality... OK</div>}
             {generationStep >= 3 && <div style={{ color: 'var(--accent-vibrant)', fontWeight: 'bold' }}>&gt; Generating localized visual & SMS campaigns... DONE</div>}
          </div>

        </div>

        {/* Right Side: Generated Campaigns */}
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Store size={20} /> Generated Campaigns ({campaigns.length})
          </h3>
          
          {campaigns.length === 0 && !isGenerating && (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', background: 'rgba(79, 70, 229, 0.02)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>Choose a language and click Generate to create your campaigns.</p>
            </div>
          )}

          {isGenerating && (
            <div className="glass-panel" style={{ padding: '6rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
               <Loader2 className="animate-spin" size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }} />
               <h3 style={{ margin: '0 0 0.5rem 0' }}>Creating Your Campaigns...</h3>
               <p style={{ color: 'var(--text-secondary)' }}>Building banner visuals and writing SMS copy in {contentLanguage}.</p>
            </div>
          )}

          {!isGenerating && campaigns.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
              {campaigns.map(campaign => {
                const demoGuide = getDemoGuide(campaign.target);
                const isGuideOpen = activeGuideId === campaign.id;

                return (
                  <div key={campaign.id} className="glass-panel animate-fade-in" style={{ padding: '1.5rem', background: 'var(--bg-main)', position: 'relative' }}>
                    
                    {/* Header Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: '600', color: 'var(--accent-primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(79, 70, 229, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '12px' }}>
                            Target: {campaign.target}
                          </span>

                          {/* Approval Status Badge */}
                          {campaign.isApproved ? (
                            <span style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#047857', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                              <CheckCircle2 size={13} /> Approved ✅
                            </span>
                          ) : (
                            <span style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#b45309', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                              <AlertTriangle size={13} /> Pending Approval ⏳
                            </span>
                          )}

                          {/* Subtle Demo Guide Button */}
                          <button
                            onClick={() => setActiveGuideId(isGuideOpen ? null : campaign.id)}
                            style={{
                              background: isGuideOpen ? 'var(--accent-primary)' : 'white',
                              color: isGuideOpen ? 'white' : 'var(--text-primary)',
                              border: '1px solid var(--border-color)',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '12px',
                              fontSize: '0.8rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <KeyRound size={13} style={{ color: isGuideOpen ? 'white' : 'var(--accent-primary)' }} />
                            Demo Guide {isGuideOpen ? <X size={12} /> : <Info size={12} />}
                          </button>
                          
                          {/* View Toggles */}
                          {editingId !== campaign.id && (
                            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', borderRadius: '20px', padding: '0.25rem' }}>
                              <button onClick={() => setViewMode({...viewMode, [campaign.id]: 'banner'})} style={{ background: viewMode[campaign.id] === 'banner' ? 'white' : 'transparent', border: 'none', padding: '0.25rem 0.75rem', borderRadius: '15px', fontSize: '0.8rem', fontWeight: viewMode[campaign.id] === 'banner' ? 'bold' : 'normal', cursor: 'pointer', boxShadow: viewMode[campaign.id] === 'banner' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>
                                <ImageIcon size={14} style={{ display: 'inline', marginRight: '4px' }}/> Banner
                              </button>
                              <button onClick={() => setViewMode({...viewMode, [campaign.id]: 'sms'})} style={{ background: viewMode[campaign.id] === 'sms' ? 'white' : 'transparent', border: 'none', padding: '0.25rem 0.75rem', borderRadius: '15px', fontSize: '0.8rem', fontWeight: viewMode[campaign.id] === 'sms' ? 'bold' : 'normal', cursor: 'pointer', boxShadow: viewMode[campaign.id] === 'sms' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>
                                <MessageSquare size={14} style={{ display: 'inline', marginRight: '4px' }}/> SMS
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {/* Demographics Display */}
                        {campaign.demographics && (
                          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <span><strong style={{ color: 'var(--text-primary)' }}>Age:</strong> {campaign.demographics.age}</span>
                            <span><strong style={{ color: 'var(--text-primary)' }}>Gender:</strong> {campaign.demographics.gender}</span>
                            <span><strong style={{ color: 'var(--text-primary)' }}>Factor:</strong> {campaign.demographics.factor}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Action Controls Bar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {/* Approve Button */}
                        <button
                          onClick={() => toggleApprove(campaign.id)}
                          style={{
                            background: campaign.isApproved ? '#10b981' : 'white',
                            color: campaign.isApproved ? 'white' : '#0f172a',
                            border: `1.5px solid ${campaign.isApproved ? '#10b981' : 'var(--border-color)'}`,
                            padding: '0.4rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: '700',
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {campaign.isApproved ? <><Check size={14} /> Approved</> : <><ThumbsUp size={14} /> Approve</>}
                        </button>

                        {/* Regenerate AI Button */}
                        <button
                          onClick={() => {
                            setAiRegenId(aiRegenId === campaign.id ? null : campaign.id);
                            setAiPromptText('');
                          }}
                          style={{
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.4rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: '700',
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            boxShadow: '0 2px 6px rgba(139, 92, 246, 0.3)'
                          }}
                        >
                          <Sparkles size={14} /> Regenerate
                        </button>

                        {/* Edit Button */}
                        {editingId !== campaign.id ? (
                          <button onClick={() => startEditing(campaign)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem' }}>
                            <Edit2 size={16} /> Edit
                          </button>
                        ) : (
                          <button onClick={saveEdit} style={{ background: 'var(--success)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                            <Check size={16} /> Save Changes
                          </button>
                        )}
                      </div>
                    </div>

                    {/* AI Prompt Regeneration Drawer Box */}
                    {aiRegenId === campaign.id && (
                      <div className="animate-fade-in" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', border: '1.5px solid #a78bfa', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.25rem', boxShadow: '0 8px 20px rgba(139, 92, 246, 0.12)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6d28d9', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                          <Sparkles size={16} /> AI Prompt for Custom Campaign Refinement
                        </div>
                        <textarea
                          placeholder="Enter instructions to regenerate image or copy (e.g., 'Make title urgent with 15% discount on Nike', 'Use outdoor trail background', 'Make SMS shorter in Hinglish')..."
                          value={aiPromptText}
                          onChange={e => setAiPromptText(e.target.value)}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', resize: 'vertical', minHeight: '65px', marginBottom: '0.75rem', outline: 'none', background: 'white', color: '#0f172a' }}
                        />
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button onClick={() => setAiRegenId(null)} style={{ background: 'white', border: '1px solid #cbd5e1', padding: '0.45rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                          <button onClick={() => handleAiRegenerate(campaign.id, aiPromptText)} disabled={isAiLoading[campaign.id]} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.45rem 1.25rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)' }}>
                            {isAiLoading[campaign.id] ? <><Loader2 size={14} className="animate-spin" /> Generating AI Refinement...</> : <><Sparkles size={14} /> Generate AI Refinement</>}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Brand Policy Guardrail Warning Badges */}
                    {campaign.guardrailWarnings && campaign.guardrailWarnings.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                        {campaign.guardrailWarnings.map((warn, wIdx) => (
                          <div 
                            key={wIdx} 
                            style={{ 
                              background: warn.type === 'out_of_stock' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                              border: `1px solid ${warn.type === 'out_of_stock' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                              color: warn.type === 'out_of_stock' ? '#dc2626' : '#d97706',
                              padding: '0.6rem 0.85rem',
                              borderRadius: '10px',
                              fontSize: '0.82rem',
                              fontWeight: '600',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}
                          >
                            <ShieldAlert size={16} style={{ flexShrink: 0 }} />
                            <span>{warn.message}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Subtle Demo Guide Inline Popover / Card */}
                    {isGuideOpen && (
                      <div className="animate-fade-in" style={{ 
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
                        color: 'white', 
                        padding: '1rem 1.25rem', 
                        borderRadius: '14px', 
                        marginBottom: '1.25rem',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        justify: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ fontSize: '0.85rem' }}>
                          <div style={{ color: '#38bdf8', fontWeight: '700', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <KeyRound size={14} /> Demo Persona Details for Target [{campaign.target}]
                          </div>
                          <div>Select Persona: <strong>{demoGuide.persona}</strong></div>
                          <div>Encrypted Token ID: <code style={{ background: 'rgba(255,255,255,0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>#{demoGuide.token}</code></div>
                        </div>

                        <Link 
                          to="/" 
                          target="_blank"
                          onClick={(e) => handlePreviewClick(e, campaign)}
                          style={{ 
                            background: campaign.isApproved ? '#38bdf8' : '#94a3b8', 
                            color: '#0f172a', 
                            fontWeight: '800', 
                            fontSize: '0.8rem', 
                            padding: '0.45rem 1rem', 
                            borderRadius: '8px',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            boxShadow: campaign.isApproved ? '0 2px 8px rgba(56, 189, 248, 0.4)' : 'none',
                            cursor: campaign.isApproved ? 'pointer' : 'not-allowed'
                          }}
                        >
                          Preview Live Ad <ExternalLink size={13} />
                        </Link>
                      </div>
                    )}

                    {/* Editing Interface */}
                    {editingId === campaign.id ? (
                      <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', border: '2px dashed var(--accent-primary)' }}>
                        
                        <div style={{ marginBottom: '2rem' }}>
                          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'var(--text-secondary)' }}>1. Visual Background</h4>
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <img src={editForm.imageUrl} alt="Background" style={{ width: '120px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-main)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', border: '1px solid var(--border-color)' }}>
                              <Upload size={16} /> Upload Custom Photo
                              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                            </label>
                          </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'var(--text-secondary)' }}>2. Banner Copy & Position</h4>
                          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <button onClick={() => setEditForm({...editForm, textPosition: 'flex-start'})} style={{ padding: '0.5rem', background: editForm.textPosition === 'flex-start' ? 'var(--accent-primary)' : 'var(--bg-main)', color: editForm.textPosition === 'flex-start' ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}><AlignLeft size={16} /></button>
                            <button onClick={() => setEditForm({...editForm, textPosition: 'center'})} style={{ padding: '0.5rem', background: editForm.textPosition === 'center' ? 'var(--accent-primary)' : 'var(--bg-main)', color: editForm.textPosition === 'center' ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}><AlignCenter size={16} /></button>
                            <button onClick={() => setEditForm({...editForm, textPosition: 'flex-end'})} style={{ padding: '0.5rem', background: editForm.textPosition === 'flex-end' ? 'var(--accent-primary)' : 'var(--bg-main)', color: editForm.textPosition === 'flex-end' ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}><AlignRight size={16} /></button>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <input type="text" placeholder="Headline" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} style={{ fontSize: '1.1rem', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.5rem' }} />
                            <input type="text" placeholder="Sub-headline" value={editForm.subtitle} onChange={e => setEditForm({...editForm, subtitle: e.target.value})} style={{ fontSize: '0.95rem', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.5rem' }} />
                            <input type="text" placeholder="Button Text" value={editForm.cta} onChange={e => setEditForm({...editForm, cta: e.target.value})} style={{ fontSize: '0.95rem', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.5rem' }} />
                          </div>
                        </div>

                        <div>
                          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'var(--text-secondary)' }}>3. SMS Copy</h4>
                          <textarea value={editForm.smsCopy} onChange={e => setEditForm({...editForm, smsCopy: e.target.value})} style={{ width: '100%', fontSize: '0.95rem', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.75rem', resize: 'none', height: '80px', fontFamily: 'monospace' }} />
                          <div style={{ fontSize: '0.75rem', color: editForm.smsCopy.length > 160 ? 'var(--danger)' : 'var(--text-secondary)', textAlign: 'right', marginTop: '0.25rem' }}>{editForm.smsCopy.length} / 160 chars</div>
                        </div>

                      </div>
                    ) : (
                      <>
                        {/* View Mode: Banner */}
                        {viewMode[campaign.id] === 'banner' && (
                          <div style={{ 
                            height: '240px', 
                            borderRadius: '12px', 
                            overflow: 'hidden',
                            position: 'relative',
                            backgroundImage: `url(${campaign.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            boxShadow: 'var(--card-shadow)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: campaign.textPosition,
                            padding: '2rem'
                          }}>
                            {/* Dark Overlay for text readability */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1 }}></div>
                            
                            <div style={{ position: 'relative', zIndex: 2, textAlign: campaign.textPosition === 'center' ? 'center' : campaign.textPosition === 'flex-start' ? 'left' : 'right', maxWidth: '70%' }}>
                              <h4 style={{ fontSize: '2rem', marginBottom: '0.5rem', letterSpacing: '-0.5px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{campaign.title}</h4>
                              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', lineHeight: '1.4', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{campaign.subtitle}</p>
                              <button style={{ background: 'white', color: 'black', border: 'none', padding: '0.75rem 2rem', borderRadius: '30px', fontSize: '0.95rem', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
                                {campaign.cta}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* View Mode: SMS */}
                        {viewMode[campaign.id] === 'sms' && (
                          <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                              <MessageSquare size={18} />
                              <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>SMS PREVIEW</span>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px 16px 16px 0', border: '1px solid #e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '1.05rem', color: '#0f172a', lineHeight: '1.5', maxWidth: '80%' }}>
                              {campaign.smsCopy}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* Approval Warning Toast Notification */}
      {toastWarning && (
        <div className="animate-fade-in" style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: '#0f172a', color: 'white', padding: '1rem 1.5rem', borderRadius: '16px', border: '1.5px solid #f59e0b', boxShadow: '0 20px 40px rgba(0,0,0,0.35)', zIndex: 10000, maxWidth: '450px', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <AlertTriangle size={24} style={{ color: '#f59e0b', flexShrink: 0 }} />
          <div style={{ fontSize: '0.88rem', lineHeight: '1.4' }}>{toastWarning}</div>
        </div>
      )}
    </div>
  );
}
