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
import RouteLink from '../RouteLink/RouteLink';
export default function Navbar() {
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
            <li>
              <Link href={'/'}>Favorite items</Link>
            </li>
            <li>
              <Link href={'/doctors'}>Doctors</Link>
            </li>
            <li>
              <Link href={'/'}>Vaccinations</Link>
            </li>
            <li>
              <Link href={'/'}>Doses</Link>
            </li>
            <li>
              <Link href={'/profile'}>Profile</Link>
            </li>

            <li className="bell">
              <Link href={'/'}>
                <CiBellOn />
              </Link>
            </li>
          </ul>
        </div>
        <div className="links">
          <RouteLink text="signin" to="/signin" />
          <RouteLink text="signup" to="/signup" />
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
          <li>
            <Link href={'/'}>
              <CiHeart />
              Favorite items
            </Link>
          </li>
          <li>
            <Link href={'/'}>
              <FaUserDoctor />
              Doctors
            </Link>
          </li>
          <li>
            <Link href={'/'}>
              <TbVaccine />
              Vaccinations
            </Link>
          </li>
          <li>
            <Link href={'/'}>
              <CgProfile />
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
