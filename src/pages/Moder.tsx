import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import ModerTranscriptionAnalysis from '@/components/ModerTranscriptionAnalysis';
import ModerChatBot from '@/components/ModerChatBot';
import ElevenLabsWidget from '@/components/ElevenLabsWidget';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Mic, Headphones, MessageSquare, FileText } from 'lucide-react';

const Moder: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  const texts = {
    ar: {
      title: 'مُدير - تحليل المكالمات الذكي',
      subtitle: 'تحليل محادثات خدمة العملاء باستخدام الذكاء الاصطناعي',
      description: 'مُدير هو حل متكامل لتحليل مكالمات خدمة العملاء يساعد الشركات على تحسين جودة الخدمة وزيادة رضا العملاء من خلال تحليل دقيق للمحادثات باستخدام الذكاء الاصطناعي المتطور.',
      features: [
        'تحويل المكالمات الصوتية إلى نصوص بدقة عالية',
        'تحليل محتوى المحادثات واستخراج المعلومات المهمة',
        'تقييم رضا العملاء وأداء الوكلاء بشكل موضوعي',
        'توليد تقارير مفصلة عن جودة الخدمة',
        'تحديد فرص التحسين ونقاط القوة والضعف',
        'دعم كامل للغة العربية'
      ],
      demoTab: 'تجربة التحليل',
      featureTab: 'المميزات',
      pricingTab: 'الباقات',
      startFree: 'ابدأ مجاناً',
      contactUs: 'تواصل معنا',
      starter: 'أساسي',
      pro: 'متقدم',
      enterprise: 'مؤسسات',
      starterPrice: '٤٩٩ ريال / شهرياً',
      proPrice: '٩٩٩ ريال / شهرياً',
      enterprisePrice: 'تواصل معنا للتسعير',
      starterFeatures: [
        '١٠٠ دقيقة شهرياً',
        'تحويل المكالمات إلى نصوص',
        'تحليل أساسي للمحادثات',
        'دعم البريد الإلكتروني'
      ],
      proFeatures: [
        '٥٠٠ دقيقة شهرياً',
        'تحويل المكالمات إلى نصوص',
        'تحليل متقدم للمحادثات',
        'لوحة تحكم لمراقبة الأداء',
        'تقارير أسبوعية',
        'دعم فني متخصص'
      ],
      enterpriseFeatures: [
        'دقائق غير محدودة',
        'دعم متعدد اللغات',
        'تحليل مخصص حسب احتياجات العمل',
        'تكامل مع أنظمتك الحالية',
        'مدير حساب مخصص',
        'دعم على مدار الساعة',
        'خيارات التخصيص الكاملة'
      ]
    },
    en: {
      title: 'Moder - Smart Call Analytics',
      subtitle: 'AI-Powered Customer Service Conversation Analysis',
      description: 'Moder is a comprehensive call analysis solution that helps businesses improve service quality and increase customer satisfaction through precise conversation analysis using advanced artificial intelligence.',
      features: [
        'Convert audio calls to text with high accuracy',
        'Analyze conversation content and extract important information',
        'Objectively evaluate customer satisfaction and agent performance',
        'Generate detailed reports on service quality',
        'Identify improvement opportunities, strengths, and weaknesses',
        'Full support for Arabic language'
      ],
      demoTab: 'Try Analysis',
      featureTab: 'Features',
      pricingTab: 'Pricing',
      startFree: 'Start Free',
      contactUs: 'Contact Us',
      starter: 'Starter',
      pro: 'Pro',
      enterprise: 'Enterprise',
      starterPrice: '499 SAR / month',
      proPrice: '999 SAR / month',
      enterprisePrice: 'Contact for pricing',
      starterFeatures: [
        '100 minutes per month',
        'Call transcription',
        'Basic conversation analysis',
        'Email support'
      ],
      proFeatures: [
        '500 minutes per month',
        'Call transcription',
        'Advanced conversation analysis',
        'Performance monitoring dashboard',
        'Weekly reports',
        'Specialized technical support'
      ],
      enterpriseFeatures: [
        'Unlimited minutes',
        'Multi-language support',
        'Custom analysis based on business needs',
        'Integration with your current systems',
        'Dedicated account manager',
        '24/7 support',
        'Full customization options'
      ]
    }
  };

  const t = texts[language];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section with consistent Moder orange theming */}
      <section className="py-16 md:py-24 gradient-moder">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-moder">
                {language === 'ar' ? 'مُدير: تحليل المكالمات الذكي' : 'Moder: Intelligent Call Analysis'}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                {language === 'ar' ? 'تحليل محادثات خدمة العملاء باستخدام الذكاء الاصطناعي' : 'Customer service conversation analysis using AI'}
              </p>
              <p className="mb-8 text-muted-foreground">
                {language === 'ar' ? 
                  'مُدير هو حل متكامل لتحليل مكالمات خدمة العملاء يساعد الشركات على تحسين جودة الخدمة وزيادة رضا العملاء من خلال تحليل دقيق للمحادثات باستخدام الذكاء الاصطناعي المتطور.' : 
                  'Moder is a comprehensive solution for analyzing customer service calls that helps companies improve service quality and increase customer satisfaction through precise analysis of conversations using advanced artificial intelligence.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
                <Link to="/pricing" className="inline-block">
                  <Button size="lg" className="moder-bg text-white hover:opacity-90">
                    {language === 'ar' ? 'اشترك الآن' : 'Subscribe Now'}
                  </Button>
                </Link>
                <Link to="/book-demo-with-google?service=moder" className="inline-block">
                  <Button size="lg" variant="outline" className="moder-border moder-primary hover:bg-orange-50">
                    {language === 'ar' ? 'حجز عرض توضيحي' : 'Book a Demo'}
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative">
                <img
                  src="/moder.png"
                  alt={language === 'ar' ? 'شخصية مُدير - مساعد تحليل المكالمات الذكي' : 'Moder Character - Intelligent Call Analysis Assistant'}
                  className="w-80 h-80 md:w-96 md:h-96 object-contain animate-float"
                />
                
                {/* Decorative elements around Moder character */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-100 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-orange-200 rounded-full opacity-30 animate-pulse delay-300"></div>
                <div className="absolute top-1/2 -right-8 w-8 h-8 bg-orange-300 rounded-full opacity-40 animate-bounce delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Analytics Demo Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text-moder">
              {language === "ar" ? "تحليلات مُدير في العمل" : "Moder Analytics in Action"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === "ar" 
                ? "شاهد كيف يحلل مُدير المكالمات ويقدم رؤى قيمة حول أداء فريق خدمة العملاء"
                : "See how Moder analyzes calls and provides valuable insights about your customer service team performance"
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 moder-border">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 moder-bg rounded-full flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold moder-primary">
                      {language === "ar" ? "تحليل مكالمة مباشر" : "Live Call Analysis"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {language === "ar" ? "جاري التحليل..." : "Currently analyzing..."}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-orange-700">
                        {language === "ar" ? "رضا العميل" : "Customer Satisfaction"}
                      </span>
                      <span className="text-sm font-bold text-orange-600">92%</span>
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-green-700">
                        {language === "ar" ? "أداء الموظف" : "Agent Performance"}
                      </span>
                      <span className="text-sm font-bold text-green-600">88%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '88%'}}></div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-blue-700">
                        {language === "ar" ? "دقة المعلومات" : "Information Accuracy"}
                      </span>
                      <span className="text-sm font-bold text-blue-600">95%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 moder-bg rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-300 rounded-full opacity-30"></div>
                <div className="w-full max-w-md mx-auto relative z-10 bg-white rounded-2xl shadow-lg p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 moder-bg rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mic className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold moder-primary">
                      {language === "ar" ? "مراقبة نشطة" : "Active Monitoring"}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>{language === "ar" ? "المكالمات النشطة" : "Active Calls"}</span>
                      <span className="font-bold">3</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{language === "ar" ? "متوسط وقت الانتظار" : "Avg Wait Time"}</span>
                      <span className="font-bold">45s</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{language === "ar" ? "معدل الحل" : "Resolution Rate"}</span>
                      <span className="font-bold text-green-600">94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="demo" className="w-full mb-16">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="demo">{t.demoTab}</TabsTrigger>
            <TabsTrigger value="features">{t.featureTab}</TabsTrigger>
            <TabsTrigger value="pricing">{t.pricingTab}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="demo" className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-full flex flex-col">
                <div className="flex-1">
                  <ModerTranscriptionAnalysis />
                </div>
              </div>
              <div className="h-full flex flex-col">
                <ModerChatBot />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.features.map((feature, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="pt-6">
                    <div className="flex items-start mb-2">
                      <div className="bg-primary/10 p-2 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p>{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pricing" className="py-4">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col items-center text-center mb-2">
                <h2 className="text-3xl font-bold mb-6">{language === 'ar' ? 'مُدير' : 'Moder'}</h2>
                
                <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-sm">
                  <button 
                    className={`px-6 py-2 rounded-full transition-colors font-medium ${billingCycle === 'monthly' ? 'bg-primary text-white shadow-sm' : 'hover:bg-gray-200'}`}
                    onClick={() => setBillingCycle('monthly')}
                  >
                    {language === 'ar' ? 'شهري' : 'Monthly'}
                  </button>
                  <button 
                    className={`px-6 py-2 rounded-full transition-colors font-medium ${billingCycle === 'yearly' ? 'bg-primary text-white shadow-sm' : 'hover:bg-gray-200'}`}
                    onClick={() => setBillingCycle('yearly')}
                  >
                    {language === 'ar' ? 'سنوي' : 'Yearly'}
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center mx-auto max-w-2xl">
                {language === 'ar' 
                  ? 'الأسعار بالريال السعودي - باقة مُدير هي لمتابعة موظف خدمة عملاء واحد' 
                  : 'Prices in Saudi Riyal - Moder package is for monitoring one customer service employee'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Plan Card */}
                <Card className="flex flex-col h-full border-primary shadow-md">
                  <div className="px-6 py-8 text-center border-b">
                    <h3 className="text-2xl font-bold">
                      {language === 'ar' 
                        ? billingCycle === 'monthly' ? 'مُدير (شهري)' : 'مُدير (سنوي)' 
                        : billingCycle === 'monthly' ? 'Moder (Monthly)' : 'Moder (Yearly)'}
                    </h3>
                    <div className="mt-4 space-y-2">
                      {billingCycle === 'monthly' ? (
                        <>
                          <p className="text-3xl font-bold">{language === 'ar' ? '٩٩ ر.س / شهرياً' : '99 SAR / month'}</p>
                          <p className="text-lg line-through text-muted-foreground">{language === 'ar' ? '١٩٩ ر.س' : '199 SAR'}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-3xl font-bold">{language === 'ar' ? '٩٩٠ ر.س / سنوياً' : '990 SAR / year'}</p>
                          <p className="text-lg line-through text-muted-foreground">{language === 'ar' ? '١٩٩٠ ر.س' : '1990 SAR'}</p>
                          <p className="text-sm text-primary mt-1">
                            {language === 'ar' ? '(توفير شهرين)' : '(Save 2 months)'}
                          </p>
                        </>
                      )}
                      <p className="text-sm bg-green-100 text-green-800 rounded-full px-2 py-1 inline-block">{language === 'ar' ? '(خصم ٥٠٪)' : '(50% off)'}</p>
                    </div>
                  </div>
                  <CardContent className="flex-1 pt-6">
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5 text-primary"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>{language === 'ar' ? 'متابعة أداء موظف خدمة عملاء واحد' : 'Monitor one customer service employee'}</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5 text-primary"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>{language === 'ar' ? 'متاح حتى 9 ساعات يومياً' : 'Available up to 9 hours daily'}</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5 text-primary"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>{language === 'ar' ? 'متاح حتى 6 أيام في الأسبوع' : 'Available up to 6 days per week'}</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5 text-primary"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>{language === 'ar' ? 'تحليلات متقدمة للأداء' : 'Advanced performance analytics'}</span>
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5 text-primary"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>{language === 'ar' ? 'تقارير تفصيلية عن المكالمات' : 'Detailed call reports'}</span>
                      </li>
                    </ul>
                  </CardContent>
                  <div className="p-6 mt-auto">
                    <button className="w-full py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition">
                      {language === 'ar' ? 'اشترك الآن' : 'Subscribe Now'}
                    </button>
                  </div>
                </Card>
                
                {/* Info Card */}
                <div className="md:col-span-2">
                  <Card className="h-full flex flex-col bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-sm">
                    <CardContent className="flex-1 p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                        <div className="flex flex-col space-y-6">
                          <div className="flex items-center">
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-bold">{language === 'ar' ? 'معلومات مهمة' : 'Important Information'}</h3>
                          </div>
                          
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5 text-primary mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                              <span>{language === 'ar' ? 'مُدير هو حل لمتابعة أداء موظف خدمة عملاء واحد' : 'Moder is a solution for monitoring one customer service employee'}</span>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5 text-primary mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                              <span>{language === 'ar' ? 'السعر المذكور لكل موظف خدمة عملاء' : 'The price is per customer service employee'}</span>
                            </li>
                          </ul>
                          
                          {billingCycle === 'yearly' && (
                            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                              <p className="text-primary font-medium flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                                {language === 'ar' 
                                  ? 'الاشتراك السنوي يوفر لك شهرين مجانًا!' 
                                  : 'Annual subscription saves you 2 months free!'}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col space-y-6">
                          <div className="flex items-center">
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                            </div>
                            <h3 className="text-xl font-bold">{language === 'ar' ? 'توفر الخدمة' : 'Service Availability'}</h3>
                          </div>
                          
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5 text-primary mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                              <span>{language === 'ar' ? 'المُدير يعمل بحد أقصى 9 ساعات يومياً' : 'Moder works with a maximum of 9 hours per day'}</span>
                            </li>
                            <li className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5 text-primary mt-0.5"><polyline points="20 6 9 17 4 12" /></svg>
                              <span>{language === 'ar' ? 'متاح حتى 6 أيام في الأسبوع' : 'Available up to 6 days per week'}</span>
                            </li>
                          </ul>
                          
                          <div className="mt-2">
                            <Link to="/book-demo-with-google?service=moder">
                              <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary/10">
                                {language === 'ar' ? 'حجز عرض توضيحي' : 'Book a Demo'}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Moder;