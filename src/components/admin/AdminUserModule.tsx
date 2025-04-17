
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
  UserCog, 
  Wallet,
  Edit,
  AlertTriangle,
  MoreHorizontal,
  Eye
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

// Sample user data
const sampleUsers = [
  {
    id: "u1",
    wallet: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    status: "active",
    referralLevel: "platinum",
    staking: "Core Validator Tier",
    registeredDate: "2023-11-02",
    lastActive: "2023-11-25",
    balances: {
      usdt_bep20: 25000,
      usdt_trc20: 12500,
      sui: 7850,
      svr_staked: 250000,
      svr_available: 15000
    }
  },
  {
    id: "u2",
    wallet: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    status: "active",
    referralLevel: "gold",
    staking: "Edge Power Node",
    registeredDate: "2023-10-15",
    lastActive: "2023-11-24",
    balances: {
      usdt_bep20: 8500,
      usdt_trc20: 0,
      sui: 2300,
      svr_staked: 120000,
      svr_available: 8500
    }
  },
  {
    id: "u3",
    wallet: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    status: "suspended",
    referralLevel: "silver",
    staking: "Data Streamer",
    registeredDate: "2023-09-28",
    lastActive: "2023-11-20",
    balances: {
      usdt_bep20: 3000,
      usdt_trc20: 5000,
      sui: 1200,
      svr_staked: 75000,
      svr_available: 2500
    }
  },
  {
    id: "u4",
    wallet: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    status: "active",
    referralLevel: "bronze",
    staking: "Compute Booster",
    registeredDate: "2023-11-10",
    lastActive: "2023-11-22",
    balances: {
      usdt_bep20: 1200,
      usdt_trc20: 850,
      sui: 500,
      svr_staked: 35000,
      svr_available: 1800
    }
  },
  {
    id: "u5",
    wallet: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    status: "terminated",
    referralLevel: "standard",
    staking: "Micro Node",
    registeredDate: "2023-08-15",
    lastActive: "2023-10-28",
    balances: {
      usdt_bep20: 0,
      usdt_trc20: 0,
      sui: 0,
      svr_staked: 0,
      svr_available: 0
    }
  }
];

const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const AdminUserModule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Filter users based on search and tab
  const filteredUsers = sampleUsers.filter(user => {
    // Search filter
    const matchSearch = searchQuery === "" || 
                        user.wallet.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.referralLevel.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    if (activeTab === "all") return matchSearch;
    if (activeTab === "active") return user.status === "active" && matchSearch;
    if (activeTab === "suspended") return user.status === "suspended" && matchSearch;
    if (activeTab === "terminated") return user.status === "terminated" && matchSearch;
    
    return matchSearch;
  });

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
  };

  const handleSuspendUser = (userId: string) => {
    console.log(`Suspending user: ${userId}`);
    // In a real implementation, this would call an API to suspend the user
  };

  const handleTerminateUser = (userId: string) => {
    console.log(`Terminating user: ${userId}`);
    // In a real implementation, this would call an API to terminate the user
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User & Wallet Management</h1>
        <p className="text-muted-foreground">Manage platform users and their wallets</p>
      </div>

      {/* Search and filter options */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by wallet or referral level..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>

      {/* Tabs for filtering users by status */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
          <TabsTrigger value="terminated">Terminated</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* User table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Referral Level</TableHead>
                <TableHead>Staking Package</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{truncateAddress(user.wallet)}</TableCell>
                  <TableCell>
                    {user.status === "active" && <Badge variant="outline" className="bg-green-500 text-white border-green-500">Active</Badge>}
                    {user.status === "suspended" && <Badge variant="outline" className="bg-yellow-500 text-white border-yellow-500">Suspended</Badge>}
                    {user.status === "terminated" && <Badge variant="destructive">Terminated</Badge>}
                  </TableCell>
                  <TableCell className="capitalize">{user.referralLevel}</TableCell>
                  <TableCell>{user.staking}</TableCell>
                  <TableCell>{user.registeredDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewUser(user)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCog className="h-4 w-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Wallet className="h-4 w-4 mr-2" />
                          Adjust Wallet
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status !== "suspended" && (
                          <DropdownMenuItem onClick={() => handleSuspendUser(user.id)} className="text-yellow-600">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                        )}
                        {user.status !== "terminated" && (
                          <DropdownMenuItem onClick={() => handleTerminateUser(user.id)} className="text-red-600">
                            <X className="h-4 w-4 mr-2" />
                            Terminate User
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

      {/* User details panel */}
      {selectedUser && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>User Details</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setSelectedUser(null)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">User Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Wallet Address</p>
                    <p className="text-sm font-medium">{selectedUser.wallet}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <div className="flex items-center">
                      {selectedUser.status === "active" && <Badge variant="outline" className="bg-green-500 text-white border-green-500">Active</Badge>}
                      {selectedUser.status === "suspended" && <Badge variant="outline" className="bg-yellow-500 text-white border-yellow-500">Suspended</Badge>}
                      {selectedUser.status === "terminated" && <Badge variant="destructive">Terminated</Badge>}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Referral Level</p>
                    <p className="text-sm font-medium capitalize">{selectedUser.referralLevel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Staking Package</p>
                    <p className="text-sm font-medium">{selectedUser.staking}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Registration Date</p>
                    <p className="text-sm font-medium">{selectedUser.registeredDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Active</p>
                    <p className="text-sm font-medium">{selectedUser.lastActive}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Wallet Balances</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">USDT (BEP20)</p>
                    <p className="text-sm font-medium">${selectedUser.balances.usdt_bep20.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">USDT (TRC20)</p>
                    <p className="text-sm font-medium">${selectedUser.balances.usdt_trc20.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">SUI</p>
                    <p className="text-sm font-medium">{selectedUser.balances.sui.toLocaleString()} SUI</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">SVR (Staked)</p>
                    <p className="text-sm font-medium">{selectedUser.balances.svr_staked.toLocaleString()} SVR</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">SVR (Available)</p>
                    <p className="text-sm font-medium">{selectedUser.balances.svr_available.toLocaleString()} SVR</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminUserModule;
