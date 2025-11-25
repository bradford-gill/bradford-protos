import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Activity, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-gray-200 shadow-xl">
        <CardHeader className="space-y-6 pb-8">
          <div className="flex flex-col items-center gap-4">
            <div className="p-3 bg-gray-900 rounded-xl">
              <Activity className="h-8 w-8 text-white" strokeWidth={2.5} />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">InSync Health</CardTitle>
          </div>
          <CardDescription className="text-center text-base text-gray-600">
            Sign in to access your care coordination dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-11 border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              />
            </div>

            <Button type="submit" className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium">
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 font-semibold mb-3">Demo Credentials:</p>
            <div className="text-sm text-gray-700 space-y-2 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Admin:</span>
                <span>admin / admin</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Care Team:</span>
                <span>Essam / password</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
