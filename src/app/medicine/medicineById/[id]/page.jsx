'use client';
import './medicineDetails.css';
import { host } from '@/Components/utils/Host';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { showToast } from '@/Components/Toast/Toast';
import Image from 'next/image';
export default function MedicalDetails() {
  const params = useParams();
  const [data, setData] = useState([]);
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
        // console.log(error.message)
        showToast(`${error.message}`, 'error');
      });
  }, []);
  return (
    <div className="medicineDetails">
      <div className="container">
        <div>
          {data.image ? (
            <Image src={data.image} alt="Image" width={300} height={300} />
          ) : null}
          <div className="nameAndPrice">
            <p>Name : {data.category}</p>
            <p>Price : {data.price} $</p>
          </div>
          <p>Manufacturer : {data.manufacturer}</p>
          <p>Category : {data.category}</p>
            {/* <p>{data.sideEffects[0]}</p> */}
        </div>
      </div>
    </div>
  );
}
