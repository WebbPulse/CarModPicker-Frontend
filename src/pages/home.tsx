import { useEffect, useState } from 'react';
import apiClient from '../services/api'; // Adjust path as needed
import type { UserRead } from '../types/api'; // Adjust path as needed

export default function HomePage() {
  const [userData, setUserData] = useState<UserRead | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // The baseURL '/api' is prepended automatically
        const response = await apiClient.get('/users/me');
        setUserData(response.data);
      } catch (err: any) {
        console.error('Failed to fetch user:', err);
        setError(err.message || 'Failed to fetch user data');
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userData.username}!</h1>
      <p className="text-lg">Your email: {userData.email}</p>
      <p className="text-lg">User ID: {userData.id}</p>
    </div>
  );
}
