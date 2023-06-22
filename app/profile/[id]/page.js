"use client";
import { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import axios from "axios";
export default function OtherProfile({ params }) {
     const [Posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/prompt/user/${params.id}`
    );
    console.log("fetchProfilePost", res.data);
    if (res.data.ok) {
      setPosts(res.data.promptList);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Profile
      name={Posts[0]?.creator.username}
      desc="Explore your exceptional prompts and be inspired by the power of their imagination"
      data={Posts}
    />
  );
}
