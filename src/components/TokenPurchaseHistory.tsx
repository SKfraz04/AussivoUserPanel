
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  TrendingUp,
  DollarSign,
  Coins,
  CreditCard,
  ExternalLink
} from "lucide-react";

// Sample token purchase history data
const samplePurchaseHistory = [
  {
    id: "tx001",
    date: "2024-01-15 14:30:25",
    amount: 1000,
    price: 0.1,
    totalCost: 100,
    network: "BEP20",
    paymentMethod: "USDT",
    status: "completed",
    transactionHash: "0x1234567890abcdef1234567890abcdef12345678",
    networkFee: 0.001
  },
  {
    id: "tx002",
    date: "2024-01-10 09:15:42",
    amount: 500,
    price: 0.095,
    totalCost: 47.5,
    network: "TRC20",
    paymentMethod: "USDT",
    status: "completed",
    transactionHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    networkFee: 0.005
  },
  {
    id: "tx003",
    date: "2024-01-08 16:45:18",
    amount: 2000,
    price: 0.09,
    totalCost: 180,
    network: "SUI",
    paymentMethod: "SUI",
    status: "completed",
    transactionHash: "0x567890abcdef1234567890abcdef1234567890ab",
    networkFee: 0.02
  },
  {
    id: "tx004",
    date: "2024-01-05 11:20:33",
    amount: 750,
    price: 0.085,
    totalCost: 63.75,
    network: "Ramper",
    paymentMethod: "Credit Card",
    status: "completed",
    transactionHash: "ramper_tx_789012345",
    networkFee: 0
  },
  {
    id: "tx005",
    date: "2024-01-03 08:12:56",
    amount: 300,
    price: 0.08,
    totalCost: 24,
    network: "BEP20",
    paymentMethod: "USDT",
    status: "pending",
    transactionHash: "0x890abcdef1234567890abcdef1234567890abcde",
    networkFee: 0.001
  }
];

const truncateHash = (hash: string) => {
  if (!hash) return '';
  return `${hash.substring(0, 8)}...${hash.substring(hash.length - 6)}`;
};

const TokenPurchaseHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter transactions based on search and tab
  const filteredTransactions = samplePurchaseHistory.filter(tx => {
    const matchSearch = searchQuery === "" || 
                        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tx.network.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tx.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchSearch;
    if (activeTab === "completed") return tx.status === "completed" && matchSearch;
    if (activeTab === "pending") return tx.status === "pending" && matchSearch;
    
    return matchSearch;
  });

  // Calculate totals
  const totalTokens = samplePurchaseHistory.reduce((sum, tx) => sum + tx.amount, 0);
  const totalSpent = samplePurchaseHistory.reduce((sum, tx) => sum + tx.totalCost, 0);
  const averagePrice = totalSpent / totalTokens;

  const handleExportData = () => {
    console.log("Exporting purchase history...");
    // In a real implementation, this would generate and download a CSV file
  };

  const openTransactionHash = (hash: string, network: string) => {
    // In a real implementation, this would open the transaction on the appropriate blockchain explorer
    console.log(`Opening transaction ${hash} on ${network} explorer`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Token Purchase History</h2>
        <p className="text-muted-foreground">View all your SVR token purchases and transaction details</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="dashboard-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tokens Purchased</p>
                <p className="text-2xl font-bold text-svr-primary">{totalTokens.toLocaleString()} SVR</p>
              </div>
              <Coins className="h-8 w-8 text-svr-primary opacity-70" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Amount Spent</p>
                <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-svr-primary opacity-70" />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Price</p>
                <p className="text-2xl font-bold">${averagePrice.toFixed(3)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-svr-primary opacity-70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by transaction ID, network..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs for filtering */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Purchase History ({filteredTransactions.length} transactions)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Amount (SVR)</TableHead>
                    <TableHead>Price per Token</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{transaction.date.split(' ')[0]}</div>
                            <div className="text-xs text-muted-foreground">{transaction.date.split(' ')[1]}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm">{transaction.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Coins className="h-4 w-4 mr-2 text-svr-primary" />
                          <span className="font-medium">{transaction.amount.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>${transaction.price}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">${transaction.totalCost}</div>
                          <div className="text-xs text-muted-foreground">
                            Fee: {transaction.networkFee} {transaction.network === "SUI" ? "SUI" : "USDT"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-svr-primary/10 text-svr-primary border-svr-primary/20">
                          {transaction.network}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {transaction.paymentMethod === "Credit Card" ? (
                            <CreditCard className="h-4 w-4 mr-2" />
                          ) : (
                            <DollarSign className="h-4 w-4 mr-2" />
                          )}
                          {transaction.paymentMethod}
                        </div>
                      </TableCell>
                      <TableCell>
                        {transaction.status === "completed" && (
                          <Badge className="bg-green-500 text-white">Completed</Badge>
                        )}
                        {transaction.status === "pending" && (
                          <Badge variant="outline" className="bg-yellow-500 text-white border-yellow-500">
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openTransactionHash(transaction.transactionHash, transaction.network)}
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {truncateHash(transaction.transactionHash)}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-8">
                  <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? "Try adjusting your search terms" : "You haven't made any token purchases yet"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenPurchaseHistory;
