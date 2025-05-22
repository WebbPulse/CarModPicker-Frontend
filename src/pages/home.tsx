import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    fetch('/api/users/1', 
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ) // Or any other endpoint your backend might have
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <h2>Home Page</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-800">Tailwind Card</h2>
        <p className="text-gray-600 mt-3">
            This is a simple card layout built with Tailwind CSS.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Learn More
        </button>
    </div>
    </>
  );
}

export default Home;