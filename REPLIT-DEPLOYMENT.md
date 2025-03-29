# 🚀 Deploying Buzzword Bingo on Replit

*Don't worry, our deployment is "agile" and "frictionless" - no buzzwords needed!*

## Simple Deployment Steps

1. **Build the client**
   In the Replit shell, run:
   ```bash
   cd client && npm run build
   ```
   This creates the optimized production build of the React app in `client/dist`.

2. **Start the deployment server**
   Run:
   ```bash
   node replit-deploy.js
   ```
   This special script does two things:
   - Serves the API endpoints at `/api/...`
   - Serves the built client files for all other routes

3. **Save the configuration**
   - Click the "Run" button in Replit to save this as your start command
   - Your app will now be deployed at your Replit URL (visible in the webview)

## What's happening behind the scenes?

The `replit-deploy.js` script creates a combined server that:

1. Imports your API endpoints from `api/index.js`
2. Serves these at the `/api/` path
3. Serves the built client files from `client/dist`
4. Handles client-side routing by serving `index.html` for all non-API routes

## Troubleshooting

If you see errors or the app isn't working:

1. **Check the client build:**
   - Make sure the `client/dist` folder exists
   - If not, run `cd client && npm run build` again

2. **Check API access:**
   - Try accessing your API directly at `https://your-replit-url.repl.co/api/meeting-types`
   - You should see JSON data, not errors

3. **Check environment variables:**
   - No environment variables are needed for this app
   - The API is accessed via relative URLs which work automatically

4. **Still having issues?**
   - If the app works locally but not when deployed, try modifying `client/.env.production` to explicitly set the API URL:
     ```
     VITE_API_URL=/api
     ```

## One-Click Deployment

For the ultimate "10x developer" approach, you can do everything in one command:

```bash
node replit-deploy.js
```

This will check if the client is built, build it if needed, and start the combined server.

*Congratulations on your "mission-critical deployment success"!*