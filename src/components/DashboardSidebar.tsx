import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Wallet,
  CoinsIcon,
  BarChart3,
  Users,
  Vote,
  CircleDollarSign,
  LogOut,
  Menu,
  X,
  BadgeDollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SidebarProps {
  onLogout: () => void;
}

const DashboardSidebar = ({ onLogout }: SidebarProps) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Deposit', path: '/deposit', icon: Wallet },
    { name: 'Token Sale', path: '/ico', icon: BadgeDollarSign },
    { name: 'Staking', path: '/stake', icon: CoinsIcon },
    { name: 'Rewards', path: '/rewards', icon: BarChart3 },
    { name: 'Referrals', path: '/referrals', icon: Users },
    { name: 'Governance', path: '/governance', icon: Vote },
  ];

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed z-20 top-4 left-4">
        <Button
          variant="outline"
          size="icon"
          className="border-svr-primary/20 bg-svr-dark/80 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-10 w-64 transform bg-svr-dark border-r border-svr-primary/20 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-svr-primary/20">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold gradient-text">SVR</span>
            <span className="font-medium text-foreground ml-1">Staking</span>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-svr-primary text-white"
                    : "text-muted-foreground hover:bg-svr-primary/10 hover:text-foreground"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-svr-primary/20">
          <div className="bg-svr-primary/10 p-3 rounded-lg mb-4">
            <div className="text-xs text-muted-foreground mb-1">Total Balance</div>
            <div className="text-lg font-bold gradient-text">1,250 SVR</div>
          </div>
          <Button
            variant="outline"
            className="w-full border-svr-primary/20 text-svr-danger"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect Wallet
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
