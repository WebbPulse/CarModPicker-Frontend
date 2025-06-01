import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'; // Import useAuth

function Header() {
  const { isAuthenticated, logout, isLoading, user } = useAuth(); // Get auth state

  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          CarModPicker
        </Link>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/builder" className="hover:text-gray-300">
              Builder
            </Link>
          </li>
          {isLoading ? (
            <li>
              <span className="text-sm text-gray-400">Loading...</span>
            </li>
          ) : isAuthenticated ? (
            <>
              <li>
                <Link to="/profile" className="hover:text-gray-300">
                  Profile ({user?.username})
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="hover:text-gray-300 bg-transparent border-none p-0"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
