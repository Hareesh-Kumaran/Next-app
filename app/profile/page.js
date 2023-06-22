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
    const response = await fetch(
      `/api/prompt/${id}`,
      {
       method:'DELETE', 
      }
    );
    const res=await response.json();

    if (res.ok) {
      alert("deleted");
      
      const filteredPosts=Posts.filter((Post)=>Post._id!==id);
      setPosts([...filteredPosts]);
    
    }
  }

  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const fetchPosts = async () => {
    const response = await fetch(
      `api/prompt/user/${session?.user.id}`,{
        method:'GET',
      }
    );
    // console.log("fetchProfilePost", res.data);
    const res=await response.json();
    if (res.ok) {
      setPosts(res.promptList);
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
