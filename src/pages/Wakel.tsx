import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Headphones, MessageSquare, Mic } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { FeatureCard } from "@/components/ui/feature-card";
import { CTAButton } from "@/components/ui/cta-button";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { wakelFeatures } from "@/data/content";
import { WakelPricingSection } from "@/components/pricing/WakelPricingSection";
import { useCurrency } from "@/hooks/useCurrency";
import ElevenLabsWidget from "@/components/ElevenLabsWidget";

export default function Wakel() {
  const { language, isRTL } = useLanguage();
  const { selectedCurrency } = useCurrency();
  const ArrowIcon = () => <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />;

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="py-16 md:py-24 gradient-wakel">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-wakel">
                {language === "ar" 
                  ? "وكيل: أول موظف خدمة عملاء عربي يعمل بالذكاء الاصطناعي" 
                  : "Wakel: Your First Arabic AI Customer Service Employee"}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {language === "ar" 
                  ? "استبدل مركز الاتصال التقليدي بموظف افتراضي يعمل على مدار الساعة، يتحدث اللغة العربية بطلاقة، ويتفهم احتياجات عملائك"
                  : "Replace traditional call centers with a virtual agent that works 24/7, speaks Arabic fluently, and understands your customers' needs"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/pricing">
                  <CTAButton theme="wakel">
                    {language === "ar" ? "ابدأ مع وكيل" : "Start with Wakel"}
                  </CTAButton>
                </Link>
                <Link to="/book-demo-with-google?service=wakel">
                  <Button size="lg" className="bg-white text-wakel-dark hover:bg-gray-100">
                    {language === "ar" ? "حجز عرض توضيحي" : "Book a Demo"}
                  </Button>
                </Link>
                <Link to="/contact">
                  <CTAButton theme="wakel" className="bg-white text-wakel-dark hover:bg-gray-100">
                    {language === "ar" ? "تواصل معنا" : "Contact Us"}
                  </CTAButton>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative">
                <OptimizedImage
                  src="/attached_assets/wakel 1.png"
                  alt="Wakel AI Assistant"
                  className="w-[250px] md:w-[300px] object-contain animate-float"
                  width={300}
                  height={300}
                  priority={true}
                  sizes="(max-width: 768px) 250px, 300px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Demo Section */}
      <section className="py-16 bg-wakel-light/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              titleAr="المحادثة الصوتية مع وكيل"
              titleEn="Voice Conversation with Wakel"
              subtitleAr="جرب التحدث مع وكيل مباشرة عبر الميكروفون"
              subtitleEn="Experience talking with Wakel directly through your microphone"
            />
            
            <div className="mt-10 flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl shadow-lg p-8 border border-wakel-light/30">
              {/* Left side: Avatar and info */}
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="absolute -top-3 -right-3 bg-blue-600 text-white rounded-full p-2 animate-pulse">
                    <Mic className="h-5 w-5" />
                  </div>
                  <OptimizedImage
                    src="/attached_assets/wakel 1.png"
                    alt="Wakel AI Assistant"
                    className="w-48 h-48 object-contain rounded-full border-4 border-blue-300"
                    width={192}
                    height={192}
                    sizes="192px"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-wakel-dark">
                  {language === "ar" ? "وكيل - المساعد الصوتي" : "Wakel - Voice Assistant"}
                </h3>
                <div className="flex items-center gap-1 text-sm bg-wakel-dark/10 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  {language === "ar" ? "متصل ومستعد للمحادثة" : "Connected and ready to chat"}
                </div>
              </div>
              
              {/* Right side: Instructions */}
              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-lg mb-4 text-wakel-dark">
                    {language === "ar" ? "كيفية استخدام المساعد الصوتي:" : "How to use the voice assistant:"}
                  </h4>
                  
                  <ol className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-wakel-dark text-white flex items-center justify-center">1</div>
                      <p>{language === "ar" 
                        ? "انظر إلى الزاوية اليمنى السفلية من الشاشة" 
                        : "Look at the bottom right corner of your screen"}</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-wakel-dark text-white flex items-center justify-center">2</div>
                      <p>{language === "ar" 
                        ? "اضغط على أيقونة الميكروفون للبدء" 
                        : "Click on the microphone icon to start"}</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-wakel-dark text-white flex items-center justify-center">3</div>
                      <p>{language === "ar" 
                        ? "ابدأ بالتحدث باللغة العربية أو الإنجليزية" 
                        : "Start speaking in Arabic or English"}</p>
                    </li>
                  </ol>
                </div>
                
                {/* Microphone widget reference image */}
                <div className="mt-8 relative">
                  <div className="flex justify-end">
                    <div className="relative px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div 
                            className="px-4 py-2 flex items-center justify-center gap-2 animate-pulse"
                            style={{ 
                              background: '#3a5bb5', 
                              borderRadius: '20px',
                              minWidth: '140px',
                              direction: 'ltr' // Ensure text is not reversed for Arabic
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span className="text-white font-medium">
                              {language === "ar" ? "ابدأ المكالمة" : "Start Call"}
                            </span>
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-wakel-dark">
                            {language === "ar" 
                              ? "المساعد الصوتي متاح في الزاوية اليمنى السفلية" 
                              : "Voice assistant available at bottom right"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {language === "ar" 
                              ? "يبدو مثل هذا الزر - انقر عليه للتحدث مع وكيل" 
                              : "Looks similar to this button - click to talk to Wakel"}
                          </p>
                        </div>
                      </div>

                      {/* Simple arrow pointing to bottom right corner */}
                      <div className="absolute -bottom-12 right-5">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3a5bb5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(45deg)' }}>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <SectionTitle
            titleAr="مميزات وكيل"
            titleEn="Wakel Features"
            subtitleAr="اكتشف كيف يمكن لوكيل تحسين تجربة عملائك وتبسيط عمليات خدمة العملاء"
            subtitleEn="Discover how Wakel can enhance your customer experience and streamline customer service operations"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wakelFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} theme="wakel" />
            ))}
          </div>
        </div>
      </section>



      {/* How It Works */}
      <section className="py-16">
        <div className="container">
          <SectionTitle
            titleAr="كيف يعمل وكيل"
            titleEn="How Wakel Works"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-wakel-light rounded-full flex items-center justify-center mb-4">
                <Headphones className="h-8 w-8 text-wakel-dark" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === "ar" ? "استقبال المكالمات" : "Receive Calls"}
              </h3>
              <p className="text-muted-foreground">
                {language === "ar" 
                  ? "يستقبل وكيل المكالمات الواردة ويتعرف على العميل وسبب الاتصال"
                  : "Wakel receives incoming calls, identifies the customer and the reason for calling"}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-wakel-light rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-wakel-dark" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === "ar" ? "فهم وحل المشكلة" : "Understand & Solve"}
              </h3>
              <p className="text-muted-foreground">
                {language === "ar" 
                  ? "يفهم وكيل مشكلة العميل ويقدم حلولًا مناسبة أو يحول المكالمة عند الحاجة"
                  : "Wakel understands the customer's problem and provides appropriate solutions or transfers the call when needed"}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-wakel-light rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-wakel-dark" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === "ar" ? "التوثيق والمتابعة" : "Document & Follow Up"}
              </h3>
              <p className="text-muted-foreground">
                {language === "ar" 
                  ? "يسجل وكيل تفاصيل المكالمة ويتابع الحالة حتى إغلاقها بشكل كامل"
                  : "Wakel records call details and follows up on the case until it's fully resolved"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-wakel-dark text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === "ar" 
                ? "جاهز لتحسين خدمة العملاء مع وكيل؟" 
                : "Ready to improve customer service with Wakel?"}
            </h2>
            <p className="text-lg text-white/80 mb-8">
              {language === "ar" 
                ? "ابدأ الآن واستفد من خصم ٢٥٪ لفترة محدودة!" 
                : "Start now and take advantage of a 25% limited-time discount!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button variant="default" className="bg-white text-wakel-dark hover:bg-gray-100 px-6 py-2 rounded-md">
                  {language === "ar" ? "عرض الأسعار" : "View Pricing"}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border border-white text-white bg-transparent hover:bg-white/10 px-6 py-2 rounded-md">
                  {language === "ar" ? "تواصل معنا" : "Contact Us"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
