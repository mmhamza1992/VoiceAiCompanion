import { useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { usePerformanceTracking } from "@/hooks/usePerformanceTracking";
import { CookieConsent } from "@/components/legal/CookieConsent";

// Core Pages - Lazy loaded for optimal performance
const Wakel = lazy(() => import("./pages/Wakel"));
const Moder = lazy(() => import("./pages/Moder"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const BookDemo = lazy(() => import("./pages/BookDemo"));
const Auth = lazy(() => import("./pages/Auth"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const TriviatStyleRegister = lazy(() => import("./pages/TriviatStyleRegister"));
const TrialDashboard = lazy(() => import("./pages/TrialDashboard"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const DashboardRedirect = lazy(() => import("./pages/DashboardRedirect"));
const FAQ = lazy(() => import("./pages/FAQ"));

// Legal Pages
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  const location = useLocation();
  
  // Initialize performance tracking
  usePerformanceTracking();

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Layout>
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              
              {/* Core Services */}
              <Route path="/wakel" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Wakel />
                </Suspense>
              } />
              <Route path="/moder" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Moder />
                </Suspense>
              } />
              
              {/* Pricing & Products */}
              <Route path="/pricing" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Pricing />
                </Suspense>
              } />
              <Route path="/product/:id" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ProductPage />
                </Suspense>
              } />
              
              {/* Service-specific routes for Triviat-style flow */}
              <Route path="/wakel-inbound" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ProductPage />
                </Suspense>
              } />
              
              <Route path="/wakel-outbound" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ProductPage />
                </Suspense>
              } />
              
              <Route path="/whatsapp" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ProductPage />
                </Suspense>
              } />
              
              {/* Contact */}
              <Route path="/contact" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Contact />
                </Suspense>
              } />
              
              {/* FAQ */}
              <Route path="/faq" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <FAQ />
                </Suspense>
              } />
              
              {/* Book Demo */}
              <Route path="/book-demo" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <BookDemo />
                </Suspense>
              } />
              
              {/* Authentication */}
              <Route path="/auth" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Auth />
                </Suspense>
              } />
              <Route path="/auth/callback" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AuthCallback />
                </Suspense>
              } />
              <Route path="/register" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <TriviatStyleRegister />
                </Suspense>
              } />
              
              {/* Dashboard */}
              <Route path="/dashboard" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <DashboardRedirect />
                </Suspense>
              } />
              <Route path="/trial-dashboard" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <TrialDashboard />
                </Suspense>
              } />
              
              {/* Legal Pages */}
              <Route path="/terms" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <TermsOfService />
                </Suspense>
              } />
              <Route path="/privacy" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PrivacyPolicy />
                </Suspense>
              } />
              <Route path="/cookies" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <CookiePolicy />
                </Suspense>
              } />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          
          {/* Global UI Components */}
          <Toaster />
          <Sonner />
          <CookieConsent />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;