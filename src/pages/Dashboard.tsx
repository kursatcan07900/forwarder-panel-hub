
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatistics, mockTransactions } from "@/lib/mockData";
import { BarChart4, Users, CreditCard, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const stats = getStatistics();
  const { t, language } = useLanguage();
  
  // Get only the 5 most recent transactions
  const recentTransactions = [...mockTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);

  // Function to translate transaction types
  const translateTransactionType = (type: string) => {
    switch (type) {
      case 'purchase': return t('purchase');
      case 'sale': return t('sale');
      case 'rental': return t('rental');
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard')}</h1>
        <p className="text-muted-foreground">{t('welcomeDashboard')}</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalEarnings')}</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEarnings} TL</div>
            <p className="text-xs text-muted-foreground">
              {t('fromAllTransactions')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalTransactions')}</CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              {t('allProcessedTransactions')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('referrals')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.referralCount}</div>
            <p className="text-xs text-muted-foreground">
              {t('usingYourInviteCode')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('yourInviteCode')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">YILMAZ2024</div>
            <p className="text-xs text-muted-foreground">
              {t('shareWithClients')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction type breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t('transactionTypes')}</CardTitle>
            <CardDescription>{t('breakdownOfTypes')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>{t('purchase')}</span>
                </div>
                <div>
                  <span className="font-medium">{stats.typeStats.purchase}</span>
                  <span className="text-muted-foreground"> {t('transactions')}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-secondary mr-2"></div>
                  <span>{t('sale')}</span>
                </div>
                <div>
                  <span className="font-medium">{stats.typeStats.sale}</span>
                  <span className="text-muted-foreground"> {t('transactions')}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-accent-foreground mr-2"></div>
                  <span>{t('rental')}</span>
                </div>
                <div>
                  <span className="font-medium">{stats.typeStats.rental}</span>
                  <span className="text-muted-foreground"> {t('transactions')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t('earningsPerType')}</CardTitle>
            <CardDescription>{t('earningsBreakdown')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>{t('purchase')}</span>
                </div>
                <div>
                  <span className="font-medium">{stats.typeStats.purchase * 50} TL</span>
                  <span className="text-muted-foreground"> (50 TL/{t('transaction')})</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-secondary mr-2"></div>
                  <span>{t('sale')}</span>
                </div>
                <div>
                  <span className="font-medium">{stats.typeStats.sale * 70} TL</span>
                  <span className="text-muted-foreground"> (70 TL/{t('transaction')})</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-accent-foreground mr-2"></div>
                  <span>{t('rental')}</span>
                </div>
                <div>
                  <span className="font-medium">{stats.typeStats.rental * 30} TL</span>
                  <span className="text-muted-foreground"> (30 TL/{t('transaction')})</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent transactions table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recentTransactions')}</CardTitle>
          <CardDescription>{t('latestTransactions')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('userCompany')}</TableHead>
                <TableHead>{t('type')}</TableHead>
                <TableHead>{t('earnings')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString(
                      language === 'zh' ? 'zh-CN' : 
                      language === 'ar' ? 'ar-SA' : 
                      language === 'ru' ? 'ru-RU' : 
                      language === 'tr' ? 'tr-TR' : 'en-US'
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{transaction.userName}</div>
                      {transaction.companyName && (
                        <div className="text-sm text-muted-foreground">
                          {transaction.companyName}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        transaction.type === 'purchase' ? 'bg-primary/10 text-primary border-primary/20' : 
                        transaction.type === 'sale' ? 'bg-secondary/10 text-secondary border-secondary/20' : 
                        'bg-accent-foreground/10 text-accent-foreground border-accent-foreground/20'
                      }
                    >
                      {translateTransactionType(transaction.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.earnings} TL
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
