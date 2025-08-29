import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">الصفحة غير موجودة</h2>
        <p className="text-gray-600 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
        <Link to="/">
          <Button className="bg-blue-600 hover:bg-blue-700">
            العودة للرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;