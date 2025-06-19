import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Wallet, ArrowRight, Info } from 'lucide-react';
import { useActiveAccount, useSetActiveWallet, useActiveWallet } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "@/lib/thirdweb";

// Define supported wallets
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.trustwallet.app"),
  createWallet("walletConnect"),
];

// Wallet display information
// Note: TronLink requires separate integration using @tronweb3/tronwallet-adapters
// as it operates on TRON blockchain which is not EVM-compatible
const WALLET_INFO = [
  { 
    id: 'io.metamask', 
    name: 'MetaMask', 
    icon: '🦊',
    description: 'Connect using browser extension'
  },
  { 
    id: 'com.trustwallet.app', 
    name: 'Trust Wallet', 
    icon: '🛡️',
    description: 'Connect using Trust Wallet mobile app'
  },
  { 
    id: 'walletConnect', 
    name: 'WalletConnect', 
    icon: '🔗',
    description: 'Connect using WalletConnect protocol'
  },
  { 
    id: 'tronlink', 
    name: 'TronLink', 
    icon: '⚡',
    description: 'TRON blockchain wallet (requires separate integration)',
    disabled: true
  }
];

interface WalletConnectProps {
  onConnect: (address: string) => void;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const setActiveWallet = useSetActiveWallet();
  const activeWallet = useActiveWallet();
  const account = useActiveAccount();

  const handleWalletSelect = async (walletId: string) => {
    try {
      setIsConnecting(true);
      
      // Handle TronLink separately as it requires different integration
      if (walletId === 'tronlink') {
        alert('TronLink integration requires a separate implementation using @tronweb3/tronwallet-adapters package for TRON blockchain. This would need to be implemented alongside the current EVM wallet integration.');
        return;
      }
      
      const selectedWallet = wallets.find(w => w.id === walletId);
      if (!selectedWallet) return;

      // Connect to the wallet using the new API
      await selectedWallet.connect({ client });
      
      // Set as active wallet
      setActiveWallet(selectedWallet);
      
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    try {
      // Reload the page to reset the wallet state
      window.location.reload();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  // If wallet is already connected, show disconnect button
  if (account) {
    return (
      <Button 
        onClick={handleDisconnect}
        variant="outline"
        className="rounded-full px-6 border-svr-primary/30 bg-gradient-to-r from-svr-primary/10 to-svr-accent/10 hover:brightness-110 transition-all duration-300"
      >
        <Wallet className="mr-2 h-4 w-4" /> 
        {account.address.slice(0, 6)}...{account.address.slice(-4)}
      </Button>
    );
  }

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="rounded-full px-6 bg-gradient-to-r from-svr-primary to-svr-accent hover:brightness-110 transition-all duration-300"
      >
        <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md dark-card border-svr-primary/20">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold gradient-text">Connect Your Wallet</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col space-y-3 py-4">
            {WALLET_INFO.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleWalletSelect(wallet.id)}
                disabled={isConnecting || wallet.disabled}
                className={`wallet-button group ${wallet.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="text-2xl mr-3">{wallet.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{wallet.name}</div>
                  <div className="text-xs text-muted-foreground">{wallet.description}</div>
                </div>
                {wallet.disabled ? (
                  <div className="text-xs text-muted-foreground">Coming Soon</div>
                ) : isConnecting ? (
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
