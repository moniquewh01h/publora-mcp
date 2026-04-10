import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// Publora MCP server URL
const BASE_URL = "https://mcp.publora.com";

// IMPORTANT: Replace YOUR_API_KEY locally — never upload your real key to GitHub
const API_KEY = process.env.PUBLORA_API_KEY;

// Helper to call Publora
async function publoraRequest(endpoint, method = "GET", data = null) {
  try {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      data
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

// MCP: List available tools
app.get("/tools", (req, res) => {
  res.json({
    tools: [
      {
        name: "create_post",
        description: "Create a social media post in Publora",
        input_schema: {
          type: "object",
          properties: {
            content: { type: "string" }
          },
          required: ["content"]
        }
      },
      {
        name: "schedule_post",
        description: "Schedule a post for later",
        input_schema: {
          type: "object",
          properties: {
            content: { type: "string" },
            datetime: { type: "string" }
          },
          required: ["content", "datetime"]
        }
      }
    ]
  });
});

// MCP: Execute tools
app.post("/run", async (req, res) => {
  const { tool, input } = req.body;

  if (tool === "create_post") {
    const result = await publoraRequest("/create", "POST", {
      content: input.content
    });
    return res.json(result);
  }

  if (tool === "schedule_post") {
    const result = await publoraRequest("/schedule", "POST", {
      content: input.content,
      datetime: input.datetime
    });
    return res.json(result);
  }

  res.json({ error: "Unknown tool" });
});

app.listen(3000, () => {
  console.log("Publora MCP server running on port 3000");
});
