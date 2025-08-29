import React, { useState } from 'react';

const SimpleHome: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hasInitiative: false,
    budget: ''
  });

  const cars = [
    {
      id: '1',
      brand: 'BMW',
      model: 'X5',
      year: '2023',
      localPrice: '2,500,000',
      initiativePrice: '1,000,000',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      features: ['SUV', 'Luxury', '4WD'],
      category: 'SUV'
    },
    {
      id: '2',
      brand: 'Mercedes',
      model: 'C-Class',
      year: '2024',
      localPrice: '1,800,000',
      initiativePrice: '800,000',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
      features: ['Sedan', 'Luxury', 'Premium'],
      category: 'Sedan'
    },
    {
      id: '3',
      brand: 'Toyota',
      model: 'Camry',
      year: '2023',
      localPrice: '1,200,000',
      initiativePrice: '600,000',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
      features: ['Sedan', 'Reliable', 'Fuel Efficient'],
      category: 'Sedan'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration submitted:', formData);
    alert('تم استلام طلبك بنجاح! سنتواصل معك قريباً.');
    setShowForm(false);
    setFormData({ name: '', email: '', phone: '', hasInitiative: false, budget: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              استورد سيارتك بسهولة
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              احصل على أفضل الأسعار للسيارات المستوردة مع أو بدون مبادرة. 
              نربطك بمستوردين موثوقين ونضمن لك أفضل تجربة شراء.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
                onClick={() => setShowForm(true)}
              >
                ابدأ الآن
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50">
                تعرف على المزيد
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">سيارة مستوردة</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">عميل راضي</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50%</div>
              <div className="text-gray-600">توفير في السعر</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              أحدث السيارات المتاحة
            </h2>
            <p className="text-xl text-gray-600">
              اختر من مجموعة واسعة من السيارات المستوردة بأسعار تنافسية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                    {car.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-gray-500 mb-4">سنة {car.year}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">السعر المحلي:</span>
                      <span className="font-semibold text-red-600">{car.localPrice} ج.م</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">بالمبادرة:</span>
                      <span className="font-semibold text-green-600">{car.initiativePrice} ج.م</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {car.features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
                    onClick={() => setShowForm(true)}
                  >
                    اختر هذه السيارة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">سجل طلبك</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">الاسم</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">الميزانية</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">اختر ميزانيتك</option>
                  <option value="500k-1m">500,000 - 1,000,000 ج.م</option>
                  <option value="1m-2m">1,000,000 - 2,000,000 ج.م</option>
                  <option value="2m-3m">2,000,000 - 3,000,000 ج.م</option>
                  <option value="3m+">أكثر من 3,000,000 ج.م</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.hasInitiative}
                  onChange={(e) => setFormData({...formData, hasInitiative: e.target.checked})}
                  className="mr-2"
                />
                <label className="text-sm">لدي مبادرة</label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
                >
                  إرسال الطلب
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded font-semibold"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chatbase Bot */}
      <div className="fixed bottom-4 right-4 z-40">
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/kHcJYDNgLO1E4FHxTh3Iy"
          width="400"
          height="600"
          style={{ border: 'none', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
          title="Chatbot"
        />
      </div>
    </div>
  );
};

export default SimpleHome;