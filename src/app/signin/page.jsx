'use client';
import './signin.css';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import Input from '@/Components/Input/Input';
import signinImage from '../../assets/images/signin/signin.png';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/Components/Button/Button';
import Socials from '@/Components/Social/Socials';
import { useState } from 'react';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import { useRouter } from 'next/navigation';
function page() {
  const [email, setEmail] = useState('baher122@gmail.com');
  const [password, setPassword] = useState('greatePassword!');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${host}/Auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const { success, msg, Token, user } = res.data;
      console.log(success, msg, Token);
      if (success) {
        showToast('Login successful!', 'success');
        router.push('/');
        localStorage.setItem('Token', Token);
        localStorage.setItem('Role', user.role);
        localStorage.setItem('Id', user.user_id);
      } else {
        showToast(msg || 'Login failed. Please try again.', 'error');
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || 'Something went wrong. Please try again.';
      showToast(errorMsg, 'error');
      console.error(error);
    }
  }

  return (
    <div className="signin">
      <div className="container">
        <form action="" onSubmit={handleSubmit}>
          <h2 className="formTitle">signin</h2>
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
          <small>
            <Link href="/forgot-password">Forgot password?</Link>
          </small>
          <Button text="sign in" bgColor="--main-color" type="submit"  />
          <p>Or register using</p>
          <Socials />
          <span>
            Don't have an account?{' '}
            <Link href="sign-up">Create a new account</Link>
          </span>
        </form>
        <div className="image">
          <Image src={signinImage} alt="loginImage" />
        </div>
      </div>
    </div>
  );
}

export default page;
