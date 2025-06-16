'use client';
import './Navbar.css';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '../../assets/images/logo/logo.png';
import { CiBellOn } from 'react-icons/ci';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { IoHome } from 'react-icons/io5';
import { FaUserDoctor } from 'react-icons/fa6';
import { TbVaccine } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { CiSaveDown2 } from 'react-icons/ci';
import { CiHeart } from 'react-icons/ci';
import { RiAdminFill } from 'react-icons/ri';
import RouteLink from '../RouteLink/RouteLink';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('Role');
    const name = localStorage.getItem('Name');
    const token = localStorage.getItem('Token');
    const userId = localStorage.getItem('Id');

    setUserRole(role);
    setUserName(name);
    setIsLoggedIn(!!(token && userId));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Id');
    localStorage.removeItem('Role');
    localStorage.removeItem('Name');
    setIsLoggedIn(false);
    setUserRole('');
    router.push('/');
  };

  const menuMobile = () => {
    const menuMobile = document.getElementById('mobile-menu');
    // console.log(menuMobile)
    menuMobile?.classList.toggle('menuListMobile');
  };
  return (
    <nav>
      <div className="container">
        <Link href={'/'}>
          <Image
            src={logoImage}
            alt="Logo Image"
            className="m-0 img-fluid"
            priority
          />
        </Link>
        <div id="uls">
          <HiBars3BottomLeft className="barsMenu" onClick={menuMobile} />
          <ul>
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            {userRole === 'Admin' && (
              <li>
                <Link href={'/adminDashboard'}>Admin Dashboard</Link>
              </li>
            )}
            {/* <li>
              <Link href={'/'}>Favorite items</Link>
            </li> */}
            <li>
              <Link href={'/doctors'}>Doctors</Link>
            </li>
            <li>
              <Link href={'/vaccines'}>Vaccinations</Link>
            </li>
            <li>
              <Link href={'/doses'}>Doses</Link>
            </li>
            <li>
              <Link href={'/medicine'}>Medicine</Link>
            </li>
            <li>
              <Link href={'/profile'}>Profile</Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="user-name">Welcome, {userName}</li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            )}
            {/* <li className="bell">
              <Link href={'/'}>
                <CiBellOn />
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
      <div id="uls-mobile">
        <ul id="mobile-menu">
          <li>
            <Link href={'/'}>
              <IoHome />
              Home
            </Link>
          </li>
          {userRole === 'Admin' && (
            <li>
              <Link href={'/adminDashboard'}>
                <RiAdminFill />
                Admin Dashboard
              </Link>
            </li>
          )}
          {/* <li>
            <Link href={'/'}>
              <CiHeart />
              Favorite items
            </Link>
          </li> */}
          <li>
            <Link href={'/doctors'}>
              <FaUserDoctor />
              Doctors
            </Link>
          </li>
          <li>
            <Link href={'/vaccines'}>
              <TbVaccine />
              Vaccinations
            </Link>
          </li>
          <li>
            <Link href={'/doses'}>
              <TbVaccine />
              Doses
            </Link>
          </li>
          <li>
            <Link href={'/medicine'}>
              <TbVaccine />
              Medicine
            </Link>
          </li>
          <li>
            <Link href={'/profile'}>
              <CgProfile />
              Profile
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li className="user-name">Welcome, {userName}</li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
