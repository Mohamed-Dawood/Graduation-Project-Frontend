'use client';
import './BannerDoctor.css';
import { useEffect, useState } from 'react';
import doctorImage from '../../../assets/images/doctor/doctor.png';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import PageTitle from '@/Components/PageTitle/PageTitle.jsx';
import Spinner from '@/Components/Spinner/Spinner';

export default function Banner({ host }) {
  const [data, setData] = useState([]);
  const [likedIds, setLikedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  //============== Rate =======================
  const rate = [4.2, 3.3, 2.1, 3.4, 2.8, 4.7, 3.4, 2.7, 3.9, 2.2];
  useEffect(() => {
    setLoading(true);
    axios
      .get(host, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.data.rows);
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
  }, [host]);
  const handleClickHeart = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  return (
    <div className="doctor">
      <div>
        <PageTitle text="doctors" />
        {loading ? (
          <Spinner />
        ) : (
          <div className="content">
            <div className="container">
              {data.map((item, index) => {
                return (
                  <div className="cardContent" key={item.user_id}>
                    <div>
                      {item.image_url == null ? (
                        <Image src={doctorImage} alt="Doctor Image" />
                      ) : (
                        <Image src={item.image_url} alt="Doctor Image" />
                      )}
                    </div>
                    <div className="doctorInfo">
                      <div className="nameAndHeart">
                        <h6>{`${item.first_name} ${item.last_name}`}</h6>
                        <FaHeart
                          onClick={() => handleClickHeart(item.user_id)}
                          style={{
                            color: likedIds.includes(item.user_id)
                              ? '#3640ce'
                              : 'gray',
                            cursor: 'pointer',
                          }}
                        />
                      </div>
                      <p>{item.specialization}</p>
                      <div className="rate">
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <span>{rate[index]}</span>
                          <span className="star">
                            <FaStar />
                          </span>
                        </div>
                        <div>
                          <Link href={`/doctors/${item.user_id}`}>
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
