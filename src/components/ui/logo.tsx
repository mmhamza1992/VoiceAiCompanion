import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mic, BarChart3 } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'md',
  showText = true,
  className = '' 
}) => {
  const { language, isRTL } = useLanguage();
  const isArabic = language === 'ar';

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const getColorClasses = () => {
    switch (variant) {
      case 'light':
        return {
          bg: 'bg-white',
          text: 'text-gray-900',
          accent: 'text-blue-600'
        };
      case 'dark':
        return {
          bg: 'bg-gray-900',
          text: 'text-white',
          accent: 'text-blue-400'
        };
      case 'minimal':
        return {
          bg: 'bg-transparent',
          text: 'text-gray-800',
          accent: 'text-blue-600'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-blue-600 to-blue-700',
          text: 'text-white',
          accent: 'text-blue-200'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''} ${className}`}>
      {/* Logo Icon */}
      <div className={`
        ${sizeClasses[size]} 
        ${colors.bg} 
        rounded-xl 
        flex items-center justify-center 
        shadow-lg 
        relative 
        overflow-hidden
        transition-all duration-300 hover:scale-105
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        
        {/* Main Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <Mic className={`w-1/2 h-1/2 ${colors.text}`} />
          <BarChart3 className={`w-1/3 h-1/3 ${colors.accent} absolute -bottom-1 -right-1`} />
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
          <div className={`font-bold ${textSizeClasses[size]} ${colors.text} leading-tight`}>
            {isArabic ? 'وكيل' : 'Wakel'}
          </div>
          <div className={`text-xs ${colors.accent} font-medium tracking-wide uppercase`}>
            {isArabic ? 'الذكاء الاصطناعي' : 'AI Assistant'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;