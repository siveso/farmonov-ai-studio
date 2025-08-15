import nodemailer from "nodemailer";

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface ContactEmailData {
  name: string;
  email?: string;
  phone?: string;
  businessType?: string;
  serviceType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  leadId: number;
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private isConfigured: boolean;

  constructor() {
    this.isConfigured = this.setupTransporter();
  }

  private setupTransporter(): boolean {
    try {
      const config: EmailConfig = {
        host: process.env.SMTP_HOST || "",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER || "",
          pass: process.env.SMTP_PASS || "",
        },
      };

      if (!config.host || !config.auth.user || !config.auth.pass) {
        console.log("Email service not configured - missing SMTP credentials");
        return false;
      }

      this.transporter = nodemailer.createTransporter(config);
      return true;
    } catch (error) {
      console.error("Failed to setup email transporter:", error);
      return false;
    }
  }

  public async sendContactConfirmation(data: ContactEmailData): Promise<boolean> {
    if (!this.isConfigured || !data.email) {
      return false;
    }

    try {
      const mailOptions = {
        from: `"Akram Farmonov" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: "Aloqa uchun rahmat - Akram Farmonov",
        html: this.generateConfirmationEmail(data),
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Confirmation email sent to ${data.email}`);
      return true;
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
      return false;
    }
  }

  public async sendAdminNotification(data: ContactEmailData): Promise<boolean> {
    if (!this.isConfigured) {
      return false;
    }

    try {
      const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
      const mailOptions = {
        from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: `Yangi Lead: ${data.name} (#${data.leadId})`,
        html: this.generateAdminEmail(data),
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Admin notification sent to ${adminEmail}`);
      return true;
    } catch (error) {
      console.error("Failed to send admin notification:", error);
      return false;
    }
  }

  private generateConfirmationEmail(data: ContactEmailData): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Aloqa uchun rahmat</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        .btn { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        .highlight { background: #e0e7ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Assalomu aleykum, ${data.name}!</h1>
        <p>Bizga murojaat qilganingiz uchun rahmat</p>
    </div>
    
    <div class="content">
        <p>Sizning so'rovingizni oldik va 24 soat ichida javob beramiz.</p>
        
        <div class="highlight">
            <h3>Sizning ma'lumotlaringiz:</h3>
            <p><strong>Ism:</strong> ${data.name}</p>
            ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
            ${data.phone ? `<p><strong>Telefon:</strong> ${data.phone}</p>` : ''}
            ${data.serviceType ? `<p><strong>Xizmat:</strong> ${data.serviceType}</p>` : ''}
            ${data.budget ? `<p><strong>Byudjet:</strong> ${data.budget}</p>` : ''}
            <p><strong>So'rov raqami:</strong> #${data.leadId}</p>
        </div>
        
        <p>Bu vaqt ichida quyidagilarni qilishingiz mumkin:</p>
        <ul>
            <li>📱 <a href="https://t.me/akramfarmonov">Telegram orqali bevosita yozing</a></li>
            <li>🌐 <a href="https://akramfarmonov.uz/portfolio">Portfolio va ishlarimni ko'ring</a></li>
            <li>📺 <a href="https://akramfarmonov.uz/blog">Blog maqolalarini o'qing</a></li>
        </ul>
        
        <a href="https://akramfarmonov.uz" class="btn">Saytga qaytish</a>
    </div>
    
    <div class="footer">
        <p>Akram Farmonov - Web Developer & Business Automation Expert</p>
        <p>Telegram: @akramfarmonov | Website: akramfarmonov.uz</p>
    </div>
</body>
</html>`;
  }

  private generateAdminEmail(data: ContactEmailData): string {
    const createdAt = new Date().toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent"
    });

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Yangi Lead - ${data.name}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #3b82f6; }
        .priority { background: #fef3c7; border-left-color: #f59e0b; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔔 Yangi Lead!</h1>
        <p>Lead ID: #${data.leadId}</p>
    </div>
    
    <div class="content">
        <div class="field priority">
            <strong>Vaqt:</strong> ${createdAt}
        </div>
        
        <div class="field">
            <strong>Ism:</strong> ${data.name}
        </div>
        
        ${data.email ? `<div class="field"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></div>` : ''}
        ${data.phone ? `<div class="field"><strong>Telefon:</strong> <a href="tel:${data.phone}">${data.phone}</a></div>` : ''}
        ${data.businessType ? `<div class="field"><strong>Biznes turi:</strong> ${data.businessType}</div>` : ''}
        ${data.serviceType ? `<div class="field"><strong>Xizmat:</strong> ${data.serviceType}</div>` : ''}
        ${data.budget ? `<div class="field"><strong>Byudjet:</strong> ${data.budget}</div>` : ''}
        ${data.timeline ? `<div class="field"><strong>Muddat:</strong> ${data.timeline}</div>` : ''}
        
        ${data.message ? `
        <div class="field">
            <strong>Xabar:</strong><br>
            ${data.message.replace(/\n/g, '<br>')}
        </div>` : ''}
        
        <p><strong>Keyingi qadamlar:</strong></p>
        <ol>
            <li>24 soat ichida javob bering</li>
            <li>Telegram orqali bog'laning</li>
            <li>Batafsil ma'lumot yig'ing</li>
            <li>Taklif tayyorlang</li>
        </ol>
    </div>
</body>
</html>`;
  }
}

export const emailService = new EmailService();