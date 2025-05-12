import '../../../app/profile/[childId]/editForm/[id]/editForm.css';
import './addChild.css';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { host } from '@/Components/utils/Host';
import { showToast } from '@/Components/Toast/Toast';
import PageTitle from '@/Components/PageTitle/PageTitle';
export default function AddChild() {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [gender, setGender] = useState('');
  const [date_of_birth, setDate_of_birth] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleAddChild = (e) => {
    e.preventDefault();

    if (
      !first_name ||
      !last_name ||
      !gender ||
      !date_of_birth ||
      !weight ||
      !height
    ) {
      showToast('Please complete child data', 'warning');
      return;
    }

    const params = {
      user_id: 2,
      first_name: first_name,
      last_name: last_name,
      gender:
        gender.charAt(0).toUpperCase() + gender.slice(1).toLocaleLowerCase(),
      date_of_birth: date_of_birth,
      weight: weight,
      height: height,
    };

    console.log(params);
    axios
      .post(`${host}/child/create`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        Swal.fire({
          title: 'Child added successfully ✅.',
          icon: 'success',
          draggable: true,
        });
        setFirst_name('');
        setLast_name('');
        setGender('');
        setDate_of_birth('');
        setWeight('');
        setHeight('');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response?.data?.msg || 'Something went wrong'}`,
        });
      });
  };

  return (
    <div>
      <div className="container">
        <div className="form">
          <div>
            <div>
              <PageTitle text="Add Child" />
            </div>
            <form>
              <div className="content addChildContent">
                <div>
                  <label>First Name</label>
                  <br />
                  <input
                    value={first_name}
                    type="text"
                    pattern="[A-Za-z]"
                    placeholder="First Name"
                    onChange={(e) => setFirst_name(e.target.value)}
                    required
                    onKeyPress={(e) => {
                      if (!/[a-zA-Z]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div>
                  <label>Last Name</label>
                  <br />
                  <input
                    value={last_name}
                    type="text"
                    pattern="[A-Za-z]"
                    placeholder="Last Name"
                    onChange={(e) => setLast_name(e.target.value)}
                    required
                    onKeyPress={(e) => {
                      if (!/[a-zA-Z]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
              </div>
              <div className="content addChildContent">
                <div>
                  <label>Gender</label>
                  <br />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label>Date</label>
                  <br />
                  <input
                    value={date_of_birth}
                    type="date"
                    placeholder="Date, EX: 2025-04-19"
                    onChange={(e) => setDate_of_birth(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="content addChildContent">
                <div>
                  <label>Weight</label>
                  <br />
                  <input
                    value={weight}
                    type="number"
                    placeholder="Weight"
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Height</label>
                  <br />
                  <input
                    value={height}
                    type="number"
                    placeholder="Height"
                    onChange={(e) => setHeight(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="buttons">
                <input
                  type="submit"
                  value={'Add'}
                  onClick={handleAddChild}
                  className="add"
                  id="addBtn"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
