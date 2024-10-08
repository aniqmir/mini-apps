import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = ({ handleMiniAppChange }: any) => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display

  const handleNavClick = (id: number) => {
    handleMiniAppChange(id);
    setNav(false);
  };

  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Notes' },
    { id: 2, text: 'Stopwatch' },
    { id: 3, text: 'Images' },
  ];

  return (
    <div className='bg-slate-900 flex justify-between items-center h-16 mx-auto px-2 text-white'>
      {/* Logo */}
      <h1
        className='w-full text-2xl text-slate-200 hover:cursor-pointer'
        onClick={() => handleMiniAppChange(0)}
      >
        MiniAppsbyAniq
      </h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleMiniAppChange(item.id)}
            className='hover:underline rounded-sm m-2 cursor-pointer duration-300 hover:text-slate-400'
          >
            {item.text}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden z-50 left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1
          className='w-full text-xl text-slate-200 m-4'
          onClick={() => handleMiniAppChange(0)}
        >
          MiniAppsByAniq
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className='p-4 border-b rounded-xl hover:bg-slate-300 duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
