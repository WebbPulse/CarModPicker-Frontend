import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">CarModPicker</Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/builder" className="hover:text-gray-300">Builder</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;