'use client';
import { useState, useEffect } from 'react';
import './doses.css';
import PageTitle from '@/Components/PageTitle/PageTitle';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import Spinner from '@/Components/Spinner/Spinner';
import doseImage from '../../assets/images/dose/dose.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Doses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const fetchDoses = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem('Token');
      if (token) {
        const response = await axios.get(`${host}/dose/getAll`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setData(response.data.data.rows);
      } else {
        showToast('You are not logged in.', 'warning');
        router.push('/signin');
      }
    } catch (error) {
      showToast(`${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };
  // Search
  const handleSearch = () => {
    //search term is a state
    if (!searchTerm) {
      fetchDoses(); 
      return;
    }
    const filteredData = data.filter((dose) =>
      dose.dose_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredData.length === 0) {
      showToast('No doses found matching your search.', 'warning');
    }
    setData(filteredData);
  };

  useEffect(() => {
    fetchDoses();
  }, []);

  return (
    <div className="allDoses">
      <div className="container">
        <PageTitle text="Doses" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleSearch}
        />
        {loading ? (
          <Spinner />
        ) : (
          <div className="content">
            {data.length === 0 ? (
              <p>No doses available.</p>
            ) : (
              data.map((item) => (
                <div key={item.dose_id} className="card">
                  <Image src={doseImage} alt="Dose Image" />
                  <div className="info">
                    <p>Dose Name : {item.dose_name}</p>
                    <p>Recommended Age : {item.recommended_age} Months</p>
                    <p>Discription : This Is Discription</p>
                    <Link
                      href={`/profile/childDosesByChildId/vaccines/${item.dose_id}`}
                    >
                      Vaccines{' '}
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
