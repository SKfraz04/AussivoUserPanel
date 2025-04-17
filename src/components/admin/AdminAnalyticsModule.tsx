
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Calendar,
  Users,
  Wallet,
  CoinsIcon,
  ArrowUpRight,
  FileText,
  ChevronDown
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminAnalyticsModule = () => {
  const [dateRange, setDateRange] = useState("30d");
  const [selectedReport, setSelectedReport] = useState("user-growth");
  
  const handleExportReport = () => {
    console.log(`Exporting ${selectedReport} report`);
    // In a real implementation, this would generate and download a report
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">Generate comprehensive platform reports and analytics</p>
      </div>

      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Custom Range</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select report" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user-growth">User Growth</SelectItem>
              <SelectItem value="staking">Staking Analytics</SelectItem>
              <SelectItem value="referrals">Referral Performance</SelectItem>
              <SelectItem value="governance">Governance Activity</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleExportReport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Analytics tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="staking">Staking Analytics</TabsTrigger>
          <TabsTrigger value="referrals">Referral Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  User Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12%</div>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-500 ml-1">vs. previous period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4.5M</div>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-500 ml-1">+18% vs. previous period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  New Stakes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">358</div>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-500 ml-1">+8% vs. previous period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42%</div>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-500 ml-1">+5% vs. previous period</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Overview */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted rounded-md">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Platform growth chart would be displayed here, showing users, stakes, and volume over time
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Package Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-md">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Pie chart showing distribution of stakes across different packages
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Bar chart showing platform revenue and distributed rewards over time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Registration & Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted rounded-md">
                <div className="text-center">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Detailed user registration data and growth charts would be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">User Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76%</div>
                <p className="text-xs text-muted-foreground mt-1">30-day retention rate</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Average Stake Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,780 SVR</div>
                <p className="text-xs text-muted-foreground mt-1">Per user</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Average Wallet Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$6,790</div>
                <p className="text-xs text-muted-foreground mt-1">Including all assets</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="staking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Staking Volume & Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted rounded-md">
                <div className="text-center">
                  <CoinsIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Staking volume trends and distribution across packages would be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Most Popular Package</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Data Streamer</div>
                <p className="text-xs text-muted-foreground mt-1">48% of new stakes</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Average Lock Period</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127 days</div>
                <p className="text-xs text-muted-foreground mt-1">Weighted by stake size</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Auto-Compound Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <p className="text-xs text-muted-foreground mt-1">Of eligible stakes</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="referrals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Referral Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted rounded-md">
                <div className="text-center">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Referral performance metrics and network growth would be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Average Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.8</div>
                <p className="text-xs text-muted-foreground mt-1">Per active referrer</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Referral Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38%</div>
                <p className="text-xs text-muted-foreground mt-1">Of referred users stake</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Referral Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">921,450 SVR</div>
                <p className="text-xs text-muted-foreground mt-1">Distributed to date</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-3 text-blue-500" />
                <div>
                  <h3 className="font-medium">User Registration Report</h3>
                  <p className="text-sm text-muted-foreground">Detailed analysis of user growth and registrations</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-3 text-green-500" />
                <div>
                  <h3 className="font-medium">Staking Performance Report</h3>
                  <p className="text-sm text-muted-foreground">Analysis of staking packages and user behavior</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-3 text-yellow-500" />
                <div>
                  <h3 className="font-medium">Referral Network Report</h3>
                  <p className="text-sm text-muted-foreground">Detailed breakdown of referral performance</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-3 text-purple-500" />
                <div>
                  <h3 className="font-medium">Financial Performance Report</h3>
                  <p className="text-sm text-muted-foreground">Revenue, rewards, and token economics analysis</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalyticsModule;
