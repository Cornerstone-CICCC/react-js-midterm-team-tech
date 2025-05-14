import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Sign in');
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username, password }),
        }
      );
      console.log('Response:', res);
      if (!res.ok) {
        setError('Invalid credentials');
        console.error('Invalid credentials');
        return;
      }
      const data = await res.json();
      // localStorage.setItem('user', JSON.stringify(data));
      console.log('User data:', data);
      navigate(`/service-list`);
    } catch (e) {
      setError('Sign in failed');
      console.error('Sign in failed', e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
          <form onSubmit={handleSignIn} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-pink-600 hover:underline">
              Sign Up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
