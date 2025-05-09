import { useEffect, useState } from 'react';
import './reservation.css';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import { FaPlusSquare } from 'react-icons/fa';
import React from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa';

export default function Reservation() {
  const [data, setData] = useState([]);
  const [openRow, setOpenRow] = useState(null);

  useEffect(() => {
    axios
      .get(`${host}/reservation/myReservations`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((response) => {
        const reservations = response.data.data.rows;
        if (Array.isArray(reservations)) {
          setData(reservations);
          if (reservations.length === 0) {
            showToast('No Reservations', 'warning');
          }
        } else {
          showToast('Unexpected response format', 'error');
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setData([]);
          showToast('No Reservations', 'warning');
        } else {
          showToast(`${error.message}`, 'error');
        }
      });
  }, []);

  const toggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  return (
    <div className="reservation">
      <div className="container">
        <h3>Reservations</h3>
        <div className="reservation-list">
          {data.map((item) => (
            <div key={item.reservation_id} className="reservation-item">
              <div className="reservation-header">
                <button
                  onClick={() => toggleRow(item.reservation_id)}
                  className="arrow-button"
                >
                  {openRow === item.reservation_id ? (
                    <FaMinus />
                  ) : (
                    <FaPlusSquare title="Show Notes" />
                  )}
                </button>
                <div className="reservation-info">
                  <p>
                    <strong>Doctor:</strong> {item.doctor_name}
                  </p>
                  <p>
                    <strong>Dose:</strong> {item.dose_name}
                  </p>
                  <p className="status">{item.status}</p>
                </div>
              </div>
              <div
                className={`note-container ${
                  openRow === item.reservation_id ? 'open' : ''
                }`}
              >
                <div className="contentCard">
                  <p>
                    <strong>Date:</strong> {item.reservation_date}
                  </p>
                  <p>
                    <strong>Time:</strong> {item.reservation_time}
                  </p>
                  <p>
                    <strong>Child:</strong> {item.child_name}
                  </p>
                  <p>
                    <strong>Parent:</strong> {item.user_name}
                  </p>
                  <p>
                    <strong>Note:</strong> {item.notes || 'No Note Available'}
                  </p>
                </div>
              </div>
              <div
                className={`note-container cancel ${
                  openRow === item.reservation_id ? 'open' : ''
                }`}
              >
                <button>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
