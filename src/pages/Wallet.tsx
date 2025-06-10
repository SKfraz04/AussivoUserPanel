
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import WalletMenu from '@/components/WalletMenu';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        {/* Client Panel Header */}
        <div className="p-4 border-b border-svr-primary/20 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold gradient-text">Client Wallet Panel</h1>
              <p className="text-muted-foreground text-sm">Manage your digital assets and transactions</p>
            </div>
            <Button variant="outline" size="icon" className="border-svr-primary/20">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Client Panel Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Client Panel Wrapper */}
            <Card className="dashboard-card border-svr-primary/30 bg-svr-dark/50 backdrop-blur-sm">
              <CardHeader className="border-b border-svr-primary/20">
                <CardTitle className="text-xl flex items-center">
                  <div className="w-3 h-3 bg-svr-primary rounded-full mr-3 animate-pulse"></div>
                  Wallet Management Console
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <WalletMenu {...mockWalletData} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wallet;
