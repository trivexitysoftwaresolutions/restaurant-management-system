export type OrderStatus = "received" | "preparing" | "ready" | "ready_for_pickup";

export interface RestaurantInfo {
  name: string;
  tagline: string;
  currentOrderState: OrderStatus;
  estimatedPrepTime: string;
  capacity?: number;
  serverName?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isSpicy?: boolean;
  isSignature?: boolean;
  prepTime: string;
  rating?: number;
}

export const restaurantData: RestaurantInfo = {
  name: "Restro",
  tagline: "Modern European & Botanical Dining",
  currentOrderState: "preparing",
  estimatedPrepTime: "15-20 mins",
  capacity: 4,
  serverName: "Michael"
};

export const menuCategories = [
  { name: "Signatures", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=200", slug: "signatures" },
  { name: "Indian Curries", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=200", slug: "indian-curries" },
  { name: "Sushi & Sashimi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=200", slug: "sushi-sashimi" },
  { name: "Italian Pastas", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=200", slug: "italian-pastas" },
  { name: "Artisan Pizzas", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200", slug: "artisan-pizzas" },
  { name: "Mexican Tacos", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=200", slug: "mexican-tacos" },
  { name: "Vegan Bowls", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200", slug: "vegan-bowls" },
  { name: "Desserts", image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?auto=format&fit=crop&q=80&w=200", slug: "desserts" },
  { name: "Beverages", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=200", slug: "beverages" },
];

export const menuItems: MenuItem[] = [
  // Signatures
  { id: "s1", name: "Truffle Mushroom Risotto", description: "Arborio rice slow-cooked with wild mushrooms, finished with white truffle oil.", price: 32.0, image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800", category: "Signatures", isVeg: true, isSignature: true, prepTime: "20m", rating: 4.9 },
  { id: "s2", name: "Wagyu Ribeye Steak", description: "Grade A5 Wagyu, blistered vine tomatoes, charred asparagus, and red wine jus.", price: 85.0, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", category: "Signatures", isVeg: false, isSignature: true, prepTime: "25m", rating: 4.8 },
  { id: "s3", name: "Miso Glazed Black Cod", description: "Sustainably sourced cod marinated in sweet saikyo miso.", price: 42.0, image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=800", category: "Signatures", isVeg: false, isSignature: true, prepTime: "20m" },
  { id: "s4", name: "Lobster Thermidor", description: "Classic French dish of lobster tail cooked in a rich wine sauce, stuffed back into the shell and browned.", price: 65.0, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800", category: "Signatures", isVeg: false, isSignature: true, prepTime: "30m" },

  // Indian Curries
  { id: "ic1", name: "Butter Chicken Masala", description: "Tender chicken tikka cooked in a rich, creamy tomato and cashew gravy.", price: 24.0, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800", category: "Indian Curries", isVeg: false, isSpicy: true, prepTime: "20m", rating: 4.9 },
  { id: "ic2", name: "Paneer Tikka Masala", description: "Cottage cheese cubes marinated in spices and grilled, served in a robust gravy.", price: 21.0, image: "https://images.unsplash.com/photo-1565557613262-c8f2a1b94158?auto=format&fit=crop&q=80&w=800", category: "Indian Curries", isVeg: true, isSpicy: true, prepTime: "15m", rating: 4.7 },
  { id: "ic3", name: "Lamb Rogan Josh", description: "A classic Kashmiri dish with slow-cooked lamb in a deep, aromatic red gravy.", price: 28.0, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800", category: "Indian Curries", isVeg: false, isSpicy: true, prepTime: "25m", rating: 4.8 },
  { id: "ic4", name: "Dal Makhani", description: "Black lentils simmered overnight on a slow fire, finished with cream and butter.", price: 18.0, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800", category: "Indian Curries", isVeg: true, prepTime: "15m", rating: 4.9 },

  // Sushi & Sashimi
  { id: "ss1", name: "Spicy Tuna Roll", description: "Fresh yellowfin tuna mixed with spicy mayo, wrapped in nori and sushi rice.", price: 18.0, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800", category: "Sushi & Sashimi", isVeg: false, isSpicy: true, prepTime: "10m", rating: 4.7 },
  { id: "ss2", name: "Salmon Sashimi Platter", description: "6 pieces of premium Atlantic salmon, thinly sliced. Served with fresh wasabi.", price: 24.0, image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&q=80&w=800", category: "Sushi & Sashimi", isVeg: false, prepTime: "10m", rating: 4.9 },
  { id: "ss3", name: "Dragon Roll", description: "Eel and cucumber topped with thinly sliced avocado and unagi sauce.", price: 22.0, image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=800", category: "Sushi & Sashimi", isVeg: false, prepTime: "15m", rating: 4.8 },
  { id: "ss4", name: "Vegan Crunch Roll", description: "Tempura sweet potato, asparagus, and avocado with sweet soy glaze.", price: 16.0, image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1c4fa?auto=format&fit=crop&q=80&w=800", category: "Sushi & Sashimi", isVeg: true, prepTime: "12m", rating: 4.6 },

  // Italian Pastas
  { id: "ip1", name: "Lobster Linguine", description: "Fresh pasta with Maine lobster tail, cherry tomatoes, and a light saffron bisque.", price: 45.0, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800", category: "Italian Pastas", isVeg: false, prepTime: "22m", rating: 4.9 },
  { id: "ip2", name: "Carbonara Authentico", description: "Spaghetti tossed with crispy guanciale, pecorino romano, egg yolks, and black pepper.", price: 24.0, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800", category: "Italian Pastas", isVeg: false, prepTime: "18m", rating: 4.8 },
  { id: "ip3", name: "Pesto Genovese", description: "Hand-rolled trofie pasta coated in vibrant basil pesto with pine nuts and parmesan.", price: 21.0, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800", category: "Italian Pastas", isVeg: true, prepTime: "15m", rating: 4.7 },
  { id: "ip4", name: "Spicy Arrabbiata", description: "Penne pasta in a fiery garlic and tomato sauce. Classic and punchy.", price: 18.0, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=800", category: "Italian Pastas", isVeg: true, isSpicy: true, prepTime: "15m" },
  { id: "ip5", name: "Lobster Linguine", description: "Fresh pasta with Maine lobster tail, cherry tomatoes, and a light saffron bisque.", price: 45.0, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800", category: "Italian Pastas", isVeg: false, prepTime: "22m", rating: 4.9 },
  { id: "ip6", name: "Carbonara Authentico", description: "Spaghetti tossed with crispy guanciale, pecorino romano, egg yolks, and black pepper.", price: 24.0, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800", category: "Italian Pastas", isVeg: false, prepTime: "18m", rating: 4.8 },
  { id: "ip7", name: "Pesto Genovese", description: "Hand-rolled trofie pasta coated in vibrant basil pesto with pine nuts and parmesan.", price: 21.0, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800", category: "Italian Pastas", isVeg: true, prepTime: "15m", rating: 4.7 },
  { id: "ip8", name: "Spicy Arrabbiata", description: "Penne pasta in a fiery garlic and tomato sauce. Classic and punchy.", price: 18.0, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=800", category: "Italian Pastas", isVeg: true, isSpicy: true, prepTime: "15m" },

  // Artisan Pizzas
  { id: "ap1", name: "Margherita Classico", description: "San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil.", price: 19.0, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800", category: "Artisan Pizzas", isVeg: true, prepTime: "15m", rating: 4.9 },
  { id: "ap2", name: "Diavola", description: "Spicy Calabrian salami, fresh mozzarella, tomato sauce, and hot honey drizzle.", price: 23.0, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800", category: "Artisan Pizzas", isVeg: false, isSpicy: true, prepTime: "15m", rating: 4.8 },
  { id: "ap3", name: "Truffle & Funghi", description: "White base, roasted wild mushrooms, mozzarella, truffle cream, and thyme.", price: 26.0, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800", category: "Artisan Pizzas", isVeg: true, prepTime: "15m" },
  { id: "ap4", name: "Prosciutto & Arugula", description: "Tomato base, mozzarella, baked and then topped with fresh arugula and prosciutto di Parma.", price: 25.0, image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=800", category: "Artisan Pizzas", isVeg: false, prepTime: "18m" },

  // Mexican Tacos
  { id: "mt1", name: "Baja Fish Tacos", description: "Crispy battered cod, fresh slaw, and chipotle crema in corn tortillas.", price: 18.0, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800", category: "Mexican Tacos", isVeg: false, prepTime: "15m", rating: 4.7 },
  { id: "mt2", name: "Birria Quesatacos", description: "Slow-cooked beef inside crispy cheese-lined tortillas, served with rich consommé.", price: 22.0, image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&q=80&w=800", category: "Mexican Tacos", isVeg: false, isSpicy: true, prepTime: "20m", rating: 4.9 },
  { id: "mt3", name: "Al Pastor Tacos", description: "Marinated pork with pineapple, diced onions, and cilantro.", price: 17.0, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800", category: "Mexican Tacos", isVeg: false, prepTime: "12m" },
  { id: "mt4", name: "Spicy Cauliflower Tacos", description: "Roasted cauliflower tossed in adobo sauce, avocado, and pickled onions.", price: 16.0, image: "https://images.unsplash.com/photo-1615870238839-8667634f1ecb?auto=format&fit=crop&q=80&w=800", category: "Mexican Tacos", isVeg: true, isSpicy: true, prepTime: "15m" },

  // Vegan Bowls
  { id: "vb1", name: "Buddha Bowl", description: "Quinoa, roasted sweet potato, kale, chickpeas, and a creamy tahini dressing.", price: 18.0, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800", category: "Vegan Bowls", isVeg: true, prepTime: "12m", rating: 4.8 },
  { id: "vb2", name: "Teriyaki Tofu Bowl", description: "Crispy tofu in house-made teriyaki sauce over steamed jasmine rice and edamame.", price: 17.0, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800", category: "Vegan Bowls", isVeg: true, prepTime: "15m" },
  { id: "vb3", name: "Mediterranean Falafel Bowl", description: "House-made baked falafel, hummus, tabbouleh, cucumber salad, and pita points.", price: 19.0, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800", category: "Vegan Bowls", isVeg: true, prepTime: "15m", rating: 4.7 },
  { id: "vb4", name: "Spicy Peanut Noodle Bowl", description: "Rice noodles tossed in a spicy peanut sauce with bell peppers, carrots, and crushed peanuts.", price: 16.0, image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800", category: "Vegan Bowls", isVeg: true, isSpicy: true, prepTime: "12m" },

  // Desserts
  { id: "d1", name: "Valrhona Chocolate Dome", description: "Dark chocolate mousse, hazelnut praline core, and gold leaf detailing.", price: 18.0, image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?auto=format&fit=crop&q=80&w=800", category: "Desserts", isVeg: true, prepTime: "10m", rating: 5.0 },
  { id: "d2", name: "Yuzu Cheesecake", description: "Deconstructed Japanese yuzu cheesecake with graham crumble and matcha dust.", price: 16.0, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800", category: "Desserts", isVeg: true, prepTime: "5m" },
  { id: "d3", name: "Classic Tiramisu", description: "Espresso-soaked ladyfingers layered with light mascarpone cream and dusted with cocoa.", price: 14.0, image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=800", category: "Desserts", isVeg: true, prepTime: "5m", rating: 4.8 },
  { id: "d4", name: "Crème Brûlée", description: "Rich vanilla bean custard with a perfectly caramelized sugar crust.", price: 15.0, image: "https://images.unsplash.com/photo-1473347963363-d14fb962c64b?auto=format&fit=crop&q=80&w=800", category: "Desserts", isVeg: true, prepTime: "5m" },

  // Beverages
  { id: "b1", name: "Artisan Old Fashioned", description: "Smoked oak bourbon, bitter orange, and a single hand-carved ice sphere.", price: 22.0, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", category: "Beverages", isVeg: true, prepTime: "5m" },
  { id: "b2", name: "Matcha Lychee Mocktail", description: "Ceremonial grade matcha blended with fresh lychee pureé and sparkling water.", price: 12.0, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800", category: "Beverages", isVeg: true, prepTime: "5m" },
  { id: "b3", name: "Signature Espresso Martini", description: "Freshly brewed espresso shaken with premium vodka and coffee liqueur.", price: 18.0, image: "https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?auto=format&fit=crop&q=80&w=800", category: "Beverages", isVeg: true, prepTime: "5m", rating: 4.9 },
  { id: "b4", name: "Fresh Watermelon Cooler", description: "Muddled fresh watermelon, mint, lime juice, and a splash of soda.", price: 10.0, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800", category: "Beverages", isVeg: true, prepTime: "5m" },
];
