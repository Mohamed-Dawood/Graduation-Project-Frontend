'use client';
import { useEffect, useState } from 'react';
import './doctors.css';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import doctoAdmin from '../../../assets/images/doctorAdmin/doctor.jpg';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import { SiGmail } from 'react-icons/si';
import Link from 'next/link';
import AddInfoBtn from '../addInfoBtn/AddInfoBtn';
export default function DoctorsAdmin() {
  const [data, setData] = useState([]);
  //Start Verified Doctor
  const handleVerified = (verified, id) => {
    const newStatus = !verified;
    axios
      .put(
        `${host}/doctor/verify/${id}`,
        { verified: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(() => {
        showToast(
          `Doctor ${newStatus ? 'verified' : 'unverified'} successfully`,
          'success'
        );
        setData((prevData) =>
          prevData.map((doc) =>
            doc.user_id === id ? { ...doc, verified: newStatus } : doc
          )
        );
      })
      .catch((error) => {
        showToast(`Error: ${error.message}`, 'error');
      });
  };
  //End Verified Doctor
  //Start Deleted Doctor
  const handleDeletedDoctor = (id) => {
    axios
      .delete(`${host}/doctor/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        showToast(`You Deleted Doctor Successfuly`, 'success');
        getAllDoctors();
      })
      .catch((error) => {
        showToast(`${error.message}`, 'error');
      });
  };
  //End Deleted Doctor
  function getAllDoctors() {
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
  }
  useEffect(() => {
    getAllDoctors();
  }, []);
  return (
    <div className="doctorsAdmin">
      <div className="container">
        <Link href={'/adminDashboard/addDoctor'}>
        <AddInfoBtn text="Add New Doctor" />
        </Link>
        {data.map((card) => {
          return (
            <div className="cardContent" key={card.user_id}>
              <div className="cards">
                <div className="imageAndText">
                  {card.image_url == null ? (
                    <Image src={doctoAdmin} alt="Image" />
                  ) : (
                    <Image src={card.image_url} alt="Image" />
                  )}
                  <div>
                    <div className="nameAndIcone">
                      <div>{`${card.first_name} ${card.last_name}`} </div>
                      <div>
                        {card.verified ? (
                          <MdVerified
                            style={{ color: '#3640ce' }}
                            title="Doctor Verifiey"
                          />
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <p style={{ color: '#3640ce' }}>{card.specialization}</p>
                    <div className="buttons">
                      <div>
                        <Link href={`/adminDashboard/${card.user_id}`}>
                          <button
                            style={{
                              color: '#fff',
                              backgroundColor: '#3640ce',
                            }}
                          >
                            Update
                          </button>
                        </Link>
                        <button
                          style={{ color: '#fff', backgroundColor: '#ffc107' }}
                        >
                          Appointment
                        </button>
                      </div>
                      <div>
                        <button
                          style={{ color: '#fff', backgroundColor: '#28a745' }}
                          onClick={() =>
                            handleVerified(card.verified, card.user_id)
                          }
                        >
                          {card.verified ? 'Un Verifiey' : 'Verifiey'}
                        </button>
                        <button
                          style={{ color: '#fff', backgroundColor: '#dc3545' }}
                          onClick={() => handleDeletedDoctor(card.user_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gmail">
                  <Link href={`mailto:${card.email}`}>
                    <SiGmail />
                  </Link>
                </div>
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
