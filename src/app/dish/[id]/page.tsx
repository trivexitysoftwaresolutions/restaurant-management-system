"use client";

import { use, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Flame, Leaf, Plus, Minus, 
  ShoppingBag, Clock, ChefHat, Activity, 
  AlertTriangle, Check, ChevronDown
} from "lucide-react";
import { menuItems } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { clsx } from "clsx";
import { ProductCard } from "@/components/ProductCard";

// Mock data generator for premium details based on dish ID
const getMockDishDetails = (dishId: string, primaryImage: string) => {
  return {
    calories: Math.floor(Math.random() * 400) + 200,
    protein: Math.floor(Math.random() * 30) + 10 + "g",
    carbs: Math.floor(Math.random() * 50) + 20 + "g",
    fat: Math.floor(Math.random() * 20) + 5 + "g",
    allergens: ["Dairy", "Nuts", "Gluten"].sort(() => 0.5 - Math.random()).slice(0, 2),
    gallery: [
      primaryImage, 
      // Using unsplash placeholders to simulate secondary images added from admin panel
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800"
    ],
    ingredients: [
      "Extra Virgin Olive Oil", "Sea Salt", "Cracked Black Pepper", 
      "Fresh Herbs", "Artisan Base", "Secret Chef Spices"
    ],
    chefNote: "I created this dish to evoke the memories of my childhood summers in the Mediterranean. The balance of acidity and richness is something I am truly proud of.",
    addons: [
      { id: "a1", name: "Extra Truffle Oil", price: 2.50 },
      { id: "a2", name: "Double Portion Protein", price: 6.00 },
      { id: "a3", name: "Make it Extra Spicy", price: 0.00 },
      { id: "a4", name: "Side of Artisan Bread", price: 4.50 },
    ]
  };
};

export default function DishDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { cart, addToCart, updateQuantity } = useCart();
  
  // State for Add-ons (UI only for this demo)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const dish = menuItems.find((item) => item.id === id);

  if (!dish) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <h1 className="text-2xl font-bold mb-4">Dish not found</h1>
        <button onClick={() => router.back()} className="text-primary hover:underline">
          Go back
        </button>
      </div>
    );
  }

  const details = getMockDishDetails(dish.id, dish.image);
  const cartItem = cart.find((c) => c.menuItem.id === dish.id);
  const quantity = cartItem?.quantity || 0;

  // Calculate total with selected add-ons
  const addOnsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = details.addons.find(a => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);
  
  const currentItemPrice = dish.price + addOnsTotal;
  const displayTotal = currentItemPrice * (quantity > 0 ? quantity : 1);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const relatedDishes = menuItems
    .filter(item => item.category === dish.category && item.id !== dish.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pb-[120px] md:pb-[140px] selection:bg-primary/30 text-white relative">
      
      {/* Top Navigation (Floating) */}
      <div className="fixed top-0 left-0 right-0 p-4 md:p-8 flex justify-between items-center z-50 pointer-events-none">
        <button
          onClick={() => router.back()}
          className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 shadow-lg hover:bg-white hover:text-black transition-all pointer-events-auto"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <button className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 shadow-lg hover:bg-primary hover:border-primary transition-all pointer-events-auto relative">
          <ShoppingBag className="w-5 h-5" />
          {quantity > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-xs font-bold flex items-center justify-center rounded-full text-primary-foreground shadow-md">
              {quantity}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto min-h-screen">
        
        {/* Left Column: Image Gallery (Sticky on Desktop) */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex flex-col p-4 md:p-8 lg:p-12 gap-4 lg:pt-24 z-10">
          {/* Main Image */}
          <div className="relative w-full h-[45vh] lg:h-[65%] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            <Image
              src={details.gallery[0]}
              alt={dish.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Secondary Images (From Admin Panel mock) */}
          <div className="flex gap-4 h-[15vh] lg:h-[25%]">
            {details.gallery.slice(1).map((imgUrl, i) => (
              <div key={i} className="relative w-1/2 h-full rounded-2xl overflow-hidden shadow-lg border border-white/10 group cursor-pointer">
                <Image
                  src={imgUrl}
                  alt={`${dish.name} view ${i+2}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Details Area */}
        <div className="w-full lg:w-1/2 p-5 md:p-8 lg:p-12 lg:pt-24 flex flex-col z-10 bg-[#0a0a0a]">
          
          {/* Header Title & Price */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {dish.isSignature && (
                  <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
                    <ChefHat className="w-3 md:w-4 h-3 md:h-4" /> Signature
                  </span>
                )}
                {dish.isVeg ? (
                  <span className="bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Leaf className="w-3 md:w-4 h-3 md:h-4" /> Vegetarian
                  </span>
                ) : (
                  <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" /> Non-Veg
                  </span>
                )}
                {dish.isSpicy && (
                  <span className="bg-orange-500/10 text-orange-500 border border-orange-500/20 text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Flame className="w-3 md:w-4 h-3 md:h-4" /> Spicy
                  </span>
                )}
              </div>
              <h1 className="font-cormorant text-4xl md:text-6xl font-bold text-white leading-tight">
                {dish.name}
              </h1>
            </div>
            
            <div className="flex flex-col items-start xl:items-end shrink-0">
              <span className="text-[#A3A3A3] text-sm font-medium uppercase tracking-widest mb-1">Price</span>
              <span className="text-4xl md:text-5xl font-bold text-primary">₹{dish.price.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-[#A3A3A3] text-lg md:text-xl leading-relaxed font-light mb-10">
            {dish.description}
          </p>

          <div className="w-full h-px bg-gradient-to-r from-[#333] to-transparent mb-10" />

          {/* Key Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-[#111] border border-[#222] rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
              <Clock className="w-6 h-6 text-primary mb-2" />
              <span className="text-xs text-[#A3A3A3] uppercase tracking-wider mb-1">Prep Time</span>
              <span className="font-semibold text-lg">{dish.prepTime}</span>
            </div>
            <div className="bg-[#111] border border-[#222] rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
              <Activity className="w-6 h-6 text-primary mb-2" />
              <span className="text-xs text-[#A3A3A3] uppercase tracking-wider mb-1">Calories</span>
              <span className="font-semibold text-lg">{details.calories} kcal</span>
            </div>
            {dish.rating ? (
              <div className="bg-[#111] border border-[#222] rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
                <span className="text-2xl text-primary mb-1">★</span>
                <span className="text-xs text-[#A3A3A3] uppercase tracking-wider mb-1">Rating</span>
                <span className="font-semibold text-lg">{dish.rating} / 5</span>
              </div>
            ) : (
              <div className="bg-[#111] border border-[#222] rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
                <ChefHat className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs text-[#A3A3A3] uppercase tracking-wider mb-1">Category</span>
                <span className="font-semibold text-sm line-clamp-1">{dish.category}</span>
              </div>
            )}
            <div className="bg-[#111] border border-[#222] rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
              <AlertTriangle className="w-6 h-6 text-orange-400 mb-2" />
              <span className="text-xs text-[#A3A3A3] uppercase tracking-wider mb-1">Allergens</span>
              <span className="font-semibold text-sm line-clamp-1">{details.allergens.join(", ") || "None"}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-12">
            {/* Nutritional Value */}
            <div className="bg-[#151515] border border-[#222] rounded-[2rem] p-8">
              <h3 className="font-cormorant text-2xl font-bold mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6 text-primary" /> Nutritional Value
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-[#333]">
                  <span className="text-[#A3A3A3]">Calories</span>
                  <span className="font-semibold">{details.calories} kcal</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-[#333]">
                  <span className="text-[#A3A3A3]">Protein</span>
                  <span className="font-semibold">{details.protein}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-[#333]">
                  <span className="text-[#A3A3A3]">Carbohydrates</span>
                  <span className="font-semibold">{details.carbs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#A3A3A3]">Fats</span>
                  <span className="font-semibold">{details.fat}</span>
                </div>
              </div>
            </div>

            {/* Ingredients & Chef's Note */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#151515] border border-[#222] rounded-[2rem] p-8">
                <h3 className="font-cormorant text-2xl font-bold mb-4">Core Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {details.ingredients.map((ing, i) => (
                    <span key={i} className="bg-[#222] text-[#CCC] px-3 py-1.5 rounded-lg text-sm">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 relative overflow-hidden">
                <ChefHat className="absolute -right-4 -bottom-4 w-32 h-32 text-primary/5" />
                <h3 className="font-cormorant text-xl font-bold mb-3 text-primary">Chef's Note</h3>
                <p className="font-cormorant italic text-lg text-[#CCC] leading-relaxed relative z-10">
                  "{details.chefNote}"
                </p>
              </div>
            </div>
          </div>

          {/* Customization / Add-ons Section */}
          <div className="mb-8">
            <h3 className="font-cormorant text-3xl font-bold mb-6 border-b border-[#333] pb-4">
              Customize Your Order
            </h3>
            <div className="space-y-3">
              {details.addons.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div 
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={clsx(
                      "flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all duration-300",
                      isSelected 
                        ? "bg-primary/10 border-primary text-white" 
                        : "bg-[#151515] border-[#222] text-[#A3A3A3] hover:border-[#444]"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={clsx(
                        "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                        isSelected ? "bg-primary border-primary text-primary-foreground" : "border-[#555]"
                      )}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <span className={clsx("font-medium", isSelected && "text-white")}>
                        {addon.name}
                      </span>
                    </div>
                    <span className="font-semibold">
                      {addon.price > 0 ? `+₹${addon.price.toFixed(2)}` : "Free"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Dishes Section */}
          {relatedDishes.length > 0 && (
            <div className="mt-16 border-t border-[#333] pt-12">
              <h3 className="font-cormorant text-3xl font-bold mb-8">
                You might also like
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedDishes.map((relatedItem, index) => (
                  <ProductCard key={relatedItem.id} item={relatedItem} index={index} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Floating Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 md:p-6 z-50 pointer-events-none pb-safe">
        <div className="max-w-4xl mx-auto bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 md:p-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.6)] pointer-events-auto">
          
          <div className="flex flex-col px-2 md:px-4">
            <span className="text-[10px] md:text-sm text-[#A3A3A3] font-medium mb-0.5 md:mb-1">
              {quantity > 0 ? `${quantity}x Item${quantity > 1 ? 's' : ''}` : "Total Price"}
            </span>
            <span className="text-xl md:text-3xl font-bold text-primary leading-tight">
              ₹{displayTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {quantity > 0 ? (
              <div className="bg-[#1A1A1A] border border-[#333] rounded-2xl flex items-center p-1 md:p-1.5 h-12 md:h-[60px]">
                <button
                  onClick={() => updateQuantity(dish.id, -1)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center text-white transition-colors active:scale-95"
                >
                  <Minus className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <span className="text-lg md:text-xl font-bold text-white w-10 md:w-14 text-center">{quantity}</span>
                <button
                  onClick={() => updateQuantity(dish.id, 1)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center text-white transition-colors active:scale-95"
                >
                  <Plus className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(dish)}
                className="bg-primary text-primary-foreground font-bold px-5 md:px-12 py-3 md:py-4 h-12 md:h-[60px] rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-lg">Add to Order</span>
              </button>
            )}
          </div>
          
        </div>
      </div>
    </main>
  );
}
