
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { 
  Bell, 
  Wallet, 
  Clock, 
  TrendingUp, 
  Award,
  Gift,
  Users,
  RefreshCw,
  ArrowUpRight,
  CalendarClock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const Rewards = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isClaimingRewards, setIsClaimingRewards] = useState(false);
  
  const handleLogout = () => {
    navigate('/');
  };

  const handleClaimRewards = () => {
    setIsClaimingRewards(true);
    // Simulate API call
    setTimeout(() => {
      setIsClaimingRewards(false);
      toast({
        title: "Rewards Claimed Successfully",
        description: "45.75 SVR has been added to your wallet",
      });
    }, 1500);
  };
  
  // Rewards data
  const rewardsData = {
    totalEarned: 45.75,
    availableToClaim: 45.75,
    nextRewardsDistribution: "2025-04-20",
    rewardsHistory: [
      { date: "2025-03-15", amount: 15.25, claimed: true },
      { date: "2025-02-15", amount: 14.50, claimed: true },
      { date: "2025-01-15", amount: 16.00, claimed: true },
    ],
    stakingRewards: 30.5,
    referralRewards: 10.25,
    governanceRewards: 5.0
  };
  
  // Calculate rewards distribution
  const totalRewards = rewardsData.stakingRewards + rewardsData.referralRewards + rewardsData.governanceRewards;
  const stakingPercentage = (rewardsData.stakingRewards / totalRewards) * 100;
  const referralPercentage = (rewardsData.referralRewards / totalRewards) * 100;
  const governancePercentage = (rewardsData.governanceRewards / totalRewards) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-svr-dark to-svr-dark/90">
      {/* <DashboardSidebar onLogout={handleLogout} /> */}
      <Header isAuthenticated={true} walletAddress={''} onLogout={handleLogout} />
      <div className="container">
        {/* Top bar */}
        {/* <div className="p-4 border-b border-svr-primary/20 backdrop-blur-sm flex justify-between items-center">
          <h1 className="text-xl font-bold">SVR Rewards</h1>
          <Button variant="outline" size="icon" className="border-svr-primary/20">
            <Bell className="h-4 w-4" />
          </Button>
        </div> */}
        
        {/* Main content */}
        <main className="p-6">
          {/* Rewards Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Rewards Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="dashboard-card overflow-hidden">
                <div className="h-1 bg-svr-primary"></div>
                <CardHeader>
                  <CardTitle>Available Rewards</CardTitle>
                  <CardDescription>Ready to claim</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-svr-primary/10 rounded-full">
                          <Award className="h-6 w-6 text-svr-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Rewards</p>
                          <p className="text-2xl font-bold text-svr-primary">{rewardsData.totalEarned} SVR</p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleClaimRewards}
                        disabled={isClaimingRewards || rewardsData.availableToClaim === 0}
                        className="bg-svr-primary hover:bg-svr-primary/90"
                      >
                        {isClaimingRewards ? (
                          <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Processing</>
                        ) : (
                          <>Claim Rewards</>
                        )}
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Next rewards distribution</span>
                        <span>{new Date(rewardsData.nextRewardsDistribution).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="bg-svr-primary/10 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Staking Rewards</span>
                          <span className="font-medium">{rewardsData.stakingRewards} SVR</span>
                        </div>
                        <Progress value={stakingPercentage} className="h-1.5" />
                        
                        <div className="flex justify-between">
                          <span className="text-sm">Referral Rewards</span>
                          <span className="font-medium">{rewardsData.referralRewards} SVR</span>
                        </div>
                        <Progress value={referralPercentage} className="h-1.5" />
                        
                        <div className="flex justify-between">
                          <span className="text-sm">Governance Rewards</span>
                          <span className="font-medium">{rewardsData.governanceRewards} SVR</span>
                        </div>
                        <Progress value={governancePercentage} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="dashboard-card overflow-hidden">
                <div className="h-1 bg-svr-accent"></div>
                <CardHeader>
                  <CardTitle>Reward Boosters</CardTitle>
                  <CardDescription>Ways to increase your rewards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-svr-primary/20 rounded-lg hover:bg-svr-primary/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-svr-primary/10 rounded-full">
                        <Users className="h-5 w-5 text-svr-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Referral Bonus</p>
                        <p className="text-sm text-muted-foreground">Invite friends to earn 5% of their staking rewards</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-svr-primary/20">
                      Invite <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-svr-primary/20 rounded-lg hover:bg-svr-primary/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-svr-primary/10 rounded-full">
                        <CalendarClock className="h-5 w-5 text-svr-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Loyalty Bonus</p>
                        <p className="text-sm text-muted-foreground">+0.5% APY for each month you stake</p>
                      </div>
                    </div>
                    <div className="text-xs px-2 py-1 rounded-full bg-svr-primary/10 text-svr-primary">Active</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-svr-primary/20 rounded-lg hover:bg-svr-primary/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-svr-primary/10 rounded-full">
                        <Gift className="h-5 w-5 text-svr-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Participation Bonus</p>
                        <p className="text-sm text-muted-foreground">Vote in governance to earn extra rewards</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-svr-primary/20">
                      Vote <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Rewards History */}
          <div>
            <h3 className="text-xl font-bold mb-4">Rewards History</h3>
            <Card className="dashboard-card">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {rewardsData.rewardsHistory.length > 0 ? (
                    rewardsData.rewardsHistory.map((reward, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border-b border-svr-primary/10 last:border-b-0">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-svr-primary/10 rounded-full">
                            <Clock className="h-4 w-4 text-svr-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{new Date(reward.date).toLocaleDateString()}</p>
                            <p className="text-sm text-muted-foreground">Monthly reward distribution</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-bold text-svr-primary">{reward.amount} SVR</p>
                          <div className="text-xs px-2 py-0.5 rounded-full bg-svr-primary/10 text-svr-primary">
                            {reward.claimed ? 'Claimed' : 'Pending'}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No rewards history yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Rewards;
