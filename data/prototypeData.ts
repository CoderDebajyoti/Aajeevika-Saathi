/**
 * Aajeevika Saathi - Prototype Mock Data
 * Realistic data tailored for PM-AJAY GIA Beneficiary livelihood journey.
 */

export interface ConversationStep {
  id: number;
  question: string;
  questionHi: string;
  response: string;
  responseHi: string;
  insight: string;
}

export interface ProfileData {
  name: string;
  education: string;
  currentLivelihood: string;
  existingSkills: string[];
  interest: string[];
  mobility: string;
  goal: string;
  pmAjayEligible: boolean;
  category: string;
}

export interface SkillItem {
  id: string;
  name: string;
  nameHi: string;
  strength: 'Strong' | 'Good' | 'Developing';
  score: number; // 0 to 100
  color: string;
  category: 'core' | 'technical' | 'soft' | 'business';
  description: string;
  xOffset?: number;
  yOffset?: number;
}

export interface PathwayItem {
  id: string;
  title: string;
  titleHi: string;
  badge: string;
  matchPercentage: number;
  tags: string[];
  shortExplanation: string;
  fullDescription: string;
  duration: string;
  mode: string;
  nsqfLevel: string;
  pathwaySteps: { title: string; subtitle: string; iconName: string }[];
  avgMonthlyIncome: string;
  governmentGrant: string;
  fitReason: string;
  highlighted?: boolean;
}

export interface OpportunityItem {
  id: string;
  title: string;
  distance: string;
  type: 'Training' | 'Certification' | 'Opportunity';
  address: string;
  timing: string;
  stipend: string;
  seatsRemaining: number;
  tags: string[];
  phone: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'current' | 'upcoming';
  duration?: string;
  badge?: string;
}

// 1. Mock Conversation Data
export const mockConversation: ConversationStep[] = [
  {
    id: 1,
    question: "What do you currently do?",
    questionHi: "आप वर्तमान में क्या काम करते हैं?",
    response: "I help my family with farming.",
    responseHi: "मैं अपने परिवार के साथ खेती में हाथ बंटाता हूँ।",
    insight: "Agricultural background with seasonal availability.",
  },
  {
    id: 2,
    question: "What skills are you already comfortable with?",
    questionHi: "आप किन कामों या हुनर में पहले से सहज हैं?",
    response: "I know basic electrical work and farming.",
    responseHi: "मुझे बुनियादी बिजली का काम और खेती की समझ है।",
    insight: "Foundational technical aptitude in electrical repairs.",
  },
  {
    id: 3,
    question: "What kind of work would you like to explore?",
    questionHi: "आप किस तरह के काम में आगे बढ़ना चाहते हैं?",
    response: "I would like to start something of my own.",
    responseHi: "मैं खुद का कोई स्थायी स्वरोज़गार शुरू करना चाहता हूँ।",
    insight: "Micro-entrepreneurship & technical self-reliance mindset.",
  },
  {
    id: 4,
    question: "What level of education have you completed?",
    questionHi: "आपने कहाँ तक की शिक्षा पूरी की है?",
    response: "I completed Class 12.",
    responseHi: "मैंने 12वीं कक्षा पूरी की है।",
    insight: "Eligible for NSQF Level 3-4 specialized skilling.",
  },
  {
    id: 5,
    question: "How far are you comfortable travelling for training or work?",
    questionHi: "आप प्रशिक्षण या काम के लिए कितनी दूर जाने में सहज हैं?",
    response: "Within my nearby area.",
    responseHi: "मेरे आस-पास के 5 से 10 किमी क्षेत्र में।",
    insight: "Localized livelihood pathways prioritized.",
  },
];

// 2. Mock AI-Generated Profile
export const mockProfile: ProfileData = {
  name: "Rameshwar Kumar",
  education: "Class 12 Completed",
  currentLivelihood: "Agriculture & Allied",
  existingSkills: ["Agriculture", "Basic Electrical Work"],
  interest: ["Technical Work", "Self Employment"],
  mobility: "Nearby Area (Within 10 km)",
  goal: "Build a Sustainable Livelihood",
  pmAjayEligible: true,
  category: "GIA Beneficiary • Special Livelihood Grant Eligible",
};

// 3. Mock Skill Landscape Data
export const mockSkills: SkillItem[] = [
  {
    id: "agriculture",
    name: "Agriculture",
    nameHi: "कृषि व संबद्ध कार्य",
    strength: "Strong",
    score: 88,
    color: "#16A34A",
    category: "core",
    description: "Hands-on familiarity with rural land, seasonal cycles, and machinery.",
  },
  {
    id: "electrical",
    name: "Basic Electrical",
    nameHi: "इलेक्ट्रिकल कार्य",
    strength: "Good",
    score: 74,
    color: "#FB923C",
    category: "technical",
    description: "Wiring understanding, small appliance repair, and circuit basics.",
  },
  {
    id: "problem_solving",
    name: "Problem Solving",
    nameHi: "समस्या समाधान",
    strength: "Good",
    score: 70,
    color: "#38BDF8",
    category: "soft",
    description: "Practical troubleshooting in agricultural & domestic settings.",
  },
  {
    id: "digital",
    name: "Digital Basics",
    nameHi: "डिजिटल समझ",
    strength: "Developing",
    score: 52,
    color: "#818CF8",
    category: "technical",
    description: "Smartphone usage, UPI payments, and basic messaging tools.",
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    nameHi: "उद्यमशीलता",
    strength: "Developing",
    score: 48,
    color: "#F59E0B",
    category: "business",
    description: "Desire to run an independent local service venture.",
  },
];

export const mockOpportunityGap = {
  title: "Solar & Energy Technology",
  subtitle: "High Demand Rural Pathway",
  highlightText:
    "Your existing electrical skills can provide a strong foundation for this high-growth green livelihood pathway.",
  skillBridge: ["Basic Electrical", "Circuit Troubleshooting"],
  targetOutcome: "Certified Solar PV Rooftop Technician",
};

// 4. Mock Recommended Pathways
export const mockPathways: PathwayItem[] = [
  {
    id: "solar_pv",
    title: "Solar PV Technician",
    titleHi: "सोलर पीवी तकनीशियन",
    badge: "Highest Compatibility",
    matchPercentage: 92,
    tags: ["NSQF Aligned (Level 4)", "Technical", "Growing Opportunity"],
    shortExplanation:
      "Build on your electrical skills and learn solar installation, inverter setup, and grid maintenance.",
    fullDescription:
      "Solar rooftop installations across rural and semi-urban regions are expanding rapidly under PM-Surya Ghar. This 6-month hands-on certification primes you to become a trusted local solar technician or service entrepreneur.",
    duration: "6 Months",
    mode: "Practical (70%) + Classroom (30%)",
    nsqfLevel: "NSQF Level 4 (National Skill Standard)",
    avgMonthlyIncome: "₹18,000 - ₹28,000 / month",
    governmentGrant: "100% Fee Subsidy via PM-AJAY GIA Component",
    fitReason:
      "You already have basic electrical experience, familiarity with rural tools, and an interest in self-employment.",
    pathwaySteps: [
      {
        title: "Your Existing Foundation",
        subtitle: "Basic wiring and electrical safety",
        iconName: "Zap",
      },
      {
        title: "Specialized Training",
        subtitle: "Solar panel mounting, DC wiring & inverters",
        iconName: "Sun",
      },
      {
        title: "NSQF-Aligned Certification",
        subtitle: "Govt-recognized national skill credential",
        iconName: "Award",
      },
      {
        title: "Livelihood & Enterprise",
        subtitle: "PM-AJAY toolkit grant & local client network",
        iconName: "TrendingUp",
      },
    ],
    highlighted: true,
  },
  {
    id: "electrical_entrepreneur",
    title: "Electrical Service Entrepreneur",
    titleHi: "इलेक्ट्रिकल सेवा उद्यमी",
    badge: "Self-Employment Focus",
    matchPercentage: 87,
    tags: ["Self Employment", "Technical", "Local Opportunity"],
    shortExplanation:
      "Turn your electrical skills into a trusted local home and agricultural pump service venture.",
    fullDescription:
      "Run your independent repair shop for irrigation pumps, transformers, and residential electrical fittings with micro-credit support.",
    duration: "4 Months",
    mode: "On-the-job Apprenticeship",
    nsqfLevel: "NSQF Level 3",
    avgMonthlyIncome: "₹15,000 - ₹24,000 / month",
    governmentGrant: "Tool-kit Grant + Standup India Credit Linkage",
    fitReason:
      "Directly builds on your stated goal to start an independent enterprise within your nearby area.",
    pathwaySteps: [
      {
        title: "Appliance Diagnosis",
        subtitle: "Motors, starters, and domestic power",
        iconName: "Wrench",
      },
      {
        title: "Business Fundamentals",
        subtitle: "Customer billing, inventory & parts sourcing",
        iconName: "Briefcase",
      },
      {
        title: "Micro-Enterprise Setup",
        subtitle: "GIA financial subsidy assistance",
        iconName: "Store",
      },
    ],
    highlighted: false,
  },
  {
    id: "energy_equipment",
    title: "Energy Equipment Technician",
    titleHi: "ऊर्जा उपकरण तकनीशियन",
    badge: "Apprenticeship Linked",
    matchPercentage: 81,
    tags: ["Technical", "Skilling", "Apprenticeship"],
    shortExplanation:
      "Develop practical maintenance skills for battery banks, generators, and rural mini-grids.",
    fullDescription:
      "Support telecom towers, cold storage units, and institutional energy setups in nearby industrial belts.",
    duration: "5 Months",
    mode: "Classroom + Paid Industry Internship",
    nsqfLevel: "NSQF Level 4",
    avgMonthlyIncome: "₹16,000 - ₹22,000 / month",
    governmentGrant: "Monthly Training Stipend Included",
    fitReason:
      "Ideal if you prefer structured hands-on apprenticeship with guaranteed local placement.",
    pathwaySteps: [
      {
        title: "Energy Storage Systems",
        subtitle: "Battery chemistry & maintenance",
        iconName: "BatteryCharging",
      },
      {
        title: "Industrial Apprenticeship",
        subtitle: "On-site troubleshooting with mentor",
        iconName: "Users",
      },
      {
        title: "Direct Placement",
        subtitle: "Job mapping within 15 km radius",
        iconName: "CheckCircle",
      },
    ],
    highlighted: false,
  },
];

// 5. Mock Nearby Opportunities
export const mockOpportunities: OpportunityItem[] = [
  {
    id: "opp_1",
    title: "Pradhan Mantri Kaushal Kendra (PMKK)",
    distance: "2.4 km away",
    type: "Training",
    address: "Block Development Office Road, Sector 4",
    timing: "Batches: Morning (9 AM - 1 PM) & Evening",
    stipend: "Free Training + ₹1,500/mo Travel Allowance",
    seatsRemaining: 8,
    tags: ["Solar PV Installation", "NSQF Certified", "PM-AJAY Partner"],
    phone: "+91 98765 43210",
  },
  {
    id: "opp_2",
    title: "District Skill Development Centre",
    distance: "3.1 km away",
    type: "Certification",
    address: "Near ITI Campus, Main bypass road",
    timing: "Assessment Date: 15th of next month",
    stipend: "Prior Learning Recognition (RPL) Free",
    seatsRemaining: 15,
    tags: ["Electrical Wireman", "Govt Certificate", "Instant ID"],
    phone: "+91 98765 43211",
  },
  {
    id: "opp_3",
    title: "Surya Urja Green Enterprise Hub",
    distance: "4.7 km away",
    type: "Opportunity",
    address: "Agro-Industrial Park, Plot 22",
    timing: "Full Time / Freelance Contract",
    stipend: "Paid Apprenticeship: ₹10,000 / mo",
    seatsRemaining: 4,
    tags: ["Rooftop Installation", "Tools Provided", "PPO Option"],
    phone: "+91 98765 43212",
  },
];

// 6. Mock Livelihood Roadmap Milestones
export const mockRoadmap: RoadmapMilestone[] = [
  {
    id: "step_you",
    title: "You (Where You Start)",
    subtitle: "Class 12 • Farming & Electrical Basics",
    status: "completed",
    badge: "Verified Voice Profile",
  },
  {
    id: "step_assessment",
    title: "Skill Assessment & Mapping",
    subtitle: "NSQF Gap identified: Solar & Energy Tech",
    status: "completed",
    badge: "Score: 92% Match",
  },
  {
    id: "step_training",
    title: "Solar PV Technical Skilling",
    subtitle: "6 Months at PMKK Centre (2.4 km away)",
    status: "current",
    duration: "Next Step • 6 Months",
    badge: "100% Free via PM-AJAY GIA",
  },
  {
    id: "step_cert",
    title: "NSQF National Certification",
    subtitle: "Level 4 Skill India Recognized Credential",
    status: "upcoming",
    duration: "Month 6",
    badge: "Govt Badge",
  },
  {
    id: "step_apprentice",
    title: "Guided Apprenticeship & Toolkit",
    subtitle: "Paid local rooftop projects + ₹15,000 Tool Grant",
    status: "upcoming",
    duration: "Month 7 - 9",
    badge: "Toolkit Granted",
  },
  {
    id: "step_livelihood",
    title: "Sustainable Livelihood & Income",
    subtitle: "Certified Solar Professional / Local Enterprise",
    status: "upcoming",
    duration: "Sustainable Career",
    badge: "Goal: ₹20k+/mo",
  },
];
