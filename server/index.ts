import express, { type Request, Response, NextFunction } from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite"; // E'tibor bering: serveStatic endi kerak emas
import { scheduler } from "./scheduler";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Bu yordamchi ES modullarida papka nomini olish uchun kerak
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sizning log yozish kodingiz
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Xatoliklarni ushlab qolish
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });

  // Development va Production muhitlarini ajratish
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    // --- PRODUCTION UCHUN TO'G'RI KOD ---

    // 1. Qurilgan (build) fayllar joylashgan papkani aniqlash
    const buildDir = path.join(__dirname, 'public');

    // 2. Shu papkadan static fayllarni (JS, CSS, rasmlar) ko'rsatish
    app.use(express.static(buildDir));

    // 3. API yoki static faylga mos kelmagan HAR QANDAY boshqa so'rov uchun
    //    asosiy index.html faylini yuborish. Bu React Router'ga ishlash imkonini beradi.
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildDir, 'index.html'));
    });
  }

  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
    
    // Sizning scheduler kodingiz
    setTimeout(async () => {
      try {
        await scheduler.initializeSampleContent();
        scheduler.startScheduler();
        log("Blog scheduler
