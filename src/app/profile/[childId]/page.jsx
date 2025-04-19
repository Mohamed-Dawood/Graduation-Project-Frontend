"use client";
import "./childDetails.css";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import childImage from "../../../assets/images/child/child.png";
import Image from "next/image";
import Link from "next/link";
import { host } from "@/Components/utils/Host";
export default function ChildId() {
  const params = useParams();
  // console.log(params.childId);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        
        `${host}/child/childById/${params.childId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        setData(response.data.data.rows[0]);
      });
  }, []);
  return (
    <div className="childInfo">
      <Image src={childImage} alt="Child Image" />
      <div className="nameAndGender">
        <h6>{`Name : ${data.first_name} ${data.last_name}`}</h6>
        <h6>{`Gender ${data.gender}`}</h6>
      </div>
      <div className="weightAndHeight">
        <h6>{`Weight : ${data.weight}`}</h6>
        <h6>{`Height : ${data.height}`}</h6>
      </div>
      <div className="date">
        <h6>{`Date_of_birth : ${data.date_of_birth}`}</h6>
      </div>
      <Link href={"/profile"}>Back</Link>
    </div>
  );
}
