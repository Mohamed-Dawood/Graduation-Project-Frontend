'use client';
import { useEffect, useState } from 'react';
import './reserve.css';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import Spinner from '@/Components/Spinner/Spinner';
const Reserve = () => {
  const params = useParams();
  const [dataOfDoctors, setDataOfDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doctorId, setDoctorId] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [time, setTime] = useState('');
  const [tableDoctor, setTableDoctor] = useState([]);
  const [appointments, setAppointments] = useState([]);
  function getDoctorAppointments(doctorId) {
    axios
      .get(`${host}/doctor/Appointments/${doctorId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        const doctorAppointments = response.data.data.rows;
        setTableDoctor(doctorAppointments);
        setAppointments([]);
        setSelectedDay('');
      })
      .catch((error) => {
        showToast(`${error.message}`, 'error');
      });
  }
  const handleDoctorChange = (e) => {
    const doctorId = e.target.selectedOptions[0].getAttribute('data-id');
    setDoctorId(doctorId);
    getDoctorAppointments(doctorId);
  };
  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    setSelectedDay(selectedDay);
    const filteredAppointments = tableDoctor.filter(
      (item) => item.available_day === selectedDay
    );
    setAppointments(filteredAppointments);
  };
  function getAllDoctors() {
    axios
      .get(`${host}/doctor/getAll`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        setDataOfDoctors(response.data.data.rows);
      })
      .catch((error) => {
        showToast(`${error.message}`, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const postDataReverse = (e) => {
    if (time === '' || doctorId === '' || selectedDay === '') {
      showToast(`Please Complete The Data`, 'warning');
    }
    e.preventDefault();
    const paramsData = {
      doctor_id: doctorId,
      child_id: params.childId,
      child_dose_id: params.doseId,
      reservation_date: selectedDay,
    };
    axios
      .post(`${host}/reservation/create`, paramsData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        showToast('Action completed successfully!', 'success');
      })
      .catch((error) => {
        showToast(`${error.message}`, 'error');
      });
  };
  useEffect(() => {
    setLoading(true);
    getAllDoctors();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="reserve">
          <div className="container">
            <form>
              <select defaultValue="" onChange={handleDoctorChange}>
                <option value="" disabled hidden>
                  Choose Doctor
                </option>
                {dataOfDoctors.map((item) => (
                  <option
                    value={`${item.first_name} ${item.last_name}`}
                    key={item.user_id}
                    data-id={item.user_id}
                  >
                    {item.first_name} {item.last_name}
                  </option>
                ))}
              </select>
              {doctorId && tableDoctor.length > 0 && (
                <select value={selectedDay} onChange={handleDayChange}>
                  <option value="" disabled hidden>
                    Choose Day
                  </option>
                  {[
                    ...new Set(tableDoctor.map((item) => item.available_day)),
                  ].map((day, index) => (
                    <option value={day} key={index}>
                      {day}
                    </option>
                  ))}
                </select>
              )}
              {appointments.length > 0 && (
                <>
                  <h3 className="headingTable">
                    Available Time for {selectedDay}
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Start Time</th>
                        <th>End Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((item, index) => (
                        <tr key={index}>
                          <td>{item.start_time}</td>
                          <td>{item.end_time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
              <input type="date" onChange={(e) => setSelectedDay(e.target.value)} />
              <input type="time" onChange={(e) => setTime(e.target.value)} />
              <button className="submit" onClick={postDataReverse}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Reserve;
