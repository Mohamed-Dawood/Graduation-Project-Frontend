'use client';
import '../doctors/doctors.css';
import Link from 'next/link';
import AddInfoBtn from '../addInfoBtn/AddInfoBtn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import Image from 'next/image';
import vaccineImage from '../../../assets/images/vaccine/vaccine.png';
import { FaPen } from 'react-icons/fa';
import { showToast } from '@/Components/Toast/Toast';
export default function Vaccines() {
  const [data, setData] = useState([]);
  function getAllData() {
    axios
      .get(`${host}/vaccine/getAll`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response.data.data.rows);
        setData(response.data.data.rows);
      });
  }
  useEffect(() => {
    getAllData();
  }, []);
  const deleteCard = (id) => {
    axios
      .delete(`${host}/vaccine/vaccineById/${id}`, {
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
    <div className="vaccines">
      <div className="container">
        <Link href={'/'}>
          <AddInfoBtn text="New Vaccine" />
        </Link>
        {data.map((card) => {
          return (
            <div className="cardContent" key={card.vaccine_id}>
              <div className="cards">
                <div className="imageAndText">
                  <Image
                    src={vaccineImage}
                    alt="Image"
                    width={200}
                    height={200}
                  />
                  <div>
                    <div>{card.vaccine_name}</div>
                    <div className="nameAndIcone">
                      <div>{`Doses Required : ${card.doses_required}`} </div>
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
                          onClick={() => deleteCard(card.vaccine_id)}
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
