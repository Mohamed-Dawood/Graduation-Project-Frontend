import "./personalAccount.css";
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { host } from "@/Components/utils/Host";
export default function PersonalAccount() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  //Start get data By Id
  function getDataById() {
    axios
      .get(`${host}/user/userById/86`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        const user = response.data.data.rows[0];
        setFirstName(user.first_name || "");
        setLastName(user.last_name || "");
        setEmail(user.email || "");
        setPhone(user.phone_number || "");
        setPassword(user.password || "");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
        });
      });
  }
  //End Get Data With ID

  //Start Edit Function
  const handleEdit = (e) => {
    e.preventDefault();
    const params = {
      user_id: 86,
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
    };
    axios
      .put(
        `https://baby-tracker-baby-tracker.up.railway.app/api/v1/user/update`,
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log(response.data.data.rows[0]);
        getDataById();
        Swal.fire({
          title: "Your information has been updated successfully ✅",
          icon: "success",
          draggable: true,
        });
      });
  };
  useEffect(() => {
    getDataById();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="personalAccount">
          <h3>Personal account settings</h3>
          <form>
            <div>
              <label>First Name</label>
              <br />
              <span>
                <CiUser />
              </span>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <br />
              <span>
                <CiUser />
              </span>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <br />
              <span>
                <MdEmail />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Phone Number</label>
              <br />
              <span>
                <FaPhoneAlt />
              </span>
              <input
                type="text"
                value={phone_number}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <br />
              <span>
                <RiLockPasswordFill />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="buttons">
              <button id="active" type="submit" onClick={handleEdit}>
                Edit account
              </button>
              <button type="button">Delete account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
