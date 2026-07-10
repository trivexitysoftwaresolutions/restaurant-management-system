import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { menuCategories, menuItems } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { StickyCartBar } from "@/components/StickyCartBar";
import { Footer } from "@/components/Footer";

// Generate static params for all categories so they are pre-rendered
export function generateStaticParams() {
  return menuCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = menuCategories.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const items = menuItems.filter((item) => item.category === category.name);

  return (
    <main className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Category Hero */}
      <section className="relative w-full h-[40vh] md:h-[50vh] flex items-end justify-center pb-12 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        <Link 
          href="/"
          className="absolute top-6 left-4 md:left-8 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>

        <div className="relative z-10 text-center px-4">
          <h1 className="font-cormorant text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {category.name}
          </h1>
          <p className="text-[#EFEBE3] text-sm tracking-widest uppercase">
            {items.length} Curated Items
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div key={item.id} className="h-full">
              <ProductCard item={item} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* Explore Other Categories Section */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 border-t border-white/10 mt-8">
        <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-white mb-8">
          Explore Other Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {menuCategories
            .filter((c) => c.slug !== category.slug)
            .map((otherCat) => (
              <Link 
                key={otherCat.slug} 
                href={`/category/${otherCat.slug}`}
                className="relative h-32 md:h-40 rounded-2xl overflow-hidden group border border-white/10"
              >
                <Image
                  src={otherCat.image}
                  alt={otherCat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-cormorant text-xl md:text-2xl font-bold text-white text-center px-2">
                    {otherCat.name}
                  </h3>
                </div>
              </Link>
          ))}
        </div>
      </section>

      <Footer />
      <StickyCartBar />
    </main>
  );
}
