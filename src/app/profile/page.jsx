'use client';
import './profile.css';
import '../../Components/profile/sidebar/sidebar.css';
import { IoIosSettings } from 'react-icons/io';
import { FaAngleRight } from 'react-icons/fa6';
import { CiBellOn } from 'react-icons/ci';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { CiLogin } from 'react-icons/ci';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import PersonalAccount from '@/Components/profile/personalAccount/PersonalAccount';
import Children from '@/Components/profile/children/Children';
import AddChild from '@/Components/profile/addChild/AddChild';
import Reservation from '@/Components/profile/reservation/Reservation';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [data, setData] = useState('personalAccount');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (!token) {
      showToast(`You are not logged in.`, 'warning');
      router.push('/signin'); 
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogOut = () => {
    axios
      .get(`${host}/Auth/logout`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then(() => {
        showToast(`You Logged Out Successfuly`, 'success');
        router.push('/signin');
      })
      .catch((error) => {
        showToast(`${error.message}`, 'error');
      });
  };

  if (!isAuthenticated) return null;

  return (
    <div>
      <div className="container">
        <div className="profile">
          <div className="sidebar">
            <ul>
              <li
                onClick={() => setData('personalAccount')}
                className={data === 'personalAccount' ? 'active' : ''}
              >
                <div className="iconAndText">
                  <IoIosSettings />
                  <span>Personal account settings</span>
                </div>
                <div>
                  <FaAngleRight className="arrow" />
                </div>
              </li>
              <li
                onClick={() => setData('notification')}
                className={data === 'notification' ? 'active' : ''}
              >
                <div className="iconAndText">
                  <CiBellOn />
                  <span>Notifications</span>
                </div>
                <div>
                  <FaAngleRight className="arrow" />
                </div>
              </li>
              <li
                onClick={() => setData('addChild')}
                className={data === 'addChild' ? 'active' : ''}
              >
                <div className="iconAndText">
                  <MdPersonAddAlt1 />
                  <span>Add a child</span>
                </div>
                <div>
                  <FaAngleRight className="arrow" />
                </div>
              </li>
              <li
                onClick={() => setData('children')}
                className={data === 'children' ? 'active' : ''}
              >
                <div className="iconAndText">
                  <MdPersonAddAlt1 />
                  <span>My children</span>
                </div>
                <div>
                  <FaAngleRight className="arrow" />
                </div>
              </li>
              <li
                onClick={() => setData('reservation')}
                className={data === 'reservation' ? 'active' : ''}
              >
                <div className="iconAndText">
                  <FaRegCalendarAlt />
                  <span>Reservation</span>
                </div>
                <div>
                  <FaAngleRight className="arrow" />
                </div>
              </li>
              <li className="logOut" onClick={handleLogOut}>
                <div className="iconAndText">
                  <CiLogin />
                  <span>Log out</span>
                </div>
                <div>
                  <FaAngleRight className="arrow" />
                </div>
              </li>
            </ul>
          </div>
          {data === 'personalAccount' && <PersonalAccount />}
          {data === 'children' && <Children icon={<FaRegEdit />} />}
          {data === 'addChild' && <AddChild />}
          {data === 'reservation' && <Reservation />}
        </div>
      </div>
    </div>
  );
}
