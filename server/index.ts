// Bu fayl server/index.ts

import express, { type Request, Response, NextFunction } from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { registerRoutes } from "./routes.js";
import { setupVite, log } from "./vite.js";
import { scheduler } from "./scheduler.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });

  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    const buildDir = path.join(__dirname, 'public');
    app.use(express.static(buildDir));
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildDir, 'index.html'));
    });
  }

  const port = process.env.PORT || 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
    
    setTimeout(async () => {
      try {
        await scheduler.initializeSampleContent();
        scheduler.startScheduler();
        log("Blog scheduler initialized successfully");
      } catch (error) {
        console.error("Failed to initialize blog scheduler:", error);
      }
    }, 5000);
  });
})();
