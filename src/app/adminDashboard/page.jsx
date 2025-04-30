'use client';
import './adminDashboard.css';
import { FaVectorSquare } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { MdArticle } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import { MdOutlineVaccines } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import adminImage from '../../assets/images/admin/admin.jpg';
import Image from 'next/image';
import PageTitle from '@/Components/PageTitle/PageTitle';
import MainDashboard from '@/Components/AdminDashboard/mainDashboard/page';
import DoctorsAdmin from '@/Components/AdminDashboard/doctors/Doctors';
export default function AdminDashboard() {
  const [active, setActive] = useState('main');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };
  const handleNavClick = (section) => {
    setActive(section);
    setSidebarVisible(false);
  };
  return (
    <div className="dashboard">
      <div className="container">
        <FaBars id="bars" onClick={toggleSidebar} />
        <div className={`sidebar ${sidebarVisible ? 'show' : ''}`}>
          <ul>
            <li
              onClick={() => handleNavClick('main')}
              className={active == 'main' ? 'active' : ''}
            >
              <span>
                <FaVectorSquare />
              </span>
              <span>Main</span>
            </li>
            <li
              onClick={() => handleNavClick('doctors')}
              className={active == 'doctors' ? 'active' : ''}
            >
              <span>
                <FaUserDoctor />
              </span>
              <span>Doctors</span>
            </li>
            <li
              onClick={() => handleNavClick('articles')}
              className={active == 'articles' ? 'active' : ''}
            >
              <span>
                <MdArticle />
              </span>
              <span>Articles</span>
            </li>
            <li
              onClick={() => handleNavClick('medicine')}
              className={active == 'medicine' ? 'active' : ''}
            >
              <span>
                <GiMedicines />
              </span>
              <span>Medicines</span>
            </li>
            <li
              onClick={() => handleNavClick('vaccines')}
              className={active == 'vaccines' ? 'active' : ''}
            >
              <span>
                <MdOutlineVaccines />
              </span>
              <span>Vaccines</span>
            </li>
          </ul>
        </div>
        <div className="content">
          <div className="adminAndPhoto">
            <div >{active === 'main' && <PageTitle text="Main" />}</div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'start',
              }}
            >
              {active === 'doctors' && <PageTitle text="Doctors" />}
            </div>
            <div className="Container">
              <div>
                <h6>Moamen</h6>
                <p>Admin</p>
              </div>
              <div>
                <Image src={adminImage} alt="adminImage" />
              </div>
            </div>
          </div>
          {active === 'main' && <MainDashboard />}
          {active === "doctors" && <DoctorsAdmin />}
        </div>
      </div>
    </div>
  );
}
