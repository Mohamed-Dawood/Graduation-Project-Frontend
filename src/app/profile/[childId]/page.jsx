'use client';
import './childDetails.css';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import childImage from '../../../assets/images/child/child.png';
import Image from 'next/image';
import Link from 'next/link';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import Spinner from '@/Components/Spinner/Spinner';
export default function ChildId() {
  const params = useParams();
  // console.log(params.childId);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${host}/child/childById/${params.childId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data.data.rows[0]);
      })
      .catch((error) => {
        // console.log(error.message)
        showToast(`${error.message}`, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="info">
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <Image src={childImage} alt="Image" />
          <div className="boxOne">
            <h6>{`Name : ${data.first_name} ${data.last_name}`}</h6>
            <h6>{`Gender ${data.gender}`}</h6>
          </div>
          <div className="boxTwo">
            <h6>{`Weight : ${data.weight}`}</h6>
            <h6>{`Height : ${data.height}`}</h6>
          </div>
          <div className="boxThree">
            <h6>{`Date_of_birth : ${data.date_of_birth}`}</h6>
          </div>
          <Link href={'/profile'}>Back</Link>
        </div>
      )}
    </div>
  );
}
