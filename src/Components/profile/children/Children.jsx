import { useEffect, useState } from 'react';
import './children.css';
import axios from 'axios';
import childImage from '../../../assets/images/child/child.png';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { MdDelete } from 'react-icons/md';
import { host } from '@/Components/utils/Host';
import PageTitle from '@/Components/PageTitle/PageTitle';

export default function Children(props) {
  const [data, setData] = useState([]);

  function getChildren() {
    axios
      .get(`${host}/child/myChildren`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        const children = response?.data?.data?.rows;
        if (Array.isArray(children)) {
          setData(children);
          if (children.length === 0) {
            Swal.fire({
              icon: 'warning',
              title: 'No children found ⚠️',
              text: 'You have not added any children yet.',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Data Error',
            text: 'Unexpected data format.',
          });
        }
      })
      .catch((error) => {
        if (error.response?.status === 500) {
          setData([]);
          Swal.fire({
            icon: 'warning',
            title: 'No children found ⚠️',
            text: 'You have not added any children yet.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
          });
        }
      });
  }

  const handleDelete = (id) => {
    axios
      .delete(`${host}/child/childById/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        Swal.fire({
          title: `${response.data.message} ✅`,
          icon: 'success',
          draggable: true,
        });
        getChildren();
      });
  };

  useEffect(() => {
    getChildren();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="children">
          <PageTitle text="My children" />
          <div className="divContent">
            {data.map((item) => {
              return (
                <div
                  className="contentInformation"
                  key={item.child_id}
                  style={{ marginTop: '15px' }}
                >
                  <div className="content">
                    <Link href={`profile/${item.child_id}`}>
                      <div className="infoAndImage">
                        <div>
                          <Image src={childImage} alt="Child Image" />
                        </div>
                        <div className="info">
                          <h5>{`${item.first_name} ${item.last_name}`}</h5>
                          <p>{item.date_of_birth}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="icons">
                      <h6>
                        <Link href={`/profile/50/editForm/${item.child_id}`}>
                          {props.icon}
                        </Link>
                      </h6>
                      <h6>
                        <MdDelete
                          className="delete"
                          onClick={() => handleDelete(item.child_id)}
                        />
                      </h6>
                    </div>
                  </div>
                  <div className="buttons">
                    <Link href={`profile/${item.child_id}`} className="active">
                      Details
                    </Link>
                    <Link
                      href={`/profile/childDosesByChildId/${item.child_id}`}
                    >
                      View Doses
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
