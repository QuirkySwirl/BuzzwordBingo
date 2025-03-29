// buzzwords.ts for Corporate Buzzword Bingo

// Defines the types of meetings available for selection
export const meetingTypeData = [
  { name: "all-hands", displayName: "All Hands Meeting" },
  { name: "town-hall", displayName: "Town Hall" }, // Similar to All Hands, may use its list or a dedicated one
  { name: "kickoff", displayName: "Project Kickoff" },
  { name: "team-sync", displayName: "Team Sync / Standup" },
  { name: "performance", displayName: "Performance Review" },
  { name: "strategy", displayName: "Strategy Session" },
  { name: "brainstorming", displayName: "Brainstorming Session" },
  { name: "budget", displayName: "Budget Meeting" },
  { name: "product", displayName: "Product Launch / Review" },
  { name: "sales-pitch", displayName: "Sales Pitch" },
  { name: "quarterly", displayName: "Quarterly Review (QBR)" },
  { name: "offsite", displayName: "Executive Offsite / Team Building" },
  { name: "board", displayName: "Board Meeting" },
  { name: "layoff", displayName: "Restructuring / Org Update" } // Softened name slightly
];

// Maps internal meeting type names to arrays of relevant buzzwords
export const buzzwordData: Record<string, string[]> = {
  "all-hands": [
    "Synergy", "Circle Back", "Deep Dive", "Moving Forward", "Bandwidth",
    "Agile", "At The End Of The Day", "Low-Hanging Fruit", "Streamline",
    "Touch Base", "Game Changer", "Leverage", "Paradigm Shift", "Disruptive",
    "Wheelhouse", "Give 110 Percent", "Actionable", "On My Radar", "Core Competency",
    "Value Add", "Win-Win", "KPI", "Drill Down", "No-Brainer", "Ecosystem",
    "Thought Leader", "Company Culture", "Transparency", "Mission Critical",
    "Cross-Functional", "Best Practice", "Bleeding Edge", "Blue Sky Thinking",
    "Big Picture", "Boil The Ocean", "Break Down Silos", "Visibility", "Optimize",
    "Alignment", "Organic Growth", "Pivot", "Digital Transformation", "Scale",
    "Empowerment", "Impact", "Culture Add", "DEI", "Unprecedented Times",
    "Take it Offline", "Future-Proof", "Data-Driven", "Metrics", "Headwinds",
    "Tailwinds", "Employee Engagement", "Strategic Priorities", "Key Takeaways", "Town Hall"
  ],
  // Using all-hands list for town-hall initially, can be customized later if needed
  "town-hall": [
    // Inherits from all-hands, add specific town-hall terms if desired
    "Q&A Session", "Executive Update", "Company Vision", "Ask Me Anything (AMA)", "Leadership Message",
    "Transparency", "Recognition", "Employee Feedback", "Strategic Direction", "Business Performance",
    // ... plus all terms from "all-hands" list for variety
    "Synergy", "Circle Back", "Deep Dive", "Moving Forward", "Bandwidth",
    "Agile", "At The End Of The Day", "Low-Hanging Fruit", "Streamline",
    "Touch Base", "Game Changer", "Leverage", "Paradigm Shift", "Disruptive",
    "Wheelhouse", "Give 110 Percent", "Actionable", "On My Radar", "Core Competency",
    "Value Add", "Win-Win", "KPI", "Drill Down", "No-Brainer", "Ecosystem",
    "Thought Leader", "Company Culture", "Mission Critical", "Cross-Functional",
    "Best Practice", "Bleeding Edge", "Blue Sky Thinking", "Big Picture", "Boil The Ocean",
    "Break Down Silos", "Visibility", "Optimize", "Alignment", "Organic Growth",
    "Pivot", "Digital Transformation", "Scale", "Empowerment", "Impact", "Culture Add",
    "DEI", "Unprecedented Times", "Take it Offline", "Future-Proof", "Data-Driven",
    "Metrics", "Headwinds", "Tailwinds", "Employee Engagement", "Strategic Priorities", "Key Takeaways"
  ],
  "kickoff": [
    "Roadmap", "Deliverables", "Timeline", "Milestones", "MVP (Minimum Viable Product)",
    "Scope Creep", "Stakeholders", "Resources", "Buy-In", "Action Items",
    "Due Diligence", "Sprint", "Backlog", "User Story", "Pain Points",
    "Scalable", "Iterate", "Framework", "Proof of Concept (PoC)", "Alignment",
    "Cost-Benefit Analysis", "Expectations", "Fast Track", "Value Proposition", "Execution",
    "Next Steps", "Friction Points", "Strategic", "Roll Out Plan", "North Star",
    "Phase One", "Requirements Gathering", "Blockers", "Success Criteria", "Target Audience",
    "Dependencies", "Quick Win", "Mission Statement", "Risk Assessment", "RACI Matrix",
    "Assumptions", "Constraints", "Success Metrics", "Use Case", "Definition of Done",
    "Risk Mitigation", "Capacity Planning", "Stakeholder Mapping", "Project Charter", "Governance"
  ],
  "team-sync": [
    "Blockers", "Updates", "Quick Sync", "Standup", "Action Items",
    "Daily Huddle", "Capacity", "Sprint Goal", "Dependencies", "In Progress",
    "Done", "To Do", "Check-in", "Priority", "Heads Up",
    "Backlog Grooming", "Velocity", "Demo", "Retro (Retrospective)", "Task Board",
    "WIP (Work In Progress)", "Pull Request", "Code Review", "On Track", "Need Help"
  ],
  "performance": [
    "Growth Mindset", "Metrics", "Objectives", "Results-Driven", "Career Path",
    "Development Plan", "Feedback", "Evaluation", "Contributions", "Self-Assessment",
    "Goals (SMART)", "Challenges", "Strengths", "Areas for Improvement", "Track Record",
    "Performance Indicators (KPIs)", "Competencies", "Achievement", "Expectations", "Potential",
    "Alignment", "Recognition", "Peer Review", "Accountability", "Top Performer",
    "Skill Set", "Benchmarks", "Upskilling", "Personal Brand", "Job Satisfaction",
    "Career Growth", "Leadership Qualities", "OKRs (Objectives & Key Results)", "Quarterly Goals", "Professional Development",
    "Stretch Goals", "Career Trajectory", "Work-Life Balance", "360 Feedback", "Succession Planning",
    "Skill Gap", "Mentorship", "Coaching", "Constructive Criticism", "Career Ladder",
    "Impact", "Visibility", "Peer Feedback", "Self-Reflection", "Performance Improvement Plan (PIP)"
  ],
  "strategy": [
    "Vision Statement", "Market Share", "Competitive Advantage", "Strategic Imperative",
    "Five-Year Plan", "SWOT Analysis", "Growth Strategy", "Blue Ocean", "Red Ocean",
    "Value Proposition", "Core Competency", "Market Positioning", "Business Model Canvas",
    "Strategic Alignment", "Disruptive Innovation", "Market Penetration", "Diversification",
    "Strategic Intent", "Market Analysis", "Go-To-Market (GTM)", "Category Creation",
    "Ecosystem Play", "Strategic Initiative", "Transformation", "Key Success Factors (KSFs)",
    "Emerging Markets", "Execution Framework", "Strategic Pillar", "Digital Strategy",
    "Customer-Centric", "Vertical Integration", "Horizontal Integration", "Product Strategy",
    "Balanced Scorecard", "Mission Critical", "Future-Proof", "Market Dynamics", "Change Management",
    "Competitive Landscape", "Market Trends", "Headwinds", "Tailwinds", "Long-Term Vision",
    "Pivot", "Acquisition Strategy", "Flywheel Model", "Network Effects", "Defensibility",
    "Strategic Partnerships", "Scenario Planning", "War Gaming", "Core Values", "Mission"
  ],
  "brainstorming": [
    "Ideation", "Think Outside The Box", "No Bad Ideas", "Mind Map", "Diverge / Converge",
    "Affinity Mapping", "User Needs", "Whiteboard", "How Might We...", "Crazy Eights",
    "Dot Voting", "Brainwriting", "Reverse Brainstorming", "SCAMPER", "What If...",
    "Blue Sky Thinking", "Idea Generation", "Creative Juices", "Low-hanging Fruit", "Parking Lot",
    "Build On That", "Yes, And...", "Unpack That", "Free Association", "Groupthink (Avoid It!)",
    "Six Thinking Hats", "Lightning Decision Jam", "Assumption Storming", "Empathy Map", "Storyboarding"
  ],
  "budget": [
    "Fiscal Year (FY)", "Bottom Line", "Top Line", "ROI (Return on Investment)", "Cost Center",
    "Revenue Stream", "Fixed Costs", "Variable Costs", "CAPEX (Capital Expenditure)",
    "OPEX (Operating Expenditure)", "Burn Rate", "Runway", "Cash Flow", "Cash Positive",
    "Profit Margin (Gross/Net)", "Budget Allocation", "Forecast", "Budget Variance", "Rightsizing",
    "Zero-Based Budgeting (ZBB)", "Balance Sheet", "Q1, Q2, Q3, Q4", "Overhead", "Financial Metrics",
    "Budget Constraints", "Cost Savings", "Budget Cycle", "Financial Projection",
    "Budget Cut", "Revenue Target", "Budget Approval", "Expense Report", "YOY Growth (Year-over-Year)",
    "Budget Prioritization", "Resource Allocation", "Financial Year", "Fiscal Responsibility",
    "P&L (Profit and Loss)", "Cost Optimization", "Economic Value Add (EVA)", "Headcount", "EBITDA",
    "Financial Modeling", "Sensitivity Analysis", "Contingency Fund", "Accrual", "Amortization"
  ],
  "product": [
    "Go-to-Market (GTM)", "Launch Date", "Product Market Fit (PMF)", "Early Adopters", "User Journey",
    "Value Proposition", "Feature Set", "Roadmap", "Beta Testing", "MVP (Minimum Viable Product)",
    "Product Vision", "User Experience (UX)", "First Mover Advantage", "Market Opportunity",
    "Product Strategy", "USP (Unique Selling Proposition)", "Product Differentiation", "Target Customer", "User Persona",
    "Customer Feedback Loop", "Product-Led Growth (PLG)", "Churn Rate", "Retention Metrics", "Acquisition Channel",
    "Conversion Rate", "Growth Metrics", "Pricing Strategy", "Revenue Model", "Marketing Collateral",
    "Competitive Analysis", "Feature Prioritization", "Soft Launch", "Hard Launch", "Adoption Rate",
    "Customer Success Metrics", "Release Notes", "Product Lifecycle", "User Adoption", "Stickiness",
    "User Acquisition Cost (CAC)", "Lifetime Value (LTV)", "Activation Rate", "Minimum Lovable Product (MLP)", "A/B Testing",
    "Customer Segmentation", "Jobs To Be Done (JTBD)", "Feature Creep", "Technical Debt", "Dogfooding"
  ],
  "sales-pitch": [
    "Value Prop(osition)", "Closing the Deal", "Pipeline", "Quota", "CRM (Customer Relationship Management)",
    "Lead Generation", "Objection Handling", "Pain Points", "Solution Selling", "Decision Maker",
    "Influencer", "Deal Cycle", "Demo", "Negotiation", "BANT (Budget, Authority, Need, Timeline)",
    "Compelling Event", "Proof of Concept (PoC)", "Case Study", "Testimonial", "ROI Calculation",
    "Discovery Call", "Qualified Lead", "Sales Funnel", "Upsell / Cross-sell", "Competitive Edge",
    "Unique Selling Points (USP)", "Customer Success Story", "Proposal", "Contract", "Onboarding",
    "Relationship Building", "Needs Assessment", "Sales Cycle", "Gatekeeper", "Target Account"
  ],
  "quarterly": [
    "QBR (Quarterly Business Review)", "Quarter-Over-Quarter (QoQ)", "Year-Over-Year (YoY)", "Financial Performance", "Quarterly Earnings",
    "Quarterly Targets", "Revenue Growth", "Performance Metrics", "KPIs", "Projections",
    "Achievements", "Quarterly Forecast", "Business Outlook", "Strategic Initiatives Review", "Key Learnings",
    "Challenges & Risks", "Bottlenecks", "Market Conditions Update", "Success Stories", "Red Flags / Watch Items",
    "Customer Acquisition Cost (CAC)", "Lifetime Value (LTV)", "Retention Rate", "Net Promoter Score (NPS)",
    "Quarterly Objectives", "Revenue Recognition", "Sales Pipeline", "Conversion Rates", "Quarterly Goals",
    "Performance Comparison", "Benchmarking", "Quarterly Roadmap Update", "Quarterly Budget Review", "Resource Planning",
    "Strategic Priorities Update", "Customer Retention", "Churn Analysis", "Next Quarter Strategy", "Actuals vs. Forecast",
    "Pipeline Coverage", "Key Results (from OKRs)", "Business Review", "Progress Update", "Lessons Learned",
    "Run Rate", "Look Back / Look Forward", "Variance Analysis", "Management Commentary", "Dashboard"
  ],
  "offsite": [
    "Team Building Activity", "Strategic Alignment", "Corporate Values", "Vision Setting", "Mission Statement Review",
    "Corporate Culture", "Org Chart Discussion", "Leadership Team Sync", "Collaboration Exercise", "Brainstorming Session",
    "Innovation Lab", "Break-out Groups", "Workshop Facilitation", "Facilitator", "Change Management Workshop",
    "Strategic Planning", "Executive Summary", "Decision Framework", "Consensus Building", "Action Plan Development",
    "Company Direction Setting", "Leadership Training Module", "Corporate Retreat", "Team Dynamics Analysis", "Whiteboarding Session",
    "Cultural DNA Exploration", "Leadership Pipeline Review", "Mentorship Program Kickoff", "Succession Planning Discussion", "Talent Development Session",
    "Executive Coaching Debrief", "Organizational Health Check", "Corporate Identity Workshop", "Employee Experience Focus",
    "Performance Culture Building", "Company Values Reinforcement", "Future Vision Crafting", "Leadership Philosophy Share", "Annual Planning Kickoff",
    "Ice Breaker", "SWOT Analysis", "Team Charter Creation", "Psychological Safety", "Culture Carrier Identification",
    "Group Dynamics Exercise", "Parking Lot (Ideas)", "Action Register", "Key Objectives", "Stretch Goals"
  ],
  "board": [
    "Shareholder Value", "Governance Framework", "Fiduciary Duty", "Proxy Statement", "Board Resolution",
    "Quarterly Earnings Call Prep", "Annual Report Review", "Strategic Direction Approval", "Risk Management Oversight", "Compliance Update",
    "Corporate Governance Best Practices", "Board Committee Reports (Audit, Comp, Nom/Gov)", "Executive Compensation Plan", "Due Diligence Findings", "Audit Committee Charter",
    "Fiscal Responsibility Metrics", "Regulatory Environment Scan", "Stakeholder Engagement Strategy", "Investor Relations Update",
    "Dividend Policy Discussion", "Stock Performance Analysis", "Board Approval Request", "Chairman's Statement Draft", "CEO Performance Review",
    "Legal Liability Assessment", "Corporate Social Responsibility (CSR)", "Business Ethics Report", "Board Oversight Function", "Capital Allocation Strategy",
    "Business Continuity Plan Review", "Market Capitalization Trends", "Board Strategy Session", "Growth Trajectory Analysis", "M&A (Mergers & Acquisitions) Strategy",
    "Competitive Landscape Briefing", "ESG (Environmental, Social, Governance) Metrics", "Financial Performance Deep Dive", "Sustainability Initiatives", "Ethical Considerations Memo",
    "Minutes Approval", "Succession Planning Update", "Investor Deck Preview", "Term Sheet Review", "Share Price Volatility"
  ],
  "layoff": [
    "Restructuring Plan", "Downsizing Initiative", "Right-sizing the Organization", "Organizational Change Announcement", "Strategic Realignment Communication",
    "Resource Optimization Measures", "Workforce Reduction Plan", "Operational Efficiency Gains", "Cost Containment Strategy", "Redundancy Identification Process",
    "Transition Plan Details", "Severance Package Information", "Outplacement Services Offered", "Change Management Communication", "Talent Retention Strategy (for remaining)",
    "Focus on Core Functions", "Resource Re-allocation", "Organizational Health Metrics", "Streamlined Operations Goal", "Business Necessity Explanation",
    "Financial Constraints Overview", "Market Conditions Impact", "Updated Strategic Direction", "Business Transformation Phase", "Operational Focus Shift",
    "Future Vision Articulation", "Ensuring Company Stability", "Revised Growth Strategy", "Reduced Headcount Numbers", "Business Unit Consolidation",
    "Difficult but Necessary Decision", "Moving Forward Together", "Addressing Cultural Impact", "Renewed Focus on Priorities", "Long-term Sustainability Plan",
    "Business Continuity Assurance", "Transition Period Timeline", "Career Support Resources", "Company Evolution Narrative", "Shared Sacrifice Message",
    "Impacted Employees Notification Process", "Business Rationale Document", "Communication Plan Execution", "Knowledge Transfer Plan", "Employee Morale Considerations",
    "Support Resources List", "Voluntary Separation Program (if applicable)", "Involuntary Separation Details", "Next Steps Communication", "FAQ Document"
  ]
};