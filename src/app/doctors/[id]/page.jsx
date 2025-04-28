'use client';
import { useEffect, useState } from 'react';
import './doctorDetails.css';
import axios from 'axios';
import { useParams } from 'next/navigation';
import doctorImage from '../../../assets/images/doctor/doctor.png';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { host } from '@/Components/utils/Host';
import Spinner from '@/Components/Spinner/Spinner';
export default function DoctorDetails() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [dataAbout, setDataAbout] = useState([]);
  const [loading, setLoading] = useState(false);
  function getData() {
    setLoading(true);
    axios
      .get(`${host}/doctor/${params.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data.data.rows[0]);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.message}`,
        });
      });
  }
  function getAboutDoctor() {
    axios
      .get(`${host}/doctor/Appointments/${params.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        setDataAbout(response.data.data.rows);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.message}`,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    getData();
    getAboutDoctor();
  }, []);
  return (
    <div className="doctorDetails">
      <div className="container">
        <h3>Information About Doctor</h3>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="doctor">
              <div className="doctorCard">
                <div>
                  <Image src={doctorImage} alt="Doctor Image" />
                </div>
                <div className="info">
                  <div className="nameAndHeart">
                    <h6>{`${data.first_name} ${data.last_name}`}</h6>
                    {/* <FaHeart /> */}
                  </div>
                  <p>{data.specialization}</p>
                  <div className="rate">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
            </div>
            <div className="social">
              <Link href={`mailto:${data.email}`}>
                <SiGmail />
              </Link>
              {data?.phone_number && (
                <Link
                  href={`https://wa.me/${data.phone_number.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </Link>
              )}
              {data?.phone_number && (
                <Link href={`tel:${data.phone_number}`}>
                  <FaPhoneAlt />
                </Link>
              )}
            </div>
            <div className="about">
              <div>
                <h4>About this doctor</h4>
                <p>
                  Dr. Mohamed is a pediatrician who specializes in caring for
                  children from birth through adolescence. He is distinguished
                  by his extensive experience in monitoring children's growth
                  and development, and diagnosing and treating common diseases,
                  such as colds, allergies, and infections. It is also concerned
                  with providing advice to mothers about the necessary
                  vaccinations and proper nutrition for children. Dr. Muhammad
                  is known for his friendly dealings with children and his
                  keenness to provide them with the best medical care.
                </p>
              </div>
              <div>
                <h4>Working hours</h4>
                {/* <p>{`${dataAbout.available_day}, ${dataAbout.start_time} : ${dataAbout.end_time}`}</p>
                 */}
                <table>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataAbout.map((item) => (
                      <tr key={item.availability_id}>
                        <td>{item.available_day}</td>
                        <td>{item.start_time}</td>
                        <td>{item.end_time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
