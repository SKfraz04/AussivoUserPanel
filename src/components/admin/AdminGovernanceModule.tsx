
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Vote, 
  Users, 
  Check, 
  X, 
  Clock, 
  Plus,
  ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample DAO proposals
const proposals = [
  {
    id: "p1",
    title: "SVR Token Burn Schedule",
    description: "Implement a monthly token burn of 1% of circulating supply to reduce inflation and increase token value.",
    creator: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    status: "active",
    votesFor: 78,
    votesAgainst: 22,
    quorum: 51,
    votingEnds: "2023-12-05",
    createdDate: "2023-11-21"
  },
  {
    id: "p2",
    title: "Increase APY for Core Validator Tier",
    description: "Proposal to increase the APY for Core Validator Tier from 9% to 10% to incentivize larger stakes.",
    creator: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    status: "active",
    votesFor: 45,
    votesAgainst: 35,
    quorum: 51,
    votingEnds: "2023-12-01",
    createdDate: "2023-11-17"
  },
  {
    id: "p3",
    title: "Add USDC as Deposit Option",
    description: "Proposal to add USDC as an accepted deposit currency alongside USDT and SUI.",
    creator: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    status: "completed",
    votesFor: 92,
    votesAgainst: 8,
    quorum: 51,
    votingEnds: "2023-11-10",
    createdDate: "2023-10-27",
    result: "passed"
  },
  {
    id: "p4",
    title: "Modify Referral Bonus Structure",
    description: "Adjust referral bonus percentages for all tiers to better reward top performers.",
    creator: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    status: "completed",
    votesFor: 35,
    votesAgainst: 65,
    quorum: 51,
    votingEnds: "2023-11-05",
    createdDate: "2023-10-22",
    result: "failed"
  }
];

const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const AdminGovernanceModule = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    votingPeriod: "7",
    quorum: "51"
  });

  const handleCreateProposal = () => {
    console.log("Creating new proposal:", newProposal);
    // In a real implementation, this would call an API to create the proposal
  };

  const filteredProposals = proposals.filter(proposal => {
    if (activeTab === "active") return proposal.status === "active";
    if (activeTab === "completed") return proposal.status === "completed";
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Governance (DAO)</h1>
        <p className="text-muted-foreground">Manage platform governance and proposals</p>
      </div>

      {/* Governance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Waiting for votes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Voting Participation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64%</div>
            <p className="text-xs text-muted-foreground mt-1">Average for all proposals</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Proposals Passed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 15 total proposals</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Eligible Voters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,287</div>
            <p className="text-xs text-muted-foreground mt-1">Users with staked tokens</p>
          </CardContent>
        </Card>
      </div>

      {/* Create New Proposal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Create New Proposal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Proposal Title</label>
              <Input 
                placeholder="Enter proposal title" 
                value={newProposal.title} 
                onChange={(e) => setNewProposal({...newProposal, title: e.target.value})} 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Proposal Description</label>
              <Textarea 
                placeholder="Enter detailed proposal description..." 
                className="min-h-32"
                value={newProposal.description} 
                onChange={(e) => setNewProposal({...newProposal, description: e.target.value})} 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Voting Period (days)</label>
                <Select 
                  value={newProposal.votingPeriod}
                  onValueChange={(value) => setNewProposal({...newProposal, votingPeriod: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Quorum Requirement (%)</label>
                <Select 
                  value={newProposal.quorum}
                  onValueChange={(value) => setNewProposal({...newProposal, quorum: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select quorum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25%</SelectItem>
                    <SelectItem value="33">33%</SelectItem>
                    <SelectItem value="51">51%</SelectItem>
                    <SelectItem value="66">66%</SelectItem>
                    <SelectItem value="75">75%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="flex items-center" onClick={handleCreateProposal}>
              <Vote className="h-4 w-4 mr-2" />
              Create Proposal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Proposals Listing */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Proposals</CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant={activeTab === "all" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveTab("all")}
            >
              All
            </Button>
            <Button 
              variant={activeTab === "active" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveTab("active")}
            >
              Active
            </Button>
            <Button 
              variant={activeTab === "completed" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProposals.map(proposal => (
              <Card key={proposal.id} className="overflow-hidden">
                <div className="border-b p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Created by: {truncateAddress(proposal.creator)} on {proposal.createdDate}
                      </p>
                    </div>
                    <div>
                      {proposal.status === "active" ? (
                        <Badge className="bg-blue-500 text-white border-blue-500">Active</Badge>
                      ) : proposal.result === "passed" ? (
                        <Badge className="bg-green-500 text-white border-green-500">Passed</Badge>
                      ) : (
                        <Badge className="bg-red-500 text-white border-red-500">Failed</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm">{proposal.description}</p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Votes For: {proposal.votesFor}%</span>
                      <span>Votes Against: {proposal.votesAgainst}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${proposal.votesFor}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {proposal.status === "active" ? (
                        <span>Voting ends: {proposal.votingEnds}</span>
                      ) : (
                        <span>Voting ended: {proposal.votingEnds}</span>
                      )}
                    </div>
                    <div>
                      Quorum: {proposal.quorum}% required
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <span>View Details</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGovernanceModule;
