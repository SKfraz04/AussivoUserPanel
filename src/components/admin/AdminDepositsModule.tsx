
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Check, 
  X, 
  AlertTriangle,
  MoreHorizontal,
  Eye,
  Calendar,
  ArrowDown,
  ArrowUp
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample deposit data
const sampleDeposits = [
  {
    id: "tx1",
    type: "deposit",
    wallet: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    amount: 25000,
    currency: "USDT",
    network: "BEP20",
    status: "completed",
    date: "2023-11-24 14:32:15",
    txHash: "0xb58b964331de7c90364ed7e2e923227ea8f3696d386e6e05f101796491e4892a"
  },
  {
    id: "tx2",
    type: "deposit",
    wallet: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    amount: 8500,
    currency: "USDT",
    network: "BEP20",
    status: "completed",
    date: "2023-11-23 09:15:44",
    txHash: "0x3a7a1c36e5fdd268164361a9058866b59ed927d829c5e13a94b865a8700cd122"
  },
  {
    id: "tx3",
    type: "withdrawal",
    wallet: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    amount: 1500,
    currency: "SVR",
    network: "SUI",
    status: "processing",
    date: "2023-11-24 16:08:21",
    txHash: "0xf683734b385421a1b95d58a293c2f7b0318ef7e48ff4e9fa64800afff9121424"
  },
  {
    id: "tx4",
    type: "deposit",
    wallet: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    amount: 1200,
    currency: "USDT",
    network: "TRC20",
    status: "failed",
    date: "2023-11-22 19:44:35",
    txHash: "0x7f5a99d17d9b97fbd540f33a8bb1c1b9efbdc8a7e3aa396b5f582d3387d56002"
  },
  {
    id: "tx5",
    type: "deposit",
    wallet: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    amount: 3000,
    currency: "SUI",
    network: "SUI",
    status: "completed",
    date: "2023-11-21 08:52:17",
    txHash: "0xd022b05c4c5b75e66ec13437a8a131aa64dbe4d65b7e6173cb02e85924f31e5a"
  },
  {
    id: "tx6",
    type: "withdrawal",
    wallet: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    amount: 5000,
    currency: "SVR",
    network: "SUI",
    status: "completed",
    date: "2023-11-20 11:35:09",
    txHash: "0xa8e3b8917d3a8aa35abe8def3b327c76507f9c3bd7bfc57fb93cd55a9b67f50c"
  },
];

const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const truncateHash = (hash: string) => {
  if (!hash) return '';
  return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
};

const AdminDepositsModule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDeposit, setSelectedDeposit] = useState<any>(null);
  const [dateFilter, setDateFilter] = useState("all");

  // Filter deposits based on search and tab
  const filteredDeposits = sampleDeposits.filter(deposit => {
    // Search filter
    const matchSearch = searchQuery === "" || 
                       deposit.wallet.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       deposit.txHash.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    if (activeTab === "all") return matchSearch;
    if (activeTab === "deposits") return deposit.type === "deposit" && matchSearch;
    if (activeTab === "withdrawals") return deposit.type === "withdrawal" && matchSearch;
    if (activeTab === "failed") return deposit.status === "failed" && matchSearch;
    
    return matchSearch;
  });

  const handleViewDeposit = (deposit: any) => {
    setSelectedDeposit(deposit);
  };

  const handleVerifyManually = (txId: string) => {
    console.log(`Manually verifying transaction: ${txId}`);
    // In a real implementation, this would call an API to manually verify the transaction
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Deposit & Transaction Monitoring</h1>
        <p className="text-muted-foreground">Track and manage all platform deposits and transactions</p>
      </div>

      {/* Filter and search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by wallet or transaction hash..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>

      {/* Transaction type tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="deposits">Deposits</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Transaction metrics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Deposits (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$78,500</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 font-medium">+12%</span>
              <ArrowUp className="h-3 w-3 text-green-500 ml-1" />
              <span className="text-xs text-muted-foreground ml-2">vs. yesterday</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Withdrawals (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$23,150</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-red-500 font-medium">-5%</span>
              <ArrowDown className="h-3 w-3 text-red-500 ml-1" />
              <span className="text-xs text-muted-foreground ml-2">vs. yesterday</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Waiting for confirmations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed Transactions (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-red-500 font-medium">+3</span>
              <ArrowUp className="h-3 w-3 text-red-500 ml-1" />
              <span className="text-xs text-muted-foreground ml-2">vs. yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions ({filteredDeposits.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency/Network</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeposits.map(deposit => (
                <TableRow key={deposit.id}>
                  <TableCell>
                    {deposit.type === "deposit" ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Deposit</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Withdrawal</Badge>
                    )}
                  </TableCell>
                  <TableCell>{truncateAddress(deposit.wallet)}</TableCell>
                  <TableCell>{deposit.amount.toLocaleString()}</TableCell>
                  <TableCell>{`${deposit.currency} (${deposit.network})`}</TableCell>
                  <TableCell>
                    {deposit.status === "completed" && <Badge variant="outline" className="bg-green-500 text-white border-green-500">Completed</Badge>}
                    {deposit.status === "processing" && <Badge variant="outline" className="bg-yellow-500 text-white border-yellow-500">Processing</Badge>}
                    {deposit.status === "failed" && <Badge variant="destructive">Failed</Badge>}
                  </TableCell>
                  <TableCell>{deposit.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDeposit(deposit)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {deposit.status === "failed" && (
                          <DropdownMenuItem onClick={() => handleVerifyManually(deposit.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            Verify Manually
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transaction details */}
      {selectedDeposit && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Transaction Details</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setSelectedDeposit(null)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Transaction Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Transaction Type</p>
                    <p className="text-sm font-medium capitalize">{selectedDeposit.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Transaction Hash</p>
                    <p className="text-sm font-medium break-all">{selectedDeposit.txHash}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <div className="flex items-center">
                      {selectedDeposit.status === "completed" && <Badge variant="outline" className="bg-green-500 text-white border-green-500">Completed</Badge>}
                      {selectedDeposit.status === "processing" && <Badge variant="outline" className="bg-yellow-500 text-white border-yellow-500">Processing</Badge>}
                      {selectedDeposit.status === "failed" && <Badge variant="destructive">Failed</Badge>}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date & Time</p>
                    <p className="text-sm font-medium">{selectedDeposit.date}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Transaction Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Wallet Address</p>
                    <p className="text-sm font-medium break-all">{selectedDeposit.wallet}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="text-sm font-medium">{selectedDeposit.amount.toLocaleString()} {selectedDeposit.currency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Network</p>
                    <p className="text-sm font-medium">{selectedDeposit.network}</p>
                  </div>
                  {selectedDeposit.status === "failed" && (
                    <div className="mt-4">
                      <Button variant="outline" onClick={() => handleVerifyManually(selectedDeposit.id)} className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Verify Manually</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDepositsModule;
