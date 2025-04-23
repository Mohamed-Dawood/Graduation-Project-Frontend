import "./Footer.css";
import logoImage from "../../assets/images/logo/logo.png";
import Link from "next/link";
import Image from "next/image";
import Socials from "../Social/Socials";
export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div>
          <Link href={"/"}>
            <Image src={logoImage} alt="Footer Image" className="footerImage" />
          </Link>
        </div>
        <div>
          <div>
            <h3> Services</h3>
            <ul className="uls">
              <li>
                <Link href={"/"}>Vaccination appointment alerts</Link>
              </li>
              <li>
                <Link href={"/"}>Articles about vaccination side effects</Link>
              </li>
              <li>
                <Link href={"/"}>Drug database</Link>
              </li>
              <li>
                <Link href={"/"}>Pre and post vaccination tips</Link>
              </li>
              <li>
                <Link href={"/"}>Medical consultations</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <h3>Important links </h3>
            <ul className="uls">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/"}>About app </Link>
              </li>
              <li>
                <Link href={"/"}>Frequently asked questions</Link>
              </li>
              <li>
                <Link href={"/"}>privacy policy</Link>
              </li>
              <li>
                <Link href={"/"}>Terms and Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <h3>Contact us </h3>
            <p className="email">Gmail : moamen.hussein3887@gmail.com</p>
            <p className="phone">Phone : 01024327924</p>
            <Socials />
          </div>
        </div>
      </div>
    </div>
  );
}
