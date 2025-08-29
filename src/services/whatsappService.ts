// Simple WhatsApp service using Twilio
export class WhatsAppService {
  private static instance: WhatsAppService;
  
  // Twilio Configuration from your credentials
  private twilioConfig = {
    accountSid: 'AC7668f6f5192bc01d2c9b4cfdd8e39748',
    authToken: '6b69fb3b0bd3c6ee02a0f000d425ed5f',
    phoneNumber: '+12603052336'
  };

  static getInstance(): WhatsAppService {
    if (!WhatsAppService.instance) {
      WhatsAppService.instance = new WhatsAppService();
    }
    return WhatsAppService.instance;
  }

  async sendRegistrationNotification(userData: {
    name: string;
    phone: string;
    hasInitiative: boolean;
    selectedCar?: string;
  }): Promise<boolean> {
    try {
      // For now, just log the WhatsApp message
      // In production, you would use Twilio API to send actual WhatsApp messages
      
      const message = `مرحباً ${userData.name}! 

شكراً لك على تسجيل طلبك معنا.

تفاصيل طلبك:
- الاسم: ${userData.name}
- رقم الهاتف: ${userData.phone}
- المبادرة: ${userData.hasInitiative ? 'نعم' : 'لا'}
${userData.selectedCar ? `- السيارة المختارة: ${userData.selectedCar}` : ''}

سنقوم بالتواصل معك قريباً لتأكيد التفاصيل.

مع تحياتنا،
فريق استيراد السيارات`;

      console.log('WhatsApp message would be sent:', {
        to: userData.phone,
        from: this.twilioConfig.phoneNumber,
        message: message
      });

      // Simulate sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return false;
    }
  }

  async sendAdminWhatsAppNotification(userData: any): Promise<boolean> {
    try {
      const adminMessage = `طلب جديد!

الاسم: ${userData.name}
البريد الإلكتروني: ${userData.email}
رقم الهاتف: ${userData.phone}
المبادرة: ${userData.hasInitiative ? 'نعم' : 'لا'}
التاريخ: ${new Date().toLocaleString('ar-EG')}`;

      console.log('Admin WhatsApp notification would be sent:', {
        to: this.twilioConfig.phoneNumber, // Admin number
        message: adminMessage
      });

      await new Promise(resolve => setTimeout(resolve, 500));
      
      return true;
    } catch (error) {
      console.error('Error sending admin WhatsApp notification:', error);
      return false;
    }
  }
}

export default WhatsAppService.getInstance();