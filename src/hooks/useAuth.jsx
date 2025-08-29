import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Google OAuth configuration
const GOOGLE_CLIENT_ID = '****************'; // You'll need to provide the actual client ID
const GOOGLE_CLIENT_SECRET = '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';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already signed in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signInWithGoogle = async () => {
    try {
      // For now, using a mock implementation
      // In production, you would use Google OAuth 2.0
      
      // Example implementation with Google OAuth:
      /*
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${GOOGLE_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback')}&` +
        `response_type=code&` +
        `scope=openid email profile&` +
        `access_type=offline`;
      
      window.location.href = googleAuthUrl;
      */
      
      // Mock implementation for now
      const mockUser = {
        id: 'google_' + Date.now(),
        name: 'مستخدم Google',
        email: 'user@gmail.com',
        avatar: 'https://via.placeholder.com/40',
        provider: 'google'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return mockUser;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};