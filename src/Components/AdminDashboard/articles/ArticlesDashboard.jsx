import Link from 'next/link';
import '../doctors/doctors.css';
import AddInfoBtn from '../addInfoBtn/AddInfoBtn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import articleImage from '../../../assets/images/articles/articles.avif';
import { FaPen } from 'react-icons/fa';
import Image from 'next/image';
import PageTitle from '@/Components/PageTitle/PageTitle';
export default function ArticlesDashboard() {
  const [data, setData] = useState([]);
  //Start Get Data
  function getData() {
    axios
      .get(`${host}/article/getAll`, {
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
  //End Get Data
  useEffect(() => {
    getData();
  }, []);
  //Start Delete Card
  const deleteCard = (id) => {
    axios
      .delete(`${host}/article/articleById/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response);
        showToast(`Deleted The Card Successfully`, 'success');
        getData();
      })
      .catch((error) => {
        showToast(`${error.message}`, 'error');
      });
  };
  //End Delete Card
  return (
    <div className="articlesDashboard">
      <div className="container">
        <Link href="/">
          <AddInfoBtn text="New Article" />
        </Link>
        {data.map((card) => {
          return (
            <div className="cardContent" key={card._id}>
              <div className="cards">
                <div className="imageAndText">
                  {card.image == null ? (
                    <Image src={articleImage} alt="Image" />
                  ) : (
                    <Image
                      src={card.image}
                      alt="Image"
                      width={200}
                      height={200}
                    />
                  )}
                  <div>
                    <div>{card.title}</div>
                    <div className="nameAndIcone">
                      <div>{`${card.status}`} </div>
                    </div>
                    <p style={{ color: '#3640ce' }}>{card.specialization}</p>
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
