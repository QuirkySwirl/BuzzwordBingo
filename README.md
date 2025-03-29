# 🎮 Corporate Buzzword Bingo

An interactive web application that generates humorous Corporate Buzzword Bingo cards for different meeting types, allowing users to play and share entertaining bingo experiences during those endless business meetings.

![Buzzword Bingo](/generated-icon.png)

## 🌟 Features

- **Dynamic Bingo Cards**: Generates 5x5 bingo cards with buzzwords tailored to different meeting types
- **Interactive Experience**: Mark squares with a satisfying "HEARD" stamp effect
- **Bingo Detection**: Automatic detection when you get 5 in a row with celebratory confetti!
- **Multiple Meeting Types**: Themed cards for All-Hands, Team Sync, Strategy Sessions, Client Meetings and Board Meetings
- **Multi-card Support**: Generate and switch between multiple cards at once
- **Social Sharing**: Share your bingo cards and accomplishments
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ and npm

### Running Locally

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to http://localhost:3000

## 🏗️ Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express.js
- **State Management**: React Query
- **Styling**: Tailwind CSS with custom theme
- **Animations**: CSS transitions, canvas-confetti

## 📄 API Endpoints

The application exposes the following API endpoints:

- `GET /api/meeting-types` - List all meeting types
- `GET /api/buzzwords/:type` - Get buzzwords for a specific meeting type
- `GET /api/meeting-stats` - Get meeting statistics for the homepage
- `POST /api/generate-card` - Generate a new bingo card

## 🌐 Deployment

This application can be deployed to various platforms. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on deploying to:

- Vercel
- Netlify
- Railway/Render/Heroku

## 🤝 Contributing

Contributions welcome! Feel free to add new buzzwords or meeting types to enhance the experience.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Inspired by the countless corporate meetings we've all endured
- Making meetings bearable since the age of AI