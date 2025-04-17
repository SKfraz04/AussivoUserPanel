
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CoinsIcon,
  Percent,
  Clock,
  AlertCircle,
  Check,
  Settings,
  BarChart3,
  Save,
  RefreshCcw,
  Calendar
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Sample APY configuration data
const stakingPackages = [
  {
    id: "micro",
    name: "Micro Node",
    currentApy: 4,
    proposedApy: 4,
    lockPeriod: 30,
    autoCompound: false,
    earlyExitFee: 10,
    rewardDistribution: "monthly",
    totalUsers: 1248,
    totalStaked: 12450000,
  },
  {
    id: "compute",
    name: "Compute Booster",
    currentApy: 5.5,
    proposedApy: 5.5,
    lockPeriod: 60,
    autoCompound: true,
    earlyExitFee: 15,
    rewardDistribution: "monthly",
    totalUsers: 876,
    totalStaked: 65780000,
  },
  {
    id: "data",
    name: "Data Streamer",
    currentApy: 6.5,
    proposedApy: 6.5,
    lockPeriod: 90,
    autoCompound: true,
    earlyExitFee: 20,
    rewardDistribution: "monthly",
    totalUsers: 542,
    totalStaked: 108450000,
  },
  {
    id: "edge",
    name: "Edge Power Node",
    currentApy: 7.5,
    proposedApy: 7.5,
    lockPeriod: 180,
    autoCompound: true,
    earlyExitFee: 25,
    rewardDistribution: "monthly",
    totalUsers: 89,
    totalStaked: 35680000,
  },
  {
    id: "core",
    name: "Core Validator Tier",
    currentApy: 9,
    proposedApy: 9,
    lockPeriod: 365,
    autoCompound: true,
    earlyExitFee: 30,
    rewardDistribution: "monthly",
    totalUsers: 7,
    totalStaked: 3850000,
  }
];

const AdminStakingModule = () => {
  const [editMode, setEditMode] = useState(false);
  const [packages, setPackages] = useState(stakingPackages);
  const [distributionFrequency, setDistributionFrequency] = useState("monthly");
  const [rewardsPool, setRewardsPool] = useState(25000000);
  
  const totalRewardsRequired = packages.reduce((acc, pkg) => {
    const annualRewards = (pkg.totalStaked * pkg.currentApy) / 100;
    return acc + annualRewards;
  }, 0);

  const poolSufficiency = (rewardsPool / totalRewardsRequired) * 100;
  
  const handleSaveChanges = () => {
    setEditMode(false);
    // In a real implementation, this would call an API to save the changes
    console.log("Saving APY changes");
  };

  const handleApyChange = (packageId: string, newApy: number) => {
    setPackages(prevPackages => 
      prevPackages.map(pkg => 
        pkg.id === packageId ? { ...pkg, proposedApy: newApy } : pkg
      )
    );
  };

  const handleToggleAutoCompound = (packageId: string, enabled: boolean) => {
    setPackages(prevPackages => 
      prevPackages.map(pkg => 
        pkg.id === packageId ? { ...pkg, autoCompound: enabled } : pkg
      )
    );
  };

  const handleLockPeriodChange = (packageId: string, days: string) => {
    const daysNumber = parseInt(days, 10);
    setPackages(prevPackages => 
      prevPackages.map(pkg => 
        pkg.id === packageId ? { ...pkg, lockPeriod: daysNumber } : pkg
      )
    );
  };

  const handleEarlyExitFeeChange = (packageId: string, fee: string) => {
    const feeNumber = parseInt(fee, 10);
    setPackages(prevPackages => 
      prevPackages.map(pkg => 
        pkg.id === packageId ? { ...pkg, earlyExitFee: feeNumber } : pkg
      )
    );
  };

  const handleUpdateRewardsPool = () => {
    console.log(`Updating rewards pool to ${rewardsPool}`);
    // In a real implementation, this would call an API
  };

  const calculateMonthlyRewards = (totalStaked: number, apy: number) => {
    const annualReward = (totalStaked * apy) / 100;
    return (annualReward / 12).toLocaleString(undefined, {maximumFractionDigits: 0});
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Staking & APY Configuration</h1>
        <p className="text-muted-foreground">Configure staking rates and APY for all packages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
              <Percent className="h-4 w-4 mr-2" />
              Average APY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.5%</div>
            <p className="text-xs text-muted-foreground mt-1">Weighted by stake amount</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
              <CoinsIcon className="h-4 w-4 mr-2" />
              Total Staked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(packages.reduce((acc, pkg) => acc + pkg.totalStaked, 0) / 1_000_000).toFixed(2)}M SVR
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all packages</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              Next Reward Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Days</div>
            <p className="text-xs text-muted-foreground mt-1">December 1, 2023</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Auto-Compound Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground mt-1">Of stakes use auto-compound</p>
          </CardContent>
        </Card>
      </div>

      {/* Reward Pool Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CoinsIcon className="h-5 w-5 mr-2" />
            Rewards Pool Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rewards-pool">Rewards Pool (SVR Tokens)</Label>
                  <Input 
                    id="rewards-pool" 
                    value={rewardsPool.toString()} 
                    onChange={(e) => setRewardsPool(parseInt(e.target.value) || 0)} 
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="distribution-frequency">Reward Distribution Frequency</Label>
                  <Select 
                    value={distributionFrequency}
                    onValueChange={setDistributionFrequency}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleUpdateRewardsPool}>Update Rewards Pool</Button>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-md space-y-4">
              <div>
                <p className="text-sm font-medium">Rewards Pool Status</p>
                <p className="text-sm text-muted-foreground">
                  Current rewards pool contains enough SVR tokens to maintain current APYs for:
                </p>
                <p className="text-xl font-bold mt-2">
                  ~{(rewardsPool / (totalRewardsRequired / 12)).toFixed(1)} months
                </p>
              </div>
              
              <div>
                <p className="text-sm">Annual Rewards Required</p>
                <p className="text-lg font-semibold">{totalRewardsRequired.toLocaleString()} SVR</p>
              </div>
              
              <div>
                <p className="text-sm">Pool Sufficiency</p>
                <div className="mt-1">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${poolSufficiency > 75 ? 'bg-green-500' : poolSufficiency > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(poolSufficiency, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{poolSufficiency.toFixed(1)}% of annual requirement</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* APY Configuration */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>APY Configuration</CardTitle>
          {!editMode ? (
            <Button onClick={() => setEditMode(true)} className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Edit APY Settings
            </Button>
          ) : (
            <Button onClick={handleSaveChanges} className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package</TableHead>
                <TableHead>Current APY</TableHead>
                {editMode && <TableHead>New APY</TableHead>}
                <TableHead>Lock Period</TableHead>
                <TableHead>Auto Compound</TableHead>
                <TableHead>Early Exit Fee</TableHead>
                <TableHead>Monthly Rewards</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map(pkg => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {pkg.currentApy}%
                    </Badge>
                  </TableCell>
                  {editMode && (
                    <TableCell>
                      <Input 
                        type="number" 
                        min="0.1" 
                        max="30" 
                        step="0.1" 
                        value={pkg.proposedApy} 
                        onChange={(e) => handleApyChange(pkg.id, parseFloat(e.target.value))} 
                        className="w-20"
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    {editMode ? (
                      <Select 
                        value={pkg.lockPeriod.toString()} 
                        onValueChange={(value) => handleLockPeriodChange(pkg.id, value)}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30d</SelectItem>
                          <SelectItem value="60">60d</SelectItem>
                          <SelectItem value="90">90d</SelectItem>
                          <SelectItem value="180">180d</SelectItem>
                          <SelectItem value="365">365d</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {pkg.lockPeriod} days
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode ? (
                      <Switch 
                        checked={pkg.autoCompound} 
                        onCheckedChange={(checked) => handleToggleAutoCompound(pkg.id, checked)} 
                      />
                    ) : (
                      pkg.autoCompound ? (
                        <Badge variant="outline" className="bg-green-500 text-white border-green-500">
                          <Check className="h-3 w-3 mr-1" /> Enabled
                        </Badge>
                      ) : (
                        <Badge variant="outline">Disabled</Badge>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode ? (
                      <Input 
                        type="number" 
                        min="0" 
                        max="100" 
                        value={pkg.earlyExitFee} 
                        onChange={(e) => handleEarlyExitFeeChange(pkg.id, e.target.value)} 
                        className="w-20"
                      />
                    ) : (
                      `${pkg.earlyExitFee}%`
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CoinsIcon className="h-3 w-3 mr-1" />
                      {calculateMonthlyRewards(pkg.totalStaked, pkg.currentApy)} SVR
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-amber-800 font-medium">APY Changes Notice</p>
              <p className="text-amber-700 mt-1">
                Changes to APY rates will affect all <strong>new stakes</strong> and <strong>renewed stakes</strong> after the changes are applied.
                Existing stakes will continue with their current APY until their lock period ends.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reward Distribution Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Reward Distribution Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <p className="font-medium">Monthly Distribution</p>
                <p className="text-sm text-muted-foreground">December 1, 2023</p>
              </div>
              <div>
                <p className="font-medium text-right">1,875,500 SVR</p>
                <p className="text-sm text-muted-foreground text-right">Estimated distribution</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <p className="font-medium">Monthly Distribution</p>
                <p className="text-sm text-muted-foreground">January 1, 2024</p>
              </div>
              <div>
                <p className="font-medium text-right">1,890,000 SVR</p>
                <p className="text-sm text-muted-foreground text-right">Estimated distribution</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <p className="font-medium">Monthly Distribution</p>
                <p className="text-sm text-muted-foreground">February 1, 2024</p>
              </div>
              <div>
                <p className="font-medium text-right">1,905,000 SVR</p>
                <p className="text-sm text-muted-foreground text-right">Estimated distribution</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStakingModule;
