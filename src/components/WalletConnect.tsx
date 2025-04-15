
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Wallet, ArrowRight, Info } from 'lucide-react';

// Mock wallets that would be available
const WALLETS = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊' },
  { id: 'walletconnect', name: 'WalletConnect', icon: '🔗' },
  { id: 'sui', name: 'Sui Wallet', icon: '💧' }
];

interface WalletConnectProps {
  onConnect: (wallet: string) => void;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleWalletSelect = async (walletId: string) => {
    setConnecting(walletId);
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, we would connect to the actual wallet here
    onConnect(walletId);
    setConnecting(null);
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="rounded-full px-6 bg-gradient-to-r from-svr-primary to-svr-secondary hover:brightness-110 transition-all duration-300"
      >
        <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md dark-card border-svr-primary/20">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold gradient-text">Connect Your Wallet</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col space-y-3 py-4">
            {WALLETS.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleWalletSelect(wallet.id)}
                disabled={connecting !== null}
                className="wallet-button group"
              >
                <span className="text-2xl mr-2">{wallet.icon}</span>
                <span className="flex-1 text-left font-medium">{wallet.name}</span>
                {connecting === wallet.id ? (
                  <div className="h-5 w-5 rounded-full border-2 border-svr-primary/30 border-t-svr-primary animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4 text-svr-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 bg-svr-primary/10 p-3 rounded-lg mt-2">
            <Info className="h-4 w-4 text-svr-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              By connecting your wallet, you agree to the Terms of Service and Privacy Policy
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnect;
