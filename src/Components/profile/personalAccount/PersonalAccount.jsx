'use client';
import './personalAccount.css';
import { CiUser } from 'react-icons/ci';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { host } from '@/Components/utils/Host';
import PageTitle from '@/Components/PageTitle/PageTitle';
import { showToast } from '@/Components/Toast/Toast';
import { useRouter } from 'next/navigation';

export default function PersonalAccount() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [initialdata, setInitialData] = useState({});
  const router = useRouter();

  // Start get data By Id
  function getDataById() {
    //get id user from local storage
    const Id = localStorage.getItem('Id');
    let token = localStorage.getItem('Token');
    if (!token) {
      showToast('You Are Not Logged In', 'warning');
      router.push('/signin');
      return;
    }
    if (token) {
      axios
        .get(`${host}/user/userById/${Id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((response) => {
          const user = response.data.data.rows[0];
          setFirstName(user.first_name || '');
          setLastName(user.last_name || '');
          setEmail(user.email || '');
          setPhone(user.phone_number || '');
          setPassword(user.password || '');
          setInitialData({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
          });
        });
    }
  }
  // End Get Data With ID

  // Start Handle Edit
  const handleEdit = (e) => {
    e.preventDefault();
    const Id = localStorage.getItem('Id');
    const changeData =
      first_name !== initialdata.first_name ||
      last_name !== initialdata.last_name ||
      email !== initialdata.email ||
      phone_number !== initialdata.phone_number;
    if (!changeData) {
      showToast(`You didn't change anything`, 'warning');
      return;
    }
    const paramsEdit = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
    };
    axios
      .put(`${host}/user/update/${Id}`, paramsEdit, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        showToast(`Updated Your Account Successfully`, 'success');
      })
      .catch((error) => {
        showToast(`${error.message}`, 'error');
      });
  };
  // End Handle Edit

  // Start Delete Account
  const deleteAccount = (e) => {
    e.preventDefault();
    localStorage.removeItem('Token');
    const Id = localStorage.getItem('Id');
    axios
      .delete(`${host}/user/userById/${Id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        showToast(`You Deleted Your Account Successfully`, 'success');
        router.push('/signup');
      })
      .catch((error) => {
        showToast(`${error.message}`, 'error');
      });
  };
  // End Delete Account

  useEffect(() => {
    getDataById(); // Get data when the component loads
  }, []);

  return (
    <div>
      <div className="container">
        <div className="personalAccount">
          <PageTitle text="Personal account settings" />
          <form>
            <div>
              <label>First Name</label>
              <br />
              <span>
                <CiUser />
              </span>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <br />
              <span>
                <CiUser />
              </span>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <br />
              <span>
                <MdEmail />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Phone Number</label>
              <br />
              <span>
                <FaPhoneAlt />
              </span>
              <input
                type="text"
                value={phone_number}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="buttons">
              <button id="edit" type="submit" onClick={handleEdit}>
                Edit account
              </button>
              <button id="delete" type="button" onClick={deleteAccount}>
                Delete account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
