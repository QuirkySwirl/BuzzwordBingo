// Meeting type data for initialization
export const meetingTypeData = [
  { name: "all-hands", displayName: "All Hands Meeting" },
  { name: "kickoff", displayName: "Project Kickoff" },
  { name: "performance", displayName: "Performance Review" },
  { name: "strategy", displayName: "Strategy Session" },
  { name: "budget", displayName: "Budget Meeting" },
  { name: "product", displayName: "Product Launch" },
  { name: "quarterly", displayName: "Quarterly Review" },
  { name: "offsite", displayName: "Executive Offsite" },
  { name: "board", displayName: "Board Meeting" },
  { name: "layoff", displayName: "Restructuring Announcement" }
];

// Buzzword data mapped by meeting type
export const buzzwordData: Record<string, string[]> = {
  "all-hands": [
    "Synergy", "Circle Back", "Deep Dive", "Moving Forward", "Bandwidth",
    "Agile", "At The End Of The Day", "Low-Hanging Fruit", "Streamline",
    "Touch Base", "Game Changer", "Leverage", "Paradigm Shift", "Disruptive",
    "Wheelhouse", "110 Percent", "Actionable", "On My Radar", "Core Competency",
    "Value Add", "Win-Win", "KPI", "Drill Down", "No-Brainer", "Ecosystem",
    "Thought Leader", "Company Culture", "Transparency", "Mission Critical",
    "Cross-Functional", "Best Practice", "Bleeding Edge", "Blue Sky Thinking",
    "Big Picture", "Boil The Ocean", "Break Down Silos", "Visibility", "Optimize",
    "Alignment", "Organic Growth", "Pivot", "Digital Transformation"
  ],
  "kickoff": [
    "Roadmap", "Deliverables", "Timeline", "Milestones", "MVP",
    "Scope Creep", "Stakeholders", "Resources", "Buy-In", "Action Items",
    "Due Diligence", "Sprint", "Backlog", "User Story", "Pain Points",
    "Scalable", "Iterate", "Framework", "Proof of Concept", "Alignment",
    "Cost-Benefit", "Expectations", "Fast Track", "Value Proposition", "Execution",
    "Next Steps", "Friction Points", "Strategic", "Roll Out", "North Star", 
    "Phase One", "Requirements", "Blockers", "Success Criteria", "Target Audience",
    "Dependencies", "Quickwin", "Mission Statement", "Risk Assessment", "RACI Matrix",
    "Growth Hacking", "First Principles", "Moonshot", "Lean Canvas", "OKRs",
    "Design Sprint", "Product-Market Fit", "Blitzscaling", "10x Not 10%", "Unicorn Status",
    "Ramen Profitable", "Customer Discovery", "Minimum Viable Test", "Pivot", "Traction",
    "Viral Coefficient", "Bootstrapped", "Fail Fast", "T-shaped Skills", "AARRR Metrics"
  ],
  "performance": [
    "Growth Mindset", "Metrics", "Objectives", "Results-Driven", "Career Path",
    "Development Plan", "Feedback", "Evaluation", "Contributions", "Self-Assessment",
    "Goals", "Challenges", "Strengths", "Areas for Improvement", "Track Record",
    "Performance Indicators", "Competencies", "Achievement", "Expectations", "Potential",
    "Alignment", "Recognition", "Peer Review", "Accountability", "Top Performer",
    "Skill Set", "Benchmarks", "Upskilling", "Personal Brand", "Job Satisfaction",
    "Career Growth", "Leadership Qualities", "OKRs", "Quarterly Goals", "Professional Development",
    "Stretch Goals", "Career Trajectory", "Work-Life Balance", "360 Feedback", "Succession Planning"
  ],
  "strategy": [
    "Vision Statement", "Market Share", "Competitive Advantage", "Strategic Imperative", 
    "Five-Year Plan", "SWOT Analysis", "Growth Strategy", "Blue Ocean", "Red Ocean", 
    "Value Proposition", "Core Competency", "Market Positioning", "Business Model Canvas", 
    "Strategic Alignment", "Disruptive Innovation", "Market Penetration", "Diversification", 
    "Strategic Intent", "Market Analysis", "Go-To-Market", "Category Creation", 
    "Ecosystem Play", "Strategic Initiative", "Transformation", "Key Success Factors", 
    "Emerging Markets", "Execution Framework", "Strategic Pillar", "Digital Strategy", 
    "Customer-Centric", "Vertical Integration", "Horizontal Integration", "Product Strategy", 
    "Balanced Scorecard", "Mission Critical", "Future-Proof", "Market Dynamics", "Change Management",
    "First Principles", "North Star Metric", "Flywheel Model", "Platform Strategy", "Zero to One",
    "Thought Leadership", "Innovative Disruption", "Canonical Strategy", "Adjacent Possibilities", "Hockey Stick Growth",
    "Decision Velocity", "Strategic Moat", "Aggregation Theory", "Network Effects", "Economies of Scale",
    "Experimentation", "Optionality", "Economies of Scope", "Lean Thinking", "Systems Thinking"
  ],
  "budget": [
    "Fiscal Year", "Bottom Line", "Top Line", "ROI", "Cost Center", 
    "Revenue Stream", "Fixed Costs", "Variable Costs", "Capital Expenditure", 
    "Operating Expenditure", "Burn Rate", "Runway", "Cash Flow", "Cash Positive", 
    "Profit Margin", "Budget Allocation", "Forecast", "Budget Variance", "Rightsizing", 
    "Zero-Based Budgeting", "Balance Sheet", "Q1, Q2, Q3, Q4", "Overhead", "Financial Metrics", 
    "Budget Constraints", "Cost Savings", "Budget Cycle", "Financial Projection", 
    "Budget Cut", "Revenue Target", "Budget Approval", "Expense Report", "YOY Growth", 
    "Budget Prioritization", "Resource Allocation", "Financial Year", "Fiscal Responsibility", 
    "Profit and Loss", "Cost Optimization", "Economic Value Add"
  ],
  "product": [
    "Go-to-Market", "Launch Date", "Product Market Fit", "Early Adopters", "User Journey", 
    "Value Proposition", "Feature Set", "Roadmap", "Beta Testing", "MVP", 
    "Product Vision", "User Experience", "First Mover Advantage", "Market Opportunity", 
    "Product Strategy", "USP", "Product Differentiation", "Target Customer", "User Persona", 
    "Customer Feedback", "Product-Led Growth", "Churn Rate", "Retention Metrics", "Acquisition Channel", 
    "Conversion Rate", "Growth Metrics", "Pricing Strategy", "Revenue Model", "Marketing Collateral", 
    "Competitive Analysis", "Feature Prioritization", "Soft Launch", "Hard Launch", "Adoption Rate", 
    "Customer Success Metrics", "Release Notes", "Product Lifecycle", "User Adoption", "Stickiness"
  ],
  "quarterly": [
    "QBR", "Quarter-Over-Quarter", "Year-Over-Year", "Financial Performance", "Quarterly Earnings", 
    "Quarterly Targets", "Revenue Growth", "Performance Metrics", "KPIs", "Projections", 
    "Achievements", "Quarterly Forecast", "Business Outlook", "Strategic Initiatives", "Key Learnings", 
    "Challenges", "Bottlenecks", "Market Conditions", "Success Stories", "Red Flags", 
    "Customer Acquisition Cost", "Lifetime Value", "Retention Rate", "Net Promoter Score", 
    "Quarterly Objectives", "Revenue Recognition", "Pipeline", "Conversion Rates", "Quarterly Goals", 
    "Performance Comparison", "Benchmarking", "Quarterly Roadmap", "Quarterly Budget", "Resource Planning", 
    "Strategic Priorities", "Customer Retention", "Churn Analysis", "Next Quarter Strategy"
  ],
  "offsite": [
    "Team Building", "Strategic Alignment", "Corporate Values", "Vision Setting", "Mission Statement", 
    "Corporate Culture", "Org Chart", "Leadership Team", "Collaboration", "Brainstorming", 
    "Innovation Lab", "Break-out Sessions", "Workshop", "Facilitation", "Change Management", 
    "Strategic Planning", "Executive Summary", "Decision Framework", "Consensus Building", "Action Plan", 
    "Company Direction", "Leadership Training", "Corporate Retreat", "Team Dynamics", "Whiteboarding", 
    "Cultural DNA", "Leadership Pipeline", "Mentorship", "Succession Planning", "Talent Development", 
    "Executive Coaching", "Organizational Health", "Corporate Identity", "Employee Experience", 
    "Performance Culture", "Company Values", "Future Vision", "Leadership Philosophy", "Annual Planning"
  ],
  "board": [
    "Shareholder Value", "Governance", "Fiduciary Duty", "Proxy Statement", "Board Resolution", 
    "Quarterly Earnings", "Annual Report", "Strategic Direction", "Risk Management", "Compliance", 
    "Corporate Governance", "Board Committee", "Executive Compensation", "Due Diligence", "Audit Committee", 
    "Fiscal Responsibility", "Regulatory Framework", "Stakeholder Relations", "Investor Relations", 
    "Dividend Policy", "Stock Performance", "Board Approval", "Chairman's Statement", "CEO Report", 
    "Legal Liability", "Corporate Responsibility", "Business Ethics", "Board Oversight", "Capital Allocation", 
    "Business Continuity", "Market Capitalization", "Board Strategy", "Growth Trajectory", "M&A Strategy", 
    "Competitive Landscape", "ESG Metrics", "Financial Performance", "Sustainability", "Ethical Considerations"
  ],
  "layoff": [
    "Restructuring", "Downsizing", "Right-sizing", "Organizational Change", "Strategic Realignment", 
    "Resource Optimization", "Workforce Reduction", "Operational Efficiency", "Cost Containment", "Redundancies", 
    "Transition Plan", "Severance Package", "Outplacement Services", "Change Management", "Talent Retention", 
    "Core Functions", "Resource Allocation", "Organizational Health", "Streamlined Operations", "Business Necessity", 
    "Financial Constraints", "Market Conditions", "Strategic Direction", "Business Transformation", "Operational Focus", 
    "Future Vision", "Company Stability", "Growth Strategy", "Reduced Headcount", "Consolidation", 
    "Difficult Decision", "Moving Forward", "Cultural Impact", "Renewed Focus", "Long-term Sustainability", 
    "Business Continuity", "Transition Period", "Career Support", "Company Evolution", "Shared Sacrifice"
  ]
};
