
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import StakingPackage from '@/components/StakingPackage';
import { 
  Bell, 
  Wallet, 
  Info,
  HelpCircle,
  CircleDollarSign,
  Clock, 
  LockIcon,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TokenPurchase from '@/components/TokenPurchase';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Header from '@/components/Header';

const Stake = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("packages");

  const handleLogout = () => {
    navigate('/');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const stakingPackages = [
    {
      name: "Micro Node",
      apy: 4,
      duration: 6,
      minAmount: 500,
      description: "Entry-level staking package with a short lock-in period. Perfect for beginners.",
      features: ["Early withdrawal option", "No minimum staking period", "Basic voting rights"]
    },
    {
      name: "Compute Booster",
      apy: 5.5,
      duration: 12,
      minAmount: 1000,
      description: "Mid-level package with balanced risk-reward ratio. Good for medium-term investors.",
      features: ["Quarterly rewards distribution", "Enhanced voting power", "Access to exclusive features"]
    },
    {
      name: "Data Streamer",
      apy: 6.5,
      duration: 12,
      minAmount: 2000,
      description: "Specialized package with higher returns. Includes access to network data rewards.",
      isPopular: true,
      features: ["Network data rewards", "Priority governance voting", "Beta feature access"]
    },
    {
      name: "Edge Power Node",
      apy: 7.5,
      duration: 18,
      minAmount: 3000,
      description: "Advanced staking option with higher APY and longer lock-in period. For serious investors.",
      features: ["Compounding rewards option", "Delegation capabilities", "Premium support access"]
    },
    {
      name: "Core Validator Tier",
      apy: 9,
      duration: 24,
      minAmount: 5000,
      description: "Premium long-term staking option with our highest APY rate. Includes governance voting rights.",
      features: ["Highest APY rate", "Full governance rights", "Exclusive platform features", "Priority rewards"]
    }
  ];

  // User staking stats
  const stakingStats = {
    totalStaked: 750,
    availableToStake: 500,
    earnedRewards: 45.75,
    averageApy: 6.2
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-svr-dark to-svr-dark/90">
      {/* <DashboardSidebar onLogout={handleLogout} /> */}
      <Header isAuthenticated={true} walletAddress={''} onLogout={handleLogout} />
      <div className="container">
        {/* Top bar */}
        {/* <div className="p-4 border-b border-svr-primary/20 backdrop-blur-sm flex justify-between items-center">
          <h1 className="text-xl font-bold">Stake SVR Tokens</h1>
          <Button variant="outline" size="icon" className="border-svr-primary/20">
            <Bell className="h-4 w-4" />
          </Button>
        </div> */}
        
        {/* Main content */}
        <main className="p-6">
          {/* Staking Overview */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="stats-label">Total Staked</p>
                    <p className="stats-value">{stakingStats.totalStaked} SVR</p>
                  </div>
                  <Wallet className="h-10 w-10 p-2 rounded-full bg-svr-primary/10 text-svr-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="stats-label">Available to Stake</p>
                    <p className="stats-value">{stakingStats.availableToStake} SVR</p>
                  </div>
                  <CircleDollarSign className="h-10 w-10 p-2 rounded-full bg-svr-primary/10 text-svr-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="stats-label">Earned Rewards</p>
                    <p className="stats-value">{stakingStats.earnedRewards} SVR</p>
                  </div>
                  <TrendingUp className="h-10 w-10 p-2 rounded-full bg-svr-primary/10 text-svr-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="stats-label">Average APY</p>
                    <p className="stats-value">{stakingStats.averageApy}%</p>
                  </div>
                  <LockIcon className="h-10 w-10 p-2 rounded-full bg-svr-primary/10 text-svr-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs 
            defaultValue="packages" 
            value={activeTab} 
            onValueChange={handleTabChange} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="packages">Staking Packages</TabsTrigger>
              <TabsTrigger value="buy">Buy SVR Tokens</TabsTrigger>
              <TabsTrigger value="info">Staking Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="packages" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Available Packages</h2>
                  <p className="text-muted-foreground">Select the best package that suits your investment strategy</p>
                </div>
                <div className="flex items-center space-x-2 bg-svr-primary/10 px-4 py-2 rounded-lg">
                  <Wallet className="h-4 w-4 text-svr-primary" />
                  <span className="font-medium">1,250 SVR</span>
                  <span className="text-xs text-muted-foreground">Available</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stakingPackages.map((pkg, index) => (
                  <StakingPackage
                    key={index}
                    name={pkg.name}
                    apy={pkg.apy}
                    duration={pkg.duration}
                    minAmount={pkg.minAmount}
                    description={pkg.description}
                    isPopular={pkg.isPopular}
                    features={pkg.features}
                  />
                ))}
              </div>
              
              <Alert className="bg-svr-primary/10 border-svr-primary/20 mt-6">
                <Info className="h-4 w-4" />
                <AlertTitle>Staking Benefits</AlertTitle>
                <AlertDescription>
                  Staking your SVR tokens not only earns you rewards but also grants you governance rights
                  and access to exclusive platform features. The longer you stake, the higher the rewards.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="buy" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Purchase SVR Tokens</h2>
                <p className="text-muted-foreground mb-6">Buy SVR tokens using USDT or SUI to start staking</p>
                
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2">
                    <TokenPurchase />
                  </div>
                  
                  <div className="lg:w-1/2 bg-card border border-svr-primary/20 rounded-xl p-5">
                    <h3 className="text-xl font-bold mb-4">Why Buy SVR?</h3>
                    <ul className="space-y-4">
                      {[
                        { title: 'High Staking APY', description: 'Earn up to 9% APY on your staked tokens' },
                        { title: 'Governance Rights', description: 'Participate in platform governance with your tokens' },
                        { title: 'Limited Supply', description: 'SVR has a capped supply, increasing scarcity over time' },
                        { title: 'Platform Utility', description: 'SVR tokens power the entire ecosystem' },
                      ].map((point, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="flex-shrink-0 h-5 w-5 rounded-full bg-svr-primary/20 text-svr-primary flex items-center justify-center">
                            {i + 1}
                          </span>
                          <div>
                            <h4 className="font-medium">{point.title}</h4>
                            <p className="text-sm text-muted-foreground">{point.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="info" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-svr-primary" />
                      Staking Process
                    </CardTitle>
                    <CardDescription>How SVR staking works</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4 pl-5 list-decimal">
                      <li className="pl-2">
                        <span className="font-medium">Select a package</span>
                        <p className="text-sm text-muted-foreground">Choose from our range of staking packages with different APY rates and lock periods</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Stake your tokens</span>
                        <p className="text-sm text-muted-foreground">Commit your SVR tokens to the smart contract for the selected period</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Earn rewards</span>
                        <p className="text-sm text-muted-foreground">Rewards are calculated daily and distributed according to the package terms</p>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">End of lock period</span>
                        <p className="text-sm text-muted-foreground">After the lock period ends, you can withdraw your staked tokens and rewards</p>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
                
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HelpCircle className="mr-2 h-5 w-5 text-svr-primary" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>Common questions about staking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium">What is the minimum staking amount?</h4>
                      <p className="text-sm text-muted-foreground">The minimum amount varies by package, starting from 500 SVR.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Can I withdraw early?</h4>
                      <p className="text-sm text-muted-foreground">Early withdrawals are subject to penalties, typically 10-20% of rewards.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">How are rewards calculated?</h4>
                      <p className="text-sm text-muted-foreground">Rewards are calculated daily based on your staked amount and the APY rate.</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Are there any fees?</h4>
                      <p className="text-sm text-muted-foreground">There are no fees for staking, only standard network gas fees for transactions.</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="dashboard-card lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-svr-primary" />
                      APY Comparison
                    </CardTitle>
                    <CardDescription>Compare APY rates across different packages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stakingPackages.map((pkg, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{pkg.name} ({pkg.duration} months)</span>
                            <span className="text-sm font-medium text-svr-primary">{pkg.apy}% APY</span>
                          </div>
                          <Progress value={pkg.apy * 11.11} className="h-2" /> {/* Scaling to make the highest value (9%) fill the bar */}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Stake;
