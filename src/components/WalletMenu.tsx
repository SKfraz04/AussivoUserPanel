
import { useState } from 'react';
import { 
  Wallet, 
  DollarSign, 
  Coins, 
  TrendingUp, 
  ArrowDownToLine,
  ArrowUpFromLine,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface WalletBalance {
  usdt: number;
  svr: number;
}

interface WalletMenuProps {
  depositWallet: { usdt: number };
  aussivoWallet: { svr: number };
  stakingWallet: WalletBalance;
  withdrawalWallet: WalletBalance;
}

const WalletMenu = ({ 
  depositWallet, 
  aussivoWallet, 
  stakingWallet, 
  withdrawalWallet 
}: WalletMenuProps) => {
  const [showBalances, setShowBalances] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatTokens = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getTotalUSDTValue = () => {
    return depositWallet.usdt + stakingWallet.usdt + withdrawalWallet.usdt;
  };

  const getTotalSVRValue = () => {
    return aussivoWallet.svr + stakingWallet.svr + withdrawalWallet.svr;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Wallet className="h-6 w-6 text-svr-primary mr-2" />
          <h2 className="text-2xl font-bold">Wallet Overview</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowBalances(!showBalances)}
          className="border-svr-primary/20"
        >
          {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>

      {/* Total Balance Summary */}
      <Card className="dashboard-card border-svr-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-svr-primary" />
            Total Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-svr-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total USDT</p>
              <p className="text-2xl font-bold text-svr-primary">
                {showBalances ? formatCurrency(getTotalUSDTValue()) : '****'}
              </p>
            </div>
            <div className="text-center p-4 bg-svr-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total SVR</p>
              <p className="text-2xl font-bold text-svr-primary">
                {showBalances ? `${formatTokens(getTotalSVRValue())} SVR` : '****'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Wallets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Deposit Wallet */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <ArrowDownToLine className="mr-2 h-5 w-5 text-green-500" />
              Deposit Wallet
            </CardTitle>
            <CardDescription>Your deposited funds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">USDT Balance</span>
                <span className="font-medium text-lg">
                  {showBalances ? formatCurrency(depositWallet.usdt) : '****'}
                </span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Deposit USDT
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Aussivo Wallet */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Coins className="mr-2 h-5 w-5 text-svr-primary" />
              Aussivo Wallet
            </CardTitle>
            <CardDescription>SVR tokens from ICO purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">SVR Balance</span>
                <span className="font-medium text-lg text-svr-primary">
                  {showBalances ? `${formatTokens(aussivoWallet.svr)} SVR` : '****'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Transfer to Staking
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Staking Wallet */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
              Staking Wallet
            </CardTitle>
            <CardDescription>Rewards from staking activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">USDT Rewards</span>
                <span className="font-medium">
                  {showBalances ? formatCurrency(stakingWallet.usdt) : '****'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">SVR Rewards</span>
                <span className="font-medium text-svr-primary">
                  {showBalances ? `${formatTokens(stakingWallet.svr)} SVR` : '****'}
                </span>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Claim USDT
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Claim SVR
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Wallet */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <ArrowUpFromLine className="mr-2 h-5 w-5 text-orange-500" />
              Withdrawal Wallet
            </CardTitle>
            <CardDescription>Available for withdrawal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">USDT</span>
                  <Badge variant="secondary" className="ml-2 text-xs">Rewards Only</Badge>
                </div>
                <span className="font-medium">
                  {showBalances ? formatCurrency(withdrawalWallet.usdt) : '****'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">SVR Tokens</span>
                <span className="font-medium text-svr-primary">
                  {showBalances ? `${formatTokens(withdrawalWallet.svr)} SVR` : '****'}
                </span>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  disabled={withdrawalWallet.usdt === 0}
                >
                  Withdraw USDT
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  disabled={withdrawalWallet.svr === 0}
                >
                  Withdraw SVR
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History Link */}
      <Card className="dashboard-card">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Need more details?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View your complete transaction history and wallet movements
            </p>
            <Button variant="outline" className="border-svr-primary/30">
              View Transaction History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletMenu;
