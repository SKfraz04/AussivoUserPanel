
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import StakingPackage from '@/components/StakingPackage';
import { Bell, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TokenPurchase from '@/components/TokenPurchase';

const Stake = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const stakingPackages = [
    {
      name: "Micro Node",
      apy: 4,
      duration: 6,
      minAmount: 500,
      description: "Entry-level staking package with a short lock-in period. Perfect for beginners."
    },
    {
      name: "Compute Booster",
      apy: 5.5,
      duration: 12,
      minAmount: 1000,
      description: "Mid-level package with balanced risk-reward ratio. Good for medium-term investors."
    },
    {
      name: "Data Streamer",
      apy: 6.5,
      duration: 12,
      minAmount: 2000,
      description: "Specialized package with higher returns. Includes access to network data rewards.",  // Added the missing comma here
      isPopular: true
    },
    {
      name: "Edge Power Node",
      apy: 7.5,
      duration: 18,
      minAmount: 3000,
      description: "Advanced staking option with higher APY and longer lock-in period. For serious investors."
    },
    {
      name: "Core Validator Tier",
      apy: 9,
      duration: 24,
      minAmount: 5000,
      description: "Premium long-term staking option with our highest APY rate. Includes governance voting rights."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-svr-dark to-svr-dark/90">
      <DashboardSidebar onLogout={handleLogout} />
      
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="p-4 border-b border-svr-primary/20 backdrop-blur-sm flex justify-between items-center">
          <h1 className="text-xl font-bold">Stake SVR Tokens</h1>
          <Button variant="outline" size="icon" className="border-svr-primary/20">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Main content */}
        <main className="p-6">
          <Tabs defaultValue="packages" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="packages">Staking Packages</TabsTrigger>
              <TabsTrigger value="buy">Buy SVR Tokens</TabsTrigger>
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
                  />
                ))}
              </div>
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
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Stake;
