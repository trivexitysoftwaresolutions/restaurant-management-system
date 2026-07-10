"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { menuItems } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export function FeaturedDishSection() {
  const router = useRouter();
  const { addToCart } = useCart();
  const featured = menuItems.filter((item) => item.isSignature);

  if (featured.length === 0) return null;

  return (
    <section className="w-full max-w-md mx-auto md:max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-cormorant text-2xl font-bold text-foreground">Chef's Signatures</h2>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 snap-x">
        {featured.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.set('dishId', item.id);
              router.push(url.pathname + url.search, { scroll: false });
            }}
            className="group relative min-w-[320px] md:min-w-[420px] h-[400px] md:h-[440px] rounded-[2.5rem] overflow-hidden cursor-pointer snap-start border border-white/10 shadow-2xl"
          >
            {/* Ambient Blurred Background */}
            <div className="absolute inset-0 z-0 bg-black">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover scale-125 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-[#0a0a0a]" />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 z-10 p-4 md:p-5 flex flex-col">
              
              {/* Image Frame (Top) - 100% unobstructed image */}
              <div className="relative w-full h-[50%] md:h-[55%] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.6)] border border-white/10 bg-black/20">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3">
                  <span className="bg-primary/95 backdrop-blur-md text-primary-foreground text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                    Signature
                  </span>
                </div>
                {item.rating && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/70 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <span className="text-primary">★</span> {item.rating}
                    </span>
                  </div>
                )}
              </div>

              {/* Text Content (Bottom) - 100% readable */}
              <div className="flex-1 mt-5 md:mt-6 px-2 flex flex-col">
                <h3 className="font-cormorant text-2xl md:text-3xl font-bold text-white leading-tight mb-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                
                <p className="text-white/60 text-sm line-clamp-2 leading-relaxed mb-auto">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10">
                  <span className="font-semibold text-2xl text-primary">₹{item.price.toFixed(2)}</span>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="bg-white/5 hover:bg-primary hover:text-primary-foreground text-white backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center premium-transition active:scale-95 border border-white/10 shadow-xl group-hover:rotate-90"
                  >
                    <Plus className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
