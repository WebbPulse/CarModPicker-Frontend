import React, { useState } from 'react';
import Input from '../../components/layout/input';
import ButtonStretch from '../../components/buttons/buttonStretch';
import apiClient from '../../services/api';
import AuthCard from '../../components/auth/authCard';
import { ErrorAlert, ConfirmationAlert } from '../../components/layout/alerts';
import AuthRedirectLink from '../../components/auth/authRedirectLink';
import useApiRequest from '../../hooks/useApiRequest';
import AuthForm from '../../components/auth/authForm';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const forgotPasswordRequestFn = (payload: { email: string }) =>
    apiClient.post<Record<string, never>>('/auth/forgot-password', payload);

  const {
    error: apiError,
    isLoading,
    executeRequest: sendPasswordResetLink,
    setError: setApiError,
  } = useApiRequest(forgotPasswordRequestFn);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApiError(null); // Clear previous errors

    if (!email.trim()) {
      setApiError('Email address cannot be empty.');
      return;
    }

    const result = await sendPasswordResetLink({ email: email });
    if (result) {
      // Successfully sent the link
      console.log('Password reset link sent:', result);
      setIsSubmitted(true);
    }
  };

  return (
    <AuthCard title="Forgot Password">
      {isSubmitted ? (
        <div>
          <ConfirmationAlert message="If an account with that email exists, a password reset link has been sent." />
          <AuthRedirectLink
            text="Remembered your password?"
            linkText="Sign In"
            to="/login"
          />
        </div>
      ) : (
        <>
          <AuthForm onSubmit={handleSubmit}>
            <Input
              label="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              name="email"
              disabled={isLoading}
            />
            <ErrorAlert message={apiError} />
            <div>
              <ButtonStretch type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Password Reset Link'}
              </ButtonStretch>
            </div>
          </AuthForm>
          <AuthRedirectLink
            text="Remembered your password?"
            linkText="Sign In"
            to="/login"
          />
        </>
      )}
    </AuthCard>
  );
}
export default ForgotPassword;
