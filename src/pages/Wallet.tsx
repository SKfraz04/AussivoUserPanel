
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import WalletMenu from '@/components/WalletMenu';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Wallet = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  // Mock wallet data - replace with actual data from your backend
  const mockWalletData = {
    depositWallet: {
      usdt: 5420.75
    },
    aussivoWallet: {
      svr: 12500.00
    },
    stakingWallet: {
      usdt: 285.50,
      svr: 1250.00
    },
    withdrawalWallet: {
      usdt: 142.25,
      svr: 625.00
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-svr-dark to-svr-dark/90">
      <DashboardSidebar onLogout={handleLogout} />
      
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="p-4 border-b border-svr-primary/20 backdrop-blur-sm flex justify-between items-center">
          <h1 className="text-xl font-bold">Wallet Management</h1>
          <Button variant="outline" size="icon" className="border-svr-primary/20">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Main content */}
        <main className="p-6">
          <WalletMenu {...mockWalletData} />
        </main>
      </div>
    </div>
  );
};

export default Wallet;
