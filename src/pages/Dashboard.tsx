
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import StatsCard from '@/components/StatsCard';
import { 
  Bell, 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Award,
  Coins,
  ShieldCheck,
  BarChart3,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-svr-dark to-svr-dark/90">
      <DashboardSidebar onLogout={handleLogout} />
      
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="p-4 border-b border-svr-primary/20 backdrop-blur-sm flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <Button variant="outline" size="icon" className="border-svr-primary/20">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Main content */}
        <main className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Welcome section */}
              <div className="text-center py-8">
                <h2 className="text-3xl font-bold mb-2 gradient-text">Welcome to Aussivo</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore decentralized finance opportunities, stake your tokens, and earn rewards in our innovative ecosystem.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  title="Total Balance"
                  value="$12,450.67"
                  change="+12.3%"
                  icon={<Wallet className="h-5 w-5 text-svr-primary" />}
                />
                <StatsCard
                  title="Staking Rewards"
                  value="$3,425.89"
                  change="+8.1%"
                  icon={<TrendingUp className="h-5 w-5 text-svr-primary" />}
                />
                <StatsCard
                  title="Referral Earnings"
                  value="$892.34"
                  change="+15.7%"
                  icon={<Users className="h-5 w-5 text-svr-primary" />}
                />
                <StatsCard
                  title="Total Earned"
                  value="$16,768.90"
                  change="+10.2%"
                  icon={<DollarSign className="h-5 w-5 text-svr-primary" />}
                />
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="dashboard-card cursor-pointer hover:border-svr-primary/40 transition-colors" onClick={() => navigate('/stake')}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShieldCheck className="mr-2 h-5 w-5 text-svr-primary" />
                      Staking
                    </CardTitle>
                    <CardDescription>
                      Lock your tokens and earn passive rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current APY</span>
                        <span className="text-svr-primary font-medium">15.7%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Your Stake</span>
                        <span>1,250 SVR</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dashboard-card cursor-pointer hover:border-svr-primary/40 transition-colors" onClick={() => navigate('/ico')}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Coins className="mr-2 h-5 w-5 text-svr-primary" />
                      Token Sale
                    </CardTitle>
                    <CardDescription>
                      Participate in our ongoing token sale
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Price</span>
                        <span className="text-svr-primary font-medium">$0.05</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Stage</span>
                        <span>Private Sale</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dashboard-card cursor-pointer hover:border-svr-primary/40 transition-colors" onClick={() => navigate('/referrals')}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-svr-primary" />
                      Referrals
                    </CardTitle>
                    <CardDescription>
                      Invite friends and earn bonuses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Referrals</span>
                        <span className="text-svr-primary font-medium">23</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Commission Rate</span>
                        <span>10%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Portfolio overview */}
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-svr-primary" />
                    Portfolio Overview
                  </CardTitle>
                  <CardDescription>Your asset distribution and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">SVR Tokens</span>
                        <span className="text-sm">75% ($9,338.00)</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Staked Tokens</span>
                        <span className="text-sm">20% ($2,490.13)</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Pending Rewards</span>
                        <span className="text-sm">5% ($622.54)</span>
                      </div>
                      <Progress value={5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Your account performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total ROI</span>
                        <span className="text-green-400">+24.7%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Monthly Growth</span>
                        <span className="text-green-400">+3.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Best Performing Asset</span>
                        <span className="text-svr-primary">SVR (+45%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle>Rank Progress</CardTitle>
                    <CardDescription>Your current rank and progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Current Rank</span>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1 text-svr-primary" />
                          <span className="font-medium">Silver</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Progress to Gold</span>
                          <span className="text-sm">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Stake 750 more SVR tokens to reach Gold rank
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-svr-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest transactions and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-svr-primary/10 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-500/10 rounded-full mr-3">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">Staking Reward Received</p>
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <span className="text-green-500 font-medium">+125 SVR</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-svr-primary/10 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-svr-primary/10 rounded-full mr-3">
                          <Coins className="h-4 w-4 text-svr-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Token Purchase</p>
                          <p className="text-sm text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                      <span className="text-svr-primary font-medium">+500 SVR</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-svr-primary/10 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-500/10 rounded-full mr-3">
                          <Users className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">Referral Bonus</p>
                          <p className="text-sm text-muted-foreground">3 days ago</p>
                        </div>
                      </div>
                      <span className="text-blue-500 font-medium">+50 SVR</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
