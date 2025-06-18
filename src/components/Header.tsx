import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, X, ChevronDown, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import WalletConnect from './WalletConnect';
import Logo from '../assets/Images/logo.svg';

interface HeaderProps {
  isAuthenticated?: boolean;
  walletAddress?: string;
  onLogout?: () => void;
}

const Header = ({ isAuthenticated = false, walletAddress = '', onLogout = () => {} }: HeaderProps) => {
  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  const handleWalletConnect = (walletId: string) => {
    console.log(`Connected with ${walletId}`);
  };

  return (
    <header className="relative z-20 w-full border-b border-border/40 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Aussivo" className="h-10 w-10" />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-4 ml-6">
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/wallet" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center">
              <CreditCard className="mr-1 h-4 w-4" />
              Wallet
            </Link>
            <Link to="/ico" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Token Sale
            </Link>
            <Link to="/stake" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Stake
            </Link>
            <Link to="/rewards" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Rewards
            </Link>
            <Link to="/referrals" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Referrals
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-svr-primary/30 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-svr-success animate-pulse" />
                    <span>{truncateAddress(walletAddress)}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="dark-card border-svr-primary/20">
                  <DropdownMenuItem onClick={onLogout} className="text-svr-danger flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <span>Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <WalletConnect onConnect={handleWalletConnect} />
          )}

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="dark-card border-svr-primary/20">
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/dashboard" className="text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/wallet" className="text-sm font-medium flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Wallet
                </Link>
                <Link to="/ico" className="text-sm font-medium">
                  Token Sale
                </Link>
                <Link to="/stake" className="text-sm font-medium">
                  Stake
                </Link>
                <Link to="/rewards" className="text-sm font-medium">
                  Rewards
                </Link>
                <Link to="/referrals" className="text-sm font-medium">
                  Referrals
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
