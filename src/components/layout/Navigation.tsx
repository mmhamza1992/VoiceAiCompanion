import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, isRTL } = useLanguage();
  const location = useLocation();
  const isArabic = language === 'ar';

  const navItems = [
    { 
      path: '/wakel', 
      labelEn: 'Wakel AI', 
      labelAr: 'وكيل الذكي' 
    },
    { 
      path: '/moder', 
      labelEn: 'Moder Monitor', 
      labelAr: 'مودير المراقب' 
    },
    { 
      path: '/pricing', 
      labelEn: 'Pricing', 
      labelAr: 'الأسعار' 
    },
    { 
      path: '/contact', 
      labelEn: 'Contact', 
      labelAr: 'اتصل بنا' 
    }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className={`flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${isActivePath(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {isArabic ? item.labelAr : item.labelEn}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'العربية' : 'English'}
              </span>
            </Button>

            {/* Auth Buttons */}
            <div className={`hidden md:flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  {isArabic ? 'ابدأ مجاناً' : 'Start Free'}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                    ${isActivePath(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }
                    ${isRTL ? 'text-right' : 'text-left'}
                  `}
                >
                  {isArabic ? item.labelAr : item.labelEn}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="space-y-3">
                  <Link
                    to="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block"
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {isArabic ? 'ابدأ مجاناً' : 'Start Free'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;