// Vercel Serverless API endpoint
const { createServer } = require('http');
const { parse } = require('url');
const express = require('express');
const app = express();

// Import data
const meetingTypeData = {
  'all-hands': 'All-Hands Meeting',
  'team-sync': 'Team Sync',
  'strategy-session': 'Strategy Session',
  'client-meeting': 'Client Meeting',
  'board-meeting': 'Board Meeting'
};

const buzzwordData = {
  'all-hands': [
    'Synergy', 'Leverage', 'Circle Back', 'Deep Dive', 'Low-Hanging Fruit',
    'Move the Needle', 'Bandwidth', 'Touch Base', 'Paradigm Shift', 'Think Outside the Box',
    'Take it Offline', 'Value Add', 'Streamline', 'Pain Point', 'Disrupt',
    'Action Item', 'Thought Leadership', 'Deliverable', 'Pivot', 'Best Practice',
    'Core Competency', 'Drill Down', 'End of Day', 'Game Changer', 'Ecosystem',
    'On the Same Page', 'ASAP', 'Visibility', 'Scalable', 'Win-Win'
  ],
  'team-sync': [
    'OKRs', 'KPIs', 'Sprint', 'Backlog', 'Standup',
    'Blockers', 'Agile', 'Story Points', 'Velocity', 'Retrospective',
    'Planning Poker', 'Burndown Chart', 'Technical Debt', 'MVP', 'Iteration',
    'Task', 'Bottleneck', 'Scrum', 'Epic', 'User Story',
    'Dependencies', 'Prioritize', 'Cross-Functional', 'Kanban', 'Feature Flag',
    'Ship It', 'Trello', 'JIRA', 'Workflow', 'Milestone'
  ],
  'strategy-session': [
    'North Star', 'Growth Hacking', 'Market Share', 'Competition', 'User Acquisition',
    'Retention', 'CAC', 'LTV', 'ROI', 'Engagement',
    'Target Market', 'Brand Awareness', 'Funnel', 'Campaign', 'Analytics',
    'User Journey', 'Pain Points', 'Value Proposition', 'Stakeholders', 'Alignment',
    'Pricing Strategy', 'Positioning', 'Differentiation', 'Objectives', 'Mission Critical',
    'Key Initiative', 'Roadmap', 'Strategic Vision', 'Blue Ocean', 'Disruption'
  ],
  'client-meeting': [
    'Onboarding', 'Deliverables', 'Timeline', 'Scope', 'Milestones',
    'Budget', 'Resources', 'Requirements', 'Expectations', 'Client Satisfaction',
    'Stakeholder', 'Priority', 'Status Update', 'Feedback Loop', 'Point of Contact',
    'Value Proposition', 'ROI', 'Implementation', 'Rollout', 'Success Metrics',
    'QBR', 'Account', 'Upsell', 'Service Level Agreement', 'Next Steps',
    'Follow-up', 'Action Items', 'Approval', 'Sign-off', 'Contract'
  ],
  'board-meeting': [
    'Shareholder Value', 'Quarterly Earnings', 'Fiscal Year', 'Capital Allocation', 'Executive Summary',
    'Bottom Line', 'Top Line', 'EBITDA', 'Market Conditions', 'Economic Outlook', 
    'Business Units', 'Corporate Strategy', 'Due Diligence', 'Fiduciary Duty', 'Risk Assessment',
    'Governance', 'Compliance', 'Audit Committee', 'M&A', 'Valuation',
    'Board Approval', 'Proxy Statement', 'Succession Planning', 'Competitive Landscape', 'Annual Report',
    'P&L', 'Balance Sheet', 'Cash Flow', 'Profit Margin', 'Dividend'
  ]
};

// Configure Express middleware
app.use(express.json());

// Define API routes
app.get('/api/meeting-types', (req, res) => {
  const meetingTypes = Object.entries(meetingTypeData).map(([name, displayName], index) => ({
    id: index + 1,
    name,
    displayName
  }));
  res.json(meetingTypes);
});

app.get('/api/buzzwords/:type', (req, res) => {
  const { type } = req.params;
  const words = buzzwordData[type] || buzzwordData['all-hands']; // Default to all-hands if type not found
  res.json(words);
});

app.get('/api/meeting-stats', (req, res) => {
  // These are the stats shown on the homepage
  const stats = [
    { id: 1, text: '📊 55 million meetings are held each week in America alone' },
    { id: 2, text: '⏰ The average employee attends 62 meetings monthly' },
    { id: 3, text: '💸 Unnecessary meetings cost U.S. businesses $37 billion annually' }
  ];
  res.json(stats);
});

app.post('/api/generate-card', (req, res) => {
  // Simple logic to create a bingo card
  const { meetingType = 'all-hands', numCards = 1 } = req.body || {};
  const words = buzzwordData[meetingType] || buzzwordData['all-hands'];
  
  // Function to shuffle array
  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  // Create bingo cards with shuffled words
  const cards = [];
  
  for (let i = 0; i < numCards; i++) {
    const shuffledWords = shuffle(words);
    const selectedWords = shuffledWords.slice(0, 24); // Get 24 words (5x5 with free space)
    
    // Insert FREE in the middle (index 12)
    const finalWords = [
      ...selectedWords.slice(0, 12),
      'FREE SPACE', // Middle position
      ...selectedWords.slice(12)
    ];
    
    // Generate a card object
    cards.push({
      id: Date.now() + i, // Simple ID generation
      meetingType,
      words: finalWords,
      markedSquares: Array(25).fill(false),
      hasBingo: false,
      bingoLines: [],
      createdAt: new Date().toISOString()
    });
  }
  
  // If only one card requested, return it directly, otherwise return the array of cards
  res.json(numCards === 1 ? cards[0] : { cards, meetingType, numCards, activeCardIndex: 0 });
});

// Setup error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Create HTTP server for both Vercel and Replit
const server = createServer((req, res) => {
  // For direct access (used by Replit)
  const parsedUrl = parse(req.url, true);
  app(req, res);
});

// For Replit deployment, listen on the port if not being imported
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless function
module.exports = app;