"use client";
import "../../articles/articles.css";
import "./articleDetails.css";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { host } from "@/Components/utils/Host";
import Spinner from "@/Components/Spinner/Spinner";
import { FaLink } from "react-icons/fa6";
export default function ArticleDetail() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${host}/article/articleById/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data.data.rows[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setLoading(false);
      });
  }, [params.id]);

  if (loading || !data) {
    return (
      <div className="loading">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="detail">
      <div className="container">
        <div className="content contentDetails">
          <div className="cardContent">
            <div>
              {data.image?.trim() ? (
                <Image
                  src={data.image}
                  alt={data.title || "Article Image"}
                  width={150}
                  height={80}
                />
              ) : (
                <p>Not Found</p>
              )}
            </div>
            <div className="card">
              <div className="cardTitle">
                <p>
                  {data.title.length > 25 ? (
                    <>
                      {data.title.slice(0, 11)}
                      <br />
                      {data.title.slice(11)}
                    </>
                  ) : (
                    data.title
                  )}
                </p>
                <FaHeart />
              </div>
              <div className="publishedDate">
                <p>{data.status}</p>
              </div>
            </div>
          </div>
          <>
            {(() => {
              const content = data.content || "";
              if (content.includes("After Vaccination:")) {
                const [before, after] = content.split("After Vaccination:");
                let beforeCounter = 1;
                const beforeList = before.split("-").map((item) => {
                  const trimmedItem = item.trim();
                  if (trimmedItem) {
                    return (
                      <li key={beforeCounter}>
                        {beforeCounter++}. {trimmedItem}
                      </li>
                    );
                  }
                  return null;
                });

                let afterCounter = 1;
                const afterList = after.split("-").map((item) => {
                  const trimmedItem = item.trim();
                  if (trimmedItem) {
                    return (
                      <li key={afterCounter}>
                        {afterCounter++}. {trimmedItem}
                      </li>
                    );
                  }
                  return null;
                });

                return (
                  <div className="articleDetails">
                    <div>
                      <h4>Before Vaccination:</h4>
                      <ul>{beforeList}</ul>
                    </div>
                    <div>
                      <h4>After Vaccination:</h4>
                      <ul>{afterList}</ul>
                    </div>
                  </div>
                );
              } else {
                return <div className="content">Content : {content}</div>;
              }
            })()}
          </>
        </div>
        <div className="authorAndRef">
          <div>
            <h4>References</h4>
            {data.references.map((item, index) => {
              return (
                <div key={index}>
                  <Link href={`${item}`} className="ref">
                    <FaLink style={{marginTop: "10px"}} />
                    {item.split("/")[2]}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="author">
            <h4>Author</h4>
            {data.author.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
