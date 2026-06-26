import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON bodies
  app.use(express.json());

  // Initialize Gemini Client Lazily/Safely
  let ai: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY is not defined. The AI Stylist will run in mock mode.");
        return null;
      }
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return ai;
  }

  // API endpoint for AI Stylist
  app.post("/api/ai-stylist", async (req, res) => {
    try {
      const { message, chatHistory, preferences } = req.body;

      const client = getGeminiClient();
      if (!client) {
        // Fallback response if API Key is not set yet
        return res.json({
          text: `দুঃখিত, বর্তমানে জেমিনি এপিআই কি (GEMINI_API_KEY) কনফিগার করা নেই। তবে ফ্যাশন টিপস হিসেবে: গরমে সুতি পাঞ্জাবি বা ক্যাজুয়াল লিনেন শার্ট এবং শীতে আমাদের প্রিমিয়াম ব্লেজার ট্রাই করতে পারেন! আপনার জন্য আমাদের স্টাইলিস্ট রিকমেন্ডেশন সবসময় রেডি আছে।`,
          isFallback: true
        });
      }

      // Build system instruction and context
      const systemInstruction = `You are "Bhadralok AI Stylist" (ভদ্রলোক এআই স্টাইলিস্ট), an elegant, warm, sophisticated, and highly knowledgeable personal fashion assistant for Bangladeshi and South Asian men's fashion.
Your tone should be courteous, premium, and friendly (use "আপনি" and elegant Bengali phrasing like "শুভকামনা", "নমস্কার/সালাম", "ধন্যবাদ").
Help the customer choose the perfect outfits for various occasions (e.g., Eid, Weddings, Corporate Meetings, Casual Hangouts, Rainy Season, Summer).
Provide advice on:
1. Product combinations: e.g., which pajama matches which Panjabi, or which trousers/shoes fit a casual linen shirt.
2. Color styling: Suggesting matching skin tones or day/night events.
3. Sizing and comfort tips.

Keep your responses concise, readable, and structured using clean formatting or bullet points. Avoid long-winded paragraphs. Highlight products from our collections (Traditional Panjabi, Casual Shirts, Premium Polo T-shirts, Executive Formal suits/blazers, Shoes, Accessories). Always write the output in Bengali. If English terms are used, you can write them in Bengali script or keep them simple.`;

      // Structure contents with chat history if available
      let contents: any[] = [];
      
      if (chatHistory && Array.isArray(chatHistory)) {
        // Map history to the required format
        chatHistory.forEach((msg: any) => {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        });
      }

      // Append preferences to user input if present to ground the response
      let userPrompt = message;
      if (preferences) {
        const { skinTone, occasion, preferredStyle, budget } = preferences;
        userPrompt = `[গ্রাহকের পছন্দ: গায়ের রঙ- ${skinTone || 'উল্লেখ নেই'}, উপলক্ষ- ${occasion || 'সাধারণ'}, স্টাইল- ${preferredStyle || 'ক্যাজুয়াল'}, বাজেট- ${budget || 'যেকোনো'}]\n\nগ্রাহকের বার্তা: ${message}`;
      }

      contents.push({
        role: "user",
        parts: [{ text: userPrompt }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.75,
        },
      });

      const textResponse = response.text || "দুঃখিত, আমি এই মুহূর্তে উত্তরটি দিতে পারছি না। দয়া করে আবার চেষ্টা করুন।";
      res.json({ text: textResponse });

    } catch (error: any) {
      console.error("Error in AI Stylist Endpoint:", error);
      res.status(500).json({ 
        error: "Internal Server Error", 
        message: error.message || "An error occurred with the AI model request." 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Serve static files and integrate Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bhadralok Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
