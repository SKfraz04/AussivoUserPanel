
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import DashboardSidebar from '@/components/DashboardSidebar';
import StatsCard from '@/components/StatsCard';
import {
  BarChart3,
  Wallet,
  ArrowUpRight,
  Clock,
  RefreshCw,
  Users,
  TrendingUp,
  ArrowRight,
  Bell
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeStakes, setActiveStakes] = useState([
    {
      id: 1,
      package: 'Micro Node',
      stakedAmount: 1000,
      apy: 4,
      startDate: '2023-11-15',
      endDate: '2024-05-15',
      progress: 35,
      rewards: 14.5,
    },
    {
      id: 2,
      package: 'Data Streamer',
      stakedAmount: 2500,
      apy: 6.5,
      startDate: '2023-12-01',
      endDate: '2024-12-01',
      progress: 28,
      rewards: 45.2,
    },
  ]);

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
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                icon={<Wallet className="h-5 w-5 text-svr-primary" />}
                title="Total Balance"
                value="1,250 SVR"
                description="Available for staking"
                trend={{ value: "120 SVR", isPositive: true }}
              />
              
              <StatsCard
                icon={<BarChart3 className="h-5 w-5 text-svr-primary" />}
                title="Total Staked"
                value="3,500 SVR"
                description="Across all packages"
                trend={{ value: "3.2%", isPositive: true }}
              />
              
              <StatsCard
                icon={<ArrowUpRight className="h-5 w-5 text-svr-primary" />}
                title="Total Rewards"
                value="59.7 SVR"
                description="Accumulated staking rewards"
                trend={{ value: "12.5 SVR", isPositive: true }}
              />
              
              <StatsCard
                icon={<Users className="h-5 w-5 text-svr-primary" />}
                title="Referrals"
                value="4 Users"
                description="20.5 SVR bonus earned"
                trend={{ value: "1 user", isPositive: true }}
              />
            </div>
          </div>
          
          {/* Active Staking Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Active Staking</h2>
              <Button variant="outline" className="border-svr-primary/20" onClick={() => navigate('/stake')}>
                <Wallet className="mr-2 h-4 w-4" /> Stake More
              </Button>
            </div>
            
            <div className="grid gap-6">
              {activeStakes.map((stake) => (
                <Card key={stake.id} className="dashboard-card overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{stake.package}</CardTitle>
                        <CardDescription>{stake.stakedAmount} SVR at {stake.apy}% APY</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="border-svr-primary/20">
                        <TrendingUp className="mr-1 h-3 w-3 text-svr-success" />
                        Details
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground flex items-center">
                          <Clock className="mr-1 h-4 w-4" /> Lock Period
                        </span>
                        <span>
                          {new Date(stake.startDate).toLocaleDateString()} - {new Date(stake.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{stake.progress}%</span>
                        </div>
                        <Progress value={stake.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between pt-2 border-t border-svr-primary/10">
                        <div>
                          <div className="text-xs text-muted-foreground">Current Rewards</div>
                          <div className="font-bold text-svr-primary">{stake.rewards} SVR</div>
                        </div>
                        <Button size="sm" className="bg-svr-primary hover:bg-svr-primary/90">
                          <RefreshCw className="mr-1 h-3 w-3" /> Compound
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {activeStakes.length === 0 && (
                <Card className="dashboard-card text-center py-12">
                  <CardContent>
                    <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Wallet className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No Active Stakes</h3>
                    <p className="text-muted-foreground mb-6">
                      Start earning passive income by staking your SVR tokens
                    </p>
                    <Button onClick={() => navigate('/stake')}>
                      Start Staking <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          {/* Recent Activity and Announcements */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="dashboard-card h-full">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { icon: Wallet, color: 'text-svr-primary', title: 'SVR Token Purchase', description: 'Purchased 250 SVR tokens', time: '2h ago' },
                      { icon: TrendingUp, color: 'text-svr-success', title: 'Reward Distribution', description: 'Received 12.5 SVR in rewards', time: '1d ago' },
                      { icon: Users, color: 'text-svr-accent', title: 'Referral Bonus', description: 'Earned 5 SVR from referrals', time: '3d ago' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-svr-primary/5 transition-colors">
                        <div className={`p-2 rounded-full bg-svr-primary/10 ${activity.color}`}>
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">{activity.description}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="dashboard-card h-full">
                <CardHeader>
                  <CardTitle>Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'New Staking Package', description: 'Premium validator package now available with 10% APY', date: 'Apr 10, 2025' },
                      { title: 'Platform Maintenance', description: 'Scheduled maintenance on Apr 20', date: 'Apr 8, 2025' },
                      { title: 'APY Rate Update', description: 'Increased APY rates for all packages', date: 'Apr 5, 2025' },
                    ].map((announcement, i) => (
                      <div key={i} className="p-3 rounded-lg border border-svr-primary/10 hover:border-svr-primary/30 transition-colors">
                        <div className="text-sm font-medium mb-1">{announcement.title}</div>
                        <div className="text-xs text-muted-foreground mb-2">{announcement.description}</div>
                        <div className="text-xs text-muted-foreground">{announcement.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
