import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input';
import Button from '../../components/button';
import apiClient from '../../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      // NOTE: Replace '/users/' with your actual backend registration endpoint.
      // The payload might also differ based on your backend requirements.
      const response = await apiClient.post('/users/', {
        username: username,
        email: email,
        password: password,
      });
      console.log('Registration successful:', response.data);
      // Optionally, navigate to login page or show a success message
      navigate('/login');
    } catch (err: any) {
      console.error('Registration failed:', err);
      if (err.response && err.response.data && err.response.data.detail) {
        if (Array.isArray(err.response.data.detail)) {
          const messages = err.response.data.detail
            .map(
              (detailItem: { msg: string; [key: string]: any }) =>
                detailItem.msg
            )
            .join('. ');
          setError(messages);
        } else if (typeof err.response.data.detail === 'string') {
          setError(err.response.data.detail);
        } else {
          setError('An unexpected error format was received.');
        }
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
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
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Input
            label="Confirm Password"
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
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

          <div>
            <Button type="submit">Sign up</Button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Register;
