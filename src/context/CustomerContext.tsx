"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { restaurantData } from "@/lib/data";

interface CustomerData {
  name: string;
  phone: string;
  email?: string;
  tableNumber: string;
  sessionEndTime: number;
}

interface CustomerContextType {
  customer: CustomerData | null;
  setCustomer: (data: CustomerData) => void;
  isRegistered: boolean;
  extendSession: (minutes: number) => void;
  clearSession: () => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomerState] = useState<CustomerData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // TEMPORARY: Disabled local storage loading so the user can test the modal repeatedly on refresh
    /*
    const stored = localStorage.getItem("restro_customer");
    if (stored) {
      try {
        setCustomerState(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored customer data");
      }
    }
    */
    setIsInitialized(true);
  }, []);

  const setCustomer = (data: CustomerData) => {
    setCustomerState(data);
    localStorage.setItem("restro_customer", JSON.stringify(data));
  };

  const extendSession = (minutes: number) => {
    if (customer) {
      const updatedCustomer = {
        ...customer,
        sessionEndTime: customer.sessionEndTime + minutes * 60 * 1000
      };
      setCustomer(updatedCustomer);
    }
  };

  const clearSession = () => {
    setCustomerState(null);
    localStorage.removeItem("restro_customer");
  };

  // Only render children after initialization to prevent hydration mismatch
  if (!isInitialized) return null;

  return (
    <CustomerContext.Provider value={{ customer, setCustomer, isRegistered: !!customer, extendSession, clearSession }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}
