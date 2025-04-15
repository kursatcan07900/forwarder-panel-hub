
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockReferrals } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const Referrals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  // Filter referrals based on search term
  const filteredReferrals = mockReferrals.filter(
    (referral) => 
      referral.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (referral.companyName && 
       referral.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleCollapsible = (id: string) => {
    setOpenCollapsible(openCollapsible === id ? null : id);
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'Purchase';
      case 'sale':
        return 'Sale';
      case 'rental':
        return 'Rental';
      default:
        return type;
    }
  };

  const getTransactionTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'sale':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'rental':
        return 'bg-accent-foreground/10 text-accent-foreground border-accent-foreground/20';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Referrals</h1>
        <p className="text-muted-foreground">
          Users and companies who have used your invite code
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Referral List</CardTitle>
          <CardDescription>
            Details of all users who registered with your invite code
          </CardDescription>
          <div className="flex items-center border rounded-md px-3 mt-2">
            <Search className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
            <Input
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">User/Company</TableHead>
                <TableHead>Transaction Types</TableHead>
                <TableHead>Total Earnings</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReferrals.map((referral) => (
                <Collapsible
                  key={referral.id}
                  open={openCollapsible === referral.id}
                  onOpenChange={() => {}}
                  className="w-full"
                >
                  <TableRow>
                    <TableCell>
                      <div>
                        <div className="font-medium">{referral.userName}</div>
                        {referral.companyName && (
                          <div className="text-sm text-muted-foreground">
                            {referral.companyName}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-wrap">
                        {referral.transactionCount.purchase > 0 && (
                          <Badge 
                            variant="outline" 
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {referral.transactionCount.purchase} Purchase
                          </Badge>
                        )}
                        {referral.transactionCount.sale > 0 && (
                          <Badge 
                            variant="outline" 
                            className="bg-secondary/10 text-secondary border-secondary/20"
                          >
                            {referral.transactionCount.sale} Sale
                          </Badge>
                        )}
                        {referral.transactionCount.rental > 0 && (
                          <Badge 
                            variant="outline" 
                            className="bg-accent-foreground/10 text-accent-foreground border-accent-foreground/20"
                          >
                            {referral.transactionCount.rental} Rental
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {referral.totalEarnings} TL
                    </TableCell>
                    <TableCell>
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleCollapsible(referral.id)}
                        >
                          {openCollapsible === referral.id ? (
                            <ChevronUp className="h-4 w-4 mr-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 mr-1" />
                          )}
                          {openCollapsible === referral.id ? 'Hide' : 'Show'} Details
                        </Button>
                      </CollapsibleTrigger>
                    </TableCell>
                  </TableRow>
                  <CollapsibleContent asChild>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableCell colSpan={4} className="p-0">
                        <div className="px-4 py-3">
                          <h4 className="font-medium mb-2">Transaction History</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Earnings</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {referral.transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                  <TableCell>
                                    {new Date(transaction.date).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell>
                                    <Badge 
                                      variant="outline" 
                                      className={getTransactionTypeBadgeClass(transaction.type)}
                                    >
                                      {getTransactionTypeLabel(transaction.type)}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    {transaction.earnings} TL
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                  </CollapsibleContent>
                </Collapsible>
              ))}
              
              {filteredReferrals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No matching referrals found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Referrals;
