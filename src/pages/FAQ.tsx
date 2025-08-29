import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Car, DollarSign, Shield, Clock, Phone } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqData = [
    {
      question: "ما هي المبادرة وكيف تعمل؟",
      answer: "المبادرة هي نظام تمويلي حكومي يسمح للمواطنين المصريين بشراء السيارات المستوردة بأسعار مخفضة. نحن نربطك بالمستوردين المعتمدين الذين يمكنهم توفير السيارات بأسعار المبادرة."
    },
    {
      question: "هل يمكنني شراء سيارة بدون مبادرة؟",
      answer: "نعم، يمكنك شراء السيارة بالسعر المحلي العادي. نحن نقدم لك أفضل الأسعار المتاحة في السوق المحلي."
    },
    {
      question: "كم تستغرق عملية الاستيراد؟",
      answer: "تستغرق عملية الاستيراد عادة من 2-4 أسابيع حسب نوع السيارة والبلد المصدر. نضمن لك الشفافية في كل خطوة من العملية."
    },
    {
      question: "ما هي الضمانات المقدمة؟",
      answer: "نعمل مع مستوردين معتمدين وموثوقين فقط. جميع السيارات تأتي بضمان المصنع ويمكنك فحصها قبل الشراء."
    },
    {
      question: "هل تقدمون خدمات التمويل؟",
      answer: "نعم، نتعاون مع بنوك وشركات تمويل معتمدة لتقديم حلول تمويلية مناسبة لاحتياجاتك."
    },
    {
      question: "كيف يمكنني التواصل معكم؟",
      answer: "يمكنك التواصل معنا عبر الهاتف أو البريد الإلكتروني أو من خلال الشات بوت الموجود في الموقع. فريقنا متاح على مدار الساعة لمساعدتك."
    },
    {
      question: "ما هي الدول التي تستوردون منها؟",
      answer: "نستورد من ألمانيا واليابان وكوريا الجنوبية والولايات المتحدة ودول أوروبية أخرى. نختار أفضل المصادر لضمان الجودة."
    },
    {
      question: "هل تقدمون خدمات ما بعد البيع؟",
      answer: "نعم، نقدم خدمات الصيانة والدعم الفني من خلال شبكة من المراكز المعتمدة في جميع أنحاء مصر."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              الأسئلة الشائعة
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              إجابات على أكثر الأسئلة شيوعاً حول خدمات استيراد السيارات
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-right hover:no-underline">
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لم تجد إجابة لسؤالك؟
            </h2>
            <p className="text-xl text-gray-600">
              تواصل معنا مباشرة وسنكون سعداء بمساعدتك
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>اتصل بنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">اتصل بنا مباشرة على الرقم</p>
                <p className="text-xl font-semibold text-blue-600">+20 123 456 7890</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>الشات بوت</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">اسأل الشات بوت للحصول على إجابات فورية</p>
                <Button className="w-full">ابدأ المحادثة</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>احجز استشارة</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">احجز موعد استشارة مجانية</p>
                <Button className="w-full">احجز الآن</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              كيف تعمل العملية؟
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">سجل طلبك</h3>
              <p className="text-gray-600">املأ النموذج واختر السيارة المناسبة</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">تأكيد الطلب</h3>
              <p className="text-gray-600">نتواصل معك لتأكيد التفاصيل</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">الاستيراد</h3>
              <p className="text-gray-600">نبدأ عملية الاستيراد والتخليص</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">التسليم</h3>
              <p className="text-gray-600">نوصل السيارة إلى باب منزلك</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;