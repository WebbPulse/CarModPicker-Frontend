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

export default Home;