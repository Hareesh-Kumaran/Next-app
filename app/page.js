"use client";
import "../styles/Home.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@/components/PromptCard";
import ImageList from "@mui/material/ImageList";
export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts,setFilteredPosts]=useState([]);

  const fetchPosts = async () => {
    const res = await axios.get(`http://localhost:3000/api/prompt`);
    console.log("@HK_fetchPost", res.data);
    if (res.data.ok) {
      setPosts(res.data.promptList);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(()=>{
    const mathching=posts.filter((post)=>post.creator.username.includes(searchValue)||post.tag.includes(searchValue))
    setFilteredPosts([...mathching])
  },[searchValue]);

  return (
    <>
      <section>
        <h1>
          Discover & Share
          <br />
          <span>creative prompts</span>
        </h1>
        <p className="description">
          This is a open-source prompting tool for modern world
          <br />
          where everyone can discover,create and share creative prompts.
        </p>
      </section>
      <div className="input-wrapper">
        <input
          placeholder="Search by tag or username"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="promptCard-wrapper">
        {(filteredPosts.length===0)? posts.map((item) => <Card post={item} />): filteredPosts.map((item) => <Card post={item} />)}
      </div>
    </>
  );
}
