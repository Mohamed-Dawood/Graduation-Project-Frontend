import './Footer.css';
import logoImage from '../../assets/images/logo/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
import Socials from '../Social/Socials';
export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="container text-center">
          <div className="row m-0">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <Link href={'/'}>
                <Image src={logoImage} alt="Footer Image" />
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div>
                <h3> Services</h3>
                <ul className="uls">
                  <li>
                    <Link href={'/'}>Vaccination appointment alerts</Link>
                  </li>
                  <li>
                    <Link href={'/'}>
                      Articles about vaccination side effects
                    </Link>
                  </li>
                  <li>
                    <Link href={'/'}>Drug database</Link>
                  </li>
                  <li>
                    <Link href={'/'}>Pre and post vaccination tips</Link>
                  </li>
                  <li>
                    <Link href={'/'}>Medical consultations</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div>
                <h3>Important links </h3>
                <ul className="uls">
                  <li>
                    <Link href={'/'}>Home</Link>
                  </li>
                  <li>
                    <Link href={'/'}>About app </Link>
                  </li>
                  <li>
                    <Link href={'/'}>Frequently asked questions</Link>
                  </li>
                  <li>
                    <Link href={'/'}>privacy policy</Link>
                  </li>
                  <li>
                    <Link href={'/'}>Terms and Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div>
                <h3>Contact us </h3>
                <p className="email">
                  البريد الإلكتروني: moamenhussein2424@gmail.com
                </p>
                <h6 className="phone">الهاتف: 01024327924</h6>
                <Socials />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
