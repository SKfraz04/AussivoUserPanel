import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import ReferralStats from '@/components/ReferralStats';
import { 
  Bell, 
  Share2,
  Copy,
  Twitter,
  Facebook,
  Mail,
  CheckCircle2,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Referrals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const referralData = {
    referralCode: "SVR25X7YZA",
    referralLink: "https://svr-staking.com/ref/SVR25X7YZA",
    totalReferrals: 8,
    activeReferrals: 5,
    pendingReferrals: 3,
    totalEarnings: 125.5,
    nextTier: {
      current: 8,
      required: 10,
      reward: "Additional 1% on referral earnings"
    },
    recentReferrals: [
      { user: "alex89", date: "2025-04-10", status: "active", earnings: 12.5 },
      { user: "crypto_fan", date: "2025-04-05", status: "active", earnings: 8.75 },
      { user: "blockchain_dev", date: "2025-03-28", status: "active", earnings: 15.2 },
      { user: "token_investor", date: "2025-03-20", status: "pending", earnings: 0 },
      { user: "defi_trader", date: "2025-03-15", status: "active", earnings: 10.8 }
    ]
  };

  const handleLogout = () => {
    navigate('/');
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Referral link has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareViaTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=Join%20me%20on%20SVR%20Staking%20platform%20and%20earn%20rewards!&url=${encodeURIComponent(referralData.referralLink)}`, '_blank');
  };
  
  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralData.referralLink)}`, '_blank');
  };
  
  const shareViaEmail = () => {
    window.open(`mailto:?subject=Join%20SVR%20Staking&body=I%20thought%20you%20might%20be%20interested%20in%20joining%20SVR%20Staking.%20Use%20my%20referral%20link:%20${encodeURIComponent(referralData.referralLink)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-svr-dark to-svr-dark/90">
      <DashboardSidebar onLogout={handleLogout} />
      
      <div className="lg:pl-64">
        <div className="p-4 border-b border-svr-primary/20 backdrop-blur-sm flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-svr-primary" />
            <h1 className="text-xl font-bold">Referral Program</h1>
          </div>
          <Button variant="outline" size="icon" className="border-svr-primary/20">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
        
        <main className="p-6 space-y-8">
          <ReferralStats stats={referralData} />
          
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Share2 className="mr-2 h-5 w-5 text-svr-primary" />
                Share Your Referral Link
              </CardTitle>
              <CardDescription>
                Earn 5% of the staking rewards from users who join through your link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Input 
                    value={referralData.referralLink} 
                    readOnly 
                    className="pr-20 bg-svr-primary/5 font-mono"
                  />
                  <Button 
                    className="absolute right-1 top-1 h-8" 
                    onClick={() => copyToClipboard(referralData.referralLink)}
                  >
                    {copied ? (
                      <><CheckCircle2 className="mr-1 h-4 w-4" /> Copied</>
                    ) : (
                      <><Copy className="mr-1 h-4 w-4" /> Copy</>
                    )}
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-svr-primary/20" 
                    onClick={() => shareViaTwitter()}
                  >
                    <Twitter className="mr-2 h-4 w-4" /> Twitter
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-svr-primary/20" 
                    onClick={() => shareViaFacebook()}
                  >
                    <Facebook className="mr-2 h-4 w-4" /> Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-svr-primary/20" 
                    onClick={() => shareViaEmail()}
                  >
                    <Mail className="mr-2 h-4 w-4" /> Email
                  </Button>
                </div>
                
                <div className="bg-svr-primary/5 p-4 rounded-lg">
                  <p className="font-medium mb-2">Referral Code</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold font-mono tracking-wider">{referralData.referralCode}</p>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => copyToClipboard(referralData.referralCode)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Recent Referrals</h3>
            <Card className="dashboard-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-svr-primary/10">
                        <th className="text-left p-4">User</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-right p-4">Earnings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referralData.recentReferrals.map((referral, index) => (
                        <tr key={index} className="border-b border-svr-primary/10 last:border-b-0">
                          <td className="p-4">{referral.user}</td>
                          <td className="p-4">{new Date(referral.date).toLocaleDateString()}</td>
                          <td className="p-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              referral.status === 'active' 
                              ? 'bg-svr-primary/20 text-svr-primary' 
                              : 'bg-svr-accent/20 text-svr-accent'
                            }`}>
                              {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {referral.earnings > 0 
                              ? <span className="font-medium">{referral.earnings} SVR</span>
                              : <span className="text-muted-foreground">Pending</span>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Referrals;
