import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import WalletConnect from '@/components/WalletConnect';
import StakingPackage from '@/components/StakingPackage';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Landmark, Zap, Award, ChevronDown } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleWalletConnect = (walletId: string) => {
    const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
    setWalletAddress(mockAddress);
    setIsAuthenticated(true);
    
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setWalletAddress('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-svr-dark to-svr-dark/90">
      <Header 
        isAuthenticated={isAuthenticated}
        walletAddress={walletAddress}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 md:py-32">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Stake <span className="gradient-text">Aussivo Tokens</span> For Optimal Yields
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                Secure, transparent, and high-yield staking platform powered by Victor Development, offering flexible blockchain investment strategies.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <WalletConnect onConnect={handleWalletConnect} />
                <Button variant="outline" className="border-svr-primary/30 bg-gradient-to-r from-svr-primary to-svr-secondary hover:brightness-110 transition-all duration-300">
                  Learn More <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative z-10 p-6 md:p-8 bg-card rounded-2xl border border-svr-primary/20 shadow-xl shadow-svr-primary/10">
                <h3 className="text-xl font-semibold mb-4">Current APY Rates</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Micro Node', apy: '4%', duration: '6 Months' },
                    { name: 'Compute Booster', apy: '5.5%', duration: '12 Months' },
                    { name: 'Data Streamer', apy: '6.5%', duration: '12 Months' },
                    { name: 'Edge Power Node', apy: '7.5%', duration: '18 Months' },
                    { name: 'Core Validator Tier', apy: '9%', duration: '24 Months' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-svr-primary/5 hover:bg-svr-primary/10 transition-colors">
                      <span className="font-medium">{item.name}</span>
                      <div className="text-right">
                        <span className="text-svr-primary font-bold">{item.apy}</span>
                        <span className="text-xs text-muted-foreground block">{item.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6  bg-gradient-to-r from-svr-primary to-svr-secondary hover:brightness-110 transition-all duration-300" onClick={() => navigate('/stake')}>
                  View All Packages <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-svr-primary opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-svr-accent opacity-10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-svr-dark/50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Key Platform Features</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Discover the advantages of staking your SVR tokens on our secure platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-6 w-6 text-svr-primary" />,
                title: 'Secure Staking',
                description: 'Smart contract audited by leading security firms to ensure your funds are safe'
              },
              {
                icon: <Landmark className="h-6 w-6 text-svr-primary" />,
                title: 'Flexible Packages',
                description: 'Choose from multiple staking packages with varied lock-in periods and APY rates'
              },
              {
                icon: <Zap className="h-6 w-6 text-svr-primary" />,
                title: 'Auto-Compound',
                description: 'Maximize your earnings with automatic compounding of your staking rewards'
              },
              {
                icon: <Award className="h-6 w-6 text-svr-primary" />,
                title: 'Referral Rewards',
                description: 'Earn additional tokens by inviting others to join the SVR staking platform'
              }
            ].map((feature, i) => (
              <div key={i} className="dashboard-card text-center">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-svr-primary/10 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Popular Staking Packages</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Select the best package that suits your investment strategy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StakingPackage
              name="Micro Node"
              apy={4}
              duration={6}
              minAmount={500}
              description="Entry-level staking package with a short lock-in period. Perfect for beginners."
            />
            <StakingPackage
              name="Data Streamer"
              apy={6.5}
              duration={12}
              minAmount={2000}
              description="Medium-term investment with higher returns. Balanced risk-reward ratio."
              isPopular={true}
            />
            <StakingPackage
              name="Core Validator Tier"
              apy={9}
              duration={24}
              minAmount={5000}
              description="Premium long-term staking option with our highest APY rate."
            />
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-svr-primary to-svr-secondary hover:brightness-110 transition-all duration-300" onClick={() => navigate('/stake')}>
              View All Staking Options <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-svr-primary/20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <span className="text-xl font-bold gradient-text">SVR</span>
                <span className="font-medium text-foreground ml-1">Staking</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Secure, transparent, and high-yield staking platform for SVR tokens.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Whitepaper</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Telegram</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Discord</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Medium</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-4 border-t border-svr-primary/10 text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} SVR Staking Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
