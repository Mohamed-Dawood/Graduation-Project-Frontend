'use client';
import PageTitle from '@/Components/PageTitle/PageTitle';
import './appointment.css';
import { host } from '@/Components/utils/Host';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function ApponitmentDoctor() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  // console.log(params.id);
  useEffect(() => {
    axios
      .get(`${host}/doctor/Appointments/${params.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.data.rows);
        setData(response.data.data.rows);
      });
  }, []);
  // start Update
  const handleUpdate = (e, id) => {
    e.preventDefault();
    
  }
  // End Update
  return (
    <div className="appointment">
      <div className="container">
        <PageTitle text="Appointment Doctor" />
        <table border={1}>
          <thead>
            <tr>
              <th>Available Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          {data.map((item, index) => {
            return (
              <tbody key={item.availability_id}>
                <tr>
                  <td>
                    <input
                      value={item.available_day}
                      onChange={(e) => {
                        const newData = [...data];
                        newData[index].available_day = e.target.value;
                        setData(newData);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      value={item.start_time}
                      onChange={(e) => {
                        const newData = [...data];
                        newData[index].start_time = e.target.value;
                        setData(newData);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      value={item.end_time}
                      onChange={(e) => {
                        const newData = [...data];
                        newData[index].end_time = e.target.value;
                        setData(newData);
                      }}
                    />
                  </td>
                  <td>
                    <div className="buttons">
                      <button style={{ backgroundColor: '#3640ce' }} onClick={handleUpdate}>
                        Update
                      </button>
                      <button style={{ backgroundColor: '#dc3545' }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
