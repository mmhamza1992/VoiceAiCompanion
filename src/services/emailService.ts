// Simple email service using the provided SMTP credentials
export class EmailService {
  private static instance: EmailService;
  
  // SMTP Configuration from your credentials
  private smtpConfig = {
    host: 'smtp.titan.email',
    port: 465,
    user: 'm@wakel.io',
    pass: 'Hamada12345@ge'
  };

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendRegistrationEmail(userData: {
    name: string;
    email: string;
    phone: string;
    hasInitiative: boolean;
    selectedCar?: string;
    budget?: string;
  }): Promise<boolean> {
    try {
      // Simple email sending using fetch to a backend endpoint
      // In production, this would be handled by your server
      
      const emailData = {
        to: userData.email,
        subject: 'تم استلام طلبك بنجاح - Car Import Service',
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">مرحباً ${userData.name}</h2>
            <p>شكراً لك على تسجيل طلبك معنا!</p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>تفاصيل طلبك:</h3>
              <p><strong>الاسم:</strong> ${userData.name}</p>
              <p><strong>البريد الإلكتروني:</strong> ${userData.email}</p>
              <p><strong>رقم الهاتف:</strong> ${userData.phone}</p>
              <p><strong>المبادرة:</strong> ${userData.hasInitiative ? 'نعم' : 'لا'}</p>
              ${userData.selectedCar ? `<p><strong>السيارة المختارة:</strong> ${userData.selectedCar}</p>` : ''}
              ${userData.budget ? `<p><strong>الميزانية:</strong> ${userData.budget}</p>` : ''}
            </div>
            
            <p>سنقوم بالتواصل معك قريباً لتأكيد التفاصيل والمتابعة.</p>
            
            <p>مع تحياتنا،<br>فريق استيراد السيارات</p>
          </div>
        `
      };

      // For now, just log the email data
      // In production, you would send this to your backend
      console.log('Email would be sent:', emailData);
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendAdminNotification(userData: any): Promise<boolean> {
    try {
      // Send notification to admin about new registration
      const adminEmail = 'm@wakel.io';
      
      const emailData = {
        to: adminEmail,
        subject: 'طلب جديد - Car Import Service',
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif;">
            <h2>طلب جديد</h2>
            <p><strong>الاسم:</strong> ${userData.name}</p>
            <p><strong>البريد الإلكتروني:</strong> ${userData.email}</p>
            <p><strong>رقم الهاتف:</strong> ${userData.phone}</p>
            <p><strong>المبادرة:</strong> ${userData.hasInitiative ? 'نعم' : 'لا'}</p>
            <p><strong>التاريخ:</strong> ${new Date().toLocaleString('ar-EG')}</p>
          </div>
        `
      };

      console.log('Admin notification would be sent:', emailData);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return true;
    } catch (error) {
      console.error('Error sending admin notification:', error);
      return false;
    }
  }
}

export default EmailService.getInstance();