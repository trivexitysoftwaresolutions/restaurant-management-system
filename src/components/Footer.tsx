"use client";

import { MapPin, Phone, Mail, Camera, Globe, MessageCircle } from "lucide-react";
import { restaurantData } from "@/lib/data";

export function Footer() {
  return (
    <footer className="w-full bg-[#111111] border-t border-[#222] mt-20 pb-24 md:pb-12 pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & About */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left col-span-1 md:col-span-1">
            <h2 className="font-cormorant text-3xl font-bold text-primary mb-4 tracking-wide uppercase">
              {restaurantData.name}
            </h2>
            <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">
              {restaurantData.tagline || "Experience the finest culinary arts in a premium atmosphere. Crafted with passion, served with elegance."}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-[#A3A3A3] hover:text-primary hover:bg-primary/10 transition-colors">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-[#A3A3A3] hover:text-primary hover:bg-primary/10 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-[#A3A3A3] hover:text-primary hover:bg-primary/10 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-cormorant text-xl font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4 text-sm text-[#A3A3A3]">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>123 Culinary Avenue, Food District<br/>New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>reservations@laura-dining.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-cormorant text-xl font-bold text-white mb-6 uppercase tracking-wider">Opening Hours</h3>
            <ul className="space-y-3 text-sm text-[#A3A3A3]">
              <li className="flex justify-between w-full max-w-[200px]">
                <span>Mon - Thu</span>
                <span className="text-white">11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between w-full max-w-[200px]">
                <span>Fri - Sat</span>
                <span className="text-white">11:00 AM - 11:30 PM</span>
              </li>
              <li className="flex justify-between w-full max-w-[200px]">
                <span>Sunday</span>
                <span className="text-primary font-medium">10:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-cormorant text-xl font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm text-[#A3A3A3]">
              <li><a href="#" className="hover:text-primary transition-colors">Our Menu</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Private Dining</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Allergen Information</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

        </div>

        <div className="w-full border-t border-[#333] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#666] uppercase tracking-widest text-center md:text-left">
            Prices are exclusive of applicable taxes
          </p>
          <p className="text-xs text-[#666] uppercase tracking-widest text-center md:text-right">
            © {new Date().getFullYear()} {restaurantData.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
