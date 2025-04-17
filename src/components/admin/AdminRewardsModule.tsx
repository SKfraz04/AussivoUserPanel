
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Flame, 
  CoinsIcon, 
  TrendingDown,
  BarChart3,
  Calendar,
  Settings,
  Save,
  Play,
  AlertCircle,
  BarChart
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample burn data
const burnHistory = [
  {
    id: "b1",
    date: "2023-11-15",
    amount: 1500000,
    type: "scheduled",
    txHash: "0xb58b964331de7c90364ed7e2e923227ea8f3696d386e6e05f101796491e4892a"
  },
  {
    id: "b2",
    date: "2023-10-15",
    amount: 1450000,
    type: "scheduled",
    txHash: "0x3a7a1c36e5fdd268164361a9058866b59ed927d829c5e13a94b865a8700cd122"
  },
  {
    id: "b3",
    date: "2023-10-02",
    amount: 500000,
    type: "manual",
    txHash: "0xf683734b385421a1b95d58a293c2f7b0318ef7e48ff4e9fa64800afff9121424",
    reason: "Community vote"
  },
  {
    id: "b4",
    date: "2023-09-15",
    amount: 1400000,
    type: "scheduled",
    txHash: "0x7f5a99d17d9b97fbd540f33a8bb1c1b9efbdc8a7e3aa396b5f582d3387d56002"
  }
];

// Sample reward distribution data
const rewardDistributions = [
  {
    id: "d1",
    date: "2023-11-01",
    totalAmount: 1875500,
    recipients: 2538,
    type: "staking",
    status: "completed"
  },
  {
    id: "d2",
    date: "2023-10-25",
    totalAmount: 85000,
    recipients: 10,
    type: "referral",
    status: "completed"
  },
  {
    id: "d3",
    date: "2023-10-01",
    totalAmount: 1850000,
    recipients: 2471,
    type: "staking",
    status: "completed"
  },
  {
    id: "d4",
    date: "2023-09-25",
    totalAmount: 82000,
    recipients: 10,
    type: "referral",
    status: "completed"
  }
];

const truncateHash = (hash: string) => {
  if (!hash) return '';
  return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
};

const AdminRewardsModule = () => {
  const [activeTab, setActiveTab] = useState("rewards");
  const [autoBuybackEnabled, setAutoBuybackEnabled] = useState(true);
  const [buybackRate, setBuybackRate] = useState(5);
  const [burnAmount, setBurnAmount] = useState("");
  
  const handleManualBurn = () => {
    console.log(`Manual burn of ${burnAmount} SVR tokens`);
    // In a real implementation, this would call an API to execute a manual burn
  };

  const handleToggleAutoBuyback = (enabled: boolean) => {
    setAutoBuybackEnabled(enabled);
    console.log(`Auto-buyback ${enabled ? 'enabled' : 'disabled'}`);
    // In a real implementation, this would call an API to toggle auto-buyback
  };

  const handleUpdateBuybackRate = () => {
    console.log(`Updating buyback rate to ${buybackRate}%`);
    // In a real implementation, this would call an API to update the buyback rate
  };

  const handleDistributeRewards = () => {
    console.log(`Manually triggering reward distribution`);
    // In a real implementation, this would call an API to distribute rewards
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rewards & Burn Control</h1>
        <p className="text-muted-foreground">Configure rewards distribution and token burning</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="rewards">Rewards Distribution</TabsTrigger>
          <TabsTrigger value="burn">Token Burn & Buyback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rewards" className="space-y-6 mt-6">
          {/* Rewards Distribution Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  <div className="flex items-center">
                    <CoinsIcon className="h-4 w-4 mr-2" />
                    Next Distribution
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">December 1, 2023</div>
                <div className="text-sm mt-1">Estimated: 1,890,000 SVR</div>
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="flex items-center" onClick={handleDistributeRewards}>
                    <Play className="h-4 w-4 mr-1" />
                    Distribute Now
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  <div className="flex items-center">
                    <BarChart className="h-4 w-4 mr-2" />
                    Monthly Rewards Growth
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+1.2%</div>
                <div className="text-sm mt-1">Vs. previous month</div>
                <div className="h-10 flex items-center gap-1 mt-2">
                  <div className="h-8 w-3 bg-blue-200 rounded"></div>
                  <div className="h-6 w-3 bg-blue-300 rounded"></div>
                  <div className="h-10 w-3 bg-blue-400 rounded"></div>
                  <div className="h-7 w-3 bg-blue-500 rounded"></div>
                  <div className="h-9 w-3 bg-blue-600 rounded"></div>
                  <div className="h-10 w-3 bg-blue-700 rounded"></div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  <div className="flex items-center">
                    <CoinsIcon className="h-4 w-4 mr-2" />
                    Total Rewards Distributed
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.6M SVR</div>
                <div className="text-sm mt-1">Since platform launch</div>
              </CardContent>
            </Card>
          </div>

          {/* Reward Distribution Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Reward Distribution Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="distribution-frequency">Distribution Frequency</Label>
                    <select 
                      id="distribution-frequency" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="staking-rewards">Staking Rewards Pool</Label>
                    <Input 
                      id="staking-rewards" 
                      defaultValue="25000000"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">SVR tokens allocated for staking rewards</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="referral-rewards">Referral Rewards Pool</Label>
                    <Input 
                      id="referral-rewards" 
                      defaultValue="5000000"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">SVR tokens allocated for referral rewards</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-compound" defaultChecked />
                    <Label htmlFor="auto-compound">Enable auto-compound for eligible packages</Label>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md space-y-4">
                  <h3 className="font-medium">Reward Distribution Breakdown</h3>
                  
                  <div>
                    <label className="text-sm">Staking Rewards (82%)</label>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm">Referral Bonuses (15%)</label>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm">Community Rewards (3%)</label>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '3%' }}></div>
                    </div>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div>
                    <label className="text-sm">Next Staking Distribution</label>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">1,890,000 SVR</span>
                      <span className="text-xs text-muted-foreground">December 1, 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Distributions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Distributions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Distribution Type</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewardDistributions.map(dist => (
                    <TableRow key={dist.id}>
                      <TableCell>{dist.date}</TableCell>
                      <TableCell className="capitalize">
                        {dist.type === "staking" ? (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            Staking Rewards
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Referral Rewards
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {dist.totalAmount.toLocaleString()} SVR
                      </TableCell>
                      <TableCell>{dist.recipients.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500 text-white border-green-500">
                          Completed
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="burn" className="space-y-6 mt-6">
          {/* Token Burn Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  <div className="flex items-center">
                    <Flame className="h-4 w-4 mr-2" />
                    Total SVR Burned
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,850,000 SVR</div>
                <div className="text-sm mt-1">2.43% of total supply</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next Scheduled Burn
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">December 15, 2023</div>
                <div className="text-sm mt-1">Estimated: 1,550,000 SVR</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  <div className="flex items-center">
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Supply Reduction Impact
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+0.022 USD</div>
                <div className="text-sm mt-1">Estimated price impact per burn</div>
              </CardContent>
            </Card>
          </div>

          {/* Burn & Buyback Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Buy-Back & Burn Mechanism</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="auto-buyback" 
                      checked={autoBuybackEnabled} 
                      onCheckedChange={handleToggleAutoBuyback}
                    />
                    <Label htmlFor="auto-buyback">Enable auto-buyback & burn</Label>
                  </div>
                  
                  <div>
                    <Label htmlFor="buyback-rate">Platform Revenue Percentage for Buy-Back</Label>
                    <div className="flex items-center mt-1 gap-4">
                      <Input 
                        id="buyback-rate" 
                        type="number" 
                        min="1" 
                        max="30" 
                        value={buybackRate}
                        onChange={(e) => setBuybackRate(parseInt(e.target.value))} 
                        className="w-20"
                      />
                      <span>%</span>
                      
                      <Button onClick={handleUpdateBuybackRate}>Update Rate</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Percentage of platform revenue used for token buy-back and burn
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-amber-700">
                        Auto-buyback automatically uses a percentage of platform revenue to purchase SVR tokens from the
                        market and burn them, reducing total supply and potentially increasing token value.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-1">Buy-Back Schedule:</h4>
                    <p className="text-sm">Monthly, on the 15th of each month</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Last Auto-Buyback:</h4>
                    <p className="text-sm">November 15, 2023 - 1,500,000 SVR burned</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manual Token Burn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="burn-amount">Amount to Burn</Label>
                    <div className="flex mt-1 gap-2">
                      <Input 
                        id="burn-amount"
                        placeholder="Enter SVR amount" 
                        value={burnAmount}
                        onChange={(e) => setBurnAmount(e.target.value)}
                      />
                      <Button 
                        onClick={handleManualBurn}
                        className="flex items-center"
                        variant="destructive"
                      >
                        <Flame className="h-4 w-4 mr-2" />
                        Burn Tokens
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Permanently remove tokens from circulation
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-sm mb-2">Treasury Balance</h4>
                    <div className="flex justify-between">
                      <span>Available for burn:</span>
                      <span className="font-medium">3,500,000 SVR</span>
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-red-700 font-medium">WARNING</p>
                      <p className="text-red-700 mt-1">
                        Token burns are irreversible. Please double check the amount before proceeding.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Burn History */}
          <Card>
            <CardHeader>
              <CardTitle>Burn History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Transaction Hash</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {burnHistory.map(burn => (
                    <TableRow key={burn.id}>
                      <TableCell>{burn.date}</TableCell>
                      <TableCell>{burn.amount.toLocaleString()} SVR</TableCell>
                      <TableCell>
                        {burn.type === "scheduled" ? (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            Scheduled
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                            Manual
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <a 
                          href={`https://explorer.sui.io/txblock/${burn.txHash}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {truncateHash(burn.txHash)}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Burn Impact Chart (Placeholder) */}
          <Card>
            <CardHeader>
              <CardTitle>Burn Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-72 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Charts showing burn impact on token supply and price would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRewardsModule;
