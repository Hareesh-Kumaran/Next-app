"use client";
import "../styles/Home.scss";
import { useState, useEffect } from "react";
import Card from "@/components/PromptCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch(`/api/prompt`, {
      method: "GET",
    });

    const res = await response.json();
    setPosts([...res.promptList]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const mathching = posts.filter(
      (post) =>
        post.creator.username.includes(searchValue) ||
        post.tag.includes(searchValue)
    );
    setFilteredPosts([...mathching]);
  }, [searchValue]);

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
   

      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry columnsCount={3} className="promptCard-wrapper">
          {filteredPosts.length === 0
            ? posts.map((item) => <Card post={item} />)
            : filteredPosts.map((item) => <Card post={item} />)}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
