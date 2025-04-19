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
function page() {
  const [email, setEmail] = useState('');
  return (
    <div className="signin">
      <div className="container">
        <form action="">
          <h2 className="formTitle">signin</h2>
          <Input
            label="email"
            id="email"
            placeholder="Enter your name"
            type="text"
            icon={MdEmail}
          />
          <Input
            label="password"
            id="password"
            placeholder="Enter your password"
            type="password"
            icon={FaLock}
          />
          <small>
            <Link href="/forgot-password">Forgot password?</Link>
          </small>
          <Button text="sign in" color="--main-color" />
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
