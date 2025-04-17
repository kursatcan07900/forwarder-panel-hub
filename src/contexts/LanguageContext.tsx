
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
    welcomeDashboard: "Forwarder panelinize hoş geldiniz",
    totalEarnings: "Toplam Kazanç",
    fromAllTransactions: "Tüm işlemlerden",
    totalTransactions: "Toplam İşlemler",
    allProcessedTransactions: "Tüm işlenmiş işlemler",
    yourInviteCode: "Davet Kodunuz",
    shareWithClients: "Potansiyel müşterilerle paylaşın",
    transactionTypes: "İşlem Türleri",
    breakdownOfTypes: "İşlem türlerine göre dağılım",
    earningsPerType: "Tür Başına Kazanç",
    earningsBreakdown: "İşlem türüne göre kazanç dağılımı",
    purchase: "Alım",
    sale: "Satım",
    rental: "Kiralama",
    transactions: "işlem",
    transaction: "işlem",
    recentTransactions: "Son İşlemler",
    latestTransactions: "Son 5 işleminiz",
    date: "Tarih",
    userCompany: "Kullanıcı/Şirket",
    type: "Tür",
    earnings: "Kazanç",
    usingYourInviteCode: "Davet kodunuzu kullanarak"
  },
  en: {
    dashboard: "Dashboard",
    referrals: "Referrals",
    profile: "Profile",
    logout: "Logout",
    forwarderPanel: "Forwarder Panel",
    welcomeDashboard: "Welcome to your forwarder dashboard",
    totalEarnings: "Total Earnings",
    fromAllTransactions: "From all transactions",
    totalTransactions: "Total Transactions",
    allProcessedTransactions: "All processed transactions",
    yourInviteCode: "Your Invite Code",
    shareWithClients: "Share with potential clients",
    transactionTypes: "Transaction Types",
    breakdownOfTypes: "Breakdown of transaction types",
    earningsPerType: "Earnings Per Type",
    earningsBreakdown: "Earnings breakdown by transaction type",
    purchase: "Purchase",
    sale: "Sale",
    rental: "Rental",
    transactions: "transactions",
    transaction: "transaction",
    recentTransactions: "Recent Transactions",
    latestTransactions: "Your latest 5 transactions",
    date: "Date",
    userCompany: "User/Company",
    type: "Type",
    earnings: "Earnings",
    usingYourInviteCode: "Using your invite code"
  },
  ar: {
    dashboard: "لوحة القيادة",
    referrals: "الإحالات",
    profile: "الملف الشخصي",
    logout: "تسجيل خروج",
    forwarderPanel: "لوحة المرسل",
    welcomeDashboard: "مرحبًا بك في لوحة تحكم المُرسل",
    totalEarnings: "إجمالي الأرباح",
    fromAllTransactions: "من جميع المعاملات",
    totalTransactions: "إجمالي المعاملات",
    allProcessedTransactions: "جميع المعاملات المعالجة",
    yourInviteCode: "رمز الدعوة الخاص بك",
    shareWithClients: "شارك مع العملاء المحتملين",
    transactionTypes: "أنواع المعاملات",
    breakdownOfTypes: "تفصيل أنواع المعاملات",
    earningsPerType: "الأرباح لكل نوع",
    earningsBreakdown: "تفصيل الأرباح حسب نوع المعاملة",
    purchase: "شراء",
    sale: "بيع",
    rental: "تأجير",
    transactions: "معاملات",
    transaction: "معاملة",
    recentTransactions: "المعاملات الأخيرة",
    latestTransactions: "أحدث 5 معاملات لك",
    date: "التاريخ",
    userCompany: "المستخدم/الشركة",
    type: "النوع",
    earnings: "الأرباح",
    usingYourInviteCode: "باستخدام رمز الدعوة الخاص بك"
  },
  ru: {
    dashboard: "Панель",
    referrals: "Рефералы",
    profile: "Профиль",
    logout: "Выход",
    forwarderPanel: "Панель экспедитора",
    welcomeDashboard: "Добро пожаловать в панель экспедитора",
    totalEarnings: "Общий доход",
    fromAllTransactions: "Со всех транзакций",
    totalTransactions: "Всего транзакций",
    allProcessedTransactions: "Все обработанные транзакции",
    yourInviteCode: "Ваш пригласительный код",
    shareWithClients: "Поделитесь с потенциальными клиентами",
    transactionTypes: "Типы транзакций",
    breakdownOfTypes: "Распределение типов транзакций",
    earningsPerType: "Доход по типам",
    earningsBreakdown: "Распределение дохода по типам транзакций",
    purchase: "Покупка",
    sale: "Продажа",
    rental: "Аренда",
    transactions: "транзакций",
    transaction: "транзакция",
    recentTransactions: "Недавние транзакции",
    latestTransactions: "Ваши последние 5 транзакций",
    date: "Дата",
    userCompany: "Пользователь/Компания",
    type: "Тип",
    earnings: "Доход",
    usingYourInviteCode: "С использованием вашего кода"
  },
  zh: {
    dashboard: "仪表板",
    referrals: "推荐",
    profile: "个人资料",
    logout: "登出",
    forwarderPanel: "转发器面板",
    welcomeDashboard: "欢迎来到您的转发器仪表板",
    totalEarnings: "总收入",
    fromAllTransactions: "来自所有交易",
    totalTransactions: "总交易量",
    allProcessedTransactions: "所有已处理的交易",
    yourInviteCode: "您的邀请码",
    shareWithClients: "与潜在客户分享",
    transactionTypes: "交易类型",
    breakdownOfTypes: "交易类型明细",
    earningsPerType: "各类型收入",
    earningsBreakdown: "按交易类型的收入明细",
    purchase: "购买",
    sale: "销售",
    rental: "出租",
    transactions: "交易",
    transaction: "交易",
    recentTransactions: "最近交易",
    latestTransactions: "您最近的5笔交易",
    date: "日期",
    userCompany: "用户/公司",
    type: "类型",
    earnings: "收入",
    usingYourInviteCode: "使用您的邀请码"
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
