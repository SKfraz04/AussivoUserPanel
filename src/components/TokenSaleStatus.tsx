
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, BadgeDollarSign, ChevronRight, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import Countdown from '@/components/Countdown';

interface TokenSaleStatusProps {
  stageName: string;
  stageId: number;
  price: number;
  discount?: string;
  tokensSold: number;
  tokensTotal: number;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
  minPurchase?: number;
  maxPurchase?: number | null;
  benefits?: string[];
  highlightedStage?: boolean;
  onBuyNow: (stageId: number) => void;
}

const TokenSaleStatus = ({
  stageName,
  stageId,
  price,
  discount,
  tokensSold,
  tokensTotal,
  endDate,
  status,
  minPurchase = 10,
  maxPurchase = null,
  benefits = [],
  highlightedStage = false,
  onBuyNow
}: TokenSaleStatusProps) => {
  const percentSold = (tokensSold / tokensTotal) * 100;
  const remaining = tokensTotal - tokensSold;
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  
  useEffect(() => {
    const endTime = new Date(endDate).getTime();
    const updateTimeRemaining = () => {
      const now = new Date().getTime();
      const distance = endTime - now;
      setTimeRemaining(distance > 0 ? distance : 0);
    };
    
    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);
    
    return () => clearInterval(interval);
  }, [endDate]);

  const getStatusBadge = () => {
    switch(status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-svr-primary text-primary-foreground font-normal border-none">
            Active
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge variant="outline" className="bg-svr-accent/80 text-primary-foreground font-normal border-none">
            Upcoming
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-gray-600 text-primary-foreground font-normal border-none">
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`dashboard-card overflow-hidden transition-all duration-300 hover:shadow-lg ${
      highlightedStage ? 'border-svr-primary/60 shadow-lg shadow-svr-primary/10' : 'border-svr-primary/20'
    }`}>
      <div className={`h-1 ${status === 'active' ? 'bg-svr-primary' : status === 'completed' ? 'bg-gray-600' : 'bg-svr-accent/80'}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className={highlightedStage ? 'text-svr-primary' : ''}>{stageName}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription className="flex items-center">
          <BadgeDollarSign className="h-4 w-4 mr-1" />
          ${price.toFixed(2)} per token
          {discount && (
            <span className="ml-2 text-svr-primary">{discount}</span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Sold: {tokensSold.toLocaleString()} SVR</span>
              <span>{percentSold.toFixed(1)}%</span>
            </div>
            <Progress value={percentSold} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Allocation</span>
              <p>{tokensTotal.toLocaleString()} SVR</p>
            </div>
            <div>
              <span className="text-muted-foreground">Remaining</span>
              <p>{remaining.toLocaleString()} SVR</p>
            </div>
            <div>
              <span className="text-muted-foreground">Min Purchase</span>
              <p>{minPurchase} SVR</p>
            </div>
            <div>
              <span className="text-muted-foreground">Max Purchase</span>
              <p>{maxPurchase === null ? 'No limit' : `${maxPurchase} SVR`}</p>
            </div>
          </div>
          
          {status === 'active' && timeRemaining > 0 && (
            <div className="bg-svr-primary/5 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-svr-primary" />
                <p className="text-sm font-medium">Time remaining:</p>
              </div>
              <Countdown targetDate={endDate} />
            </div>
          )}
          
          {status === 'active' && percentSold > 85 && (
            <div className="flex items-center gap-2 p-2 bg-svr-accent/10 text-svr-accent rounded-md">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-xs">Almost sold out! Only {remaining.toLocaleString()} tokens left.</p>
            </div>
          )}
          
          {benefits && benefits.length > 0 && (
            <div className="mt-3 pt-3 border-t border-svr-primary/10">
              <h5 className="text-sm font-medium mb-2 flex items-center">
                {highlightedStage ? (
                  <Sparkles className="h-3.5 w-3.5 mr-1.5 text-svr-primary" />
                ) : (
                  <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-svr-primary" />
                )}
                Stage Benefits
              </h5>
              <ul className="space-y-1">
                {benefits.map((benefit, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start">
                    <ChevronRight className="h-3 w-3 mr-1 text-svr-primary flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full ${status === 'active' ? 'bg-svr-primary' : 'bg-muted text-muted-foreground'}`}
          disabled={status !== 'active'}
          onClick={() => onBuyNow(stageId)}
        >
          {status === 'active' ? 'Buy Now' : status === 'completed' ? 'Completed' : 'Coming Soon'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenSaleStatus;
