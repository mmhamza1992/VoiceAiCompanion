import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Car, DollarSign, MapPin, Calendar, Users, Star, ArrowRight, Phone, Mail, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import carService from '@/services/carService';
import registrationService from '@/services/registrationService';

interface CarData {
  id: string;
  brand: string;
  model: string;
  year: string;
  localPrice: string;
  initiativePrice: string;
  image: string;
  features: string[];
  category: string;
}

const Home: React.FC = () => {
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    hasInitiative: false,
    selectedCarId: '',
    budget: ''
  });
  const { user, signInWithGoogle } = useAuth();

  // Fetch car data from Google Sheets
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const carsData = await carService.fetchCarsFromGoogleSheets();
        setCars(carsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car data:', error);
        setLoading(false);
      }
    };

    fetchCarData();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setIsRegisterModalOpen(false);
      setIsConfirmationModalOpen(true);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const success = await registrationService.submitRegistration({
        name: registrationData.name,
        email: registrationData.email,
        phone: registrationData.phone,
        hasInitiative: registrationData.hasInitiative,
        selectedCarId: registrationData.selectedCarId,
        budget: registrationData.budget
      });

      if (success) {
        setIsRegisterModalOpen(false);
        setIsConfirmationModalOpen(true);
        
        // Send notifications
        await registrationService.sendEmailNotification({
          ...registrationData,
          timestamp: new Date()
        });
        await registrationService.sendAdminNotification({
          ...registrationData,
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleCarSelection = (carId: string) => {
    setRegistrationData(prev => ({ ...prev, selectedCarId: carId }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                onClick={() => setIsRegisterModalOpen(true)}
              >
                ابدأ الآن
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3"
              >
                تعرف على المزيد
              </Button>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-blue-600">
                    {car.category}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    {car.brand} {car.model}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {car.year}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">السعر المحلي:</span>
                      <span className="font-semibold text-red-600">{car.localPrice} ج.م</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">بالمبادرة:</span>
                      <span className="font-semibold text-green-600">{car.initiativePrice} ج.م</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {car.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      className="w-full mt-3"
                      onClick={() => {
                        setSelectedCar(car);
                        setIsRegisterModalOpen(true);
                      }}
                    >
                      اختر هذه السيارة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا تختارنا؟
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">موثوقية كاملة</h3>
              <p className="text-gray-600">نعمل مع مستوردين معتمدين وموثوقين</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">أسعار تنافسية</h3>
              <p className="text-gray-600">أفضل الأسعار مع أو بدون مبادرة</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">خدمة شاملة</h3>
              <p className="text-gray-600">من الاختيار حتى التسليم</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>سجل طلبك</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button 
              onClick={handleGoogleSignIn}
              className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
              تسجيل الدخول بـ Google
            </Button>
            
            <Separator />
            
            <form onSubmit={handleRegistration} className="space-y-4">
              <div>
                <Label htmlFor="name">الاسم</Label>
                <Input 
                  id="name"
                  value={registrationData.name}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input 
                  id="email"
                  type="email"
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input 
                  id="phone"
                  type="tel"
                  value={registrationData.phone}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="budget">الميزانية (اختياري)</Label>
                <Select 
                  value={registrationData.budget}
                  onValueChange={(value) => setRegistrationData(prev => ({ ...prev, budget: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر ميزانيتك" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500k-1m">500,000 - 1,000,000 ج.م</SelectItem>
                    <SelectItem value="1m-2m">1,000,000 - 2,000,000 ج.م</SelectItem>
                    <SelectItem value="2m-3m">2,000,000 - 3,000,000 ج.م</SelectItem>
                    <SelectItem value="3m+">أكثر من 3,000,000 ج.م</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasInitiative"
                  checked={registrationData.hasInitiative}
                  onCheckedChange={(checked) => 
                    setRegistrationData(prev => ({ ...prev, hasInitiative: checked as boolean }))
                  }
                />
                <Label htmlFor="hasInitiative">لدي مبادرة</Label>
              </div>
              
              <Button type="submit" className="w-full">
                إرسال الطلب
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={isConfirmationModalOpen} onOpenChange={setIsConfirmationModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>تم استلام طلبك بنجاح!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800">
                شكراً لك! تم استلام طلبك وسنتواصل معك قريباً لتأكيد التفاصيل.
              </p>
            </div>
            
            {selectedCar && (
              <div className="border p-4 rounded-lg">
                <h4 className="font-semibold mb-2">السيارة المختارة:</h4>
                <p>{selectedCar.brand} {selectedCar.model} - {selectedCar.year}</p>
                <p className="text-sm text-gray-600">
                  السعر: {registrationData.hasInitiative ? selectedCar.initiativePrice : selectedCar.localPrice} ج.م
                </p>
              </div>
            )}
            
            <div className="border p-4 rounded-lg">
              <h4 className="font-semibold mb-2">تفاصيل الطلب:</h4>
              <p><strong>الاسم:</strong> {registrationData.name}</p>
              <p><strong>البريد الإلكتروني:</strong> {registrationData.email}</p>
              <p><strong>رقم الهاتف:</strong> {registrationData.phone}</p>
              {registrationData.budget && (
                <p><strong>الميزانية:</strong> {registrationData.budget}</p>
              )}
              <p><strong>المبادرة:</strong> {registrationData.hasInitiative ? 'نعم' : 'لا'}</p>
            </div>
            
            <Button 
              onClick={() => setIsConfirmationModalOpen(false)}
              className="w-full"
            >
              تم
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chatbase Bot */}
      <div className="fixed bottom-4 right-4 z-50">
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

export default Home;