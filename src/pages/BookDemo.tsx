import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Calendar as CalendarIcon, Clock, Users } from 'lucide-react';

const BookDemo: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const isArabic = language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    date: undefined as Date | undefined,
    time: '',
    services: {
      inboundWakel: true,
      outboundWakel: true,
      whatsappWakel: false,
      moderMonitor: false
    },
    notes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (serviceName: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [serviceName]: checked
      }
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      date
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!formData.date || !formData.time) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: isArabic ? 'الرجاء اختيار التاريخ والوقت' : 'Please select date and time',
        variant: 'destructive'
      });
      setIsLoading(false);
      return;
    }

    const hasSelectedService = Object.values(formData.services).some(value => value);
    if (!hasSelectedService) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: isArabic ? 'الرجاء اختيار خدمة واحدة على الأقل' : 'Please select at least one service',
        variant: 'destructive'
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
      toast({
        title: isArabic ? 'تم الحجز بنجاح!' : 'Demo Booked Successfully!',
        description: isArabic ? 'سنرسل لك رابط الاجتماع قريباً' : 'We will send you the meeting link soon'
      });
    } catch (error) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: isArabic ? 'حدث خطأ في الحجز' : 'Error occurred while booking',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const services = [
    {
      key: 'inboundWakel',
      nameEn: 'Inbound Calls - Wakel',
      nameAr: 'المكالمات الواردة - وكيل',
      descEn: 'AI-powered inbound call handling',
      descAr: 'معالجة المكالمات الواردة بالذكاء الاصطناعي'
    },
    {
      key: 'outboundWakel',
      nameEn: 'Outbound Calls - Wakel',
      nameAr: 'المكالمات الصادرة - وكيل',
      descEn: 'Automated outbound calling system',
      descAr: 'نظام المكالمات الصادرة الآلي'
    },
    {
      key: 'whatsappWakel',
      nameEn: 'WhatsApp - Wakel',
      nameAr: 'واتساب - وكيل',
      descEn: 'WhatsApp automation and management',
      descAr: 'أتمتة وإدارة واتساب'
    },
    {
      key: 'moderMonitor',
      nameEn: 'Moder - Performance Monitor',
      nameAr: 'مودير - مراقبة الأداء',
      descEn: 'Advanced performance monitoring',
      descAr: 'مراقبة الأداء المتقدمة'
    }
  ];

  if (submitted) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <Card className="max-w-md w-full mx-4 text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isArabic ? 'شكراً لك!' : 'Thank You!'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isArabic ? 
                'تم تأكيد حجز موعدك بنجاح. سنرسل لك رابط الاجتماع عبر البريد الإلكتروني قريباً.' :
                'Your demo has been successfully booked. We will send you the meeting link via email shortly.'
              }
            </p>
            <Button 
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="w-full"
            >
              {isArabic ? 'حجز موعد آخر' : 'Book Another Demo'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isArabic ? 'احجز عرض توضيحي' : 'Schedule a Demo'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isArabic ? 
                'اختر الوقت المناسب لك والخدمات التي تود مشاهدة عرض توضيحي لها' :
                'Choose a convenient time and select the services you would like to see demonstrated'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Users className="w-5 h-5" />
                    {isArabic ? 'معلومات الاتصال' : 'Contact Information'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      className={`${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'البريد الإلكتروني *' : 'Email Address *'}
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={isArabic ? 'example@company.com' : 'example@company.com'}
                      className={`${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'رقم الهاتف *' : 'Phone Number *'}
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={isArabic ? '+966xxxxxxxxx' : '+20xxxxxxxxx'}
                      className={`${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'اسم الشركة *' : 'Company Name *'}
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder={isArabic ? 'أدخل اسم شركتك' : 'Enter your company name'}
                      className={`${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CalendarIcon className="w-5 h-5" />
                    {isArabic ? 'التاريخ والوقت' : 'Date & Time'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'اختر التاريخ *' : 'Select Date *'}
                    </label>
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateChange}
                      disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                      className="rounded-md border w-full"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'اختر الوقت *' : 'Select Time *'}
                    </label>
                    <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={isArabic ? 'اختر الوقت' : 'Select time'} />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Services Selection */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-5 h-5" />
                  {isArabic ? 'اختر الخدمات' : 'Select Services'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div key={service.key} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse flex-row-reverse' : ''} w-full`}>
                        <Checkbox
                          id={service.key}
                          checked={formData.services[service.key as keyof typeof formData.services]}
                          onCheckedChange={(checked) => handleServiceChange(service.key, checked as boolean)}
                        />
                        <div className="flex-1">
                          <label htmlFor={service.key} className={`text-sm font-medium cursor-pointer ${isRTL ? 'text-right' : 'text-left'} block`}>
                            {isArabic ? service.nameAr : service.nameEn}
                          </label>
                          <p className={`text-xs text-gray-500 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {isArabic ? service.descAr : service.descEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card className="mt-8">
              <CardContent className="pt-6">
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isArabic ? 'ملاحظات إضافية' : 'Additional Notes'}
                  </label>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder={isArabic ? 'أخبرنا عن احتياجاتك أو أي متطلبات خاصة...' : 'Tell us about your needs or any special requirements...'}
                    rows={4}
                    className={`${isRTL ? 'text-right' : 'text-left'}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="mt-8">
              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 
                  (isArabic ? 'جاري الحجز...' : 'Booking Demo...') : 
                  (isArabic ? 'تأكيد حجز العرض التوضيحي' : 'Confirm Demo Booking')
                }
              </Button>
              
              <p className={`text-center text-sm text-gray-500 mt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isArabic ? 
                  'بحجز العرض التوضيحي، أنت توافق على شروط الخدمة وسياسة الخصوصية' :
                  'By booking a demo, you agree to our Terms of Service and Privacy Policy'
                }
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookDemo;