'use client';
import { useEffect, useState } from 'react';
import '../articles/articles.css';
import './medicine.css';
import PageTitle from '@/Components/PageTitle/PageTitle';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import Spinner from '@/Components/Spinner/Spinner';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Medicine() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchSideEffect, setSearchSideEffect] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likedIds, setLikedIds] = useState([]);
  const router = useRouter();

  const handleClickHeart = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${host}/medicine/getAll`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      const rows = response?.data?.data?.rows || [];
      setData(rows);
    } catch (error) {
      showToast(`${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const searchData = async () => {
    if (!searchName && !searchCategory && !searchSideEffect) {
      showToast('Please enter something to search.', 'warning');
      return; 
    }

    try {
      setSearching(true);

      const response = await axios.get(`${host}/medicine/search`, {
        params: {
          name: searchName || undefined,
          category: searchCategory || undefined,
          sideEffects: searchSideEffect || undefined,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const rows = response?.data?.data?.rows || [];

      setData(rows);

      if (rows.length === 0) {
        showToast('No medicines found matching your search.', 'warning');
      }
    } catch (error) {
      showToast(`${error.message}`, 'error');
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      setIsLoggedIn(true);
      fetchAllData();
    } else {
      showToast('You are not logged in.', 'warning');
      router.push('/signin');
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const delayDebounce = setTimeout(() => {
      if (!searchName && !searchCategory && !searchSideEffect) {
        fetchAllData();
      } else {
        searchData();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchName, searchCategory, searchSideEffect, isLoggedIn]);

  return (
    <div className="medicine">
      <div className="container">
        <PageTitle text="Medicine" />
        {isLoggedIn && (
          <div className="search">
            <input
              type="search"
              placeholder="Search By Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              type="search"
              placeholder="Search By Category"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            />
            <input
              type="search"
              placeholder="Search By Side Effect"
              value={searchSideEffect}
              onChange={(e) => setSearchSideEffect(e.target.value)}
            />
          </div>
        )}
        {loading ? (
          <Spinner />
        ) : isLoggedIn ? (
          <div className="content">
            {searching ? (
              <p className="searching">Searching...</p>
            ) : data.length > 0 ? (
              data.map((item) => (
                <div key={item._id} className="cardContent">
                  <div>
                    <Image
                      src={item.image || '/default-medicine.png'}
                      alt="Medicine Image"
                      width={150}
                      height={80}
                      className="medicineImage"
                    />
                  </div>
                  <div className="card">
                    <div className="cardTitle">
                      <p>{item.name}</p>
                      <FaHeart
                        onClick={() => handleClickHeart(item._id)}
                        style={{
                          marginTop: '-10px',
                          color: likedIds.includes(item._id)
                            ? '#3640ce'
                            : 'gray',
                          cursor: 'pointer',
                        }}
                      />
                    </div>
                    <div className="publishedDate">
                      <p>Category : {item.category}</p>
                      <Link href={`/medicine/medicineById/${item._id}`}>
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="notFound">No medicines found.</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
