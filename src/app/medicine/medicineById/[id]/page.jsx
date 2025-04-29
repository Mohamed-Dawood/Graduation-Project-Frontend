'use client';
import './medicineDetails.css';
import { host } from '@/Components/utils/Host';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { showToast } from '@/Components/Toast/Toast';
import Image from 'next/image';
import Link from 'next/link';

export default function MedicalDetails() {
  const params = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`${host}/medicine/medicineById/${params.id}`, {
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
      });
  }, []);

  return (
    <div className="medicineDetails">
      <div className="container">
        <div>
          {data.image && (
            <Image src={data.image} alt="Image" width={300} height={300} />
          )}
          <div className="nameAndPrice">
            <p>Name : {data.name}</p>
            <p>Price : {data.price} $</p>
          </div>
          <p>Manufacturer : {data.manufacturer}</p>
          <p>Category : {data.category}</p>
          <hr />
          <p className='contentDetails'>Side Effect :</p>
          {Array.isArray(data.sideEffects) &&
            data.sideEffects.map((item, index) => <p className='contentDetails' key={index}>-{item}</p>)}
          <hr />
          <p className='contentDetails'>Created At : {data.createdAt}</p>
          <p className='contentDetails'>Updated At : {data.updatedAt}</p>
          <hr />
          <p className='contentDetails'>Dosage : {data.dosage}</p>
          <hr />
          <p className='contentDetails'>Description : {data.description}</p>
          <Link href={"/medicine"}>Back</Link>
        </div>
      </div>
    </div>
  );
}
