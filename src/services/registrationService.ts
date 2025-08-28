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
      // In a real implementation, you would send an email notification
      // This could be done through your backend API or a service like SendGrid
      
      const emailData = {
        to: data.email,
        subject: 'تم استلام طلبك بنجاح',
        template: 'registration-confirmation',
        data: {
          name: data.name,
          carId: data.selectedCarId,
          hasInitiative: data.hasInitiative,
          budget: data.budget
        }
      };

      // Simulate email sending
      console.log('Sending email notification:', emailData);
      await new Promise(resolve => setTimeout(resolve, 500));

      return true;
    } catch (error) {
      console.error('Error sending email notification:', error);
      return false;
    }
  }

  async sendAdminNotification(data: RegistrationData): Promise<boolean> {
    try {
      // Send notification to admin about new registration
      const adminNotification = {
        type: 'new_registration',
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          hasInitiative: data.hasInitiative,
          selectedCarId: data.selectedCarId,
          budget: data.budget,
          timestamp: data.timestamp
        }
      };

      // In a real implementation, this would be sent to your admin dashboard
      // or notification system
      console.log('Sending admin notification:', adminNotification);
      
      return true;
    } catch (error) {
      console.error('Error sending admin notification:', error);
      return false;
    }
  }
}

export default RegistrationService.getInstance();