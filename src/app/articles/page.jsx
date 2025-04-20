"use client";
import { host } from "@/Components/utils/Host";
import "./articles.css";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import PageTitle from "@/Components/PageTitle/pageTitle";
import Spinner from "@/Components/Spinner/Spinner";
import InputSearch from "@/Components/InputSearch/InputSearch";

export default function Articles() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState(true);
  const [loading, setLoading] = useState(false);
  const [likedIds, setLikedIds] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${host}/article/getAll`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        const rows = response.data.data.rows;
        setData(rows);
        setFilteredData(rows.filter((item) => item.isFeatured === activeTab));
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.message}`,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => item.isFeatured === activeTab);
    setFilteredData(filtered);
  }, [activeTab, data]);
  const handleClickHeart = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  return (
    <div>
      <div className="container">
        <PageTitle text="Articles About Side Effects" />
        <div className="buttons">
          <button
            style={{
              backgroundColor: activeTab ? "#3640ce" : "#f6f6f6",
              color: activeTab ? "#fff" : "#3640ce",
            }}
            onClick={() => setActiveTab(true)}
          >
            Basic
          </button>
          <button
            style={{
              backgroundColor: !activeTab ? "#3640ce" : "#f6f6f6",
              color: !activeTab ? "#fff" : "#3640ce",
            }}
            onClick={() => setActiveTab(false)}
          >
            Additional
          </button>
        </div>
            <InputSearch />
        {loading ? (
          <Spinner />
        ) : (
          <div className="content">
            {filteredData.length > 0 ? (
              filteredData.map((item) => {
                return (
                  <div key={item._id} className="cardContent">
                    <div>
                      <Image
                        src={item.image}
                        alt="Image"
                        width={"150"}
                        height={"80"}
                      />
                    </div>
                    <div className="card">
                      <div className="cardTitle">
                        <p>{item.title}</p>
                        <FaHeart
                          onClick={() => handleClickHeart(item._id)}
                          style={{
                            color: likedIds.includes(item._id)
                              ? "#3640ce"
                              : "gray",
                            cursor: "pointer",
                            marginLeft: "auto",
                          }}
                        />
                      </div>
                      <div className="publishedDate">
                        <div>
                          <p>{item.status}</p>
                        </div>
                        <div>
                          <Link href={`articles/${item._id}`}>Read More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="notFound">Not Found Vaccinations</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// part two
// "use client";
// import "./articles.css";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { FaHeart } from "react-icons/fa";

// import { host } from "@/Components/utils/Host";
// export default function Articles() {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [activeTab, setActiveTab] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [likedIds, setLikedIds] = useState([]);
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${host}/article/getAll`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       })
//       .then((response) => {
//         const rows = response.data.data.rows;
//         setData(rows);
//         setFilteredData(rows.filter((item) => item.isFeatured === activeTab));
//       })
//       .catch((err) => {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: `${err.message}`,
//         });
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     const filtered = data.filter((item) => item.isFeatured === activeTab);
//     setFilteredData(filtered);
//   }, [activeTab, data]);
//   const handleClickHeart = (id) => {
//     setLikedIds((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };
//   return (
//     <div>
//       <h2 className="heading">Articles About Side Effects</h2>
//       <div className="buttons">
//         <button
//           style={{
//             backgroundColor: activeTab ? "#3640ce" : "#f6f6f6",
//             color: activeTab ? "#fff" : "#3640ce",
//           }}
//           onClick={() => setActiveTab(true)}
//         >
//           Basic
//         </button>
//         <button
//           style={{
//             backgroundColor: !activeTab ? "#3640ce" : "#f6f6f6",
//             color: !activeTab ? "#fff" : "#3640ce",
//           }}
//           onClick={() => setActiveTab(false)}
//         >
//           Additional
//         </button>
//       </div>
//       {loading ? (
//         <p className="loading">Loading...</p>
//       ) : (
//         <div className="content">
//           {filteredData.length > 0 ? (
//             filteredData.map((item) => {
//               return (
//                 <div key={item._id} className="cardContent">
//                   <div>
//                     <Image
//                       src={item.image}
//                       alt="Image"
//                       width={"150"}
//                       height={"80"}
//                     />
//                   </div>
//                   <div className="card">
//                     <div className="cardTitle">
//                       <p>
//                         {item.title.length > 25 ? (
//                           <>
//                             {item.title.slice(0, 11)}
//                             <br />
//                             {item.title.slice(11)}
//                           </>
//                         ) : (
//                           item.title
//                         )}
//                       </p>
//                       <FaHeart
//                         onClick={() => handleClickHeart(item._id)}
//                         style={{
//                           color: likedIds.includes(item._id)
//                             ? "#3640ce"
//                             : "gray",
//                           cursor: "pointer",
//                           marginLeft: "auto",
//                         }}
//                       />
//                     </div>
//                     <div className="publishedDate">
//                       <p>{item.status}</p>
//                       <Link href={`articles/${item._id}`}>Read More</Link>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="notFound">Not Found Vaccinations</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
