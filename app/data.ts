// app/data.ts

export const initial10Ads = [
  { id: 1, titleEn: "Heavy Industrial HMS 1 Melting Iron", titleUr: "بھاری انڈسٹریل پگھلنے والا لوہا HMS 1", categoryEn: "Iron", categoryUr: "لوہا", price: "125", unitEn: "kg", unitUr: "کلو", weight: "12 Ton", location: "Gujranwala", icon: "🔩", phone: "+923008641994", images: [] },
  { id: 2, titleEn: "Pure Copper Cable Wire Scrap Grade A", titleUr: "خالص تانبا کیبل وائر اسکریپ گریڈ اے", categoryEn: "Copper", categoryUr: "تانبا", price: "1,870", unitEn: "kg", unitUr: "کلو", weight: "450 Kg", location: "Gujranwala", icon: "🔌", phone: "+923008641994", images: [] }
];

export const registeredIndustries = [
  { id: 1, name: "R-H-A-F Recycling & Aluminum Smelter", location: "Gujranwala, Punjab", type: "Pharmaceutical Blister & Metal Separation", capacity: "30 Tons/Month", status: "Verified ✓", badge: "🥇 Premium" }
];

export const marketRateItems = [
  { id: 1, type: "metal", nameEn: "Pure Copper Wire (Grade A)", nameUr: "خالص تانبا تار گریڈ اے", icon: "🔌" },
  { id: 2, type: "metal", nameEn: "Iron Scrap (HMS 1 & 2)", nameUr: "لوہا اسکریپ HMS", icon: "🔩" }
];

export const translations: any = {
  en: {
    appName: "SCRAP WORLD", loginBtn: "Login", logoutBtn: "Logout 👤", moreBtn: "More Options", currentLang: "اردو",
    priceLabel: "Price:", weightLabel: "Qty/Weight:", locLabel: "Location:", catLabel: "Category:",
    postAdBtn: "Post Ad 📢", ratesBtn: "Rates 💰", sortSimple: "Sort 📊", filterSimple: "Filters 🎛️", industriesBtn: "Industries 🏭",
    backBtn: "← Back to Feed"
  },
  ur: {
    appName: "اسکریپ ورلڈ", loginBtn: "لاگ ان", logoutBtn: "لاگ آؤٹ 👤", moreBtn: "مزید آپشنز", currentLang: "English",
    priceLabel: "قیمت:", weightLabel: "وزن / تعداد:", locLabel: "لوکیشن:", catLabel: "کیٹیگری:",
    postAdBtn: "اشتہار 📢", ratesBtn: "ریٹس 💰", sortSimple: "ترتیب 📊", filterSimple: "فلٹرز 🎛️", industriesBtn: "انڈسٹریز 🏭",
    backBtn: "← واپس ہوم فیڈ"
  }
};
