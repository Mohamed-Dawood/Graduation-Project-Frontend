"use client";
import "./inputSearch.css";
import { useState } from "react";

export default function InputSearch({ onSearch, onReset }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    onSearch({
      title,
      author,
      tags,
      category,
    });
  };

  const handleReset = () => {
    setTitle("");
    setAuthor("");
    setTags("");
    setCategory("");
    onReset(); 
  };

  return (
    <div className="inputSearch">
      <div className="container">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (e.g: cardio,medical)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleSearch}>Search</button>
          <button
            onClick={handleReset}
            style={{ backgroundColor: "#f44336", color: "#fff" }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
