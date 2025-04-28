'use client';
import './childDoses.css';
import Spinner from '@/Components/Spinner/Spinner';
import { showToast } from '@/Components/Toast/Toast';
import { host } from '@/Components/utils/Host';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TiInputChecked } from 'react-icons/ti';
import { ImCheckboxUnchecked } from 'react-icons/im';
export default function ChildDosesByChildId() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${host}/dose/childDoses/${params.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data.data.rows);
      })
      .catch((error) => {
        // console.log(error.message)
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
        <>
          <div className="content">
            <div className="container">
              {data.map((item) => {
                return (
                  <div className="card" key={item.child_dose_id}>
                    <div className="nameAndIcon">
                      <h4>{item.dose_name}</h4>
                      {item.status === 'Completed' ? (
                        <TiInputChecked style={{ fontSize: '40px' }} />
                      ) : (
                        <ImCheckboxUnchecked />
                      )}
                    </div>
                    <p>Date : {item.scheduled_date}</p>
                    <p>Status : {item.status}</p>
                    <p>Child : {item.child_first_name}</p>
                    <p>Doctor : {item.doctor_first_name}</p>
                    <p>Administered Date : {item.administered_date}</p>
                    <div className="buttons">
                      <Link
                        href={`/profile/childDosesByChildId/vaccines/${item.dose_id}`}
                      >
                        Vaccines
                      </Link>
                      <Link
                        href={`/profile/childDosesByChildId/reserve/reserve/${item.child_dose_id}/${item.child_id}`}
                      >
                        Reserve
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="backtoprofile">
            <Link href={'/profile'}>Back</Link>
          </div>
        </>
      )}
    </>
  );
}
