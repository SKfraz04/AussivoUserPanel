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
import BG from '../assets/Images/BG.png';
import Lp1 from '../assets/Images/Lp1.png';
import Lp2 from '../assets/Images/Lp2.png';
import Lp3 from '../assets/Images/Lp3.png';
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

  const handleWalletConnect = (address) => {
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
                Secure High-Yield <br /> Staking & Decentralized <br />  Computing with{' '}
                <span className="text-svr-primary">ASVO</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-lg">
                Decentralized. Transparent. Profitable. Aussivo is the secure and high-yield staking platform for the <span className="text-svr-primary"> ASVO token</span>, designed for investors who want performance with peace of mind.
              </p>
              <div className="flex items-center gap-4">
                <Button className="w-50 mt-5 bg-gradient-to-r from-svr-primary to-svr-accent hover:bg-black transition-all duration-300 py-3 rounded-full border border-svr-primary/30">
                  Explore ASVO Token
                </Button>
                <Button className="w-50 mt-5 bg-black  hover:bg-gradient-to-r from-svr-primary to-svr-accent transition-all duration-300 py-3 rounded-full border border-svr-primary/30">
                  GET STARTED NOW
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <img src={Hand} alt="Aussivo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          {/* Token Sale Section */}
          <div className='relative'>
            {/* <img src={BG} alt="Aussivo" className="absolute top-50 right-0" /> */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-50 right-0 w-64 h-64 bg-green-500/30 rounded-full blur-3xl">
            </div>
            <div className="relative mt-32  rounded-3xl p-8 md:p-12 overflow-hidden">
              <div className="text-center">
                <div className="">
                  <span className='text-sm text-white bg-[#022C13] rounded-xl px-4 py-2'>ASVO Token Sale</span></div>
                <h2 className="text-4xl md:text-5xl font-bold text-white my-6">

                  Secure Your Early <span className="text-green-400">Advantage</span>
                </h2>
                <p className="text-gray-300 mb-12 text-lg">
                  Participate in the Aussivo Token Sale and become a foundational part<br />
                  of our revolutionary decentralized computing network.
                </p>
              </div>
              {/* Background gradient effects */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Content */}
                <div>

                  <div className="space-y-6 mb-12">
                    <h3 className="text-2xl font-semibold text-white mb-6">Why Invest Now?</h3>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-green-400 font-bold">01</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Early Access</h4>
                        <p className="text-gray-400 text-sm">Be among the first to experience platform features.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-green-400 font-bold">02</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Higher Staking Rewards</h4>
                        <p className="text-gray-400 text-sm">Unlock premium APY rates.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-green-400 font-bold">03</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Premium Governance Rights</h4>
                        <p className="text-gray-400 text-sm">Influence the future direction of the Aussivo ecosystem.</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-green-500/20 text-sm tracking-wide"
                    onClick={() => navigate('/ico')}
                  >
                    BUY ASVO TOKEN
                  </Button>
                </div>

                {/* Right Content - Token Sale Status */}
                <div className="flex items-center justify-center">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 w-full max-w-md">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-400">Stage</span>
                      <span className="text-white font-semibold bg-gray-800 px-3 py-1 rounded">Seed</span>
                    </div>

                    <div className="mb-8">
                      <div className="text-3xl font-bold text-green-400 mb-2">$0.04 - 1 ASVO</div>

                      {/* Progress Bar */}
                      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden mb-2">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '13.5%' }}></div>
                      </div>
                      <div className="text-right text-green-400 text-sm font-semibold">13.5%</div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-gray-400 text-center mb-4">ICO PRE SALE START IN:</div>

                      <div className="grid grid-cols-4 gap-3">
                        <div className="bg-gray-800 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-white">228</div>
                          <div className="text-xs text-gray-400 uppercase">Days</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-white">17</div>
                          <div className="text-xs text-gray-400 uppercase">Hours</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-white">45</div>
                          <div className="text-xs text-gray-400 uppercase">Minutes</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-white">20</div>
                          <div className="text-xs text-gray-400 uppercase">Seconds</div>
                        </div>
                      </div>
                      <div className="text-center text-xs text-gray-500 mt-4">
                        Foundation, internal infrastructure, early believers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Aussivo Section */}
          <div className="relative mt-32 py-20">
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent"></div>

            <div className="relative z-10 text-center mb-16">
              <p className="text-gray-400 text-sm mb-4">Why Choose Aussivo?</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Your Path to Profitable <span className="text-green-400">Decentralization</span>
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                Discover the core advantages that make Aussivo the premier choice for<br />
                crypto investors and enthusiasts.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* High-Yield Staking Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden group hover:border-green-500/30 transition-all duration-300">
              <div className="h-64  flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <img 
                      src={Lp1} 
                      alt="Decentralized Computing Network" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">High-Yield Staking</h3>
                  <p className="text-gray-400 mb-6">
                    Earn an impressive up to 15.7% APY on your <span className="text-green-400">ASVO tokens</span>. Our innovative staking packages are designed for maximum returns.
                  </p>
                  <button className="flex items-center text-white hover:text-green-400 transition-colors group">
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Decentralized Computing Network Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden group hover:border-green-500/30 transition-all duration-300">
              <div className="h-64  flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <img 
                      src={Lp2} 
                      alt="Decentralized Computing Network" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Decentralized Computing Network</h3>
                  <p className="text-gray-400 mb-6">
                    <span className="text-green-400">ASVO</span> powers a global, decentralized network, contributing to cutting-edge technology and real-world utility.
                  </p>
                  <button className="flex items-center text-white hover:text-green-400 transition-colors group">
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Robust Security & Transparency Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden group hover:border-green-500/30 transition-all duration-300">
              <div className="h-64  flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <img 
                      src={Lp3} 
                      alt="Decentralized Computing Network" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Robust Security & Transparency</h3>
                  <p className="text-gray-400 mb-6">
                    All smart contracts are fully audited. Our commitment to transparency ensures peace of mind.
                  </p>
                  <button className="flex items-center text-white hover:text-green-400 transition-colors group">
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stake Your ASVO Section */}
          <div className="relative mt-32 py-20">
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/10 to-transparent"></div>

            <div className="relative z-10 text-center mb-16">
              <p className="text-gray-400 text-sm mb-4">Stake Your ASVO</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Passive Income <span className="text-green-400">Made Easy</span>
              </h2>
              <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
                Transform your ASVO tokens into a powerful income-generating asset. With flexible<br />
                lock-in periods and competitive APY's, Aussivo staking is designed for every investor.
              </p>
            </div>

            {/* Staking Package Cards */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Micro Node Card */}
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-green-400 font-bold">01</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-6">Micro Node</h3>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <div>
                      <span className="text-white font-semibold">APY: </span>
                      <span className="text-gray-300">4%</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <div>
                      <span className="text-white font-semibold">Lock Period: </span>
                      <span className="text-gray-300">6 Months</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <div>
                      <span className="text-white font-semibold">Min. Stake: </span>
                      <span className="text-gray-300">500 ASVO</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-300">Entry-level, short lock-in, early withdrawal. Perfect for beginners.</span>
                  </li>
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-green-500/50 text-white hover:bg-green-500/10 hover:border-green-500"
                  onClick={() => navigate('/stake')}
                >
                  Stake Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Data Streamer Card */}
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-green-400 font-bold">02</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-6">Data Streamer</h3>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <div>
                      <span className="text-white font-semibold">APY: </span>
                      <span className="text-gray-300">6.5%</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <div>
                      <span className="text-white font-semibold">Lock Period: </span>
                      <span className="text-gray-300">12 Months</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <div>
                      <span className="text-white font-semibold">Min. Stake: </span>
                      <span className="text-gray-300">2000 ASVO</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-300">Higher returns, network data rewards, priority governance.</span>
                  </li>
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-green-500/50 text-white hover:bg-green-500/10 hover:border-green-500"
                  onClick={() => navigate('/stake')}
                >
                  Stake Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Core Validator Tier Card */}
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-green-400 font-bold">03</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-6">Core Validator Tier</h3>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <div>
                      <span className="text-white font-semibold">APY: </span>
                      <span className="text-gray-300">9%</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <div>
                      <span className="text-white font-semibold">Lock Period: </span>
                      <span className="text-gray-300">24 Months</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <div>
                      <span className="text-white font-semibold">Min. Stake: </span>
                      <span className="text-gray-300">5000 ASVO</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span className="text-gray-300">Highest APY, full governance rights, exclusive features.</span>
                  </li>
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-green-500/50 text-white hover:bg-green-500/10 hover:border-green-500"
                  onClick={() => navigate('/stake')}
                >
                  Stake Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Token Allocation Section */}
          <div className="relative mt-32 py-20">
            <div className="container max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Token <span className="text-green-400">Allocation</span>
                </h2>
                <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
                  Our token distributions is carefully designed to ensure long-term<br />
                  sustainability and fair distribution across different stakeholders.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Legend */}
                <div className="order-2 lg:order-1">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-gray-300">ICO (6 Phases) (33%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-400 rounded"></div>
                      <span className="text-gray-300">Staking & Rewards Pool (25%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                      <span className="text-gray-300">Team & Advisors (7%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-emerald-400 rounded"></div>
                      <span className="text-gray-300">Ecosystem Development (10%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-teal-500 rounded"></div>
                      <span className="text-gray-300">Treasury & DAO Reserve (8%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-teal-400 rounded"></div>
                      <span className="text-gray-300">Infrastructure Ops (7%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-lime-500 rounded"></div>
                      <span className="text-gray-300">Marketing & Partnerships (5%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-lime-400 rounded"></div>
                      <span className="text-gray-300">Exchange Liquidity (3%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-300 rounded"></div>
                      <span className="text-gray-300">Community & Airdrops (2%)</span>
                    </div>
                  </div>
                </div>

                                {/* Pie Chart */}
                <div className="order-1 lg:order-2 flex justify-center items-center">
                  <div className="relative w-96 h-96">
                    {/* 3D effect shadow */}
                    <div className="absolute inset-0 transform translate-y-8 scale-95 opacity-20">
                      <svg viewBox="0 0 440 440" className="w-full h-full">
                        <defs>
                          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
                          </filter>
                          <radialGradient id="shadowGrad">
                            <stop offset="0%" stopColor="rgb(34 197 94)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="rgb(0 0 0)" stopOpacity="0.8" />
                          </radialGradient>
                        </defs>
                        <ellipse cx="220" cy="220" rx="180" ry="160" fill="url(#shadowGrad)" filter="url(#blur)" />
                      </svg>
                    </div>
                    
                    {/* Main pie chart with 3D effect */}
                    <svg viewBox="0 0 440 440" className="relative z-10 w-full h-full" style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }}>
                      <defs>
                        {/* Gradients for 3D effect */}
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(134 239 172)" stopOpacity="1" />
                          <stop offset="50%" stopColor="rgb(34 197 94)" stopOpacity="1" />
                          <stop offset="100%" stopColor="rgb(21 128 61)" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(187 247 208)" stopOpacity="1" />
                          <stop offset="50%" stopColor="rgb(134 239 172)" stopOpacity="1" />
                          <stop offset="100%" stopColor="rgb(34 197 94)" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(34 197 94)" stopOpacity="1" />
                          <stop offset="50%" stopColor="rgb(22 163 74)" stopOpacity="1" />
                          <stop offset="100%" stopColor="rgb(20 83 45)" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(74 222 128)" stopOpacity="1" />
                          <stop offset="50%" stopColor="rgb(34 197 94)" stopOpacity="1" />
                          <stop offset="100%" stopColor="rgb(22 163 74)" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(52 211 153)" stopOpacity="1" />
                          <stop offset="50%" stopColor="rgb(16 185 129)" stopOpacity="1" />
                          <stop offset="100%" stopColor="rgb(5 150 105)" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(110 231 183)" stopOpacity="1" />
                          <stop offset="50%" stopColor="rgb(52 211 153)" stopOpacity="1" />
                          <stop offset="100%" stopColor="rgb(16 185 129)" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(134 239 172)" stopOpacity="1" />
                          <stop offset="50%" stopColor="rgb(74 222 128)" stopOpacity="1" />
                          <stop offset="100%" stopColor="rgb(34 197 94)" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="grad8" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(163 230 53)" stopOpacity="1" />
                          <stop offset="50%" stopColor="rgb(132 204 22)" stopOpacity="1" />
                          <stop offset="100%" stopColor="rgb(101 163 13)" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="grad9" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgb(217 249 157)" stopOpacity="1" />
                          <stop offset="50%" stopColor="rgb(190 242 100)" stopOpacity="1" />
                          <stop offset="100%" stopColor="rgb(163 230 53)" stopOpacity="1" />
                        </linearGradient>
                        
                        {/* 3D lighting effect */}
                        <radialGradient id="highlight" cx="40%" cy="40%">
                          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                      
                      <g transform="translate(220,220)">
                        {/* Staking & Rewards (25%) - Pulled out slice */}
                        <g transform="translate(15,-15)">
                          <path d="M 0 0 L 0 -160 A 160 160 0 0 1 140 -77.3 Z" 
                                fill="url(#grad2)" 
                                stroke="none"
                                style={{ filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))' }} />
                          <path d="M 0 0 L 0 -160 A 160 160 0 0 1 140 -77.3 Z" 
                                fill="url(#highlight)" 
                                opacity="0.5" />
                          <text x="70" y="-90" fill="black" fontSize="22" fontWeight="bold" textAnchor="middle">25%</text>
                        </g>
                        
                        {/* ICO (33%) */}
                        <g>
                          <path d="M 0 0 L 140 -77.3 A 160 160 0 0 1 44.7 153.7 Z" 
                                fill="url(#grad1)" 
                                stroke="none" />
                          <path d="M 0 0 L 140 -77.3 A 160 160 0 0 1 44.7 153.7 Z" 
                                fill="url(#highlight)" 
                                opacity="0.3" />
                          <text x="120" y="20" fill="black" fontSize="22" fontWeight="bold" textAnchor="middle">33%</text>
                        </g>
                        
                        {/* Ecosystem Development (10%) */}
                        <g>
                          <path d="M 0 0 L 44.7 153.7 A 160 160 0 0 1 -88.9 133 Z" 
                                fill="url(#grad4)" 
                                stroke="none" />
                          <text x="-20" y="130" fill="black" fontSize="18" fontWeight="bold" textAnchor="middle">10%</text>
                        </g>
                        
                        {/* Treasury & DAO (8%) */}
                        <g>
                          <path d="M 0 0 L -88.9 133 A 160 160 0 0 1 -149.9 56 Z" 
                                fill="url(#grad5)" 
                                stroke="none" />
                          <text x="-110" y="80" fill="black" fontSize="16" fontWeight="bold" textAnchor="middle">8%</text>
                        </g>
                        
                        {/* Team & Advisors (7%) */}
                        <g>
                          <path d="M 0 0 L -149.9 56 A 160 160 0 0 1 -159.4 -14.1 Z" 
                                fill="url(#grad3)" 
                                stroke="none" />
                          <text x="-140" y="20" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">7%</text>
                        </g>
                        
                        {/* Infrastructure (7%) */}
                        <g>
                          <path d="M 0 0 L -159.4 -14.1 A 160 160 0 0 1 -133 -88.9 Z" 
                                fill="url(#grad6)" 
                                stroke="none" />
                          <text x="-130" y="-50" fill="black" fontSize="16" fontWeight="bold" textAnchor="middle">7%</text>
                        </g>
                        
                        {/* Marketing (5%) */}
                        <g>
                          <path d="M 0 0 L -133 -88.9 A 160 160 0 0 1 -88.9 -133 Z" 
                                fill="url(#grad7)" 
                                stroke="none" />
                          <text x="-100" y="-105" fill="black" fontSize="16" fontWeight="bold" textAnchor="middle">5%</text>
                        </g>
                        
                        {/* Exchange Liquidity (3%) */}
                        <g>
                          <path d="M 0 0 L -88.9 -133 A 160 160 0 0 1 -44.7 -153.7 Z" 
                                fill="url(#grad8)" 
                                stroke="none" />
                          <text x="-60" y="-135" fill="black" fontSize="14" fontWeight="bold" textAnchor="middle">3%</text>
                        </g>
                        
                        {/* Community (2%) */}
                        <g>
                          <path d="M 0 0 L -44.7 -153.7 A 160 160 0 0 1 0 -160 Z" 
                                fill="url(#grad9)" 
                                stroke="none" />
                          <text x="-20" y="-150" fill="black" fontSize="14" fontWeight="bold" textAnchor="middle">2%</text>
                        </g>
                        
                        {/* Center hole for donut effect with gradient */}
                        <circle cx="0" cy="0" r="70" fill="rgb(17 24 39)" />
                        <circle cx="0" cy="0" r="68" fill="none" stroke="rgb(31 41 55)" strokeWidth="2" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Roadmap Section */}
          <div className="relative mt-32 py-20 bg-black">
            <div className="container max-w-4xl mx-auto px-4">
              <div className="text-center mb-20">
                <p className="text-gray-400 text-sm mb-4">Our Roadmap</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Strategic <span className="text-green-400">Roadmap</span>
                </h2>
                <p className="text-gray-400 mt-4">
                  Phased rollout, tech maturity, and global infra expansion.
                </p>
              </div>

              {/* Desktop Vertical Timeline */}
              <div className="hidden lg:block relative">
                {/* Main Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-green-500/30"></div>

                {/* Timeline Content */}
                <div className="relative">
                  {/* Phase 1 */}
                  <div className="relative mb-24">
                    {/* Card positioned to the left */}
                    <div className="w-[45%] ml-auto mr-[55%]">
                      <div className="bg-gray-950/90 border border-gray-800 rounded-xl p-6 relative">
                        <span className="text-xs text-gray-500 mb-4 block">Phase 1</span>
                        <h3 className="text-lg font-semibold text-white mb-4">Foundation & Testnet (Q1-Q4 2025)</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="text-gray-400">• Launch Dev Docs, Brand Site, and Portal</li>
                          <li className="text-gray-400">• Aussivo L1 Blockchain Testnet live (PoS)</li>
                          <li className="text-gray-400">• MVP: VPS + Storage in 1 region</li>
                          <li className="text-gray-400">• Browser-based Node NFT Staking Simulator</li>
                          <li className="text-gray-400">• Community Staking Portal (Basic version)</li>
                          <li className="text-gray-400">• Validator Onboarding Documentation</li>
                        </ul>
                        <Button
                          variant="outline"
                          className="mt-6 border-green-500/50 text-green-400 hover:bg-green-500/10"
                          size="sm"
                          onClick={() => navigate('/ico')}
                        >
                          Buy Now →
                        </Button>
                      </div>
                    </div>

                    {/* Node on the line */}
                    <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10 shadow-lg shadow-green-500/50">
                      <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="relative mb-24">
                    {/* Card positioned to the right */}
                    <div className="w-[45%] ml-[55%]">
                      <div className="bg-gray-950/90 border border-gray-800 rounded-xl p-6 relative">
                        <span className="text-xs text-gray-500 mb-4 block">Phase 2</span>
                        <h3 className="text-lg font-semibold text-white mb-4">Mainnet, Wallet, Infra Expansion (Q1-Q2 2026)</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="text-gray-400">• Mainnet Launch (no token migration)</li>
                          <li className="text-gray-400">• Native ASVO Coin & Gasbank Wallet live (multi-chain)</li>
                          <li className="text-gray-400">• Validator NFTs + Dual/Partner Pools launch</li>
                          <li className="text-gray-400">• GPU Node + DePIN uptime reward model</li>
                          <li className="text-gray-400">• Exchange Listings & Liquidity Provisioning</li>
                          <li className="text-gray-400">• Expansion to Asia and Europe nodes</li>
                        </ul>
                        <Button
                          variant="outline"
                          className="mt-6 border-green-500/50 text-green-400 hover:bg-green-500/10"
                          size="sm"
                          onClick={() => navigate('/ico')}
                        >
                          Buy Now →
                        </Button>
                      </div>
                    </div>

                    {/* Node on the line */}
                    <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center z-10 border-2 border-green-500 shadow-lg shadow-green-500/30">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Phase 3 */}
                  <div className="relative mb-24">
                    {/* Card positioned to the left */}
                    <div className="w-[45%] ml-auto mr-[55%]">
                      <div className="bg-gray-950/90 border border-gray-800 rounded-xl p-6 relative">
                        <span className="text-xs text-gray-500 mb-4 block">Phase 3</span>
                        <h3 className="text-lg font-semibold text-white mb-4">AI Cloud & Marketplace (Q3-Q4 2026)</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="text-gray-400">• Aussivo Marketplace (LMS, AI, ERP app stacks)</li>
                          <li className="text-gray-400">• AI Cloud APIs live - token-gated usage</li>
                          <li className="text-gray-400">• DID protocol integration for identity</li>
                          <li className="text-gray-400">• Physical Server NFTs launch (ownership + yield)</li>
                          <li className="text-gray-400">• Referral Leaderboards + Dev SDK for 3rd-party builders</li>
                        </ul>
                        <Button
                          variant="outline"
                          className="mt-6 border-green-500/50 text-green-400 hover:bg-green-500/10"
                          size="sm"
                          onClick={() => navigate('/ico')}
                        >
                          Buy Now →
                        </Button>
                      </div>
                    </div>

                    {/* Node on the line */}
                    <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center z-10 border-2 border-green-500 shadow-lg shadow-green-500/30">
                      <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Phase 4 */}
                  <div className="relative">
                    {/* Card positioned to the right */}
                    <div className="w-[45%] ml-[55%]">
                      <div className="bg-gray-950/90 border border-gray-800 rounded-xl p-6 relative">
                        <span className="text-xs text-gray-500 mb-4 block">Phase 4</span>
                        <h3 className="text-lg font-semibold text-white mb-4">Global Scale & Quantum Future (2027-2028)</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="text-gray-400">• Aussivo Chain v2 (Quantum-Resistant Layer)</li>
                          <li className="text-gray-400">• Cross-Chain Bridges (EVM + Cosmos compatible)</li>
                          <li className="text-gray-400">• DAO v2: Full on-chain grant & proposal engine</li>
                          <li className="text-gray-400">• NFT Rental Marketplace for idle node time</li>
                          <li className="text-gray-400">• Expansion to LATAM, Africa, SEA</li>
                          <li className="text-gray-400">• Launch Aussivo Ventures (On-chain Incubator)</li>
                        </ul>
                        <Button
                          variant="outline"
                          className="mt-6 border-green-500/50 text-green-400 hover:bg-green-500/10"
                          size="sm"
                          onClick={() => navigate('/ico')}
                        >
                          Buy Now →
                        </Button>
                      </div>
                    </div>

                    {/* Node on the line */}
                    <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center z-10 border-2 border-green-500 shadow-lg shadow-green-500/30">
                      <div className="grid grid-cols-2 gap-0.5 p-3">
                        <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Version */}
              <div className="lg:hidden space-y-8">
                <div className="relative">
                  {/* Vertical line for mobile */}
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-green-500/30"></div>

                  {/* Phase 1 Mobile */}
                  <div className="relative pl-16">
                    <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                      <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="bg-gray-950/90 border border-gray-800 rounded-xl p-6">
                      <span className="text-xs text-gray-500 mb-4 block">Phase 1</span>
                      <h3 className="text-lg font-semibold text-white mb-4">Foundation & Testnet (Q1-Q4 2025)</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="text-gray-400">• Launch Dev Docs, Brand Site, and Portal</li>
                        <li className="text-gray-400">• Aussivo L1 Blockchain Testnet live (PoS)</li>
                        <li className="text-gray-400">• MVP: VPS + Storage in 1 region</li>
                        <li className="text-gray-400">• Browser-based Node NFT Staking Simulator</li>
                        <li className="text-gray-400">• Community Staking Portal (Basic version)</li>
                        <li className="text-gray-400">• Validator Onboarding Documentation</li>
                      </ul>
                      <Button variant="outline" className="mt-6 border-green-500/50 text-green-400 hover:bg-green-500/10" size="sm">
                        Buy Now →
                      </Button>
                    </div>
                  </div>

                  {/* Phase 2 Mobile */}
                  <div className="relative pl-16 mt-8">
                    <div className="absolute left-0 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border-2 border-green-500 shadow-lg shadow-green-500/30">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="bg-gray-950/90 border border-gray-800 rounded-xl p-6">
                      <span className="text-xs text-gray-500 mb-4 block">Phase 2</span>
                      <h3 className="text-lg font-semibold text-white mb-4">Mainnet, Wallet, Infra Expansion (Q1-Q2 2026)</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="text-gray-400">• Mainnet Launch (no token migration)</li>
                        <li className="text-gray-400">• Native ASVO Coin & Gasbank Wallet live (multi-chain)</li>
                        <li className="text-gray-400">• Validator NFTs + Dual/Partner Pools launch</li>
                        <li className="text-gray-400">• GPU Node + DePIN uptime reward model</li>
                        <li className="text-gray-400">• Exchange Listings & Liquidity Provisioning</li>
                        <li className="text-gray-400">• Expansion to Asia and Europe nodes</li>
                      </ul>
                      <Button variant="outline" className="mt-6 border-green-500/50 text-green-400 hover:bg-green-500/10" size="sm">
                        Buy Now →
                      </Button>
                    </div>
                  </div>

                  {/* Phase 3 Mobile */}
                  <div className="relative pl-16 mt-8">
                    <div className="absolute left-0 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border-2 border-green-500 shadow-lg shadow-green-500/30">
                      <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="bg-gray-950/90 border border-gray-800 rounded-xl p-6">
                      <span className="text-xs text-gray-500 mb-4 block">Phase 3</span>
                      <h3 className="text-lg font-semibold text-white mb-4">AI Cloud & Marketplace (Q3-Q4 2026)</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="text-gray-400">• Aussivo Marketplace (LMS, AI, ERP app stacks)</li>
                        <li className="text-gray-400">• AI Cloud APIs live - token-gated usage</li>
                        <li className="text-gray-400">• DID protocol integration for identity</li>
                        <li className="text-gray-400">• Physical Server NFTs launch (ownership + yield)</li>
                        <li className="text-gray-400">• Referral Leaderboards + Dev SDK for 3rd-party builders</li>
                      </ul>
                      <Button variant="outline" className="mt-6 border-green-500/50 text-green-400 hover:bg-green-500/10" size="sm">
                        Buy Now →
                      </Button>
                    </div>
                  </div>

                  {/* Phase 4 Mobile */}
                  <div className="relative pl-16 mt-8">
                    <div className="absolute left-0 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border-2 border-green-500 shadow-lg shadow-green-500/30">
                      <div className="grid grid-cols-2 gap-0.5 p-3">
                        <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                      </div>
                    </div>
                    <div className="bg-gray-950/90 border border-gray-800 rounded-xl p-6">
                      <span className="text-xs text-gray-500 mb-4 block">Phase 4</span>
                      <h3 className="text-lg font-semibold text-white mb-4">Global Scale & Quantum Future (2027-2028)</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="text-gray-400">• Aussivo Chain v2 (Quantum-Resistant Layer)</li>
                        <li className="text-gray-400">• Cross-Chain Bridges (EVM + Cosmos compatible)</li>
                        <li className="text-gray-400">• DAO v2: Full on-chain grant & proposal engine</li>
                        <li className="text-gray-400">• NFT Rental Marketplace for idle node time</li>
                        <li className="text-gray-400">• Expansion to LATAM, Africa, SEA</li>
                        <li className="text-gray-400">• Launch Aussivo Ventures (On-chain Incubator)</li>
                      </ul>
                      <Button variant="outline" className="mt-6 border-green-500/50 text-green-400 hover:bg-green-500/10" size="sm">
                        Buy Now →
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Awesome Team Section */}
          <div className="relative mt-32 py-20">
            <div className="container max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Awesome <span className="text-green-400">Team</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  A team of financial experts is at your service!<br />
                  Meet our staff and become a member of our crypto community
                </p>
              </div>

              {/* Team Members Carousel */}
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                  {[
                    {
                      name: "Henry Walker",
                      role: "Executive Officer",
                      image: "/placeholder.svg",
                      social: { facebook: "#", linkedin: "#", twitter: "#" }
                    },
                    {
                      name: "Anna Lee",
                      role: "Project Lead",
                      image: "/placeholder.svg",
                      social: { facebook: "#", linkedin: "#", twitter: "#" }
                    },
                    {
                      name: "Leo Martinez",
                      role: "Technical Adviser",
                      image: "/placeholder.svg",
                      social: { facebook: "#", linkedin: "#", twitter: "#" }
                    },
                    {
                      name: "Tim Morrison",
                      role: "Head of Communications",
                      image: "/placeholder.svg",
                      social: { facebook: "#", linkedin: "#", twitter: "#" }
                    },
                    {
                      name: "Henry Walker",
                      role: "Executive Officer",
                      image: "/placeholder.svg",
                      social: { facebook: "#", linkedin: "#", twitter: "#" }
                    }
                  ].map((member, index) => (
                    <div key={index} className="flex-none w-64 snap-center">
                      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300">
                        <div className="w-full h-48 bg-gray-800 rounded-lg mb-4 overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-1">{member.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{member.role}</p>

                        <div className="flex items-center gap-3">
                          <a href={member.social.facebook} className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-green-500/20 transition-colors">
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                          </a>
                          <a href={member.social.linkedin} className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-green-500/20 transition-colors">
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </a>
                          <a href={member.social.twitter} className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-green-500/20 transition-colors">
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center items-center gap-2 mt-8">
                <button className="w-8 h-8 rounded-full border border-green-500 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full border border-green-500 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="relative mt-32 py-20 bg-gradient-to-b from-black to-gray-900/20">
            <div className="container max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Frequently Asked <span className="text-green-400">Questions</span>
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  Transform your ASVO tokens into a powerful income-generating asset. With flexible<br />
                  lock-in periods and competitive APY's, Aussivo staking is designed for every investor.
                </p>
              </div>

              {/* FAQ Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button
                  className="bg-green-500 text-black hover:bg-green-600 rounded-full px-6"
                >
                  General Questions
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 rounded-full px-6"
                >
                  Token and Platform Related Questions
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 rounded-full px-6"
                >
                  Technical Questions
                </Button>
              </div>

              {/* FAQ Accordion */}
              <div className="max-w-4xl mx-auto space-y-4">
                {[
                  {
                    number: "01",
                    question: "What is Aussivo?",
                    answer: "Aussivo is an innovative platform that combines the benefits of decentralized finance (DeFi) with the simplicity and security of a centralized wallet. It offers high-yield staking opportunities for its native ASVO token and powers a decentralized computing network."
                  },
                  {
                    number: "02",
                    question: "Where can I buy ASVO tokens?",
                    answer: "ASVO tokens can be purchased through our official ICO platform during the token sale phases. After the public launch, they will be available on major cryptocurrency exchanges."
                  },
                  {
                    number: "03",
                    question: "What is the Aussivo Centralized Wallet?",
                    answer: "The Aussivo Centralized Wallet is a secure digital wallet designed to store, manage, and stake your ASVO tokens. It provides an easy-to-use interface for all your staking needs."
                  },
                  {
                    number: "04",
                    question: "What cryptocurrencies can I deposit into my Aussivo Wallet?",
                    answer: "Currently, the Aussivo Wallet supports ASVO tokens, major cryptocurrencies like BTC, ETH, USDT, and other ERC-20 tokens. We're continuously adding support for more cryptocurrencies."
                  },
                  {
                    number: "05",
                    question: "How do I deposit funds?",
                    answer: "To deposit funds, simply log into your Aussivo Wallet, navigate to the deposit section, select your desired cryptocurrency, and follow the on-screen instructions to complete the transaction."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border border-gray-800 rounded-lg overflow-hidden">
                    <button
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-900/50 transition-colors"
                      onClick={(e) => {
                        const content = e.currentTarget.nextElementSibling;
                        const icon = e.currentTarget.querySelector('.rotate-icon');
                        if (content) {
                          content.classList.toggle('hidden');
                          icon?.classList.toggle('rotate-180');
                        }
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-green-400 font-bold text-lg">{faq.number}</span>
                        <span className="text-white font-medium">{faq.question}</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 transition-transform rotate-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="hidden px-6 pb-4">
                      <p className="text-gray-400 pl-12">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative bg-[#000000] border-t border-gray-800/50 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Logo and Tagline */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <img src={Logo} alt="Aussivo" className="h-16 w-auto" />
              </div>
              <p className="text-gray-400 text-sm">Empowering Your Decentralized Future</p>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                    Tokenomics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                    Rewards
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                    Whitepaper
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                    Governance
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/dashboard" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/wallet" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                    Wallet
                  </a>
                </li>
                <li>
                  <a href="/ico" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                    Token Sale
                  </a>
                </li>
                <li>
                  <a href="/stake" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                    Staking
                  </a>
                </li>
                <li>
                  <a href="/deposit" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                    Deposit
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Email Address</p>
                  <a href="mailto:info@admin.com" className="text-gray-300 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@admin.com
                  </a>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Phone Number</p>
                  <a href="tel:+971123456789" className="text-gray-300 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +971 12-345-6789
                  </a>
                </div>

                {/* Social Media Links */}
                <div className="flex items-center gap-3 pt-2">
                  <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259-.012 3.668-.069 4.948-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Subscribe to Newsletter */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Subscribe to Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">
                Receive updates and offers designed just for you.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                />
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  SUBSCRIBE
                </Button>
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-gray-800/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 Aussivo. All Rights Reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Terms of use
                </a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
