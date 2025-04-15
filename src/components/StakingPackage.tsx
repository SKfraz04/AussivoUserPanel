
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Check, Lock, ArrowRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface StakingPackageProps {
  name: string;
  apy: number;
  duration: number; // in months
  minAmount: number;
  description: string;
  className?: string;
  isPopular?: boolean;
}

const StakingPackage = ({
  name,
  apy,
  duration,
  minAmount,
  description,
  className,
  isPopular = false
}: StakingPackageProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  
  return (
    <>
      <Card className={cn(
        "relative border border-border overflow-hidden transition-transform hover:shadow-xl hover:border-svr-primary/40",
        isPopular ? "border-svr-primary shadow-lg shadow-svr-primary/10" : "",
        className
      )}>
        {isPopular && (
          <div className="absolute top-0 right-0">
            <div className="bg-svr-primary text-white text-xs px-3 py-1 rotate-45 translate-y-2 translate-x-6">
              Popular
            </div>
          </div>
        )}
        <CardHeader className={cn(
          "p-6",
          isPopular ? "bg-gradient-to-r from-svr-primary/20 to-svr-secondary/20" : ""
        )}>
          <CardTitle className="flex items-center justify-between">
            <span className={cn(
              "text-lg font-bold",
              isPopular ? "gradient-text" : ""
            )}>{name}</span>
            <span className="text-xl font-bold text-svr-primary">{apy}% <span className="text-xs font-normal text-muted-foreground">APY</span></span>
          </CardTitle>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration} Months Lock Period</span>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-4">
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="mt-4 p-3 bg-svr-primary/5 rounded-lg">
            <div className="text-sm font-medium">Min. Stake Amount</div>
            <div className="text-lg font-bold">{minAmount} SVR</div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-2">
          <Button 
            onClick={() => setIsConfirmOpen(true)} 
            className={cn(
              "w-full",
              isPopular ? "bg-svr-primary hover:bg-svr-primary/90" : ""
            )}
          >
            Stake Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="dark-card border-svr-primary/20">
          <DialogHeader>
            <DialogTitle>Confirm Staking</DialogTitle>
            <DialogDescription>
              You are about to stake your SVR tokens in the {name} package.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-svr-primary/10">
              <span>Package</span>
              <span className="font-medium">{name}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-svr-primary/10">
              <span>APY Rate</span>
              <span className="font-medium text-svr-primary">{apy}%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-svr-primary/10">
              <span>Lock Period</span>
              <span className="font-medium">{duration} Months</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-svr-primary/10">
              <span>Minimum Amount</span>
              <span className="font-medium">{minAmount} SVR</span>
            </div>
            
            <div className="flex items-center p-3 rounded-lg bg-muted/20">
              <Info className="h-4 w-4 text-muted-foreground mr-2" />
              <p className="text-xs text-muted-foreground">
                Your tokens will be locked for {duration} months. Early unstaking will incur penalties.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
            <Button className="bg-svr-primary hover:bg-svr-primary/90">
              <Lock className="mr-2 h-4 w-4" /> Stake SVR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StakingPackage;
