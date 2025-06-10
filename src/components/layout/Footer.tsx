import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const isArabic = language === 'ar';

  const footerSections = {
    services: {
      titleEn: 'Services',
      titleAr: 'الخدمات',
      links: [
        { pathEn: '/wakel', labelEn: 'Wakel AI Assistant', labelAr: 'وكيل المساعد الذكي' },
        { pathEn: '/moder', labelEn: 'Moder Monitor', labelAr: 'مودير المراقب' },
        { pathEn: '/pricing', labelEn: 'Pricing Plans', labelAr: 'خطط الأسعار' },
        { pathEn: '/contact', labelEn: 'Contact Support', labelAr: 'دعم العملاء' }
      ]
    },
    company: {
      titleEn: 'Company',
      titleAr: 'الشركة',
      links: [
        { pathEn: '/about', labelEn: 'About Us', labelAr: 'من نحن' },
        { pathEn: '/careers', labelEn: 'Careers', labelAr: 'الوظائف' },
        { pathEn: '/blog', labelEn: 'Blog', labelAr: 'المدونة' },
        { pathEn: '/press', labelEn: 'Press Kit', labelAr: 'الصحافة' }
      ]
    },
    legal: {
      titleEn: 'Legal',
      titleAr: 'قانوني',
      links: [
        { pathEn: '/terms', labelEn: 'Terms of Service', labelAr: 'شروط الخدمة' },
        { pathEn: '/privacy', labelEn: 'Privacy Policy', labelAr: 'سياسة الخصوصية' },
        { pathEn: '/cookies', labelEn: 'Cookie Policy', labelAr: 'سياسة الكوكيز' },
        { pathEn: '/compliance', labelEn: 'Compliance', labelAr: 'الامتثال' }
      ]
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo size="md" className="mb-4" />
            <p className={`text-gray-600 text-sm leading-relaxed max-w-md ${isRTL ? 'text-right' : 'text-left'}`}>
              {isArabic 
                ? 'منصة الذكاء الاصطناعي الرائدة في الشرق الأوسط لخدمات المكالمات الآلية ومراقبة الأداء. نساعد الشركات على تحسين خدمة العملاء وزيادة الكفاءة التشغيلية.'
                : 'Leading AI platform in the Middle East for automated call services and performance monitoring. We help businesses improve customer service and increase operational efficiency.'
              }
            </p>
            
            {/* Contact Info */}
            <div className={`mt-6 space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-3 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-4 h-4" />
                <span>contact@wakel.io</span>
              </div>
              <div className={`flex items-center gap-3 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-4 h-4" />
                <span>+966 11 234 5678</span>
              </div>
              <div className={`flex items-center gap-3 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-4 h-4" />
                <span>{isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className={`text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isArabic ? section.titleAr : section.titleEn}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.pathEn}
                      className={`text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'} block`}
                    >
                      {isArabic ? link.labelAr : link.labelEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={`mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          
          {/* Copyright */}
          <div className={`text-sm text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p>
              © 2024 Wakel.io. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
          </div>

          {/* Social Links */}
          <div className={`flex items-center space-x-6 mt-4 md:mt-0 ${isRTL ? 'space-x-reverse' : ''}`}>
            <a
              href="https://twitter.com/wakel_io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/company/wakel-io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/wakel-io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;