import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          message: "All fields are required" 
        });
      }

      // In a real application, this would send an email or save to database
      console.log("Contact form submission:", { name, email, subject, message });
      
      res.json({ 
        message: "Message sent successfully",
        success: true 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        message: "Failed to send message" 
      });
    }
  });

  // Resume download endpoint
  app.get("/api/resume/download", async (req, res) => {
    try {
      // In a real application, this would serve the actual resume PDF
      res.json({ 
        message: "Resume download endpoint - would serve PDF file",
        downloadUrl: "/path/to/resume.pdf"
      });
    } catch (error) {
      console.error("Resume download error:", error);
      res.status(500).json({ 
        message: "Failed to download resume" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
