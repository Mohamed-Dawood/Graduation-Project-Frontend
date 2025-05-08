'use client';
import { useState, useEffect } from 'react';
import './doses.css';
import PageTitle from '@/Components/PageTitle/PageTitle';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import Spinner from '@/Components/Spinner/Spinner';
import doseImage from '../../assets/images/dose/dose.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function Doses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    let token = localStorage.getItem('Token');
    if (token) {
      axios
        .get(`${host}/dose/getAll`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((response) => {
          // console.log(response.data.data.rows)
          setData(response.data.data.rows);
        })
        .catch((error) => {
          // console.log( error.message)
          showToast(`${error.message}`, 'error');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showToast(`You are not logged in.`, "warning");
      router.push('/signin');
    }
  }, []);
  return (
    <div className="allDoses">
      <div className="container">
        <PageTitle text="Doses" />
        <input type="search" placeholder="Search..." />
        {loading ? (
          <Spinner />
        ) : (
          <div className="content">
            {data.map((item) => {
              return (
                <div key={item.dose_id} className="card">
                  <Image src={doseImage} alt="Dose Image" />
                  <div className="info">
                    <p>Dose Name : {item.dose_name}</p>
                    <p>Recommended Age : {item.recommended_age} Months</p>
                    <p>Discription : This Is Discription</p>
                    <Link
                      href={`/profile/childDosesByChildId/vaccines/${item.dose_id}`}
                    >
                      Vaccines{' '}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
