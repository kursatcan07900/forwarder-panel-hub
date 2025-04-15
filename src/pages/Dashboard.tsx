
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatistics, mockTransactions } from "@/lib/mockData";
import { BarChart4, Users, CreditCard, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const stats = getStatistics();
  
  // Get only the 5 most recent transactions
  const recentTransactions = [...mockTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your forwarder dashboard</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEarnings} TL</div>
            <p className="text-xs text-muted-foreground">
              From all transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              All processed transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.referralCount}</div>
            <p className="text-xs text-muted-foreground">
              Using your invite code
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Invite Code</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">YILMAZ2024</div>
            <p className="text-xs text-muted-foreground">
              Share with potential clients
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction type breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Transaction Types</CardTitle>
            <CardDescription>Breakdown of transaction types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>Purchase</span>
                </div>
                <div>
                  <span className="font-medium">{stats.typeStats.purchase}</span>
                  <span className="text-muted-foreground"> transactions</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-secondary mr-2"></div>
                  <span>Sale</span>
                </div>
                <div>
                  <span className="font-medium">{stats.typeStats.sale}</span>
                  <span className="text-muted-foreground"> transactions</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-accent-foreground mr-2"></div>
                  <span>Rental</span>
                </div>
                <div>
                  <span className="font-medium">{stats.typeStats.rental}</span>
                  <span className="text-muted-foreground"> transactions</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Earnings Per Type</CardTitle>
            <CardDescription>Earnings breakdown by transaction type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>Purchase</span>
                </div>
                <div>
                  <span className="font-medium">{stats.typeStats.purchase * 50} TL</span>
                  <span className="text-muted-foreground"> (50 TL/transaction)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-secondary mr-2"></div>
                  <span>Sale</span>
                </div>
                <div>
                  <span className="font-medium">{stats.typeStats.sale * 70} TL</span>
                  <span className="text-muted-foreground"> (70 TL/transaction)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-accent-foreground mr-2"></div>
                  <span>Rental</span>
                </div>
                <div>
                  <span className="font-medium">{stats.typeStats.rental * 30} TL</span>
                  <span className="text-muted-foreground"> (30 TL/transaction)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent transactions table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest 5 transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User/Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
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
                      {transaction.type === 'purchase' ? 'Purchase' : 
                       transaction.type === 'sale' ? 'Sale' : 'Rental'}
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
