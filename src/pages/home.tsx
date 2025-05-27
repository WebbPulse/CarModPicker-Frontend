import { useEffect, useState } from 'react';
import apiClient from '../services/api'; // Adjust path as needed

interface UserData {
  id: number;
  name: string;
  email: string;
}

export default function HomePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // The baseURL '/api' is prepended automatically
        const response = await apiClient.get('/users/1');
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
    <div className="text-center"> {/* Added text-center for the content */}
      {/* The "Home Page" h2 can be removed as the Header now serves as primary navigation/branding */}
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-10"> {/* Added text-gray-800 for card text, mx-auto and mt-10 for centering and spacing */}
        <h2 className="text-2xl font-bold">Tailwind Card</h2>
        <p className="mt-3">
            This is a simple card layout built with Tailwind CSS on a dark background.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Learn More
        </button>
      </div>
    </div>
  );
}