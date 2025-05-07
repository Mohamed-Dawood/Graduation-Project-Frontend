'use client';
import '../doctors/doctors.css';
import { showToast } from '@/Components/Toast/Toast';
import { host } from '@/Components/utils/Host';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddInfoBtn from '../addInfoBtn/AddInfoBtn';
import Image from 'next/image';
import { FaPen } from 'react-icons/fa';
export default function Medicines() {
  const [data, setData] = useState([]);
  function getAllData() {
    axios
      .get(`${host}/medicine/getAll`, {
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
        showToast(`${error.message}`, 'error');
      });
  }
  useEffect(() => {
    getAllData();
  }, []);
  const deleteCard = (id) => {
    axios
      .delete(`${host}/medicine/medicineById/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        showToast(`Deleted The Card Successfully`, 'success');
        getAllData();
      })
      .catch((error) => {
        showToast(`${error.message}`, 'error');
      });
  };
  return (
    <div className="medicineDashboard">
      <div className="container">
        <Link href={'/'}>
          <AddInfoBtn text="New Medicine" />
        </Link>
        {data.map((card) => {
          return (
            <div className="cardContent" key={card._id}>
              <div className="cards">
                <div className="imageAndText">
                  <Image
                    src={card.image}
                    alt="Image"
                    width={200}
                    height={200}
                  />
                  <div>
                    <div>{card.name}</div>
                    <div className="nameAndIcone">
                      <div>{`${card.manufacturer}`} </div>
                    </div>
                    {/* <p style={{ color: '#3640ce' }}>{card.specialization}</p> */}
                    <div className="buttons">
                      <div>
                        <Link href={`/`}>
                          <button
                            style={{
                              color: '#fff',
                              backgroundColor: '#3640ce',
                            }}
                          >
                            Update
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          style={{ color: '#fff', backgroundColor: '#dc3545' }}
                          onClick={() => deleteCard(card._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gmail">
                  <FaPen style={{ color: '#3640ce' }} />
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
