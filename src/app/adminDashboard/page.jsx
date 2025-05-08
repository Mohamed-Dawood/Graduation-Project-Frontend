'use client';
import './adminDashboard.css';
import { FaUserDoctor } from 'react-icons/fa6';
import { MdArticle } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import { MdOutlineVaccines } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import adminImage from '../../assets/images/admin/admin.jpg';
import Image from 'next/image';
import PageTitle from '@/Components/PageTitle/PageTitle';
import MainDashboard from '@/Components/AdminDashboard/mainDashboard/page';
import DoctorsAdmin from '@/Components/AdminDashboard/doctors/Doctors';
import ArticlesDashboard from '@/Components/AdminDashboard/articles/ArticlesDashboard';
import Medicines from '@/Components/AdminDashboard/medicines/Medicines';
import Vaccines from '@/Components/AdminDashboard/vaccines/Vaccines';
import { useRouter } from 'next/navigation';
import { showToast } from '@/Components/Toast/Toast';

export default function AdminDashboard() {
  const [active, setActive] = useState('doctors');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (!token) {
      showToast('You are not logged in.', 'warning');
      router.push('/signin');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const handleNavClick = (section) => {
    setActive(section);
    setSidebarVisible(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="dashboard">
      <div className="container">
        <FaBars id="bars" onClick={toggleSidebar} />
        <div className={`sidebar ${sidebarVisible ? 'show' : ''}`}>
          <ul>
            <li
              onClick={() => handleNavClick('doctors')}
              className={active === 'doctors' ? 'active' : ''}
            >
              <span>
                <FaUserDoctor />
              </span>
              <span>Doctors</span>
            </li>
            <li
              onClick={() => handleNavClick('articles')}
              className={active === 'articles' ? 'active' : ''}
            >
              <span>
                <MdArticle />
              </span>
              <span>Articles</span>
            </li>
            <li
              onClick={() => handleNavClick('medicine')}
              className={active === 'medicine' ? 'active' : ''}
            >
              <span>
                <GiMedicines />
              </span>
              <span>Medicines</span>
            </li>
            <li
              onClick={() => handleNavClick('vaccines')}
              className={active === 'vaccines' ? 'active' : ''}
            >
              <span>
                <MdOutlineVaccines />
              </span>
              <span>Vaccines</span>
            </li>
          </ul>
        </div>
        <div className="content">
          {active === 'doctors' && <DoctorsAdmin />}
          {active === 'articles' && <ArticlesDashboard />}
          {active === 'medicine' && <Medicines />}
          {active === 'vaccines' && <Vaccines />}
        </div>
      </div>
    </div>
  );
}
