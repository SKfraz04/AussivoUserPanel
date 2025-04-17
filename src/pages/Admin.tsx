
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Wallet,
  CoinsIcon,
  BadgeDollarSign,
  BarChart3,
  Vote,
  Flame,
  PackageIcon,
  LineChart,
  Bell,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const [activeModule, setActiveModule] = useState("overview");

  return (
    <div className="min-h-screen flex bg-background">
      <SidebarProvider defaultOpen>
        {/* Admin Sidebar */}
        <Sidebar className="border-r border-border">
          <SidebarHeader>
            <div className="p-4">
              <h1 className="text-xl font-bold gradient-text flex items-center">
                SVR <span className="text-foreground font-normal ml-1">Admin</span>
              </h1>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeModule === "overview"} 
                      tooltip="Dashboard"
                      onClick={() => setActiveModule("overview")}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeModule === "users"} 
                      tooltip="Users & Wallets"
                      onClick={() => setActiveModule("users")}
                    >
                      <Users className="h-4 w-4" />
                      <span>Users & Wallets</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeModule === "deposits"} 
                      tooltip="Deposits"
                      onClick={() => setActiveModule("deposits")}
                    >
                      <Wallet className="h-4 w-4" />
                      <span>Deposits & Transactions</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Configuration</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeModule === "tokens"} 
                      tooltip="Token Control"
                      onClick={() => setActiveModule("tokens")}
                    >
                      <BadgeDollarSign className="h-4 w-4" />
                      <span>Token & Package Control</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeModule === "staking"} 
                      tooltip="Staking & APY"
                      onClick={() => setActiveModule("staking")}
                    >
                      <CoinsIcon className="h-4 w-4" />
                      <span>Staking & APY Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeModule === "referrals"} 
                      tooltip="Referrals"
                      onClick={() => setActiveModule("referrals")}
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>Referrals & Leaderboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Governance</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeModule === "dao"} 
                      tooltip="DAO"
                      onClick={() => setActiveModule("dao")}
                    >
                      <Vote className="h-4 w-4" />
                      <span>Governance (DAO)</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeModule === "rewards"} 
                      tooltip="Rewards & Burns"
                      onClick={() => setActiveModule("rewards")}
                    >
                      <Flame className="h-4 w-4" />
                      <span>Rewards & Burn Control</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Reports</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeModule === "history"} 
                      tooltip="Staking History"
                      onClick={() => setActiveModule("history")}
                    >
                      <PackageIcon className="h-4 w-4" />
                      <span>Staking History & Packages</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeModule === "analytics"} 
                      tooltip="Analytics"
                      onClick={() => setActiveModule("analytics")}
                    >
                      <LineChart className="h-4 w-4" />
                      <span>Reports & Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top navigation */}
          <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border px-4 lg:px-6">
            <SidebarTrigger />
            
            <div className="w-full max-w-sm ml-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="w-full pl-8 bg-background"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium flex items-center justify-center text-white">3</span>
              </Button>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-svr-primary to-svr-secondary flex items-center justify-center text-white font-medium">
                  A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-muted-foreground">Super Admin</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {/* Overview Dashboard */}
            <Tabs defaultValue="overview" className="w-full" value={activeModule}>
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
                  <p className="text-muted-foreground">Platform overview and key metrics</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4,521</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$1,234,567</div>
                      <p className="text-xs text-muted-foreground">+22% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Stakes</CardTitle>
                      <CoinsIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,762</div>
                      <p className="text-xs text-muted-foreground">+8% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Token Price</CardTitle>
                      <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$0.105</div>
                      <p className="text-xs text-muted-foreground">+5.2% from last week</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-center gap-4 text-sm">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              {i % 3 === 0 ? <Wallet className="h-4 w-4 text-primary" /> : 
                               i % 2 === 0 ? <CoinsIcon className="h-4 w-4 text-primary" /> : 
                              <Users className="h-4 w-4 text-primary" />}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">
                                {i % 3 === 0 ? 'New Deposit' : 
                                 i % 2 === 0 ? 'New Stake' : 'New Registration'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                User {i % 3 === 0 ? 'deposited 1,000 USDT' : 
                                     i % 2 === 0 ? 'staked 5,000 SVR tokens' : 
                                    'registered with wallet 0x123...abc'}
                              </p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {i * 10} mins ago
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Right Sidebar Content */}
                  <Card>
                    <CardHeader>
                      <CardTitle>System Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="border border-red-200 bg-red-50 rounded-md p-3">
                          <div className="flex items-center">
                            <Badge variant="destructive" className="mr-2">Critical</Badge>
                            <p className="text-sm font-medium">Smart Contract Alert</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            High gas usage detected in staking contract
                          </p>
                        </div>
                        
                        <div className="border border-yellow-200 bg-yellow-50 rounded-md p-3">
                          <div className="flex items-center">
                            <Badge variant="outline" className="bg-yellow-500 text-white border-yellow-500 mr-2">Warning</Badge>
                            <p className="text-sm font-medium">Failed Transactions</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            5 failed deposits in the last hour
                          </p>
                        </div>
                        
                        <div className="border border-blue-200 bg-blue-50 rounded-md p-3">
                          <div className="flex items-center">
                            <Badge variant="outline" className="bg-blue-500 text-white border-blue-500 mr-2">Info</Badge>
                            <p className="text-sm font-medium">DAO Proposal</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            New proposal: "SVR Burn Schedule" requires review
                          </p>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium">Token Burn Tracker</h4>
                          <Badge variant="outline" className="text-xs">Live</Badge>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-svr-primary/10 to-svr-secondary/10 rounded-md">
                          <div className="bg-gradient-to-r from-svr-primary to-svr-secondary rounded-full p-2">
                            <Flame className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-bold">1,245,789 SVR</p>
                            <p className="text-xs text-muted-foreground">Total burned to date</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="users">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">User & Wallet Management</h1>
                  <p className="text-muted-foreground mb-6">Manage platform users and their wallets</p>
                  <div className="p-8 text-center">
                    <h3 className="text-muted-foreground">User management module placeholder</h3>
                    <p className="text-sm text-muted-foreground">This area would contain a table of users with search, filter, and action buttons</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="deposits">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Deposit & Transaction Monitoring</h1>
                  <p className="text-muted-foreground mb-6">Track and manage all platform deposits and transactions</p>
                  <div className="p-8 text-center">
                    <h3 className="text-muted-foreground">Transaction monitoring module placeholder</h3>
                    <p className="text-sm text-muted-foreground">This area would display transaction history with status indicators</p>
                  </div>
                </div>
              </TabsContent>

              {/* Additional tab contents would be implemented similarly */}
              <TabsContent value="tokens">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Token & Package Control</h1>
                  <p className="text-muted-foreground mb-6">Manage token pricing and staking packages</p>
                  <div className="p-8 text-center">
                    <h3 className="text-muted-foreground">Token management module placeholder</h3>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="staking">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Staking & APY Configuration</h1>
                  <p className="text-muted-foreground mb-6">Configure staking rates and APY for all packages</p>
                </div>
              </TabsContent>

              <TabsContent value="referrals">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Referral & Leaderboard System</h1>
                  <p className="text-muted-foreground mb-6">Manage referral bonuses and leaderboard settings</p>
                </div>
              </TabsContent>

              <TabsContent value="dao">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Governance (DAO)</h1>
                  <p className="text-muted-foreground mb-6">Manage platform governance and proposals</p>
                </div>
              </TabsContent>

              <TabsContent value="rewards">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Rewards & Burn Control</h1>
                  <p className="text-muted-foreground mb-6">Configure rewards distribution and token burning</p>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Staking History & Packages</h1>
                  <p className="text-muted-foreground mb-6">View and manage user staking history and packages</p>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
                  <p className="text-muted-foreground mb-6">Generate comprehensive platform reports and analytics</p>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;
