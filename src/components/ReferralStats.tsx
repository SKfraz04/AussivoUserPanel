
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, TrendingUp } from 'lucide-react';
import { formatNumber } from '@/utils/rankUtils';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ReferralStatsProps {
  stats: {
    totalReferrals: number;
    activeReferrals: number;
    pendingReferrals: number;
    totalEarnings: number;
    nextTier: {
      current: number;
      required: number;
      reward: string;
    };
  };
}

const ReferralStats = ({ stats }: ReferralStatsProps) => {
  const progressPercentage = useMemo(() => 
    (stats.nextTier.current / stats.nextTier.required) * 100,
    [stats.nextTier]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="dashboard-card col-span-2">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Trophy className="h-5 w-5 text-svr-primary" />
            Referral Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{stats.nextTier.current} Referrals</span>
                <span>{stats.nextTier.required} Required</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <Alert className="bg-svr-primary/5 border-svr-primary/20">
                <Target className="h-4 w-4" />
                <AlertDescription>
                  {stats.nextTier.reward}
                </AlertDescription>
              </Alert>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-svr-primary/5">
                <p className="text-2xl font-bold text-svr-primary">{stats.totalReferrals}</p>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-svr-primary/5">
                <p className="text-2xl font-bold text-svr-success">{stats.activeReferrals}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-svr-primary/5">
                <p className="text-2xl font-bold text-svr-accent">{stats.pendingReferrals}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-svr-primary" />
            Earnings Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="p-6 rounded-lg bg-svr-primary/5">
              <p className="text-3xl font-bold text-svr-primary">
                {formatNumber(stats.totalEarnings)} SVR
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Total Referral Earnings
              </p>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Earn 5% of the staking rewards</p>
              <p>from your referred users</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralStats;
