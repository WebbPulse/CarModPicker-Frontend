import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input';
import Button from '../../components/button';
import apiClient from '../../services/api';
import { AxiosError } from 'axios';
import type {
  UserCreate,
  UserRead,
  HTTPValidationError,
  ValidationError,
} from '../../types/api';
import AuthCard from '../../components/authCard';
import ErrorAlert from '../../components/errorAlert'; // Add this import

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
      const response = await apiClient.post<UserRead>(
        '/users/',
        {
          username: username,
          email: email,
          password: password,
        } as UserCreate // Cast payload to UserCreate
      );
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
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
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <AuthCard title="Create your account">
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

        <ErrorAlert message={error} />

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
    </AuthCard>
  );
}
export default Register;
