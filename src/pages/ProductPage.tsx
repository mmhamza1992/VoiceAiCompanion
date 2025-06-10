import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Check, 
  Star, 
  Phone, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Zap,
  Shield,
  Globe,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  nameAr: string;
  price: string;
  priceAr: string;
  callLimit: number;
  features: string[];
  featuresAr: string[];
  popular?: boolean;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  plans: Plan[];
  features: Feature[];
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const isArabic = language === 'ar';

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('starter');

  // Determine service type from URL path
  const currentPath = window.location.pathname;
  const getServiceFromPath = (): string => {
    if (currentPath.includes('wakel-inbound')) return 'wakel-inbound';
    if (currentPath.includes('wakel-outbound')) return 'wakel-outbound';
    if (currentPath.includes('whatsapp')) return 'whatsapp';
    if (currentPath.includes('moder') || id === 'moder') return 'moder';
    return id || 'wakel';
  };

  const getProductData = (productId: string): Product | null => {
    const wakelFeatures: Feature[] = [
      {
        icon: <MessageSquare className="w-6 h-6" />,
        title: 'Multilingual Support',
        titleAr: 'دعم متعدد اللغات',
        description: 'Support for Arabic, English, and other languages with natural conversation flow',
        descriptionAr: 'دعم للغة العربية والإنجليزية ولغات أخرى مع تدفق محادثة طبيعي'
      },
      {
        icon: <Zap className="w-6 h-6" />,
        title: 'Smart Call Routing',
        titleAr: 'توجيه المكالمات الذكي',
        description: 'AI-powered intelligent routing based on caller intent and agent availability',
        descriptionAr: 'توجيه ذكي مدعوم بالذكاء الاصطناعي حسب نية المتصل وتوفر الوكلاء'
      },
      {
        icon: <Settings className="w-6 h-6" />,
        title: 'Easy Integration',
        titleAr: 'التكامل السهل',
        description: 'Seamless integration with existing CRM and business systems',
        descriptionAr: 'تكامل سلس مع أنظمة إدارة علاقات العملاء والأنظمة التجارية الحالية'
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: 'Advanced Security',
        titleAr: 'الأمان المتقدم',
        description: 'Enterprise-grade security with data encryption and compliance',
        descriptionAr: 'أمان على مستوى المؤسسات مع تشفير البيانات والامتثال'
      }
    ];

    const moderFeatures: Feature[] = [
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: 'Real-time Analytics',
        titleAr: 'التحليلات الفورية',
        description: 'Live call monitoring and performance metrics dashboard',
        descriptionAr: 'مراقبة المكالمات المباشرة ولوحة مقاييس الأداء'
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Agent Performance',
        titleAr: 'أداء الوكلاء',
        description: 'Comprehensive agent scoring and performance tracking',
        descriptionAr: 'تقييم شامل للوكلاء وتتبع الأداء'
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Customer Insights',
        titleAr: 'رؤى العملاء',
        description: 'Deep customer behavior analysis and satisfaction metrics',
        descriptionAr: 'تحليل عميق لسلوك العملاء ومقاييس الرضا'
      },
      {
        icon: <Award className="w-6 h-6" />,
        title: 'Custom Reports',
        titleAr: 'التقارير المخصصة',
        description: 'Automated reporting and business intelligence insights',
        descriptionAr: 'تقارير آلية ورؤى ذكاء الأعمال'
      }
    ];

    const wakelPlans: Plan[] = [
      {
        id: 'starter',
        name: 'Starter Plan',
        nameAr: 'الخطة الأساسية',
        price: '$297/month',
        priceAr: '٢٩٧ دولار/شهر',
        callLimit: 1000,
        features: [
          'Up to 1,000 minutes/month',
          'Inbound & Outbound calls',
          'Arabic & English support',
          'Basic analytics dashboard',
          'Email support',
          'API access'
        ],
        featuresAr: [
          'حتى ١٠٠٠ دقيقة/شهر',
          'مكالمات واردة وصادرة',
          'دعم العربية والإنجليزية',
          'لوحة تحليلات أساسية',
          'دعم البريد الإلكتروني',
          'وصول API'
        ]
      },
      {
        id: 'professional',
        name: 'Professional Plan',
        nameAr: 'الخطة المهنية',
        price: '$597/month',
        priceAr: '٥٩٧ دولار/شهر',
        callLimit: 3000,
        popular: true,
        features: [
          'Up to 3,000 minutes/month',
          'All Starter features',
          'WhatsApp integration',
          'Advanced call routing',
          'Custom voice training',
          'Priority support',
          'Call recording & transcription'
        ],
        featuresAr: [
          'حتى ٣٠٠٠ دقيقة/شهر',
          'جميع ميزات الخطة الأساسية',
          'تكامل واتساب',
          'توجيه المكالمات المتقدم',
          'تدريب صوت مخصص',
          'دعم أولوية',
          'تسجيل ونسخ المكالمات'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise Plan',
        nameAr: 'الخطة المؤسسية',
        price: '$1,197/month',
        priceAr: '١١٩٧ دولار/شهر',
        callLimit: 10000,
        features: [
          'Up to 10,000 minutes/month',
          'All Professional features',
          'Dedicated account manager',
          'Custom integrations',
          'White-label solution',
          'Advanced security & compliance',
          '24/7 phone support',
          'SLA guarantees'
        ],
        featuresAr: [
          'حتى ١٠٠٠٠ دقيقة/شهر',
          'جميع ميزات الخطة المهنية',
          'مدير حساب مخصص',
          'تكاملات مخصصة',
          'حل العلامة البيضاء',
          'أمان وامتثال متقدم',
          'دعم هاتفي ٢٤/٧',
          'ضمانات اتفاقية مستوى الخدمة'
        ]
      }
    ];

    const moderPlans: Plan[] = [
      {
        id: 'basic',
        name: 'Basic Monitor',
        nameAr: 'المراقبة الأساسية',
        price: '$197/month',
        priceAr: '١٩٧ دولار/شهر',
        callLimit: 1000,
        features: [
          'Up to 1,000 monitored minutes',
          'Real-time performance dashboard',
          'Basic call analytics',
          'Email alerts & notifications',
          'Standard support',
          'Monthly reports'
        ],
        featuresAr: [
          'حتى ١٠٠٠ دقيقة مراقبة',
          'لوحة أداء فورية',
          'تحليلات مكالمات أساسية',
          'تنبيهات البريد الإلكتروني',
          'دعم قياسي',
          'تقارير شهرية'
        ]
      },
      {
        id: 'professional',
        name: 'Professional Monitor',
        nameAr: 'المراقبة المهنية',
        price: '$397/month',
        priceAr: '٣٩٧ دولار/شهر',
        callLimit: 3000,
        popular: true,
        features: [
          'Up to 3,000 monitored minutes',
          'Advanced AI call analysis',
          'Custom performance metrics',
          'Automated quality scoring',
          'API access for integrations',
          'Priority support',
          'Weekly detailed reports'
        ],
        featuresAr: [
          'حتى ٣٠٠٠ دقيقة مراقبة',
          'تحليل مكالمات ذكي متقدم',
          'مقاييس أداء مخصصة',
          'تقييم جودة آلي',
          'وصول API للتكاملات',
          'دعم أولوية',
          'تقارير أسبوعية مفصلة'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise Monitor',
        nameAr: 'المراقبة المؤسسية',
        price: '$797/month',
        priceAr: '٧٩٧ دولار/شهر',
        callLimit: 10000,
        features: [
          'Up to 10,000 monitored minutes',
          'Custom AI model training',
          'Advanced compliance tracking',
          'Dedicated account manager',
          'Custom integrations',
          '24/7 phone support',
          'Real-time alerts & escalation',
          'SLA guarantees'
        ],
        featuresAr: [
          'حتى ١٠٠٠٠ دقيقة مراقبة',
          'تدريب نموذج ذكي مخصص',
          'تتبع امتثال متقدم',
          'مدير حساب مخصص',
          'تكاملات مخصصة',
          'دعم هاتفي ٢٤/٧',
          'تنبيهات فورية وتصعيد',
          'ضمانات اتفاقية مستوى الخدمة'
        ]
      }
    ];

    // Handle service-specific routing
    if (productId === 'wakel' || productId === 'wakel-inbound' || productId === 'wakel-outbound') {
      return {
        id: 'wakel',
        name: productId === 'wakel-inbound' ? 'Wakel Inbound Calls' : 
              productId === 'wakel-outbound' ? 'Wakel Outbound Calls' : 'Wakel AI Assistant',
        nameAr: productId === 'wakel-inbound' ? 'وكيل المكالمات الواردة' : 
                productId === 'wakel-outbound' ? 'وكيل المكالمات الصادرة' : 'وكيل المساعد الذكي',
        description: productId === 'wakel-inbound' ? 
          'AI-powered inbound call handling with intelligent routing and Arabic support' :
          productId === 'wakel-outbound' ? 
          'Automated outbound calling system with smart dialing and conversation management' :
          'Complete AI-powered call handling system for inbound, outbound, and WhatsApp communications',
        descriptionAr: productId === 'wakel-inbound' ? 
          'معالجة المكالمات الواردة بالذكاء الاصطناعي مع التوجيه الذكي ودعم العربية' :
          productId === 'wakel-outbound' ? 
          'نظام المكالمات الصادرة الآلي مع الاتصال الذكي وإدارة المحادثات' :
          'نظام شامل لمعالجة المكالمات بالذكاء الاصطناعي للمكالمات الواردة والصادرة وواتساب',
        image: '/api/placeholder/500/300',
        plans: wakelPlans,
        features: wakelFeatures
      };
    } else if (productId === 'whatsapp') {
      return {
        id: 'whatsapp',
        name: 'Wakel WhatsApp Integration',
        nameAr: 'تكامل وكيل واتساب',
        description: 'Advanced WhatsApp automation and management with AI-powered responses and customer engagement',
        descriptionAr: 'أتمتة وإدارة واتساب المتقدمة مع الردود المدعومة بالذكاء الاصطناعي وتفاعل العملاء',
        image: '/api/placeholder/500/300',
        plans: wakelPlans,
        features: [
          {
            icon: <MessageSquare className="w-6 h-6" />,
            title: 'WhatsApp Business API',
            titleAr: 'واجهة برمجة واتساب بزنس',
            description: 'Full integration with WhatsApp Business API for automated messaging',
            descriptionAr: 'تكامل كامل مع واجهة برمجة واتساب بزنس للرسائل الآلية'
          },
          {
            icon: <Zap className="w-6 h-6" />,
            title: 'Smart Auto-Reply',
            titleAr: 'الرد التلقائي الذكي',
            description: 'AI-powered automatic responses based on customer intent and context',
            descriptionAr: 'ردود تلقائية ذكية مدعومة بالذكاء الاصطناعي حسب نية العميل والسياق'
          },
          {
            icon: <Users className="w-6 h-6" />,
            title: 'Contact Management',
            titleAr: 'إدارة جهات الاتصال',
            description: 'Advanced contact segmentation and customer journey tracking',
            descriptionAr: 'تقسيم جهات الاتصال المتقدم وتتبع رحلة العميل'
          },
          {
            icon: <BarChart3 className="w-6 h-6" />,
            title: 'Message Analytics',
            titleAr: 'تحليلات الرسائل',
            description: 'Comprehensive analytics for message delivery, engagement, and conversion',
            descriptionAr: 'تحليلات شاملة لتسليم الرسائل والتفاعل والتحويل'
          }
        ]
      };
    } else if (productId === 'moder') {
      return {
        id: 'moder',
        name: 'Moder Performance Monitor',
        nameAr: 'مودير مراقب الأداء',
        description: 'Comprehensive call center performance monitoring and analytics platform with real-time insights',
        descriptionAr: 'منصة شاملة لمراقبة وتحليل أداء مركز الاتصال مع رؤى فورية',
        image: '/api/placeholder/500/300',
        plans: moderPlans,
        features: moderFeatures
      };
    }
    return null;
  };

  useEffect(() => {
    setLoading(true);
    const serviceType = getServiceFromPath();
    const productData = getProductData(serviceType);
    setProduct(productData);
    if (productData && productData.plans.length > 0) {
      const popularPlan = productData.plans.find(plan => plan.popular);
      setSelectedPlan(popularPlan ? popularPlan.id : productData.plans[0].id);
    }
    setLoading(false);
  }, [id, currentPath]);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleGetStarted = () => {
    toast({
      title: isArabic ? 'إعادة توجيه...' : 'Redirecting...',
      description: isArabic ? 'جاري توجيهك إلى صفحة التسجيل' : 'Taking you to registration page'
    });
    navigate(`/register?product=${id}&plan=${selectedPlan}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">{isArabic ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{isArabic ? 'المنتج غير موجود' : 'Product not found'}</p>
          <Button onClick={() => navigate('/')} variant="outline">
            {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
          </Button>
        </div>
      </div>
    );
  }

  const selectedPlanData = product.plans.find(plan => plan.id === selectedPlan);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                {isArabic ? product.nameAr : product.name}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {isArabic ? product.descriptionAr : product.description}
              </p>
              <div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">{isArabic ? 'تجربة مجانية ١٤ يوم' : '14-day free trial'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{isArabic ? 'أمان مضمون' : 'Secure & compliant'}</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                onClick={handleGetStarted}
              >
                {isArabic ? 'ابدأ التجربة المجانية' : 'Start Free Trial'}
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                {product.id === 'wakel' ? (
                  <Phone className="w-32 h-32 text-blue-600" />
                ) : (
                  <BarChart3 className="w-32 h-32 text-purple-600" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isArabic ? 'الميزات الرئيسية' : 'Key Features'}
              </h2>
              <p className="text-lg text-gray-600">
                {isArabic ? 'اكتشف القوة الكاملة لمنصتنا' : 'Discover the full power of our platform'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {isArabic ? feature.titleAr : feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {isArabic ? feature.descriptionAr : feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isArabic ? 'اختر الخطة المناسبة' : 'Choose Your Plan'}
              </h2>
              <p className="text-lg text-gray-600">
                {isArabic ? 'خطط مرنة تنمو مع عملك' : 'Flexible plans that scale with your business'}
              </p>
            </div>

            {/* Plan Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-white rounded-lg p-1 shadow-sm">
                {product.plans.map((plan) => (
                  <button
                    key={plan.id}
                    className={`px-6 py-3 rounded-md font-medium transition-colors ${
                      selectedPlan === plan.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {isArabic ? plan.nameAr : plan.name}
                    {plan.popular && (
                      <Badge className="ml-2" variant="secondary">
                        {isArabic ? 'الأكثر شيوعاً' : 'Popular'}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Plan Details */}
            {selectedPlanData && (
              <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">
                    {isArabic ? selectedPlanData.nameAr : selectedPlanData.name}
                  </CardTitle>
                  <div className="text-4xl font-bold text-blue-600 mt-4">
                    {isArabic ? selectedPlanData.priceAr : selectedPlanData.price}
                  </div>
                  {selectedPlanData.callLimit > 0 && (
                    <p className="text-gray-600">
                      {isArabic 
                        ? `حتى ${selectedPlanData.callLimit.toLocaleString()} مكالمة شهرياً`
                        : `Up to ${selectedPlanData.callLimit.toLocaleString()} calls per month`
                      }
                    </p>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4 mb-8">
                    <h4 className={`font-semibold text-lg ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isArabic ? 'يتضمن:' : 'Includes:'}
                    </h4>
                    <ul className="space-y-3">
                      {(isArabic ? selectedPlanData.featuresAr : selectedPlanData.features).map((feature, index) => (
                        <li key={index} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                    onClick={handleGetStarted}
                  >
                    {isArabic ? 'ابدأ التجربة المجانية' : 'Start Free Trial'}
                  </Button>
                  
                  <p className={`text-center text-sm text-gray-500 mt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isArabic ? 
                      'لا توجد رسوم إعداد • إلغاء في أي وقت • دعم مجاني' :
                      'No setup fees • Cancel anytime • Free support'
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;