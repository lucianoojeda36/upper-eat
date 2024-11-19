import { useUserRole } from '@/hooks/useUserRole';
import { useRouter } from 'next/router';
import React from 'react';

interface NavbarProps {
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const { isAdmin } = useUserRole();

  return (
    <>
      <div className="h-16"></div>
      <nav className="bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 text-white py-4 px-8 shadow-lg fixed top-0 w-full z-50">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-serif font-bold tracking-wide cursor-pointer">
            GourmetBites
          </div>

          <ul className="flex space-x-8 text-lg font-light">
            <li
              className="hover:text-yellow-300 cursor-pointer transition-colors opacity-50"
              onClick={() => router.push(`/underConstruction`)}
            >
              Home
            </li>
            <li
              className="hover:text-yellow-300 cursor-pointer transition-colors opacity-50"
              onClick={() => router.push(`/underConstruction`)}
            >
              Menú
            </li>
            {isAdmin && (
              <li
                className="hover:text-yellow-300 cursor-pointer transition-colors"
                onClick={() => router.push(`/reservations`)}
              >
                Reservations
              </li>
            )}
            <li
              className="hover:text-yellow-300 cursor-pointer transition-colors opacity-50"
              onClick={() => router.push(`/underConstruction`)}
            >
              Contact
            </li>
          </ul>

          {isAdmin && (
            <ul className="flex space-x-6 ml-8 text-sm font-medium">
              <li
                className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded-md cursor-pointer transition-all"
                onClick={() => router.push(`reservations/reservationForm`)}
              >
                Manage Reservations
              </li>
              <li
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md cursor-pointer transition-all opacity-50"
                onClick={() => router.push(`/underConstruction`)}
              >
                Configuration
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
