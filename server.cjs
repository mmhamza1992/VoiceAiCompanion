const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');

const app = express();
app.use(express.json());

// Detect the actual build directory by checking if it exists
const buildDir = path.join(__dirname, 'dist');
console.log(`Checking build directory: ${buildDir}`);
console.log(`Build directory exists: ${fs.existsSync(buildDir)}`);

// List files in the current directory for debugging
console.log('Files in current directory:');
fs.readdirSync(__dirname).forEach(file => {
  console.log(` - ${file}`);
});

// Serve static files from the React app build
app.use(express.static(buildDir));

// API proxy to Flask server
app.use('/api', createProxyMiddleware({
  target: 'http://0.0.0.0:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api' // No rewriting needed, keep pathnames as-is
  }
}));

// The "catchall" handler: send back React's index.html file
app.get('*', (req, res) => {
  const indexPath = path.join(buildDir, 'index.html');
  console.log(`Serving index file from: ${indexPath}`);
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`Build file not found at ${indexPath}. Please make sure the build has completed successfully.`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});