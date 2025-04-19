"use client";
import "./profile.css";
import "../../Components/profile/sidebar/sidebar.css";
import { IoIosSettings } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { CiBellOn } from "react-icons/ci";
import { MdPersonAddAlt1 } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import PersonalAccount from "@/Components/profile/personalAccount/PersonalAccount";
import Children from "@/Components/profile/children/Children";
import AddChild from "@/Components/profile/addChild/AddChild";
export default function Profile() {
  const [data, setData] = useState("personalAccount");
  return (
    <div>
      <div className="container">
        <div className="profile">
          <div className="sidebar">
            <ul>
              <li onClick={() => setData("personalAccount")}>
                <div className="iconAndText">
                  <IoIosSettings />
                  <span>Personal account settings</span>
                </div>
                <div>
                  <FaAngleRight className="arrow" />
                </div>
              </li>
              <li>
                <div className="iconAndText">
                  <CiBellOn />
                  <span>Notifications</span>
                </div>
                <div>
                  <FaAngleRight className="arrow" />
                </div>
              </li>
              <li onClick={() => setData("addChild")}>
                <div className="iconAndText">
                  <MdPersonAddAlt1 />
                  <span>Add a child</span>
                </div>
                <div>
                  <FaAngleRight className="arrow" />
                </div>
              </li>
              <li onClick={() => setData("children")}>
                <div className="iconAndText">
                  <MdPersonAddAlt1 />
                  <span>My children</span>
                </div>
                <div>
                  <FaAngleRight className="arrow" />
                </div>
              </li>
              <li className="logOut">
                <div className="iconAndText">
                  <CiLogin />
                  <span>Log out</span>
                </div>
                <div>
                  <FaAngleRight className="arrow" />
                </div>
              </li>
            </ul>
          </div>
          {data == "personalAccount" && <PersonalAccount />}
          {data == "children" && <Children icon={<FaRegEdit />} />}
          {data == "addChild" && <AddChild />}
        </div>
      </div>
    </div>
  );
}
