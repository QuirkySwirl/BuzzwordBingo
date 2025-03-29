# Deploying Buzzword Bingo

This application is a full-stack app that consists of both a React frontend and an Express backend. Deploying to platforms like Vercel or Netlify requires a specific approach since they primarily support static sites or serverless functions.

## Two-Part Deployment Strategy

For this app, you'll need to deploy the frontend and backend separately:

### 1. Backend Deployment (API Server)

First, deploy the backend API to a platform that supports Node.js applications:

#### Option A: Deploy to Railway/Render/Heroku

These platforms fully support Express.js applications:

1. Create an account on [Railway](https://railway.app), [Render](https://render.com), or [Heroku](https://heroku.com)
2. Create a new web service and connect your repository
3. Set the build command to `npm install`
4. Set the start command to `npm run start`
5. After deployment, note your API URL (e.g., `https://buzzword-bingo-api.railway.app`)

#### Option B: Deploy to Vercel (Serverless Functions)

1. Create a copy of just the server files to a new repository:
   - `server/` directory
   - `shared/` directory
   - `package.json`
   - `tsconfig.json`
   - `vercel.json`
2. Deploy this repository to Vercel
3. Note your API URL (e.g., `https://buzzword-bingo-api.vercel.app`)

### 2. Frontend Deployment

After deploying the backend, deploy the frontend:

1. Navigate to the client directory: `cd client`
2. Create a `.env.production` file with your backend URL:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
3. Build the frontend: `npm run build`
4. Deploy the `dist` directory to Vercel or Netlify

## One-Click Deployment (Vercel)

Alternatively, you can use a monorepo approach with Vercel:

1. Add the `vercel.json` file to your root directory (already done)
2. Connect your GitHub repository to Vercel
3. Add the `VITE_API_URL` environment variable in Vercel's dashboard
4. Deploy

## Debugging Deployment Issues

If you see source code instead of the built application:

1. Make sure your repository is public or properly connected to the deployment service
2. Check if you have the correct configuration files (vercel.json)
3. Verify your build settings in the deployment platform
4. Make sure you've set the correct environment variables

## Testing Static Build Locally

To test the static build locally:

1. Build the client: `cd client && npm run build`
2. Install a static server: `npm install -g serve`
3. Run the static server: `serve -s dist`
4. Note: API calls will fail unless you also run the backend server locally