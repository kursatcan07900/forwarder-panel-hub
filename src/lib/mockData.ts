
export interface Transaction {
  id: string;
  type: 'purchase' | 'sale' | 'rental';
  date: string;
  amount: number;
  earnings: number;
  userName: string;
  companyName?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  phone: string;
  iban: string;
  inviteCode: string;
}

export interface Referral {
  id: string;
  userName: string;
  companyName?: string;
  transactionCount: {
    purchase: number;
    sale: number;
    rental: number;
  };
  totalEarnings: number;
  transactions: Transaction[];
}

// Mock user profile
export const mockProfile: UserProfile = {
  id: "1",
  firstName: "Ahmet",
  lastName: "Yılmaz",
  companyName: "Yılmaz Lojistik Ltd.",
  email: "ahmet@yilmazlojistik.com",
  phone: "+90 555 123 4567",
  iban: "TR12 0001 0012 3456 7891 0123 45",
  inviteCode: "YILMAZ2024"
};

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    type: "purchase",
    date: "2024-04-10T10:30:00Z",
    amount: 1,
    earnings: 50,
    userName: "Mehmet Kaya",
    companyName: "Kaya İnşaat"
  },
  {
    id: "t2",
    type: "sale",
    date: "2024-04-09T14:20:00Z",
    amount: 1,
    earnings: 70,
    userName: "Ayşe Demir"
  },
  {
    id: "t3",
    type: "rental",
    date: "2024-04-08T09:15:00Z",
    amount: 1,
    earnings: 30,
    userName: "Can Özkan",
    companyName: "Özkan Gayrimenkul"
  },
  {
    id: "t4",
    type: "purchase",
    date: "2024-04-07T11:45:00Z",
    amount: 1,
    earnings: 50,
    userName: "Zeynep Çelik"
  },
  {
    id: "t5",
    type: "sale",
    date: "2024-04-06T16:10:00Z",
    amount: 1,
    earnings: 70,
    userName: "Murat Şahin",
    companyName: "Şahin Emlak"
  },
  {
    id: "t6",
    type: "rental",
    date: "2024-04-05T13:25:00Z",
    amount: 1,
    earnings: 30,
    userName: "Elif Yıldız"
  },
  {
    id: "t7",
    type: "purchase",
    date: "2024-04-04T10:50:00Z",
    amount: 1,
    earnings: 50,
    userName: "Burak Aydın",
    companyName: "Aydın Ticaret"
  }
];

// Mock referrals
export const mockReferrals: Referral[] = [
  {
    id: "r1",
    userName: "Mehmet Kaya",
    companyName: "Kaya İnşaat",
    transactionCount: {
      purchase: 2,
      sale: 1,
      rental: 0
    },
    totalEarnings: 170,
    transactions: [
      {
        id: "t1",
        type: "purchase",
        date: "2024-04-10T10:30:00Z",
        amount: 1,
        earnings: 50,
        userName: "Mehmet Kaya",
        companyName: "Kaya İnşaat"
      },
      {
        id: "t8",
        type: "purchase",
        date: "2024-03-20T11:30:00Z",
        amount: 1,
        earnings: 50,
        userName: "Mehmet Kaya",
        companyName: "Kaya İnşaat"
      },
      {
        id: "t9",
        type: "sale",
        date: "2024-03-15T14:45:00Z",
        amount: 1,
        earnings: 70,
        userName: "Mehmet Kaya",
        companyName: "Kaya İnşaat"
      }
    ]
  },
  {
    id: "r2",
    userName: "Ayşe Demir",
    transactionCount: {
      purchase: 0,
      sale: 2,
      rental: 1
    },
    totalEarnings: 170,
    transactions: [
      {
        id: "t2",
        type: "sale",
        date: "2024-04-09T14:20:00Z",
        amount: 1,
        earnings: 70,
        userName: "Ayşe Demir"
      },
      {
        id: "t10",
        type: "sale",
        date: "2024-03-10T09:20:00Z",
        amount: 1,
        earnings: 70,
        userName: "Ayşe Demir"
      },
      {
        id: "t11",
        type: "rental",
        date: "2024-02-28T16:10:00Z",
        amount: 1,
        earnings: 30,
        userName: "Ayşe Demir"
      }
    ]
  },
  {
    id: "r3",
    userName: "Can Özkan",
    companyName: "Özkan Gayrimenkul",
    transactionCount: {
      purchase: 1,
      sale: 1,
      rental: 2
    },
    totalEarnings: 180,
    transactions: [
      {
        id: "t3",
        type: "rental",
        date: "2024-04-08T09:15:00Z",
        amount: 1,
        earnings: 30,
        userName: "Can Özkan",
        companyName: "Özkan Gayrimenkul"
      },
      {
        id: "t12",
        type: "purchase",
        date: "2024-03-05T10:35:00Z",
        amount: 1,
        earnings: 50,
        userName: "Can Özkan",
        companyName: "Özkan Gayrimenkul"
      },
      {
        id: "t13",
        type: "sale",
        date: "2024-02-20T13:15:00Z",
        amount: 1,
        earnings: 70,
        userName: "Can Özkan",
        companyName: "Özkan Gayrimenkul"
      },
      {
        id: "t14",
        type: "rental",
        date: "2024-02-15T11:40:00Z",
        amount: 1,
        earnings: 30,
        userName: "Can Özkan",
        companyName: "Özkan Gayrimenkul"
      }
    ]
  }
];

// Function to get summary statistics
export const getStatistics = () => {
  const totalTransactions = mockTransactions.length;
  
  const typeStats = {
    purchase: mockTransactions.filter(t => t.type === 'purchase').length,
    sale: mockTransactions.filter(t => t.type === 'sale').length,
    rental: mockTransactions.filter(t => t.type === 'rental').length,
  };
  
  const totalEarnings = mockTransactions.reduce((sum, t) => sum + t.earnings, 0);
  
  const referralCount = mockReferrals.length;
  
  return {
    totalTransactions,
    typeStats,
    totalEarnings,
    referralCount
  };
};
