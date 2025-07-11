import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail, type ContactFormData } from "./email";
import path from "path";
import fs from "fs";

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

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: "Please enter a valid email address" 
        });
      }

      // Send email
      const emailSent = await sendContactEmail({ name, email, subject, message });
      
      if (emailSent) {
        res.json({ 
          message: "Message sent successfully! I'll get back to you soon.",
          success: true 
        });
      } else {
        res.status(500).json({ 
          message: "Failed to send message. Please try again later." 
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        message: "Failed to send message. Please try again later." 
      });
    }
  });

  // Resume download endpoint
  app.get("/api/resume/download", async (req, res) => {
    try {
      const resumePath = path.join(process.cwd(), "attached_assets/Brian_LaTorraca_Resume_2025_ATS_1752253687536.pdf");
      
      // Check if file exists
      if (!fs.existsSync(resumePath)) {
        return res.status(404).json({ 
          message: "Resume file not found" 
        });
      }
      
      res.setHeader('Content-Disposition', 'attachment; filename="Brian_LaTorraca_Resume_2025.pdf"');
      res.setHeader('Content-Type', 'application/pdf');
      
      res.download(resumePath, "Brian_LaTorraca_Resume_2025.pdf", (err) => {
        if (err) {
          console.error("Resume download error:", err);
          if (!res.headersSent) {
            res.status(500).json({ 
              message: "Failed to download resume" 
            });
          }
        }
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
