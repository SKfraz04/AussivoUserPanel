
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Bell, Copy, Check, AlertCircle, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Deposit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [network, setNetwork] = useState<"bep20" | "trc20" | "sui">("bep20");
  const [copied, setCopied] = useState(false);

  // These would be generated per user in a real implementation
  const depositAddresses = {
    bep20: "0x1234567890abcdef1234567890abcdef12345678",
    trc20: "TXyz1234567890abcdef1234567890abcdef123456",
    sui: "0xabc1234567890abcdef1234567890abcdef123456"
  };

  const handleNetworkChange = (value: string) => {
    setNetwork(value as "bep20" | "trc20" | "sui");
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddresses[network]);
    setCopied(true);
    toast({
      title: "Address copied",
      description: "Deposit address copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-svr-dark to-svr-dark/90">
      <DashboardSidebar onLogout={handleLogout} />
      
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="p-4 border-b border-svr-primary/20 backdrop-blur-sm flex justify-between items-center">
          <h1 className="text-xl font-bold">Deposit Funds</h1>
          <Button variant="outline" size="icon" className="border-svr-primary/20">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Main content */}
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Deposit Options</h2>
            <p className="text-muted-foreground">Deposit funds to start buying and staking SVR tokens</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Deposit Crypto</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="bep20" onValueChange={handleNetworkChange}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="bep20">USDT (BEP20)</TabsTrigger>
                    <TabsTrigger value="trc20">USDT (TRC20)</TabsTrigger>
                    <TabsTrigger value="sui">SUI</TabsTrigger>
                  </TabsList>
                  
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-svr-primary/10 flex items-center">
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">
                          Deposit via {network === "bep20" ? "Binance Smart Chain" : network === "trc20" ? "Tron Network" : "Sui Blockchain"}
                        </div>
                        <div className="font-mono text-sm overflow-hidden text-ellipsis">
                          {depositAddresses[network]}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="ml-2 border-svr-primary/20"
                        onClick={handleCopyAddress}
                      >
                        {copied ? <Check className="h-4 w-4 text-svr-success" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    {network === "bep20" && (
                      <div className="text-xs text-muted-foreground bg-svr-primary/5 p-3 rounded-lg flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-svr-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground mb-1">Important Note for BEP20 Deposits:</p>
                          <p>Please ensure you are sending USDT via the Binance Smart Chain (BSC/BEP20) network. Sending tokens through other networks to this address may result in permanent loss.</p>
                        </div>
                      </div>
                    )}
                    
                    {network === "trc20" && (
                      <div className="text-xs text-muted-foreground bg-svr-primary/5 p-3 rounded-lg flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-svr-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground mb-1">Important Note for TRC20 Deposits:</p>
                          <p>Please ensure you are sending USDT via the TRON (TRC20) network. Sending tokens through other networks to this address may result in permanent loss.</p>
                        </div>
                      </div>
                    )}
                    
                    {network === "sui" && (
                      <div className="text-xs text-muted-foreground bg-svr-primary/5 p-3 rounded-lg flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-svr-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground mb-1">Important Note for SUI Deposits:</p>
                          <p>Please ensure you are sending SUI via the Sui Blockchain. Sending tokens through other networks to this address may result in permanent loss.</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col items-center justify-center pt-6">
                      <ArrowDown className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-center text-muted-foreground">
                        Your deposit will be automatically detected and credited to your account
                      </p>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t border-svr-primary/10 pt-4 block text-xs text-muted-foreground">
                <p>Minimum deposit: {network === "sui" ? "1 SUI" : "10 USDT"}</p>
                <p className="mt-1">Average confirmation time: 2-10 minutes</p>
              </CardFooter>
            </Card>
            
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    type: 'Deposit',
                    amount: '500 USDT',
                    network: 'BEP20',
                    status: 'Confirmed',
                    date: 'Apr 10, 2025'
                  },
                  {
                    type: 'Deposit',
                    amount: '1000 USDT',
                    network: 'TRC20',
                    status: 'Confirmed',
                    date: 'Apr 5, 2025'
                  },
                  {
                    type: 'Deposit',
                    amount: '50 SUI',
                    network: 'SUI',
                    status: 'Confirmed',
                    date: 'Mar 28, 2025'
                  },
                ].map((tx, i) => (
                  <div key={i} className="p-3 rounded-lg hover:bg-svr-primary/5 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{tx.type}: {tx.amount}</div>
                      <div className="text-xs px-2 py-1 rounded-full bg-svr-success/10 text-svr-success">
                        {tx.status}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                      <div>Network: {tx.network}</div>
                      <div>{tx.date}</div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center pt-4">
                  <Button variant="link" className="text-svr-primary">
                    View All Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Deposit;
