import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'; // Import useAuth
import HeaderNavLink from './headerNavLink'; // Import the new component
import { BsTools } from 'react-icons/bs';
import { GrDocumentText } from 'react-icons/gr';
import { GiRaceCar } from 'react-icons/gi';

function Header() {
  const { isAuthenticated, logout, isLoading, user } = useAuth(); // Get auth state

  return (
    <header className="bg-gray-950 text-white w-full">
      {/* Top Tier */}
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold">
          CarModPicker
        </Link>
        <ul className="flex space-x-4 items-center">
          {isLoading ? (
            <li>
              <span className="text-sm text-gray-400">Loading...</span>
            </li>
          ) : isAuthenticated ? (
            <>
              <li>
                <HeaderNavLink to="/profile">
                  Profile ({user?.username})
                </HeaderNavLink>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-transparent border-none"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <HeaderNavLink to="/login">Login</HeaderNavLink>
              </li>
              <li>
                <HeaderNavLink to="/register">Register</HeaderNavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Bottom Tier - Navigation */}
      <nav className="bg-gray-950 border-t border-b border-gray-500">
        <div className="container mx-auto flex items-center p-2">
          <ul className="flex">
            {' '}
            <li>
              <HeaderNavLink to="/builder" icon={<BsTools />}>
                Builder
              </HeaderNavLink>
            </li>
            <li>
              <HeaderNavLink to="/guides" icon={<GrDocumentText />}>
                Guides
              </HeaderNavLink>
            </li>
            <li>
              <HeaderNavLink to="/completed-builds" icon={<GiRaceCar />}>
                Completed Builds
              </HeaderNavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
