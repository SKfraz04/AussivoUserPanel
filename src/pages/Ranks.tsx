
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Bell, Award, ArrowUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { rankTiers, getUserRank, formatNumber } from '@/utils/rankUtils';
import RankBadge from '@/components/RankBadge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Ranks = () => {
  const navigate = useNavigate();
  // Mock user data - in a real app this would come from a user context or API
  const userData = {
    referrals: 8,
    stakedAmount: 2500
  };
  
  const currentRank = getUserRank(userData.referrals, userData.stakedAmount);
  
  const handleLogout = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-svr-dark to-svr-dark/90">
      <DashboardSidebar onLogout={handleLogout} />
      
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="p-4 border-b border-svr-primary/20 backdrop-blur-sm flex justify-between items-center">
          <h1 className="text-xl font-bold">Rank System</h1>
          <Button variant="outline" size="icon" className="border-svr-primary/20">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Main content */}
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Your Rank Status</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="dashboard-card lg:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="mb-1">Current Rank</CardTitle>
                      <CardDescription>Your progression in the SVR ranking system</CardDescription>
                    </div>
                    <RankBadge rank={currentRank} size="lg" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4 text-svr-primary" />
                        Rank Requirements
                      </h4>
                      <div className="space-y-4 bg-card/50 p-4 rounded-lg border border-svr-primary/10">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Referrals</p>
                          <p className="font-medium">
                            {currentRank.minReferrals} - {currentRank.maxReferrals ?? "∞"}
                          </p>
                          <div className="text-xs text-muted-foreground mt-1">
                            Your referrals: <span className="font-medium text-svr-primary">{userData.referrals}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Staked Amount</p>
                          <p className="font-medium">
                            {formatNumber(currentRank.minStaked)} - {currentRank.maxStaked ? formatNumber(currentRank.maxStaked) : "∞"} SVR
                          </p>
                          <div className="text-xs text-muted-foreground mt-1">
                            Your staked amount: <span className="font-medium text-svr-primary">{formatNumber(userData.stakedAmount)} SVR</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2">
                      <h4 className="font-medium mb-2">Current Perks</h4>
                      <div className="space-y-2">
                        {currentRank.perks.map((perk, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-svr-primary/5 rounded-md">
                            <div className="h-6 w-6 rounded-full bg-svr-primary/20 flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </div>
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUp className="h-5 w-5 text-svr-primary" />
                    How to Level Up
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">To reach higher ranks, you need to:</p>
                    
                    <div className="space-y-2">
                      <div className="p-3 rounded-md bg-svr-primary/10 text-sm">
                        <p className="font-medium">1. Increase your staked amount</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          The more SVR tokens you stake, the higher your rank potential
                        </p>
                      </div>
                      
                      <div className="p-3 rounded-md bg-svr-primary/10 text-sm">
                        <p className="font-medium">2. Refer more users</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Invite friends to join and stake on the platform
                        </p>
                      </div>
                      
                      <Button 
                        className="w-full mt-2" 
                        onClick={() => navigate('/stake')}
                      >
                        Stake More SVR
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">All Rank Tiers</h2>
            </div>
            
            <Card className="dashboard-card">
              <CardContent className="p-0 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-svr-primary/10 hover:bg-svr-primary/20">
                      <TableHead className="text-foreground">Level</TableHead>
                      <TableHead className="text-foreground">Rank</TableHead>
                      <TableHead className="text-foreground">Referral Users</TableHead>
                      <TableHead className="text-foreground">Staked SVR</TableHead>
                      <TableHead className="text-foreground">Perks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rankTiers.map((tier) => (
                      <TableRow 
                        key={tier.level}
                        className={tier.level === currentRank.level ? "bg-svr-primary/5" : ""}
                      >
                        <TableCell>{tier.level}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <RankBadge rank={tier} showLevel={false} size="sm" />
                            {tier.level === currentRank.level && (
                              <span className="text-xs bg-svr-primary/20 text-svr-primary px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {tier.minReferrals}–{tier.maxReferrals ?? '∞'}
                        </TableCell>
                        <TableCell>
                          {formatNumber(tier.minStaked)} – {tier.maxStaked ? formatNumber(tier.maxStaked) : '∞'} SVR
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {tier.perks.map((perk, i) => (
                              <span 
                                key={i} 
                                className="text-xs px-1.5 py-0.5 bg-svr-primary/10 text-svr-primary rounded-full"
                              >
                                {perk}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Alert className="bg-svr-primary/10 border-svr-primary/20 mt-6">
              <Info className="h-4 w-4" />
              <AlertTitle>Ranking System Benefits</AlertTitle>
              <AlertDescription>
                Our rank system rewards long-term stakers and active community members. 
                Higher ranks unlock exclusive benefits including increased APY, early access to features,
                and revenue sharing opportunities.
              </AlertDescription>
            </Alert>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Ranks;
