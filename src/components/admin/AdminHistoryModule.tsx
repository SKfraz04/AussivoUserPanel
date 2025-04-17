
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  PackageIcon,
  ArrowUpDown,
  Eye,
  Clock,
  Calendar
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample staking history data
const stakingHistory = [
  {
    id: "s1",
    wallet: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    packageName: "Core Validator Tier",
    amount: 500000,
    startDate: "2023-10-15",
    endDate: "2024-10-14",
    status: "active",
    apy: 9,
    earned: 7500,
    autoCompound: true
  },
  {
    id: "s2",
    wallet: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    packageName: "Edge Power Node",
    amount: 350000,
    startDate: "2023-10-01",
    endDate: "2024-03-29",
    status: "active",
    apy: 7.5,
    earned: 4375,
    autoCompound: true
  },
  {
    id: "s3",
    wallet: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    packageName: "Data Streamer",
    amount: 120000,
    startDate: "2023-09-12",
    endDate: "2023-12-11",
    status: "active",
    apy: 6.5,
    earned: 1950,
    autoCompound: false
  },
  {
    id: "s4",
    wallet: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    packageName: "Compute Booster",
    amount: 75000,
    startDate: "2023-09-05",
    endDate: "2023-11-04",
    status: "completed",
    apy: 5.5,
    earned: 1031.25,
    autoCompound: false
  },
  {
    id: "s5",
    wallet: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    packageName: "Micro Node",
    amount: 25000,
    startDate: "2023-08-18",
    endDate: "2023-09-17",
    status: "completed",
    apy: 4,
    earned: 250,
    autoCompound: false
  }
];

// Sample package upgrade data
const packageUpgrades = [
  {
    id: "u1",
    wallet: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    fromPackage: "Edge Power Node",
    toPackage: "Core Validator Tier",
    date: "2023-10-15",
    amountAdded: 150000,
    newLockPeriod: "365 days",
    bonusApplied: true
  },
  {
    id: "u2",
    wallet: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    fromPackage: "Data Streamer",
    toPackage: "Edge Power Node",
    date: "2023-10-01",
    amountAdded: 100000,
    newLockPeriod: "180 days",
    bonusApplied: true
  },
  {
    id: "u3",
    wallet: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    fromPackage: "Compute Booster",
    toPackage: "Data Streamer",
    date: "2023-09-12",
    amountAdded: 50000,
    newLockPeriod: "90 days",
    bonusApplied: false
  }
];

const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const AdminHistoryModule = () => {
  const [activeTab, setActiveTab] = useState("staking");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");
  
  const filteredStakingHistory = stakingHistory.filter(stake => {
    // Search filter
    const matchSearch = searchQuery === "" || 
                       stake.wallet.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    if (statusFilter !== "all" && stake.status !== statusFilter) return false;
    
    // Package filter
    if (packageFilter !== "all") {
      if (packageFilter === "core" && stake.packageName !== "Core Validator Tier") return false;
      if (packageFilter === "edge" && stake.packageName !== "Edge Power Node") return false;
      if (packageFilter === "data" && stake.packageName !== "Data Streamer") return false;
      if (packageFilter === "compute" && stake.packageName !== "Compute Booster") return false;
      if (packageFilter === "micro" && stake.packageName !== "Micro Node") return false;
    }
    
    return matchSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Staking History & Packages</h1>
        <p className="text-muted-foreground">View and manage user staking history and packages</p>
      </div>

      {/* Staking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Stakes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,762</div>
            <p className="text-xs text-muted-foreground mt-1">Across all packages</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Staked SVR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">225.21M</div>
            <p className="text-xs text-muted-foreground mt-1">Value: $23.65M at current price</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Lock Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127 days</div>
            <p className="text-xs text-muted-foreground mt-1">Weighted by stake amount</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Stakes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,845</div>
            <p className="text-xs text-muted-foreground mt-1">68% renewal rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by wallet address..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={packageFilter} onValueChange={setPackageFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Package" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Packages</SelectItem>
              <SelectItem value="core">Core Validator</SelectItem>
              <SelectItem value="edge">Edge Power Node</SelectItem>
              <SelectItem value="data">Data Streamer</SelectItem>
              <SelectItem value="compute">Compute Booster</SelectItem>
              <SelectItem value="micro">Micro Node</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
          
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>

      {/* Staking History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Staking History</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant={activeTab === "staking" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveTab("staking")}
            >
              Stakes
            </Button>
            <Button 
              variant={activeTab === "upgrades" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveTab("upgrades")}
            >
              Package Upgrades
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === "staking" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Wallet</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>APY</TableHead>
                  <TableHead>Earned</TableHead>
                  <TableHead>Auto Compound</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStakingHistory.map(stake => (
                  <TableRow key={stake.id}>
                    <TableCell>{truncateAddress(stake.wallet)}</TableCell>
                    <TableCell>{stake.packageName}</TableCell>
                    <TableCell>{stake.amount.toLocaleString()} SVR</TableCell>
                    <TableCell>
                      {stake.status === "active" ? (
                        <Badge variant="outline" className="bg-green-500 text-white border-green-500">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-500 text-white border-gray-500">Completed</Badge>
                      )}
                    </TableCell>
                    <TableCell>{stake.startDate}</TableCell>
                    <TableCell>{stake.endDate}</TableCell>
                    <TableCell>{stake.apy}%</TableCell>
                    <TableCell>{stake.earned.toLocaleString()} SVR</TableCell>
                    <TableCell>
                      {stake.autoCompound ? (
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Enabled</Badge>
                      ) : (
                        <Badge variant="outline">Disabled</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Wallet</TableHead>
                  <TableHead>Upgrade</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount Added</TableHead>
                  <TableHead>New Lock Period</TableHead>
                  <TableHead>Bonus Applied</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packageUpgrades.map(upgrade => (
                  <TableRow key={upgrade.id}>
                    <TableCell>{truncateAddress(upgrade.wallet)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span>{upgrade.fromPackage}</span>
                        <ArrowUpDown className="h-4 w-4 mx-2" />
                        <span className="font-medium">{upgrade.toPackage}</span>
                      </div>
                    </TableCell>
                    <TableCell>{upgrade.date}</TableCell>
                    <TableCell>{upgrade.amountAdded.toLocaleString()} SVR</TableCell>
                    <TableCell className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {upgrade.newLockPeriod}
                    </TableCell>
                    <TableCell>
                      {upgrade.bonusApplied ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Yes</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Package Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Package Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-muted rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Micro Node</h3>
                <Badge variant="outline">4% APY</Badge>
              </div>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">Active users</p>
              <div className="mt-2">
                <div className="text-sm font-medium">12.45M SVR</div>
                <p className="text-xs text-muted-foreground">Total staked</p>
              </div>
            </div>
            
            <div className="bg-muted rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Compute Booster</h3>
                <Badge variant="outline">5.5% APY</Badge>
              </div>
              <div className="text-2xl font-bold">876</div>
              <p className="text-xs text-muted-foreground">Active users</p>
              <div className="mt-2">
                <div className="text-sm font-medium">65.78M SVR</div>
                <p className="text-xs text-muted-foreground">Total staked</p>
              </div>
            </div>
            
            <div className="bg-muted rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Data Streamer</h3>
                <Badge variant="outline">6.5% APY</Badge>
              </div>
              <div className="text-2xl font-bold">542</div>
              <p className="text-xs text-muted-foreground">Active users</p>
              <div className="mt-2">
                <div className="text-sm font-medium">108.45M SVR</div>
                <p className="text-xs text-muted-foreground">Total staked</p>
              </div>
            </div>
            
            <div className="bg-muted rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Edge Power Node</h3>
                <Badge variant="outline">7.5% APY</Badge>
              </div>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">Active users</p>
              <div className="mt-2">
                <div className="text-sm font-medium">35.68M SVR</div>
                <p className="text-xs text-muted-foreground">Total staked</p>
              </div>
            </div>
            
            <div className="bg-muted rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Core Validator</h3>
                <Badge variant="outline">9% APY</Badge>
              </div>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Active users</p>
              <div className="mt-2">
                <div className="text-sm font-medium">3.85M SVR</div>
                <p className="text-xs text-muted-foreground">Total staked</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHistoryModule;
