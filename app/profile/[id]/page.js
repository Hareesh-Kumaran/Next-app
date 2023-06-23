"use client";
import { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import axios from "axios";
export default function OtherProfile({ params }) {
  const [Posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const response = await fetch(
      `/api/prompt/user/${params.id}`,
      {
        method: "GET",
      }
    );
    const res = await response.json();

    if (res.ok) {
      setPosts(res.promptList);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Profile
      desc="Explore their exceptional prompts and be inspired by the power of their imagination"
      data={Posts}
    />
  );
}
