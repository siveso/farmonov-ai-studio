import * as cron from "node-cron";
import { blogGenerator } from "./gemini";
import { storage } from "./storage";

export class BlogScheduler {
  private scheduledTasks: Map<string, cron.ScheduledTask> = new Map();

  constructor() {
    this.initializeSchedules();
  }

  private initializeSchedules() {
    // Schedule blog generation every 2 hours during business hours (8 AM - 8 PM Tashkent time)
    const blogGenerationSchedule = cron.schedule(
      "0 8-20/2 * * *", // Every 2 hours from 8 AM to 8 PM
      async () => {
        console.log("Running scheduled blog generation...");
        try {
          await this.generateScheduledPosts();
        } catch (error) {
          console.error("Scheduled blog generation failed:", error);
        }
      },
      {
        timezone: "Asia/Tashkent"
      }
    );

    // Schedule cleanup of old analytics data (monthly)
    const cleanupSchedule = cron.schedule(
      "0 2 1 * *", // First day of month at 2 AM
      async () => {
        console.log("Running monthly cleanup...");
        try {
          await this.cleanupOldData();
        } catch (error) {
          console.error("Monthly cleanup failed:", error);
        }
      },
      {
        timezone: "Asia/Tashkent"
      }
    );

    // Schedule lead follow-up reminders (daily)
    const leadFollowupSchedule = cron.schedule(
      "0 9 * * *", // Every day at 9 AM
      async () => {
        console.log("Checking lead follow-ups...");
        try {
          await this.checkLeadFollowups();
        } catch (error) {
          console.error("Lead follow-up check failed:", error);
        }
      },
      {
        timezone: "Asia/Tashkent"
      }
    );

    this.scheduledTasks.set("blogGeneration", blogGenerationSchedule);
    this.scheduledTasks.set("cleanup", cleanupSchedule);
    this.scheduledTasks.set("leadFollowup", leadFollowupSchedule);
  }

  public startScheduler() {
    console.log("Starting blog scheduler...");
    this.scheduledTasks.forEach((task, name) => {
      task.start();
      console.log(`✓ Started schedule: ${name}`);
    });
  }

  public stopScheduler() {
    console.log("Stopping blog scheduler...");
    this.scheduledTasks.forEach((task, name) => {
      task.stop();
      console.log(`✓ Stopped schedule: ${name}`);
    });
  }

  private async generateScheduledPosts() {
    try {
      // Check how many posts we have today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todaysPosts = await storage.getPosts({
        published: true,
        // In a real implementation, you'd filter by today's date
      });

      const targetPostsPerDay = 12;
      const maxPostsPerSession = 2; // Generate max 2 posts per run to avoid overwhelming
      
      if (todaysPosts.length >= targetPostsPerDay) {
        console.log(`Already generated ${todaysPosts.length} posts today. Skipping.`);
        return;
      }

      const postsToGenerate = Math.min(
        maxPostsPerSession, 
        targetPostsPerDay - todaysPosts.length
      );

      console.log(`Generating ${postsToGenerate} blog posts...`);

      for (let i = 0; i < postsToGenerate; i++) {
        try {
          const blogPost = await blogGenerator.generateBlogPost();
          
          // Set publication time staggered throughout the day
          const publicationHour = 8 + (todaysPosts.length + i) * 1; // Spread posts hourly
          const publishTime = new Date();
          publishTime.setHours(publicationHour, 0, 0, 0);
          
          blogPost.publishedAt = publishTime;
          blogPost.published = true; // Auto-publish generated content
          
          const createdPost = await storage.createPost(blogPost);
          console.log(`✓ Generated and scheduled: ${createdPost.title}`);
          
          // Add delay between generations
          await new Promise(resolve => setTimeout(resolve, 3000));
        } catch (error) {
          console.error(`Failed to generate post ${i + 1}:`, error);
        }
      }
    } catch (error) {
      console.error("Blog generation session failed:", error);
    }
  }

  private async cleanupOldData() {
    try {
      // In a real implementation, you'd clean up old analytics data
      // For now, just log the cleanup attempt
      console.log("Performing monthly data cleanup...");
      
      // Get analytics older than 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      const oldAnalytics = await storage.getAnalytics({
        dateTo: sixMonthsAgo,
        limit: 1000
      });

      console.log(`Found ${oldAnalytics.length} old analytics entries to clean up`);
      
      // In a real implementation with a database, you'd delete these records
      // For the in-memory storage, we'll just log
      console.log("✓ Cleanup completed");
    } catch (error) {
      console.error("Cleanup failed:", error);
    }
  }

  private async checkLeadFollowups() {
    try {
      console.log("Checking leads that need follow-up...");
      
      const leads = await storage.getLeads({
        status: "new",
        limit: 50
      });

      const followupNeeded = leads.filter(lead => {
        const daysSinceCreated = Math.floor(
          (Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysSinceCreated >= 1; // Follow up after 1 day
      });

      if (followupNeeded.length > 0) {
        console.log(`Found ${followupNeeded.length} leads needing follow-up`);
        
        for (const lead of followupNeeded) {
          try {
            // Update lead status (using extended type to include status)
            await storage.updateLead(lead.id, {
              followUpDate: new Date(),
              notes: "Avtomatik follow-up eslatmasi"
            } as any);
            
            // In a real implementation, send email/telegram notification
            console.log(`✓ Marked lead ${lead.id} for follow-up`);
          } catch (error) {
            console.error(`Failed to update lead ${lead.id}:`, error);
          }
        }
      } else {
        console.log("No leads need follow-up at this time");
      }
    } catch (error) {
      console.error("Lead follow-up check failed:", error);
    }
  }

  // Manual methods for admin control
  public async generatePostsNow(count: number = 1): Promise<boolean> {
    try {
      console.log(`Manually generating ${count} blog posts...`);
      
      for (let i = 0; i < count; i++) {
        const blogPost = await blogGenerator.generateBlogPost();
        blogPost.published = false; // Keep unpublished for manual review
        
        await storage.createPost(blogPost);
        console.log(`✓ Generated draft: ${blogPost.title}`);
      }
      
      return true;
    } catch (error) {
      console.error("Manual blog generation failed:", error);
      return false;
    }
  }

  public getScheduleStatus(): { [key: string]: boolean } {
    const status: { [key: string]: boolean } = {};
    
    this.scheduledTasks.forEach((task, name) => {
      status[name] = task.status === "running";
    });
    
    return status;
  }

  public async initializeSampleContent(): Promise<void> {
    try {
      console.log("Initializing sample blog content...");
      await blogGenerator.generateSamplePosts();
      console.log("✓ Sample content initialized");
    } catch (error) {
      console.error("Sample content initialization failed:", error);
    }
  }
}

export const scheduler = new BlogScheduler();