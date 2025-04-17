
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Award, 
  Star, 
  Settings, 
  Flag, 
  BarChart3,
  Save,
  Search,
  Filter,
  ArrowDown,
  ArrowUp,
  Gift,
  Check,
  AlertTriangle,
  HelpCircle
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Sample referral level data
const referralLevels = [
  {
    id: "standard",
    name: "Standard",
    bonusPercentage: 5,
    directReferralsRequired: 0,
    totalVolumeRequired: 0,
    users: 3280,
  },
  {
    id: "bronze",
    name: "Bronze",
    bonusPercentage: 7,
    directReferralsRequired: 3,
    totalVolumeRequired: 10000,
    users: 842,
  },
  {
    id: "silver",
    name: "Silver",
    bonusPercentage: 8,
    directReferralsRequired: 5,
    totalVolumeRequired: 50000,
    users: 329,
  },
  {
    id: "gold",
    name: "Gold",
    bonusPercentage: 10,
    directReferralsRequired: 10,
    totalVolumeRequired: 100000,
    users: 64,
  },
  {
    id: "platinum",
    name: "Platinum",
    bonusPercentage: 12,
    directReferralsRequired: 20,
    totalVolumeRequired: 500000,
    users: 6,
  }
];

// Sample top referrers
const topReferrers = [
  {
    id: "r1",
    wallet: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    level: "platinum",
    directReferrals: 28,
    totalVolume: 785000,
    earned: 94200,
    joined: "2023-08-15"
  },
  {
    id: "r2",
    wallet: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    level: "platinum",
    directReferrals: 25,
    totalVolume: 682000,
    earned: 81840,
    joined: "2023-09-02"
  },
  {
    id: "r3",
    wallet: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    level: "platinum",
    directReferrals: 22,
    totalVolume: 563000,
    earned: 67560,
    joined: "2023-07-18"
  },
  {
    id: "r4",
    wallet: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    level: "gold",
    directReferrals: 15,
    totalVolume: 387000,
    earned: 38700,
    joined: "2023-09-22"
  },
  {
    id: "r5",
    wallet: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    level: "gold",
    directReferrals: 12,
    totalVolume: 320000,
    earned: 32000,
    joined: "2023-10-05"
  }
];

// Sample flagged activities
const flaggedActivities = [
  {
    id: "f1",
    wallet: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    reason: "Multiple accounts with same IP",
    directReferrals: 8,
    totalVolume: 43000,
    flagDate: "2023-11-20",
    status: "investigating"
  },
  {
    id: "f2",
    wallet: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    reason: "Suspicious referral pattern",
    directReferrals: 15,
    totalVolume: 87000,
    flagDate: "2023-11-18",
    status: "confirmed_fraud"
  },
  {
    id: "f3",
    wallet: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    reason: "Unusually high referral rate",
    directReferrals: 21,
    totalVolume: 95000,
    flagDate: "2023-11-15",
    status: "cleared"
  }
];

const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const AdminReferralModule = () => {
  const [editMode, setEditMode] = useState(false);
  const [levels, setLevels] = useState(referralLevels);
  const [leaderboardEnabled, setLeaderboardEnabled] = useState(true);
  const [weeklyRewards, setWeeklyRewards] = useState(true);
  const [fraudDetection, setFraudDetection] = useState(true);
  
  const handleSaveChanges = () => {
    setEditMode(false);
    console.log("Saving referral level changes");
    // In a real implementation, this would call an API to save the changes
  };

  const handleBonusChange = (levelId: string, percentage: string) => {
    const bonusPercentage = parseInt(percentage, 10);
    setLevels(prevLevels => 
      prevLevels.map(level => 
        level.id === levelId ? { ...level, bonusPercentage } : level
      )
    );
  };

  const handleDirectReferralsChange = (levelId: string, count: string) => {
    const directReferralsRequired = parseInt(count, 10);
    setLevels(prevLevels => 
      prevLevels.map(level => 
        level.id === levelId ? { ...level, directReferralsRequired } : level
      )
    );
  };

  const handleVolumeRequiredChange = (levelId: string, volume: string) => {
    const totalVolumeRequired = parseInt(volume, 10);
    setLevels(prevLevels => 
      prevLevels.map(level => 
        level.id === levelId ? { ...level, totalVolumeRequired } : level
      )
    );
  };

  const handleDistributeRewards = () => {
    console.log("Distributing weekly rewards");
    // In a real implementation, this would call an API to distribute rewards
  };

  const handleClearFlag = (id: string) => {
    console.log(`Clearing flag for activity ${id}`);
    // In a real implementation, this would call an API
  };

  const handleConfirmFraud = (id: string) => {
    console.log(`Confirming fraud for activity ${id}`);
    // In a real implementation, this would call an API
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Referral & Leaderboard System</h1>
        <p className="text-muted-foreground">Manage referral bonuses and leaderboard settings</p>
      </div>

      {/* Referral System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,547</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 font-medium">+8%</span>
              <ArrowUp className="h-3 w-3 text-green-500 ml-1" />
              <span className="text-xs text-muted-foreground ml-2">vs. last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bonus Rewards Paid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">921,450 SVR</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 font-medium">+12%</span>
              <ArrowUp className="h-3 w-3 text-green-500 ml-1" />
              <span className="text-xs text-muted-foreground ml-2">vs. last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Referral Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8.45M</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-500 font-medium">+15%</span>
              <ArrowUp className="h-3 w-3 text-green-500 ml-1" />
              <span className="text-xs text-muted-foreground ml-2">vs. last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Flagged Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-red-500 font-medium">+2</span>
              <ArrowUp className="h-3 w-3 text-red-500 ml-1" />
              <span className="text-xs text-muted-foreground ml-2">since last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Levels Configuration */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Referral Levels & Bonuses
          </CardTitle>
          {!editMode ? (
            <Button onClick={() => setEditMode(true)} className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Edit Levels
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
                <TableHead>Level</TableHead>
                <TableHead>Bonus Percentage</TableHead>
                <TableHead>Direct Referrals Required</TableHead>
                <TableHead>Total Volume Required</TableHead>
                <TableHead>Users at Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {levels.map(level => (
                <TableRow key={level.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {level.id === "platinum" && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                      <span className={`font-medium ${level.id === "platinum" ? 'text-yellow-700' : ''}`}>
                        {level.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {editMode ? (
                      <div className="flex items-center">
                        <Input 
                          type="number" 
                          min="1" 
                          max="20" 
                          value={level.bonusPercentage} 
                          onChange={(e) => handleBonusChange(level.id, e.target.value)} 
                          className="w-20"
                        />
                        <span className="ml-2">%</span>
                      </div>
                    ) : (
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {level.bonusPercentage}%
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode ? (
                      <Input 
                        type="number" 
                        min="0" 
                        max="100" 
                        value={level.directReferralsRequired} 
                        onChange={(e) => handleDirectReferralsChange(level.id, e.target.value)} 
                        className="w-20"
                      />
                    ) : (
                      level.directReferralsRequired
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode ? (
                      <Input 
                        type="number" 
                        min="0" 
                        max="1000000" 
                        step="10000" 
                        value={level.totalVolumeRequired} 
                        onChange={(e) => handleVolumeRequiredChange(level.id, e.target.value)} 
                        className="w-28"
                      />
                    ) : (
                      level.totalVolumeRequired.toLocaleString()
                    )}
                  </TableCell>
                  <TableCell>{level.users.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-start">
            <HelpCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-blue-800 font-medium">Referral Level Information</p>
              <p className="text-blue-700 mt-1">
                Users automatically move up through referral levels as they meet the requirements. Bonus percentages apply 
                to referral rewards earned from the direct referral's staking activities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Leaderboard Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="leaderboard-enabled" 
                  checked={leaderboardEnabled} 
                  onCheckedChange={setLeaderboardEnabled}
                />
                <Label htmlFor="leaderboard-enabled">Enable public leaderboard</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="weekly-rewards" 
                  checked={weeklyRewards} 
                  onCheckedChange={setWeeklyRewards}
                />
                <Label htmlFor="weekly-rewards">Enable weekly rewards for top referrers</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch 
                  id="fraud-detection" 
                  checked={fraudDetection} 
                  onCheckedChange={setFraudDetection}
                />
                <Label htmlFor="fraud-detection">Enable automatic fraud detection</Label>
              </div>

              <div className="pt-4">
                <Button 
                  variant="outline"
                  onClick={handleDistributeRewards}
                  className="flex items-center"
                  disabled={!weeklyRewards}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Distribute Weekly Rewards
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Next automatic distribution: November 30, 2023
                </p>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h4 className="text-sm font-medium mb-3">Weekly Reward Distribution</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">1st Place:</span>
                  <span>25,000 SVR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">2nd Place:</span>
                  <span>15,000 SVR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">3rd Place:</span>
                  <span>10,000 SVR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">4th-10th Place:</span>
                  <span>5,000 SVR each</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Weekly Distribution:</span>
                  <span>85,000 SVR</span>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div className="text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Leaderboard Criteria:</span>
                  <span>New referral volume in trailing 7 days</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Referrers */}
      <Card>
        <CardHeader>
          <CardTitle>Current Top Referrers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Direct Referrals</TableHead>
                <TableHead>Total Volume</TableHead>
                <TableHead>Total Earned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topReferrers.map((referrer, idx) => (
                <TableRow key={referrer.id} className={idx < 3 ? "bg-amber-50/50" : ""}>
                  <TableCell>
                    {idx === 0 ? (
                      <Badge className="bg-yellow-500 text-white border-yellow-500">1st</Badge>
                    ) : idx === 1 ? (
                      <Badge className="bg-gray-400 text-white border-gray-400">2nd</Badge>
                    ) : idx === 2 ? (
                      <Badge className="bg-amber-600 text-white border-amber-600">3rd</Badge>
                    ) : (
                      `${idx + 1}th`
                    )}
                  </TableCell>
                  <TableCell>{truncateAddress(referrer.wallet)}</TableCell>
                  <TableCell className="capitalize">{referrer.level}</TableCell>
                  <TableCell>{referrer.directReferrals}</TableCell>
                  <TableCell>
                    ${referrer.totalVolume.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {referrer.earned.toLocaleString()} SVR
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Flagged Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Flag className="h-5 w-5 mr-2" />
            Flagged Referral Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flaggedActivities.map((activity) => (
              <div
                key={activity.id}
                className={`border rounded-md p-4 ${
                  activity.status === "investigating" ? "border-yellow-300 bg-yellow-50" : 
                  activity.status === "confirmed_fraud" ? "border-red-300 bg-red-50" :
                  "border-green-300 bg-green-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <AlertTriangle className={`h-4 w-4 mr-2 ${
                        activity.status === "investigating" ? "text-yellow-500" : 
                        activity.status === "confirmed_fraud" ? "text-red-500" : 
                        "text-green-500"
                      }`} />
                      <h4 className="font-medium">{truncateAddress(activity.wallet)}</h4>
                      <Badge
                        className={`ml-2 ${
                          activity.status === "investigating" ? "bg-yellow-500 border-yellow-500" : 
                          activity.status === "confirmed_fraud" ? "bg-red-500 border-red-500" : 
                          "bg-green-500 border-green-500"
                        } text-white`}
                      >
                        {activity.status === "investigating" ? "Investigating" : 
                         activity.status === "confirmed_fraud" ? "Confirmed Fraud" : 
                         "Cleared"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm">{activity.reason}</p>
                    <div className="mt-2 text-sm">
                      <span className="inline-block mr-4">
                        <span className="text-muted-foreground mr-1">Direct Referrals:</span>
                        <span className="font-medium">{activity.directReferrals}</span>
                      </span>
                      <span className="inline-block mr-4">
                        <span className="text-muted-foreground mr-1">Volume:</span>
                        <span className="font-medium">${activity.totalVolume.toLocaleString()}</span>
                      </span>
                      <span className="inline-block">
                        <span className="text-muted-foreground mr-1">Flagged:</span>
                        <span className="font-medium">{activity.flagDate}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {activity.status === "investigating" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center"
                          onClick={() => handleClearFlag(activity.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Clear
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center text-red-600 hover:text-red-700"
                          onClick={() => handleConfirmFraud(activity.id)}
                        >
                          <Flag className="h-4 w-4 mr-1" />
                          Confirm Fraud
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {flaggedActivities.length === 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium">No Flagged Activities</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  All referral activities are currently normal
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReferralModule;
