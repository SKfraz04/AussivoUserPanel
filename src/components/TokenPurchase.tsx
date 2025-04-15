
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Coins, DollarSign, RefreshCw, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const networkFees = {
  bep20: 0.001,
  trc20: 0.005,
  sui: 0.02
};

const TokenPurchase = () => {
  const [amount, setAmount] = useState<number>(100);
  const [network, setNetwork] = useState<"bep20" | "trc20" | "sui">("bep20");
  const [calculating, setCalculating] = useState(false);
  const { toast } = useToast();

  // Token price would come from API or contract in a real implementation
  const tokenPrice = 0.1; // $0.1 per SVR token
  
  const handleNetworkChange = (value: string) => {
    setNetwork(value as "bep20" | "trc20" | "sui");
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };
  
  const calculateTokens = () => {
    const tokens = amount / tokenPrice;
    return tokens;
  };
  
  const calculateTotal = () => {
    const fee = networkFees[network];
    return (amount + fee).toFixed(3);
  };
  
  const handlePurchase = () => {
    setCalculating(true);
    // Simulate API call
    setTimeout(() => {
      setCalculating(false);
      toast({
        title: "Purchase Successful",
        description: `You've purchased ${calculateTokens().toFixed(2)} SVR tokens!`,
      });
    }, 1500);
  };
  
  return (
    <Card className="dashboard-card w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Buy SVR Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bep20" onValueChange={handleNetworkChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bep20">USDT (BEP20)</TabsTrigger>
            <TabsTrigger value="trc20">USDT (TRC20)</TabsTrigger>
            <TabsTrigger value="sui">SUI</TabsTrigger>
          </TabsList>
          
          <div className="mt-6 mb-4">
            <label className="text-sm font-medium block mb-2">Amount to Deposit</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="100"
                value={amount || ''}
                onChange={handleAmountChange}
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="bg-svr-primary/10 p-4 rounded-lg space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Price</span>
              <span className="font-medium">${tokenPrice} / SVR</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Network Fee</span>
              <span className="font-medium">{networkFees[network]} {network === "sui" ? "SUI" : "USDT"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Cost</span>
              <span className="font-medium">{calculateTotal()} {network === "sui" ? "SUI" : "USDT"}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-svr-primary/20">
              <span className="text-muted-foreground">You will receive</span>
              <span className="text-lg font-bold text-svr-primary">
                {calculateTokens().toFixed(2)} SVR
              </span>
            </div>
          </div>
          
          <div className="mt-6 p-3 border border-svr-primary/20 rounded-lg bg-svr-primary/5">
            <div className="flex items-start">
              <ShieldCheck className="text-svr-primary h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Secure Transaction</h4>
                <p className="text-xs text-muted-foreground">
                  All transactions are processed securely using smart contracts with automatic verification.
                </p>
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handlePurchase} 
          disabled={amount <= 0 || calculating}
          className="bg-svr-primary hover:bg-svr-primary/90 w-full"
        >
          {calculating ? (
            <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Processing</>
          ) : (
            <><Coins className="mr-2 h-4 w-4" /> Buy SVR Tokens</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenPurchase;
