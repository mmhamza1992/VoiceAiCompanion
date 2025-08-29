import emailService from './emailService';
import whatsappService from './whatsappService';

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  hasInitiative: boolean;
  selectedCarId?: string;
  budget?: string;
  timestamp: Date;
}

export class RegistrationService {
  private static instance: RegistrationService;
  private registrations: RegistrationData[] = [];

  static getInstance(): RegistrationService {
    if (!RegistrationService.instance) {
      RegistrationService.instance = new RegistrationService();
    }
    return RegistrationService.instance;
  }

  async submitRegistration(data: Omit<RegistrationData, 'timestamp'>): Promise<boolean> {
    try {
      const registration: RegistrationData = {
        ...data,
        timestamp: new Date()
      };

      // In a real implementation, you would send this to your backend
      // For now, we'll store it locally and simulate an API call
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store in local storage for demo purposes
      this.registrations.push(registration);
      localStorage.setItem('registrations', JSON.stringify(this.registrations));

      // You could also send to your backend API here
      // await fetch('/api/registrations', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(registration)
      // });

      console.log('Registration submitted:', registration);
      return true;
    } catch (error) {
      console.error('Error submitting registration:', error);
      return false;
    }
  }

  async getRegistrations(): Promise<RegistrationData[]> {
    try {
      // Load from local storage
      const stored = localStorage.getItem('registrations');
      if (stored) {
        this.registrations = JSON.parse(stored);
      }
      return this.registrations;
    } catch (error) {
      console.error('Error loading registrations:', error);
      return [];
    }
  }

  async sendEmailNotification(data: RegistrationData): Promise<boolean> {
    try {
      // Use the email service to send actual emails
      const emailSent = await emailService.sendRegistrationEmail({
        name: data.name,
        email: data.email,
        phone: data.phone,
        hasInitiative: data.hasInitiative,
        selectedCar: data.selectedCarId,
        budget: data.budget
      });

      return emailSent;
    } catch (error) {
      console.error('Error sending email notification:', error);
      return false;
    }
  }

  async sendAdminNotification(data: RegistrationData): Promise<boolean> {
    try {
      // Send email notification to admin
      const adminEmailSent = await emailService.sendAdminNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        hasInitiative: data.hasInitiative,
        selectedCarId: data.selectedCarId,
        budget: data.budget,
        timestamp: data.timestamp
      });

      return adminEmailSent;
    } catch (error) {
      console.error('Error sending admin notification:', error);
      return false;
    }
  }

  async sendWhatsAppNotification(data: RegistrationData): Promise<boolean> {
    try {
      // Send WhatsApp notification to user
      const whatsappSent = await whatsappService.sendRegistrationNotification({
        name: data.name,
        phone: data.phone,
        hasInitiative: data.hasInitiative,
        selectedCar: data.selectedCarId
      });

      return whatsappSent;
    } catch (error) {
      console.error('Error sending WhatsApp notification:', error);
      return false;
    }
  }

  async sendAdminWhatsAppNotification(data: RegistrationData): Promise<boolean> {
    try {
      // Send WhatsApp notification to admin
      const adminWhatsappSent = await whatsappService.sendAdminWhatsAppNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        hasInitiative: data.hasInitiative,
        selectedCarId: data.selectedCarId,
        budget: data.budget,
        timestamp: data.timestamp
      });

      return adminWhatsappSent;
    } catch (error) {
      console.error('Error sending admin WhatsApp notification:', error);
      return false;
    }
  }
}

export default RegistrationService.getInstance();