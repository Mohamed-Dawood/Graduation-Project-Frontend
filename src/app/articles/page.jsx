'use client';
import './articles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import PageTitle from '@/Components/PageTitle/PageTitle';
import Spinner from '@/Components/Spinner/Spinner';
import InputSearch from '@/Components/InputSearch/InputSearch';
import { host } from '@/Components/utils/Host';
import { useRouter } from 'next/navigation';

export default function Articles() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState(true);
  const [loading, setLoading] = useState(false);
  const [likedIds, setLikedIds] = useState([]);
  const [searchValues, setSearchValues] = useState({
    title: '',
    author: '',
    tags: '',
    category: '',
  });

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    handleSearch(searchValues);
  }, [activeTab]);

  const getArticles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${host}/article/getAll`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const rows = res.data.data.rows || [];
      setData(rows);
      setFilteredData(rows.filter((item) => item.isFeatured === activeTab));
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters) => {
    setSearchValues(filters);
    setLoading(true);

    const params = new URLSearchParams();
    if (filters.title) params.append('title', filters.title);
    if (filters.author) params.append('author', filters.author);
    if (filters.tags) params.append('tags', filters.tags);
    if (filters.category) params.append('category', filters.category);

    const apiParams = new URLSearchParams(params);
    apiParams.append('isFeatured', activeTab);

    const visibleParams = new URLSearchParams(params);
    router.push(`/articles?${visibleParams.toString()}`);

    try {
      const res = await axios.get(
        `${host}/article/search?${apiParams.toString()}`,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const rows = res.data.data.rows || [];

      const looseMatch = (text = '', input = '') => {
        if (!input) return true;
        text = text.toLowerCase();
        input = input.toLowerCase();
        return [...input].every((char) => text.includes(char));
      };

      const filtered = rows.filter(
        (item) =>
          looseMatch(item.title, filters.title) &&
          looseMatch(item.author, filters.author) &&
          looseMatch(item.tags?.join(',') || '', filters.tags) &&
          looseMatch(item.category, filters.category)
      );

      setData(filtered);
      setFilteredData(filtered);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchValues({
      title: '',
      author: '',
      tags: '',
      category: '',
    });
    router.push('/articles');
    getArticles();
  };

  const handleClickHeart = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="articles">
      <div className="container">
        <PageTitle text="Articles About Side Effects" />
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
        <div className="search">
          <InputSearch onSearch={handleSearch} onReset={handleReset} />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="content">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div key={item._id} className="cardContent">
                  <div>
                    <Image
                      src={item.image}
                      alt="Image"
                      width={'150'}
                      height={'80'}
                    />
                  </div>
                  <div className="card">
                    <div className="cardTitle">
                      <p>{item.title}</p>
                      <FaHeart
                        onClick={() => handleClickHeart(item._id)}
                        style={{
                          color: likedIds.includes(item._id)
                            ? '#3640ce'
                            : 'gray',
                          cursor: 'pointer',
                          marginLeft: 'auto',
                        }}
                      />
                    </div>
                    <div className="publishedDate">
                      <p>{item.status}</p>
                      <Link href={`articles/${item._id}`}>Read More</Link>
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
