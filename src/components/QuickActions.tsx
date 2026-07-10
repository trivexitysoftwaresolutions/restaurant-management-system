"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, BellRing, History, FileText } from "lucide-react";
import { BookMenu } from "./BookMenu";

export function QuickActions() {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const actions = [
    { icon: Utensils, label: "Menu", delay: 0.1 },
    { icon: History, label: "Reorder", delay: 0.2 },
    { icon: BellRing, label: "Call Staff", delay: 0.3 },
    { icon: FileText, label: "Bill", delay: 0.4 },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 -mt-10 md:-mt-14 relative z-20">
      <div className="bg-[#1A1A1A]/95 backdrop-blur-md border border-[#333] text-white p-4 rounded-2xl grid grid-cols-4 gap-2 premium-shadow max-w-3xl mx-auto">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: action.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => {
              if (action.label === "Menu") setIsBookOpen(true);
            }}
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-white/5 active:scale-95 premium-transition group"
          >
            <div className="w-12 h-12 rounded-full bg-[#2A2A2A] flex items-center justify-center group-hover:bg-primary/20 premium-transition">
              <action.icon className="w-5 h-5 text-[#EFEBE3] group-hover:text-primary premium-transition" />
            </div>
            <span className="text-xs font-medium text-[#A3A3A3] group-hover:text-white premium-transition mt-1">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
      <BookMenu isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />
    </section>
  );
}
