import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import TokenBuyDialog from '@/components/TokenBuyDialog';
import { 
  Bell, 
  Wallet, 
  Clock, 
  TrendingUp, 
  BadgePercent, 
  BadgeDollarSign,
  Info,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  BarChart3,
  ArrowUpRight,
  Calendar,
  Globe,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import TokenPurchase from '@/components/TokenPurchase';
import TokenSaleStatus from '@/components/TokenSaleStatus';
import TokenPurchaseHistory from '@/components/TokenPurchaseHistory';
import Countdown from '@/components/Countdown';
import { useToast } from '@/hooks/use-toast';

const ICO = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStage, setActiveStage] = useState<number>(1);
  const [highlightedStage, setHighlightedStage] = useState<number | null>(null);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const handleBuyNow = (stageId: number) => {
    setActiveStage(stageId);
    setBuyDialogOpen(true);
    toast({
      title: "Stage Selected",
      description: `Now purchasing tokens at Stage ${stageId} rates`,
    });
  };
  
  // Auto-highlight stages in rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedStage(prev => {
        if (prev === null || prev >= icoStages.length) return 1;
        return prev + 1;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // ICO Stages data
  const icoStages = [
    {
      id: 1,
      name: "Private Sale",
      price: 0.05,
      discount: "50% off",
      allocation: 10000000,
      sold: 8500000,
      status: "active",
      startDate: "2025-03-01",
      endDate: "2025-04-30",
      minPurchase: 100,
      maxPurchase: 50000,
      benefits: ["Early access to platform features", "Higher staking rewards", "Premium governance rights"]
    },
    {
      id: 2,
      name: "Pre-Sale Phase 1",
      price: 0.08,
      discount: "20% off",
      allocation: 20000000,
      sold: 5000000,
      status: "upcoming",
      startDate: "2025-05-01",
      endDate: "2025-06-15",
      minPurchase: 50,
      maxPurchase: 100000,
      benefits: ["Priority access to new staking packages", "Reduced platform fees"]
    },
    {
      id: 3,
      name: "Pre-Sale Phase 2",
      price: 0.09,
      discount: "10% off",
      allocation: 25000000,
      sold: 0,
      status: "upcoming",
      startDate: "2025-06-16",
      endDate: "2025-07-31",
      minPurchase: 50,
      maxPurchase: null,
      benefits: ["Early access to marketplace features"]
    },
    {
      id: 4,
      name: "Public Sale",
      price: 0.10,
      discount: null,
      allocation: 45000000,
      sold: 0,
      status: "upcoming",
      startDate: "2025-08-01",
      endDate: "2025-09-30",
      minPurchase: 10,
      maxPurchase: null,
      benefits: []
    }
  ];
  
  // Calculate remaining tokens and progress for each stage
  const stagesWithMetrics = icoStages.map(stage => {
    const remaining = stage.allocation - stage.sold;
    const percentSold = (stage.sold / stage.allocation) * 100;
    
    return {
      ...stage,
      remaining,
      percentSold
    };
  });

  // Calculate total tokens sold and total allocation
  const totalSold = icoStages.reduce((acc, stage) => acc + stage.sold, 0);
  const totalAllocation = icoStages.reduce((acc, stage) => acc + stage.allocation, 0);
  const totalPercentSold = (totalSold / totalAllocation) * 100;
  const totalRaised = icoStages.reduce((acc, stage) => acc + (stage.sold * stage.price), 0);

  const currentStage = icoStages.find(s => s.id === activeStage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-svr-dark to-svr-dark/90">
      <DashboardSidebar onLogout={handleLogout} />
      
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="p-4 border-b border-svr-primary/20 backdrop-blur-sm flex justify-between items-center">
          <h1 className="text-xl font-bold">SVR Token Sale</h1>
          <Button variant="outline" size="icon" className="border-svr-primary/20">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Main content */}
        <main className="p-6">
          {/* Featured ICO Banner */}
          <div className="mb-8">
            <Card className="border-svr-primary/30 bg-gradient-to-br from-svr-dark/90 to-svr-dark/70 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold mb-2 gradient-text">SVR Token Sale</h2>
                    <p className="text-muted-foreground mb-6">
                      Join our token sale and become part of the future of decentralized computing
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Overall Progress</span>
                          <span className="text-sm text-svr-primary">{totalPercentSold.toFixed(1)}%</span>
                        </div>
                        <Progress value={totalPercentSold} className="h-2 mb-1" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{totalSold.toLocaleString()} SVR sold</span>
                          <span>{totalAllocation.toLocaleString()} SVR total</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BadgeDollarSign className="h-4 w-4 mr-2 text-svr-primary" />
                            <span className="text-sm">Total Raised</span>
                          </div>
                          <span className="font-bold">${totalRaised.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-svr-primary" />
                            <span className="text-sm">Current Stage</span>
                          </div>
                          <span className="font-bold">
                            {icoStages.find(s => s.status === "active")?.name || "No active stage"}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-svr-primary" />
                            <span className="text-sm">Time Remaining</span>
                          </div>
                          <span className="font-bold text-svr-primary">
                            {icoStages.find(s => s.status === "active")?.endDate ? (
                              new Date(icoStages.find(s => s.status === "active")?.endDate || "").toLocaleDateString()
                            ) : (
                              "N/A"
                            )}
                          </span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-svr-primary hover:bg-svr-primary/90" 
                        onClick={() => handleBuyNow(icoStages.find(s => s.status === "active")?.id || 1)}
                      >
                        Buy Tokens Now <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-svr-primary/10 p-8 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-4">Why Invest in SVR?</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-svr-primary/20 flex items-center justify-center mr-3 mt-0.5">
                          <Globe className="h-3.5 w-3.5 text-svr-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Decentralized Computing Network</p>
                          <p className="text-sm text-muted-foreground">
                            SVR powers a global network of computing resources
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-svr-primary/20 flex items-center justify-center mr-3 mt-0.5">
                          <BarChart3 className="h-3.5 w-3.5 text-svr-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Strong Tokenomics</p>
                          <p className="text-sm text-muted-foreground">
                            Limited supply with deflationary mechanisms
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-svr-primary/20 flex items-center justify-center mr-3 mt-0.5">
                          <Lock className="h-3.5 w-3.5 text-svr-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Security by Design</p>
                          <p className="text-sm text-muted-foreground">
                            Robust security protocols and audited smart contracts
                          </p>
                        </div>
                      </li>
                    </ul>
                    
                    {icoStages.find(s => s.status === "active") && (
                      <div className="mt-6 pt-6 border-t border-svr-primary/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="h-4 w-4 text-svr-primary" />
                          <p className="text-sm font-medium">Current stage ends in:</p>
                        </div>
                        <Countdown targetDate={icoStages.find(s => s.status === "active")?.endDate || ""} />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="stages" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="stages">ICO Stages</TabsTrigger>
              <TabsTrigger value="buy">Buy Tokens</TabsTrigger>
              <TabsTrigger value="history">Purchase History</TabsTrigger>
              <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stages" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stagesWithMetrics.map((stage) => (
                  <TokenSaleStatus
                    key={stage.id}
                    stageName={stage.name}
                    stageId={stage.id}
                    price={stage.price}
                    discount={stage.discount}
                    tokensSold={stage.sold}
                    tokensTotal={stage.allocation}
                    endDate={stage.endDate}
                    status={stage.status as 'active' | 'upcoming' | 'completed'}
                    minPurchase={stage.minPurchase}
                    maxPurchase={stage.maxPurchase}
                    benefits={stage.benefits}
                    highlightedStage={highlightedStage === stage.id}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>

              <Alert className="bg-svr-primary/10 border-svr-primary/20">
                <Info className="h-4 w-4" />
                <AlertTitle>Token Vesting Information</AlertTitle>
                <AlertDescription>
                  Tokens purchased during Private Sale and Pre-Sale phases will be subject to a vesting schedule.
                  Private Sale: 6 month lock, then 20% released monthly.
                  Pre-Sale: 3 month lock, then 25% released monthly.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="buy" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Purchase SVR Tokens</h2>
                <p className="text-muted-foreground mb-6">
                  You're purchasing tokens in the <span className="font-medium text-svr-primary">
                    {icoStages.find(s => s.id === activeStage)?.name}
                  </span> at <span className="font-medium text-svr-primary">
                    ${icoStages.find(s => s.id === activeStage)?.price.toFixed(2)}
                  </span> per token
                </p>
                
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2">
                    <TokenPurchase />
                  </div>
                  
                  <div className="lg:w-1/2">
                    <Card className="dashboard-card mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <TrendingUp className="mr-2 h-5 w-5 text-svr-primary" />
                          Price Schedule
                        </CardTitle>
                        <CardDescription>Token price increases with each stage</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {icoStages.map((stage) => (
                            <div key={stage.id} className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{stage.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(stage.startDate).toLocaleDateString()} - {new Date(stage.endDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">${stage.price.toFixed(2)}</p>
                                {stage.discount && <p className="text-sm text-svr-primary">{stage.discount}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Important Notice</AlertTitle>
                      <AlertDescription>
                        The price of SVR tokens increases with each stage. The current active stage is
                        {' '}{icoStages.find(s => s.status === 'active')?.name} at ${icoStages.find(s => s.status === 'active')?.price.toFixed(2)} per token.
                        Once this allocation is sold out, the price will increase to the next stage.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <TokenPurchaseHistory />
            </TabsContent>
            
            <TabsContent value="tokenomics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BadgePercent className="mr-2 h-5 w-5 text-svr-primary" />
                      Token Distribution
                    </CardTitle>
                    <CardDescription>Total Supply: 100,000,000 SVR</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Public Sale (45%)</span>
                          <span className="text-sm text-svr-primary">45,000,000 SVR</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Pre-Sale Phase 2 (25%)</span>
                          <span className="text-sm text-svr-primary">25,000,000 SVR</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Pre-Sale Phase 1 (20%)</span>
                          <span className="text-sm text-svr-primary">20,000,000 SVR</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Private Sale (10%)</span>
                          <span className="text-sm text-svr-primary">10,000,000 SVR</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-svr-primary" />
                      Token Utility
                    </CardTitle>
                    <CardDescription>How SVR tokens are used in the ecosystem</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 border border-svr-primary/10 rounded-lg">
                        <div className="p-2 bg-svr-primary/10 rounded-full">
                          <Lock className="h-4 w-4 text-svr-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Staking and Validation</p>
                          <p className="text-sm text-muted-foreground">
                            Lock SVR tokens to earn rewards and participate in network validation
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 border border-svr-primary/10 rounded-lg">
                        <div className="p-2 bg-svr-primary/10 rounded-full">
                          <BadgeDollarSign className="h-4 w-4 text-svr-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Transaction Fees</p>
                          <p className="text-sm text-muted-foreground">
                            Used to pay for transactions and services within the network
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 border border-svr-primary/10 rounded-lg">
                        <div className="p-2 bg-svr-primary/10 rounded-full">
                          <ShieldCheck className="h-4 w-4 text-svr-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Governance</p>
                          <p className="text-sm text-muted-foreground">
                            Hold SVR to vote on platform decisions and proposals
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="dashboard-card lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-svr-primary" />
                      ICO Timeline
                    </CardTitle>
                    <CardDescription>Key dates for token sale stages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l border-svr-primary/30 pl-6 space-y-6">
                      {icoStages.map((stage, index) => (
                        <div key={index} className="relative">
                          <div className={`absolute -left-[25px] h-5 w-5 rounded-full border ${
                            stage.status === 'active' 
                              ? 'bg-svr-primary animate-pulse' 
                              : stage.status === 'completed' 
                                ? 'bg-gray-600' 
                                : 'bg-svr-accent/70'
                          }`}></div>
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div>
                              <h4 className="font-medium flex items-center gap-2">
                                {stage.name}
                                {stage.status === 'active' && (
                                  <span className="bg-svr-primary px-2 py-0.5 text-xs rounded-full text-white">
                                    Active
                                  </span>
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(stage.startDate).toLocaleDateString()} - {new Date(stage.endDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <div className="text-right">
                                <span className="font-medium">${stage.price.toFixed(2)}</span> per token
                                {stage.discount && <span className="ml-2 text-svr-primary">{stage.discount}</span>}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <span>{stage.sold.toLocaleString()} /</span>
                                <span>{stage.allocation.toLocaleString()} SVR</span>
                                <span className="text-svr-primary ml-1">
                                  ({((stage.sold / stage.allocation) * 100).toFixed(1)}%)
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Token Buy Dialog */}
      <TokenBuyDialog
        open={buyDialogOpen}
        onOpenChange={setBuyDialogOpen}
        stageId={activeStage}
        stageName={currentStage?.name || ""}
        stagePrice={currentStage?.price || 0.05}
        stageDiscount={currentStage?.discount}
      />
    </div>
  );
};

export default ICO;
