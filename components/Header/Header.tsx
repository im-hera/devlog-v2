'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

import { BsGithub } from 'react-icons/bs';
import { IoSunny, IoMoon } from 'react-icons/io5';

interface IProps {
  className?: string;
}

const Header: React.FC<IProps> = ({ className }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { mode, toggleTheme } = useTheme();

  const handleClickThemeToggle = () => {
    toggleTheme();
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <header id="header" className={`${className}`}>
      <div className="header-inner">
        <div className="logo-wrap">
          <span className="logo">
            <Link href="/">im-hera</Link>
          </span>
        </div>
        <div className="actions">
          <div className="btn-wrap">
            <a href="https://github.com/im-hera" target="_blank">
              <span>
                <BsGithub />
              </span>
            </a>
          </div>
          <div className="btn-wrap">
            <button onClick={handleClickThemeToggle}>
              <span className="theme-icon">
                {loaded ? mode === 'light' ? <IoSunny /> : <IoMoon /> : null}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
