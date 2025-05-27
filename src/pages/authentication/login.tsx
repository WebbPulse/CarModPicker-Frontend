import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input';
import Button from '../../components/button';
import apiClient from '../../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      // NOTE: Replace '/auth/login' with your actual backend login endpoint.
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await apiClient.post('/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      // localStorage.setItem('authToken', response.data.token);
      console.log('Login successful:', response.data);
      navigate('/'); // Redirect to a protected route or dashboard
    } catch (err: any) {
      console.error('Login failed:', err);
      if (err.response && err.response.data && err.response.data.detail) {
        if (Array.isArray(err.response.data.detail)) {
          // Map through the error details and join their messages
          const messages = err.response.data.detail
            .map(
              (detailItem: { msg: string; [key: string]: any }) =>
                detailItem.msg
            )
            .join('. ');
          setError(messages);
        } else if (typeof err.response.data.detail === 'string') {
          // If detail is already a string (some APIs might return this)
          setError(err.response.data.detail);
        } else {
          // Fallback for unexpected detail format
          setError('An unexpected error format was received.');
        }
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Username"
            id="username"
            name="username"
            type="username"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          {error && (
            <div className="rounded-md bg-red-900 bg-opacity-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-300">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgotPassword"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button type="submit">Sign in</Button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
