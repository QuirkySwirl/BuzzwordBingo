// This script helps deploy the app on Replit by running both client and server side code
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const express = require('express');
const { createServer } = require('http');

// Check if we need to build the client
const clientBuildPath = path.join(__dirname, 'client', 'dist');
const needsClientBuild = !fs.existsSync(clientBuildPath);

// Function to run commands
function runCommand(command, cwd = '.') {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} in ${cwd}`);
    const process = exec(command, { cwd });
    
    process.stdout.on('data', (data) => console.log(data));
    process.stderr.on('data', (data) => console.error(data));
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

// Create a combined server that serves both API and client
function createCombinedServer() {
  // Import the API app
  const apiApp = require('./api/index.js');
  
  // Create an Express app for serving the client
  const app = express();
  
  // Mount the API at /api
  app.use('/api', apiApp);
  
  // Serve static files from client/dist
  app.use(express.static(clientBuildPath));
  
  // For all other requests, serve the index.html (client-side routing)
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
  
  // Create an HTTP server
  const server = createServer(app);
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`💻 API endpoints available at http://localhost:${PORT}/api/...`);
  });
}

async function deploy() {
  try {
    if (needsClientBuild) {
      console.log('🏗️ Building client...');
      await runCommand('npm run build', './client');
    } else {
      console.log('✅ Client build already exists');
    }
    
    console.log('🚀 Starting combined server...');
    createCombinedServer();
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

deploy();