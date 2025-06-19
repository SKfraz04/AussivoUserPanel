import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import WalletConnect from '@/components/WalletConnect';
import StakingPackage from '@/components/StakingPackage';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Landmark, Zap, Award, ChevronDown } from 'lucide-react';
import { useActiveAccount } from "thirdweb/react";
import Banner from '../assets/Images/banner.png';
import Hand from '../assets/Images/Hand.png';
import Logo from '../assets/Images/logo.svg';
const Landing = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const account = useActiveAccount();

  // Watch for account changes
  useEffect(() => {
    if (account && account.address) {
      setWalletAddress(account.address);
    setIsAuthenticated(true);
      // navigate('/dashboard');
    } else {
      setIsAuthenticated(false);
      setWalletAddress('');
    }
  }, [account, navigate]);

  const handleWalletConnect = (address: string) => {
    navigate('/dashboard');

    // This is now handled by the useEffect above
    // but we keep it for compatibility
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setWalletAddress('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#000000]">
      <Header />

        <img src={Banner} alt="Aussivo" className="absolute top-0 left-0 w-full h-full object-cover" />
        <section className="py-20 relative overflow-hidden">
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                We're here to{' '}
                <span className="text-svr-primary">help 24/7</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-lg">
                Every guide is trained and excited to work with you, whether 
                you need help with a password reset or you're looking for a 
                team to build your complete web presence.
              </p>
            </div>

            {/* Right side - Support illustration */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <img src={Hand} alt="Aussivo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {/* Call Us Card */}
            <div className="bg-svr-dark/60 border border-svr-primary/20 rounded-2xl p-8 backdrop-blur-sm hover:border-svr-primary/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-svr-primary flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-svr-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Call Us</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                Contact our award winning support team
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-svr-primary/20 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-svr-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Everyday</p>
                    <p className="text-gray-400 text-sm">9:00 am - 7:00 pm</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-svr-primary/20 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-svr-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <p className="text-svr-primary font-medium">000-000 000 0000</p>
                </div>
              </div>
            </div>

            <div className="bg-svr-dark/60 border border-svr-primary/20 rounded-2xl p-8 backdrop-blur-sm hover:border-svr-primary/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-svr-primary flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-svr-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Chat Now</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                Chat for quick help on product issues, your account, and more.
              </p>

              <div className="mb-8">
                <p className="text-white font-medium mb-2">Hours: 24x7 Chat</p>
              </div>

              <Button className="w-full bg-gradient-to-r from-svr-primary to-svr-accent hover:brightness-110 transition-all duration-300 py-3 rounded-xl border border-svr-primary/30">
                Start Chatting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

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
      <footer className="relative bg-[#000000] border-t border-svr-primary/20 overflow-hidden">
        {/* Background decorative pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="absolute inset-0 bg-gradient-to-l from-svr-primary/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`absolute border-l border-svr-primary/20 h-full transform rotate-12 origin-bottom`} style={{right: `${i * 20}px`, width: '1px'}}></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 container max-w-7xl mx-auto px-4 py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {/* Hosting Column */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Hosting</h3>
              <ul className="space-y-3">
                {[
                  'Web hosting',
                  'WordPress Hosting',
                  'VPS hosting',
                  'n8n VPS hosting',
                  'Business email',
                  'Cloud hosting',
                  'WooCommerce hosting',
                  'Hosting for agencies',
                  'Minecraft hosting',
                  'Game server hosting',
                  'Google Workspace'
                ].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-svr-primary transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Domain Column */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Domain</h3>
              <ul className="space-y-3">
                {[
                  'Domains',
                  'Cheap domains',
                  'Free Domain Name',
                  'WHOIS Lookup',
                  'Free SSL certificate',
                  'Domain transfer',
                  'Domain Extensions'
                ].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-svr-primary transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              </div>

            {/* Information Column */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Information</h3>
              <ul className="space-y-3">
                {[
                  'Pricing',
                  'Hostinger Reviews',
                  'Affiliate program',
                  'Referral program',
                  'Roadmap',
                  'Rewards',
                  'System status',
                  'Sitemap'
                ].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-svr-primary transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Company Column */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
              <ul className="space-y-3">
                {[
                  'About Aussivo',
                  'Our technology',
                  'Blog'
                ].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-svr-primary transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support Column */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Support</h3>
              <ul className="space-y-3">
                {[
                  'Tutorials',
                  'Knowledge Base',
                  'Contact us',
                  'Report Online Abuse'
                ].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-svr-primary transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pt-8 border-t border-svr-primary/10">
            {/* Logo and Payment methods */}
            <div className="flex flex-col space-y-6">
              {/* Logo */}
              <div className="flex items-center">
                <img src={Logo} alt="Aussivo" className="h-20 w-20" />
              </div>

              {/* Payment methods */}
              {/* <div className="flex items-center space-x-2">
                <div className="bg-white rounded px-2 py-1 text-xs font-bold text-blue-600">VISA</div>
                <div className="bg-blue-500 rounded px-2 py-1 text-xs font-bold text-white">AMERICAN EXPRESS</div>
                <div className="bg-orange-500 rounded px-2 py-1 text-xs font-bold text-white">DISCOVER</div>
                <div className="bg-red-500 rounded px-2 py-1 text-xs font-bold text-white">MASTERCARD</div>
              </div> */}
            </div>

            {/* Social media icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-svr-primary transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-svr-primary transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-svr-primary transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-svr-primary transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-svr-primary transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Legal links and copyright */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 pt-8 border-t border-svr-primary/10">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-svr-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-svr-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-svr-primary transition-colors">Refund Policy</a>
            </div>
            <div className="text-sm text-gray-400">
              © 2004-2025 Aussivo.in - Premium Web Hosting, Cloud, VPS, AI Website Builder & Domain Registration Services.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
