'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import './signup.css';
import Button from '@/Components/Button/Button';
import Input from '@/Components/Input/Input';
import Socials from '@/Components/Social/Socials';
import { FaLock, FaPhoneAlt, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import signUpImage from '../../assets/images/signup/signup.png';
import { showToast } from '@/Components/Toast/Toast';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import { useRouter } from 'next/navigation';

function page() {
  const [firstName, setFirstName] = useState('momen');
  const [lastName, setLastName] = useState('hussain');
  const [phoneNumber, setPhoneNumber] = useState('+201000038157');
  const [email, setEmail] = useState('mo11@gmail.com');
  const [password, setPassword] = useState('greatePassword!');

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      showToast('Please fill all fields.', 'warning');
      return;
    }

    try {
      const res = await axios.post(
        `${host}/Auth/userRegister`,
        {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const { succes, msg, Token, user } = res.data;

      if (succes) {
        showToast('Signup Successfully!', 'success');
        router.push('/');
        localStorage.setItem('Token', Token);
        localStorage.setItem('Role', user.role);
        localStorage.setItem('Id', user.user_id);
      } else {
        showToast(msg || 'Signup failed. Please try again.', 'error');
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || 'Something went wrong. Please try again.';
      showToast(errorMsg, 'error');
      console.error(error);
    }
  }

  return (
    <div className="signup">
      <div className="container">
        <form action="" onSubmit={handleSubmit}>
          <h2 className="formTitle">Create new account</h2>
          <Input
            label="firstName"
            id="firstName"
            placeholder="Enter your first name"
            type="text"
            icon={FaUser}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label="lastName"
            id="lastName"
            placeholder="Enter your last name"
            type="text"
            icon={FaUser}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            label="phone Number"
            id="phoneNumber"
            placeholder="Enter your Phone"
            type="text"
            icon={FaPhoneAlt}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input
            label="email"
            id="email"
            placeholder="Enter your name"
            type="text"
            icon={MdEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="password"
            id="password"
            placeholder="Enter your password"
            type="password"
            icon={FaLock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text="create an account"
            bgColor="--main-color"
            type="submit"
          />
          <p>Or register using</p>
          <Socials />
        </form>
        <div className="image">
          <Image src={signUpImage} alt="loginImage" />
        </div>
      </div>
    </div>
  );
}

export default page;
