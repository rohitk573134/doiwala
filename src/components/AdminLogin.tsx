import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (user && isAdmin) {
    return null;
  }

  const handleLogin = async () => {
    try {
      setError('');
      const provider = new GoogleAuthProvider();
      // Using signInWithPopup to avoid iframe redirect issues
      await signInWithPopup(auth, provider);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized for OAuth operations. Please add it in the Firebase Console -> Authentication -> Settings -> Authorized domains.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('The login popup was closed before finishing. Please try again.');
      } else {
        setError(err.message || 'Failed to log in');
      }
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to manage your menu and website content.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {user && !isAdmin && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex flex-col">
                <p className="text-sm text-yellow-700">
                  Logged in as {user.email}, but you do not have admin access.
                </p>
                <button 
                  onClick={() => auth.signOut()}
                  className="mt-2 text-xs text-yellow-800 underline hover:text-yellow-900 text-left"
                >
                  Sign out to try another account
                </button>
              </div>
            </div>
          )}

          <div>
            <button
              onClick={handleLogin}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
