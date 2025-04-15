
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
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
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import TokenPurchase from '@/components/TokenPurchase';
import { useToast } from '@/hooks/use-toast';

const ICO = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStage, setActiveStage] = useState<number>(1);

  const handleLogout = () => {
    navigate('/');
  };

  const handleBuyNow = (stageId: number) => {
    setActiveStage(stageId);
    toast({
      title: "Stage Selected",
      description: `Now purchasing tokens at Stage ${stageId} rates`,
    });
  };
  
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

  const getStageStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="bg-svr-primary px-2 py-0.5 text-xs rounded-full">Active</span>;
      case 'upcoming':
        return <span className="bg-svr-accent/80 px-2 py-0.5 text-xs rounded-full">Upcoming</span>;
      case 'completed':
        return <span className="bg-gray-600 px-2 py-0.5 text-xs rounded-full">Completed</span>;
      default:
        return null;
    }
  };

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
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Token Sale Progress</h2>
                <p className="text-muted-foreground">Current stage: {icoStages.find(s => s.status === 'active')?.name}</p>
              </div>
              <div className="flex items-center space-x-2 bg-svr-primary/10 px-4 py-2 rounded-lg">
                <Wallet className="h-4 w-4 text-svr-primary" />
                <span className="font-medium">1,250 SVR</span>
                <span className="text-xs text-muted-foreground">Available</span>
              </div>
            </div>
            
            {/* ICO Progress Bar */}
            <div className="mt-6 bg-card border border-svr-primary/20 rounded-xl p-5">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Total Progress: 13.5M / 100M SVR (13.5%)</span>
                <span className="text-sm text-svr-primary font-medium">$1,225,000 raised</span>
              </div>
              <Progress value={13.5} className="h-3 mb-4" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {icoStages.map((stage, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">{stage.name}</div>
                    <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full">
                      <div 
                        className={`h-full ${stage.status === 'active' ? 'bg-svr-primary' : stage.status === 'completed' ? 'bg-gray-600' : 'bg-svr-accent/50'}`} 
                        style={{ width: `${(stage.sold / stage.allocation) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs mt-1">
                      {((stage.sold / stage.allocation) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Token Distribution Chart */}
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

            {/* ICO Timeline */}
            <Card className="dashboard-card">
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
                      <div className={`absolute -left-[25px] h-4 w-4 rounded-full border ${stage.status === 'active' ? 'bg-svr-primary animate-pulse' : stage.status === 'completed' ? 'bg-gray-600' : 'bg-svr-accent/70'}`}></div>
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">{stage.name}</h4>
                        {getStageStatusBadge(stage.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(stage.startDate).toLocaleDateString()} - {new Date(stage.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="stages" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="stages">ICO Stages</TabsTrigger>
              <TabsTrigger value="buy">Buy Tokens</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stages" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stagesWithMetrics.map((stage) => (
                  <Card key={stage.id} className={`dashboard-card overflow-hidden ${stage.status === 'active' ? 'border-svr-primary' : ''}`}>
                    <div className={`h-1 ${stage.status === 'active' ? 'bg-svr-primary' : stage.status === 'completed' ? 'bg-gray-600' : 'bg-svr-accent/80'}`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>{stage.name}</CardTitle>
                        {getStageStatusBadge(stage.status)}
                      </div>
                      <CardDescription className="flex items-center">
                        <BadgeDollarSign className="h-4 w-4 mr-1" />
                        ${stage.price.toFixed(2)} per token
                        {stage.discount && (
                          <span className="ml-2 text-svr-primary">{stage.discount}</span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Sold: {stage.sold.toLocaleString()} SVR</span>
                            <span>{stage.percentSold.toFixed(1)}%</span>
                          </div>
                          <Progress value={stage.percentSold} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Allocation</span>
                            <p>{stage.allocation.toLocaleString()} SVR</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Remaining</span>
                            <p>{stage.remaining.toLocaleString()} SVR</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Min Purchase</span>
                            <p>{stage.minPurchase} SVR</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Max Purchase</span>
                            <p>{stage.maxPurchase === null ? 'No limit' : `${stage.maxPurchase} SVR`}</p>
                          </div>
                        </div>
                        
                        {stage.benefits && stage.benefits.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-svr-primary/10">
                            <h5 className="text-sm font-medium mb-2 flex items-center">
                              <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-svr-primary" />
                              Stage Benefits
                            </h5>
                            <ul className="space-y-1">
                              {stage.benefits.map((benefit, i) => (
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
                        className={`w-full ${stage.status === 'active' ? 'bg-svr-primary' : 'bg-muted text-muted-foreground'}`}
                        disabled={stage.status !== 'active'}
                        onClick={() => handleBuyNow(stage.id)}
                      >
                        {stage.status === 'active' ? 'Buy Now' : stage.status === 'completed' ? 'Completed' : 'Coming Soon'}
                      </Button>
                    </CardFooter>
                  </Card>
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
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default ICO;
