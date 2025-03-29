// Meeting type data for initialization
export const meetingTypeData = [
  { name: "all-hands", displayName: "All Hands Meeting" },
  { name: "kickoff", displayName: "Project Kickoff" },
  { name: "performance", displayName: "Performance Review" }
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
    "Big Picture", "Boil The Ocean", "Break Down Silos"
  ],
  "kickoff": [
    "Roadmap", "Deliverables", "Timeline", "Milestones", "MVP",
    "Scope Creep", "Stakeholders", "Resources", "Buy-In", "Action Items",
    "Due Diligence", "Sprint", "Backlog", "User Story", "Pain Points",
    "Scalable", "Iterate", "Framework", "Proof of Concept", "Alignment",
    "Cost-Benefit", "Expectations", "Fast Track", "Value Proposition", "Execution",
    "Next Steps", "Friction Points", "Strategic", "Roll Out", "North Star",
    "Phase One", "Requirements", "Blockers", "Success Criteria", "Target Audience"
  ],
  "performance": [
    "Growth Mindset", "Metrics", "Objectives", "Results-Driven", "Career Path",
    "Development Plan", "Feedback", "Evaluation", "Contributions", "Self-Assessment",
    "Goals", "Challenges", "Strengths", "Areas for Improvement", "Track Record",
    "Performance Indicators", "Competencies", "Achievement", "Expectations", "Potential",
    "Alignment", "Recognition", "Peer Review", "Accountability", "Top Performer",
    "Skill Set", "Benchmarks", "Upskilling", "Personal Brand", "Job Satisfaction",
    "Career Growth", "Leadership Qualities", "OKRs", "Quarterly Goals", "Professional Development"
  ]
};
