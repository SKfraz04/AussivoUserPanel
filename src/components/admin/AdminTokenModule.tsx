
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Edit, 
  Plus, 
  Save,
  PackageIcon,
  BadgeDollarSign,
  Clock,
  Percent,
  AlertCircle,
  Check,
  Eye
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Sample token price data
const tokenPrices = [
  { 
    id: "phase1", 
    phase: "Phase 1", 
    price: 0.003, 
    status: "completed", 
    duration: "30 days",
    startDate: "2023-09-01",
    endDate: "2023-09-30",
    allocationSold: "100%",
    totalRaised: "$1,500,000"
  },
  { 
    id: "phase2", 
    phase: "Phase 2", 
    price: 0.005, 
    status: "active", 
    duration: "45 days",
    startDate: "2023-10-01",
    endDate: "2023-11-15",
    allocationSold: "68%",
    totalRaised: "$2,550,000"
  },
  { 
    id: "phase3", 
    phase: "Phase 3", 
    price: 0.008, 
    status: "upcoming", 
    duration: "60 days",
    startDate: "2023-11-16",
    endDate: "2024-01-15",
    allocationSold: "0%",
    totalRaised: "$0"
  }
];

// Sample staking packages
const stakingPackages = [
  {
    id: "micro",
    name: "Micro Node",
    minStake: 10000,
    maxStake: 50000,
    apy: 4,
    lockPeriod: 30,
    status: "active",
    autoCompound: false,
    earlyExitFee: 10,
    totalUsers: 1248,
    totalStaked: "12,450,000",
  },
  {
    id: "compute",
    name: "Compute Booster",
    minStake: 50000,
    maxStake: 100000,
    apy: 5.5,
    lockPeriod: 60,
    status: "active",
    autoCompound: true,
    earlyExitFee: 15,
    totalUsers: 876,
    totalStaked: "65,780,000",
  },
  {
    id: "data",
    name: "Data Streamer",
    minStake: 100000,
    maxStake: 250000,
    apy: 6.5,
    lockPeriod: 90,
    status: "active",
    autoCompound: true,
    earlyExitFee: 20,
    totalUsers: 542,
    totalStaked: "108,450,000",
  },
  {
    id: "edge",
    name: "Edge Power Node",
    minStake: 250000,
    maxStake: 500000,
    apy: 7.5,
    lockPeriod: 180,
    status: "active",
    autoCompound: true,
    earlyExitFee: 25,
    totalUsers: 89,
    totalStaked: "35,680,000",
  },
  {
    id: "core",
    name: "Core Validator Tier",
    minStake: 500000,
    maxStake: null,
    apy: 9,
    lockPeriod: 365,
    status: "active",
    autoCompound: true,
    earlyExitFee: 30,
    totalUsers: 7,
    totalStaked: "3,850,000",
  }
];

const AdminTokenModule = () => {
  const [activeTab, setActiveTab] = useState("token-price");
  const [editingPhase, setEditingPhase] = useState<string | null>(null);
  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  const [tokenPrice, setTokenPrice] = useState("0.005");
  const [discountedSlots, setDiscountedSlots] = useState(true);

  const handleTokenPriceUpdate = () => {
    console.log(`Updating token price to $${tokenPrice}`);
    // In a real implementation, this would call an API to update the token price
  };

  const handleTogglePackageStatus = (packageId: string, newStatus: boolean) => {
    console.log(`Toggling package ${packageId} status to ${newStatus ? 'active' : 'inactive'}`);
    // In a real implementation, this would call an API to toggle the package status
  };

  const handleEditPhase = (phaseId: string) => {
    setEditingPhase(phaseId);
  };

  const handleSavePhase = () => {
    console.log("Saving phase changes");
    setEditingPhase(null);
    // In a real implementation, this would call an API to save the phase changes
  };

  const handleEditPackage = (packageId: string) => {
    setEditingPackage(packageId);
  };

  const handleSavePackage = () => {
    console.log("Saving package changes");
    setEditingPackage(null);
    // In a real implementation, this would call an API to save the package changes
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Token & Package Control</h1>
        <p className="text-muted-foreground">Manage token pricing and staking packages</p>
      </div>

      <Tabs defaultValue="token-price" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="token-price">Token Price Management</TabsTrigger>
          <TabsTrigger value="staking-packages">Staking Packages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="token-price" className="space-y-6 mt-6">
          {/* Current Token Price Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BadgeDollarSign className="h-5 w-5 mr-2" />
                Current Token Price (Phase 2)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="token-price">Token Price (USD)</Label>
                    <div className="flex items-center mt-1">
                      <span className="text-sm font-medium mr-2">$</span>
                      <Input 
                        id="token-price" 
                        value={tokenPrice} 
                        onChange={(e) => setTokenPrice(e.target.value)} 
                        className="max-w-[150px]"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="discounted-slots" 
                      checked={discountedSlots} 
                      onCheckedChange={setDiscountedSlots}
                    />
                    <Label htmlFor="discounted-slots">Enable discounted slots</Label>
                  </div>

                  <Button onClick={handleTokenPriceUpdate} className="mt-4">Update Token Price</Button>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Phase 2 Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Date:</span>
                      <span>October 1, 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End Date:</span>
                      <span>November 15, 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Allocation Sold:</span>
                      <span>68%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Raised:</span>
                      <span>$2,550,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tokens Sold:</span>
                      <span>510,000,000 SVR</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ICO Phases Table */}
          <Card>
            <CardHeader>
              <CardTitle>ICO Phases</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Phase</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Allocation Sold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokenPrices.map(phase => (
                    <TableRow key={phase.id}>
                      <TableCell>{phase.phase}</TableCell>
                      <TableCell>${phase.price}</TableCell>
                      <TableCell>{phase.duration}</TableCell>
                      <TableCell>
                        {phase.startDate} to {phase.endDate}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden mr-2">
                            <div 
                              className={`h-full ${phase.status === "completed" ? "bg-green-500" : "bg-blue-500"}`}
                              style={{ width: phase.allocationSold }}
                            ></div>
                          </div>
                          <span className="text-xs">{phase.allocationSold}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {phase.status === "completed" && <Badge variant="outline" className="bg-green-500 text-white border-green-500">Completed</Badge>}
                        {phase.status === "active" && <Badge variant="outline" className="bg-blue-500 text-white border-blue-500">Active</Badge>}
                        {phase.status === "upcoming" && <Badge variant="outline">Upcoming</Badge>}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditPhase(phase.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Manual Token Allocation */}
          <Card>
            <CardHeader>
              <CardTitle>Manual Token Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="wallet-address">Wallet Address</Label>
                  <Input id="wallet-address" placeholder="0x..." className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="token-amount">Token Amount</Label>
                  <Input id="token-amount" placeholder="10000" className="mt-1" />
                </div>
                <div className="flex items-end">
                  <Button className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" /> 
                    Allocate Tokens
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4 inline-block mr-1" />
                Use this feature for promotional events or community rewards only.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staking-packages" className="space-y-6 mt-6">
          {/* Staking Packages Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PackageIcon className="h-5 w-5 mr-2" />
                Staking Packages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Package</TableHead>
                      <TableHead>Min-Max Stake</TableHead>
                      <TableHead>APY</TableHead>
                      <TableHead>Lock Period</TableHead>
                      <TableHead>Auto Compound</TableHead>
                      <TableHead>Total Staked</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stakingPackages.map(pkg => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-medium">{pkg.name}</TableCell>
                        <TableCell>
                          {pkg.minStake.toLocaleString()} - {pkg.maxStake ? pkg.maxStake.toLocaleString() : '∞'} SVR
                        </TableCell>
                        <TableCell className="flex items-center">
                          <Percent className="h-3 w-3 mr-1" />
                          {pkg.apy}%
                        </TableCell>
                        <TableCell className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {pkg.lockPeriod} days
                        </TableCell>
                        <TableCell>
                          {pkg.autoCompound ? (
                            <Badge variant="outline" className="bg-green-500 text-white border-green-500">
                              <Check className="h-3 w-3 mr-1" /> Enabled
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              Disabled
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{pkg.totalStaked} SVR</TableCell>
                        <TableCell>
                          <Switch 
                            checked={pkg.status === "active"} 
                            onCheckedChange={(checked) => handleTogglePackageStatus(pkg.id, checked)} 
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditPackage(pkg.id)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between">
                <Button variant="outline" className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Package
                </Button>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Total staked across all packages: <strong>225,210,000 SVR</strong></span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package Statistics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Total Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground mt-1">From Micro Node to Core Validator</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,762</div>
                <p className="text-xs text-muted-foreground mt-1">Active stakers across all packages</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Average APY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.5%</div>
                <p className="text-xs text-muted-foreground mt-1">Weighted by stake amount</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTokenModule;
