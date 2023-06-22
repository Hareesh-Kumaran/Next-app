"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter} from "next/navigation";
import axios from "axios";

import Profile from "@/components/Profile";
export default function ProfilePage() {
  const [Posts, setPosts] = useState([]);
  const { data: session } = useSession();
  
  const router = useRouter();
  async function handleDelete(id) {
    const res = await axios.delete(
      `http://localhost:3000/api/prompt/${id}`
    );
    if (res.data.ok) {
      alert("deleted");
      
      const filteredPosts=Posts.filter((Post)=>Post._id!==id);
      setPosts([...filteredPosts]);
    
    }
  }

  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const fetchPosts = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/prompt/user/${session?.user.id}`
    );
    console.log("fetchProfilePost", res.data);
    if (res.data.ok) {
      setPosts(res.data.promptList);
    }
  };

  useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);


  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Explore your exceptional prompts and be inspired by the power of their imagination"
      data={Posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
