'use client';
import './vaccineDetails.css';
import '../../profile/[childId]/childDetails.css';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import Spinner from '@/Components/Spinner/Spinner';
import Image from 'next/image';
import vaccineImage from '../../../assets/images/vaccine/vaccine.png';
import Link from 'next/link';
export default function VaccineDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${host}/vaccine/vaccineById/${params.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.data.rows[0]);
        setData(response.data.data.rows[0]);
      })
      .catch((error) => {
        showToast(`${error.message}`, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="info">
          <div className="container">
            <Image src={vaccineImage} alt="Image" className="vaccineImage" />
            <div className="boxOne">
              <h4>{`Vaccine_Name : ${data.vaccine_name}`}</h4>
              <h4>{`Doses_Required : ${data.doses_required}`}</h4>
            </div>
            <div className="boxTwo">
              <h4>{`Min_Age : ${data.min_age}`}</h4>
              <h4>{`Max_Age : ${data.max_age}`}</h4>
            </div>
            <div className="boxThree">
              <p>{`Description : ${data.description}`}</p>
            </div>
            <Link href={'/vaccines'}>Back</Link>
          </div>
        </div>
      )}
    </>
  );
}
