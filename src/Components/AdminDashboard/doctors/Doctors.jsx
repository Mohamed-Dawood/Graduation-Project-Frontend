'use client';
import { useEffect, useState } from 'react';
import './doctors.css';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
export default function DoctorsAdmin() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${host}/doctor/getAll`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.data.rows);
        setData(response.data.data.rows);
      })
      .catch((error) => {
        // console.log(error.message)
        showToast(`${error.message}`, 'error');
      });
  });
  return (
    <div className=" doctorsAdmin">
      <div className="container">
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>ff</div>
      </div>
    </div>
  );
}
