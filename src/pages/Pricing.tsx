
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { useToast } from "@/hooks/use-toast";
import SubscriptionForm from "@/components/forms/SubscriptionForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCurrency } from "@/hooks/useCurrency";
import { moderPlans } from "@/data/pricing/moder-plans";
import { toArabicNumerals } from "@/utils/formatArabicNumbers";

// Import refactored components
import { CustomWakelSection } from "@/components/pricing/CustomWakelSection";
import { PricingControls } from "@/components/pricing/PricingControls";
import { PricingPlansGrid } from "@/components/pricing/PricingPlansGrid";
import { WhiteLabelSection } from "@/components/pricing/WhiteLabelSection";
import { SpecializedPlansSection } from "@/components/pricing/SpecializedPlansSection";
import { FAQSection } from "@/components/pricing/FAQSection";
import { CTASection } from "@/components/pricing/CTASection";
import { CustomPlanLink } from "@/components/pricing/CustomPlanLink";
import { PricingPackage } from "@/components/pricing/PricingPackage";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { ProductComparison } from "@/components/comparison/ProductComparison";

export default function Pricing() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"wakel" | "moder" | "both">("wakel");
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [subscribingTo, setSubscribingTo] = useState<{
    plan: string;
    theme: "wakel" | "moder"
  }>({ plan: "pro", theme: "wakel" });
  
  const { 
    selectedCurrency, 
    setSelectedCurrency,
    convertPrice
  } = useCurrency();
  
  // Allow any currency to be selected
  // EGP is now the default currency in useCurrency hook
  
  const handleSubscribeClick = (plan: string, theme: "wakel" | "moder") => {
    setSubscribingTo({ plan, theme });
    setShowSubscriptionForm(true);
  };
  
  // Dynamic pricing based on isYearly state
  const getModerPricingPackages = () => {
    // Get exact prices in EGP for Moder
    const getModerPrice = (isYearly: boolean) => {
      if (selectedCurrency.code === "EGP") {
        return isYearly ? 12999 : 1199; // Exact EGP prices
      }
      // For other currencies, convert from SAR
      const sarPrice = isYearly ? moderPlans.yearly.price : moderPlans.monthly.price;
      return Math.round(sarPrice * selectedCurrency.rate);
    };
    
    const getModerOriginalPrice = (isYearly: boolean) => {
      if (selectedCurrency.code === "EGP") {
        return isYearly ? 19999 : 1599; // Original EGP prices
      }
      // For other currencies, convert from SAR
      const sarPrice = isYearly ? moderPlans.yearly.originalPrice : moderPlans.monthly.originalPrice;
      return Math.round(sarPrice * selectedCurrency.rate);
    };
    
    return [
      {
        name: language === "ar" ? (isYearly ? "مُدير (سنوي)" : "مُدير (شهري)") : (isYearly ? "Moder (Yearly)" : "Moder (Monthly)"),
        price: getModerPrice(isYearly),
        originalPrice: getModerOriginalPrice(isYearly),
        features: language === "ar"
          ? [
              "متابعة أداء موظف خدمة عملاء واحد",
              "متاح حتى 9 ساعات يومياً",
              "متاح حتى 6 أيام في الأسبوع",
              "تحليلات متقدمة للأداء",
              "تقارير تفصيلية عن المكالمات"
            ]
          : [
              "Monitor performance of one customer service agent",
              "Available up to 9 hours per day",
              "Available up to 6 days per week",
              "Advanced performance analytics",
              "Detailed call reports"
            ],
        type: 'moder' as const,
        isAnnual: isYearly
      }
    ];
  };
  
  return (
    <div>
      {/* Custom Wakel Section */}
      <CustomWakelSection onSubscribe={handleSubscribeClick} />
      
      {/* Main Pricing Plans Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <SectionTitle
            titleAr="خطط الأسعار - خصومات حصرية"
            titleEn="Pricing Plans - Exclusive Discounts"
            subtitleAr="اختر الخطة المناسبة لاحتياجات عملك واستفد من الخصومات الحصرية الحالية"
            subtitleEn="Choose the right plan for your business needs and take advantage of current exclusive discounts"
          />
          
          {/* Pricing Controls */}
          <PricingControls 
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            isYearly={isYearly}
            setIsYearly={setIsYearly}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
          
          {/* Conditional rendering based on selected plan */}
          {selectedPlan === "wakel" && (
            <PricingPlansGrid 
              isYearly={isYearly}
              selectedPlan={selectedPlan}
              selectedCurrency={selectedCurrency}
              onSubscribe={handleSubscribeClick}
            />
          )}
          
          {selectedPlan === "moder" && (
            <div className="mb-16">
              <div className="text-center mb-6 p-3 bg-blue-50 rounded-md inline-block mx-auto">
                <p className="font-medium text-blue-800">
                  {language === "ar" 
                    ? "باقة مُدير هي لمتابعة موظف خدمة عملاء واحد" 
                    : "Moder package is for monitoring one customer service agent"}
                </p>
              </div>
              
              <div className="flex justify-center mb-8">
                <div className="flex flex-wrap justify-center gap-8">
                  {getModerPricingPackages().map((pkg, index) => (
                    <PricingPackage
                      key={index}
                      {...pkg}
                      onClick={() => handleSubscribeClick(isYearly ? "annual" : "monthly", "moder")}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-center mt-6 max-w-2xl mx-auto">
                <Alert className="bg-amber-50 border-amber-200">
                  <Info className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    {language === "ar" 
                      ? "مُدير هو حل لمتابعة أداء موظف خدمة عملاء واحد. السعر لكل موظف خدمة عملاء. المدير يعمل بحد أقصى 9 ساعات يومياً، 6 أيام بالأسبوع."
                      : "Moder is a monitoring solution for one customer service agent. Price is per agent. Moder works up to 9 hours per day, 6 days per week."}
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          )}
          
          {/* Custom Plan Link */}
          <CustomPlanLink />
          
          {/* White Label Section */}
          <WhiteLabelSection 
            isYearly={isYearly}
            onSubscribe={handleSubscribeClick}
          />
        </div>
      </section>
      
      {/* Specialized Industry Plans Section */}
      <SpecializedPlansSection onSubscribe={handleSubscribeClick} />
      
      {/* Product Comparison Section */}
      <ProductComparison />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Subscription Dialog */}
      <Dialog open={showSubscriptionForm} onOpenChange={setShowSubscriptionForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {language === "ar" 
                ? subscribingTo.plan === "custom-wakel" 
                  ? "طلب وكيل مخصص" 
                  : subscribingTo.plan === "whitelabel" 
                    ? "الانضمام كشريك تجاري" 
                    : `الاشتراك في خدمة ${subscribingTo.theme === "wakel" ? "وكيل" : "مُدير"} - الباقة ${
                        subscribingTo.plan === "starter" ? "ستارتر" : 
                        subscribingTo.plan === "standard" ? "ستاندرد" : "برو"
                      }`
                : subscribingTo.plan === "custom-wakel"
                  ? "Order Custom Wakel"
                  : subscribingTo.plan === "whitelabel"
                    ? "Join As White Label Partner"
                    : `Subscribe to ${subscribingTo.theme === "wakel" ? "Wakel" : "Moder"} - ${
                        subscribingTo.plan === "starter" ? "Starter" : 
                        subscribingTo.plan === "standard" ? "Standard" : "Pro"
                      } Plan`
              }
            </DialogTitle>
            <DialogDescription>
              {language === "ar" 
                ? "أكمل النموذج أدناه للاشتراك. سيتم تفعيل حسابك فور اكتمال عملية الدفع."
                : "Complete the form below to subscribe. Your account will be activated as soon as the payment is processed."
              }
            </DialogDescription>
          </DialogHeader>
          <SubscriptionForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
