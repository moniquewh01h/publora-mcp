# Publora MCP

This MCP server allows Claude to create and schedule posts in Publora.

## Setup

### 1. Install dependencies
```
npm install
```

### 2. Add your Publora API key  
(Do NOT upload your real key to GitHub — add it locally on your computer)
```
export PUBLORA_API_KEY="your_real_key_here"
```

### 3. Run the server
```
node server.js
```

### 4. Add this MCP to Claude
Use the GitHub URL of this repository in Claude’s MCP settings.
