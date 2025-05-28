import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input';
import Button from '../../components/button';
import apiClient from '../../services/api';
import { AxiosError } from 'axios';
import type {
  UserRead,
  HTTPValidationError,
  ValidationError,
} from '../../types/api';
import AuthCard from '../../components/authCard';
import ErrorAlert from '../../components/errorAlert';
import { useAuth } from '../../contexts/authContext'; // Add this import

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // Get login function from context

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await apiClient.post<UserRead>('/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('Login successful:', response.data);
      authLogin(response.data); // Update auth context
      // Optionally, explicitly call checkAuthStatus if you want to be absolutely sure after login
      // await checkAuthStatus();
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      const axiosError = err as AxiosError<HTTPValidationError>;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.detail
      ) {
        if (Array.isArray(axiosError.response.data.detail)) {
          const messages = axiosError.response.data.detail
            .map((detailItem: ValidationError) => detailItem.msg)
            .join('. ');
          setError(messages);
        } else if (typeof axiosError.response.data.detail === 'string') {
          setError(axiosError.response.data.detail);
        } else {
          setError('An unexpected error format was received.');
        }
      } else if (
        axiosError.response &&
        axiosError.response.data &&
        (axiosError.response.data as any).message
      ) {
        setError((axiosError.response.data as any).message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    }
  };

  return (
    <AuthCard title="Sign in to your account">
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

        <ErrorAlert message={error} />

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
    </AuthCard>
  );
}
export default Login;
