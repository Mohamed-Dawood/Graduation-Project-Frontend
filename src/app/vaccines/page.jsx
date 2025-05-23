'use client';
import './vaccine.css';
import '../articles/articles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import { FaHeart } from 'react-icons/fa';
import Spinner from '@/Components/Spinner/Spinner';
import Link from 'next/link';
import vaccineImage from '../../assets/images/vaccine/vaccine.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function Vaccine() {
  const [activeTab, setActiveTab] = useState(true);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedIds, setLikedIds] = useState([]);
  const router = useRouter();
  const handleClickHeart = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    setLoading(true);
    let token = localStorage.getItem('Token');
    if (token) {
      axios
        .get(`${host}/vaccine/getAll`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((response) => {
          const rows = response.data.data.rows || [];
          // console.log(rows);
          setData(rows);
          setFilterData(rows.filter((item) => item.is_mandatory === activeTab));
        })
        .catch((error) => {
          // console.log(error.message)
          showToast(`${error.message}`, 'error');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showToast(`You are not logged in.`, 'warning');
      router.push('/signin');
    }
  }, []);
  // Button Basic and addition
  useEffect(() => {
    setFilterData(data.filter((item) => item.is_mandatory === activeTab));
  }, [activeTab, data]);
  return (
    <div className="viccine">
      <div className="container">
        <div className="buttons">
          <button
            style={{
              backgroundColor: activeTab ? '#3640ce' : '#f6f6f6',
              color: activeTab ? '#fff' : '#3640ce',
            }}
            onClick={() => setActiveTab(true)}
          >
            Basic
          </button>
          <button
            style={{
              backgroundColor: !activeTab ? '#3640ce' : '#f6f6f6',
              color: !activeTab ? '#fff' : '#3640ce',
            }}
            onClick={() => setActiveTab(false)}
          >
            Additional
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="content">
            {filterData.length > 0 ? (
              filterData.map((item) => (
                <div key={item.vaccine_id} className="cardContent">
                  <div>
                    <Image
                      src={vaccineImage}
                      alt="Image"
                      width={'150'}
                      height={'80'}
                    />
                  </div>
                  <div className="card">
                    <div className="cardTitle">
                      <div>
                        <p>{item.vaccine_name}</p>
                      </div>
                      <div>
                        <FaHeart
                          onClick={() => handleClickHeart(item.vaccine_id)}
                          style={{
                            marginTop: "-10px",
                            color: likedIds.includes(item.vaccine_id)
                              ? '#3640ce'
                              : 'gray',
                            cursor: 'pointer',
                          }}
                        />
                      </div>
                    </div>
                    <div className="publishedDate" id="publishedDateVaccine">
                      <p>{`Doses_required : ${item.doses_required}`}</p>
                      <Link href={`/vaccines/${item.vaccine_id}`}>
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="notFound">No articles found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
