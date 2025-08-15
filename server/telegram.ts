interface TelegramMessage {
  leadId: number;
  name: string;
  email?: string;
  phone?: string;
  businessType?: string;
  serviceType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  source: string;
  createdAt: Date;
}

export class TelegramNotifier {
  private botToken: string;
  private chatId: string;

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN || "";
    this.chatId = process.env.TELEGRAM_CHAT_ID || "";
  }

  public async sendLeadNotification(lead: TelegramMessage): Promise<boolean> {
    if (!this.botToken || !this.chatId) {
      console.log("Telegram credentials not configured, skipping notification");
      return false;
    }

    try {
      const message = this.formatLeadMessage(lead);
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
      }

      console.log(`Telegram notification sent for lead ${lead.leadId}`);
      return true;
    } catch (error) {
      console.error("Failed to send Telegram notification:", error);
      return false;
    }
  }

  private formatLeadMessage(lead: TelegramMessage): string {
    const date = new Date(lead.createdAt).toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      day: "2-digit",
      month: "2-digit", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    let message = `🔔 <b>Yangi Lead!</b>\n\n`;
    message += `👤 <b>Ism:</b> ${lead.name}\n`;
    
    if (lead.email) {
      message += `📧 <b>Email:</b> ${lead.email}\n`;
    }
    
    if (lead.phone) {
      message += `📞 <b>Telefon:</b> ${lead.phone}\n`;
    }
    
    if (lead.businessType) {
      message += `🏢 <b>Biznes turi:</b> ${lead.businessType}\n`;
    }
    
    if (lead.serviceType) {
      message += `⚙️ <b>Xizmat turi:</b> ${lead.serviceType}\n`;
    }
    
    if (lead.budget) {
      message += `💰 <b>Byudjet:</b> ${lead.budget}\n`;
    }
    
    if (lead.timeline) {
      message += `⏰ <b>Muddati:</b> ${lead.timeline}\n`;
    }
    
    if (lead.message) {
      message += `💬 <b>Xabar:</b>\n${lead.message}\n`;
    }
    
    message += `\n📅 <b>Vaqt:</b> ${date}`;
    message += `\n🔗 <b>Manba:</b> ${lead.source}`;
    message += `\n🆔 <b>Lead ID:</b> #${lead.leadId}`;

    // Add action buttons as text since we can't use inline keyboards in simple messages
    message += `\n\n<i>Admin panelda batafsil ma'lumotni ko'rishingiz mumkin.</i>`;

    return message;
  }

  public async sendSystemNotification(title: string, message: string): Promise<boolean> {
    if (!this.botToken || !this.chatId) {
      return false;
    }

    try {
      const formattedMessage = `🤖 <b>${title}</b>\n\n${message}`;
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: formattedMessage,
          parse_mode: "HTML",
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Failed to send system notification:", error);
      return false;
    }
  }

  public async sendBlogNotification(title: string, slug: string, category: string): Promise<boolean> {
    if (!this.botToken || !this.chatId) {
      return false;
    }

    try {
      const baseUrl = process.env.NODE_ENV === "production" 
        ? "https://akramfarmonov.uz" 
        : "http://localhost:5000";
      
      const message = `📝 <b>Yangi Blog Maqolasi!</b>\n\n` +
                     `<b>Sarlavha:</b> ${title}\n` +
                     `<b>Kategoriya:</b> ${category}\n\n` +
                     `<a href="${baseUrl}/blog/${slug}">Maqolani o'qish</a>`;
      
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: false,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Failed to send blog notification:", error);
      return false;
    }
  }
}

export const telegramNotifier = new TelegramNotifier();