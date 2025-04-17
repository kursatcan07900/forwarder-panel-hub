
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define available languages
export type Language = "tr" | "en" | "ar" | "ru" | "zh";

// Define translations for each supported language
export const translations = {
  tr: {
    dashboard: "Panel",
    referrals: "Davetler",
    profile: "Profil",
    logout: "Çıkış",
    forwarderPanel: "Forwarder Paneli",
  },
  en: {
    dashboard: "Dashboard",
    referrals: "Referrals",
    profile: "Profile",
    logout: "Logout",
    forwarderPanel: "Forwarder Panel",
  },
  ar: {
    dashboard: "لوحة القيادة",
    referrals: "الإحالات",
    profile: "الملف الشخصي",
    logout: "تسجيل خروج",
    forwarderPanel: "لوحة المرسل",
  },
  ru: {
    dashboard: "Панель",
    referrals: "Рефералы",
    profile: "Профиль",
    logout: "Выход",
    forwarderPanel: "Панель экспедитора",
  },
  zh: {
    dashboard: "仪表板",
    referrals: "推荐",
    profile: "个人资料",
    logout: "登出",
    forwarderPanel: "转发器面板",
  }
};

// Create the language context
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create a provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Default language is Turkish
  const [language, setLanguage] = useState<Language>("tr");

  // Translation function
  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
