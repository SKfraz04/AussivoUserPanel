import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, 
  Coins, 
  DollarSign, 
  RefreshCw, 
  ShieldCheck, 
  CreditCard, 
  Copy,
  CheckCircle,
  AlertCircle,
  Wallet,
  Clock,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TokenBuyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stageId: number;
  stageName: string;
  stagePrice: number;
  stageDiscount?: string | null;
}

const networkFees = {
  bep20: 0.001,
  trc20: 0.005,
  sui: 0.02,
  ramper: 0
};

const TokenBuyDialog = ({ open, onOpenChange, stageId, stageName, stagePrice, stageDiscount }: TokenBuyDialogProps) => {
  const [amount, setAmount] = useState<number>(100);
  const [network, setNetwork] = useState<"bep20" | "trc20" | "sui" | "ramper">("bep20");
  const [calculating, setCalculating] = useState(false);
  const [step, setStep] = useState<"select" | "payment" | "confirmation">("select");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleNetworkChange = (value: string) => {
    setNetwork(value as "bep20" | "trc20" | "sui" | "ramper");
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };
  
  const calculateTokens = () => {
    const tokens = amount / stagePrice;
    return tokens;
  };
  
  const calculateTotal = () => {
    const fee = networkFees[network];
    return (amount + fee).toFixed(3);
  };

  const handleCopyAddress = () => {
    const address = "0x742d35Cc6634C0532925a3b8D039C22dE4d4E0";
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast({
      title: "Address Copied",
      description: "Wallet address has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedToPayment = () => {
    if (network === "ramper") {
      handleRamperRedirect();
    } else {
      setStep("payment");
    }
  };

  const handleRamperRedirect = () => {
    window.open("https://buy.ramp.network", "_blank");
    toast({
      title: "Redirecting to Ramper",
      description: "You will be redirected to complete your purchase."
    });
    onOpenChange(false);
  };

  const handleConfirmPayment = () => {
    setCalculating(true);
    setTimeout(() => {
      setCalculating(false);
      setStep("confirmation");
      toast({
        title: "Payment Submitted",
        description: "Your transaction has been submitted for processing.",
      });
    }, 2000);
  };

  const handleClose = () => {
    setStep("select");
    setAmount(100);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <Coins className="mr-2 h-5 w-5 text-svr-primary" />
            Buy SVR Tokens - {stageName}
          </DialogTitle>
        </DialogHeader>

        {step === "select" && (
          <div className="space-y-6">
            {/* Stage Info */}
            <div className="bg-svr-primary/10 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-foreground">Current Stage: {stageName}</span>
                {stageDiscount && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    {stageDiscount}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Token Price</span>
                <span className="text-lg font-bold text-svr-primary">${stagePrice.toFixed(2)} / SVR</span>
              </div>
            </div>

            <Tabs defaultValue="bep20" onValueChange={handleNetworkChange}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="bep20">USDT (BEP20)</TabsTrigger>
                <TabsTrigger value="trc20">USDT (TRC20)</TabsTrigger>
                <TabsTrigger value="sui">SUI</TabsTrigger>
                <TabsTrigger value="ramper">Credit Card</TabsTrigger>
              </TabsList>
              
              {network !== "ramper" ? (
                <TabsContent value={network} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2 text-foreground">Amount to Invest</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="100"
                        value={amount || ''}
                        onChange={handleAmountChange}
                        className="pl-9"
                        min="1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum: ${network === "bep20" ? "50" : "10"}
                    </p>
                  </div>
                  
                  <div className="bg-card border border-border p-4 rounded-lg space-y-3">
                    <h4 className="font-medium text-foreground">Purchase Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground">Investment Amount</span>
                        <span className="text-foreground">${amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground">Token Price</span>
                        <span className="text-foreground">${stagePrice} / SVR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground">Network Fee</span>
                        <span className="text-foreground">{networkFees[network]} {network === "sui" ? "SUI" : "USDT"}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-foreground">Total Cost</span>
                        <span className="font-medium text-foreground">{calculateTotal()} {network === "sui" ? "SUI" : "USDT"}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="font-medium text-foreground">You will receive</span>
                        <span className="text-lg font-bold text-svr-primary">
                          {calculateTokens().toFixed(2)} SVR
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ) : (
                <TabsContent value="ramper" className="space-y-4">
                  <div className="bg-svr-primary/5 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <CreditCard className="h-5 w-5 text-svr-primary mr-2" />
                      <h3 className="font-medium text-foreground">Buy with Credit Card</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Purchase SVR tokens directly with your credit card through our secure Ramper integration.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="bg-svr-primary/10 p-3 rounded-lg text-center">
                        <ArrowRight className="h-4 w-4 text-svr-primary mx-auto mb-1" />
                        <span className="text-xs text-foreground">100+ countries</span>
                      </div>
                      <div className="bg-svr-primary/10 p-3 rounded-lg text-center">
                        <ShieldCheck className="h-4 w-4 text-svr-primary mx-auto mb-1" />
                        <span className="text-xs text-foreground">Secure payments</span>
                      </div>
                      <div className="bg-svr-primary/10 p-3 rounded-lg text-center">
                        <Clock className="h-4 w-4 text-svr-primary mx-auto mb-1" />
                        <span className="text-xs text-foreground">Instant delivery</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleProceedToPayment}
                disabled={amount <= 0}
                className="bg-svr-primary hover:bg-svr-primary/90"
              >
                {network === "ramper" ? (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Continue to Ramper
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-200">Payment Instructions</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Send exactly <span className="font-bold">{calculateTotal()}</span> {network === "sui" ? "SUI" : "USDT"} to the address below.
                    Your tokens will be credited automatically after confirmation.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">
                  Send {network === "sui" ? "SUI" : "USDT"} to this address:
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    value="0x742d35Cc6634C0532925a3b8D039C22dE4d4E0"
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyAddress}
                    className="flex-shrink-0"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Info className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">Transaction Details</span>
                </div>
                <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <div className="flex justify-between">
                    <span>Network:</span>
                    <span className="font-medium">{network.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount to send:</span>
                    <span className="font-medium">{calculateTotal()} {network === "sui" ? "SUI" : "USDT"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>You will receive:</span>
                    <span className="font-medium">{calculateTokens().toFixed(2)} SVR</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("select")}>
                Back
              </Button>
              <Button 
                onClick={handleConfirmPayment}
                disabled={calculating}
                className="bg-svr-primary hover:bg-svr-primary/90"
              >
                {calculating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    I've Sent the Payment
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "confirmation" && (
          <div className="space-y-6 text-center">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                Payment Submitted Successfully!
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your transaction has been submitted for processing. You will receive your SVR tokens once the payment is confirmed on the blockchain.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Transaction Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Stage:</span>
                  <span>{stageName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Invested:</span>
                  <span>${amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Token Price:</span>
                  <span>${stagePrice.toFixed(2)} / SVR</span>
                </div>
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span>{network.toUpperCase()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>SVR Tokens:</span>
                  <span className="text-svr-primary">{calculateTokens().toFixed(2)} SVR</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Confirmation typically takes 5-15 minutes</p>
              <p>• You'll receive an email notification once processed</p>
              <p>• Tokens will appear in your dashboard wallet</p>
            </div>

            <Button 
              onClick={handleClose}
              className="bg-svr-primary hover:bg-svr-primary/90 w-full"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TokenBuyDialog;
