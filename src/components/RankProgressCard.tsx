
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RankTier, getNextRank, formatNumber } from '@/utils/rankUtils';
import RankBadge from '@/components/RankBadge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RankProgressCardProps {
  currentRank: RankTier;
  referrals: number;
  stakedAmount: number;
  showNextRank?: boolean;
}

const RankProgressCard: React.FC<RankProgressCardProps> = ({
  currentRank,
  referrals,
  stakedAmount,
  showNextRank = true
}) => {
  const nextRank = getNextRank(currentRank);
  
  const calculateProgress = (current: number, min: number, max: number): number => {
    if (current >= max) return 100;
    if (current <= min) return 0;
    return ((current - min) / (max - min)) * 100;
  };
  
  const referralProgress = nextRank 
    ? calculateProgress(referrals, currentRank.minReferrals, nextRank.minReferrals) 
    : 100;
    
  const stakedProgress = nextRank 
    ? calculateProgress(stakedAmount, currentRank.minStaked, nextRank.minStaked) 
    : 100;

  return (
    <Card className="dashboard-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Your Rank</span>
          <RankBadge rank={currentRank} size="md" />
        </CardTitle>
        <CardDescription>
          Keep staking and referring to reach the next level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nextRank && showNextRank && (
            <div className="p-3 bg-svr-primary/5 rounded-md flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Next Rank</p>
                <div className="flex items-center mt-1">
                  <RankBadge rank={nextRank} size="sm" />
                </div>
              </div>
              <Link to="/ranks">
                <Button variant="outline" size="sm" className="flex items-center gap-1 border-svr-primary/20">
                  <span>View All Ranks</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          )}
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Referrals</span>
                {nextRank ? (
                  <span>{referrals} / {nextRank.minReferrals}</span>
                ) : (
                  <span>{referrals}+</span>
                )}
              </div>
              <Progress value={referralProgress} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Staked Amount</span>
                {nextRank ? (
                  <span>{formatNumber(stakedAmount)} / {formatNumber(nextRank.minStaked)} SVR</span>
                ) : (
                  <span>{formatNumber(stakedAmount)}+ SVR</span>
                )}
              </div>
              <Progress value={stakedProgress} className="h-2" />
            </div>
          </div>
          
          <div className="pt-2 border-t border-svr-primary/10">
            <p className="text-xs text-muted-foreground mb-1">Current Perks</p>
            <div className="flex flex-wrap gap-1.5">
              {currentRank.perks.map((perk, i) => (
                <span 
                  key={i} 
                  className="text-xs px-2 py-0.5 bg-svr-primary/10 text-svr-primary rounded-full"
                >
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankProgressCard;
