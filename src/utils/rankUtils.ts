
export interface RankTier {
  level: number;
  title: string;
  minReferrals: number;
  maxReferrals: number | null;
  minStaked: number;
  maxStaked: number | null;
  badge: string;
  perks: string[];
  color: string;
}

export const rankTiers: RankTier[] = [
  {
    level: 1,
    title: "Starter Spark",
    minReferrals: 0,
    maxReferrals: 2,
    minStaked: 100,
    maxStaked: 499,
    badge: "⚡",
    perks: ["Basic badge", "Access to dashboard"],
    color: "from-green-300 to-green-400"
  },
  {
    level: 2,
    title: "Power Booster",
    minReferrals: 3,
    maxReferrals: 5,
    minStaked: 500,
    maxStaked: 1499,
    badge: "🔋",
    perks: ["Priority support", "Referral bonus access"],
    color: "from-green-400 to-green-500"
  },
  {
    level: 3,
    title: "Grid Runner",
    minReferrals: 6,
    maxReferrals: 10,
    minStaked: 1500,
    maxStaked: 4999,
    badge: "🔌",
    perks: ["Extra APY % boost (+0.5%)", "VIP chat group"],
    color: "from-green-500 to-green-600"
  },
  {
    level: 4,
    title: "Server Guardian",
    minReferrals: 11,
    maxReferrals: 20,
    minStaked: 5000,
    maxStaked: 9999,
    badge: "🖥️",
    perks: ["Warehouse visit opportunity", "Early access features"],
    color: "from-green-500 to-teal-500"
  },
  {
    level: 5,
    title: "Data Master",
    minReferrals: 21,
    maxReferrals: 40,
    minStaked: 10000,
    maxStaked: 19999,
    badge: "📊",
    perks: ["Free NFT reward", "Badge on leaderboard"],
    color: "from-teal-500 to-teal-600"
  },
  {
    level: 6,
    title: "Uptime King",
    minReferrals: 41,
    maxReferrals: 75,
    minStaked: 20000,
    maxStaked: 49999,
    badge: "👑",
    perks: ["Invite to exclusive events", "Bonus APY (1-2%)"],
    color: "from-teal-500 to-emerald-600"
  },
  {
    level: 7,
    title: "Digital Legend",
    minReferrals: 76,
    maxReferrals: null,
    minStaked: 50000,
    maxStaked: null,
    badge: "🌐",
    perks: ["Revenue-sharing eligibility", "Special title on profile"],
    color: "from-emerald-500 to-emerald-700"
  }
];

export const getUserRank = (referrals: number, stakedAmount: number): RankTier => {
  // Find the highest rank the user qualifies for
  for (let i = rankTiers.length - 1; i >= 0; i--) {
    const tier = rankTiers[i];
    const meetsReferralRequirement = 
      referrals >= tier.minReferrals && 
      (tier.maxReferrals === null || referrals <= tier.maxReferrals);
      
    const meetsStakedRequirement = 
      stakedAmount >= tier.minStaked && 
      (tier.maxStaked === null || stakedAmount <= tier.maxStaked);
      
    if (meetsReferralRequirement && meetsStakedRequirement) {
      return tier;
    }
  }
  
  // Default to the lowest tier if no match
  return rankTiers[0];
};

export const getNextRank = (currentRank: RankTier): RankTier | null => {
  const nextLevel = currentRank.level + 1;
  return rankTiers.find(tier => tier.level === nextLevel) || null;
};

export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
