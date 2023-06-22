"use client";
import axios from "axios";
import "@/styles/Create&Edit-Page.scss";
import { useState } from "react";
import Form from "@/components/Form";
import {useRouter}from "next/navigation";
import { useSession } from "next-auth/react";
export default function createPromptPage() {

  const router=useRouter();
  const [promptObj, setPromptObj] = useState({
    prompt: "",
    tag: "",
  });

  const{data:session}=useSession();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify({
          ...promptObj,
              creator:session?.user.id
        }),
      });
      
      const res=await response.json();

      if(res.ok)
        router.push('/')
    } catch (error) {}
  };

  return (
    <div className="pageWrapper">
      <section>
        <h1>create prompt</h1>
        <p>Create and share your prompt with the world.</p>
        <Form
          type="Create"
          promptObj={promptObj}
          setPromptObj={setPromptObj}
          handleSubmit={handleSubmit}
        />
      </section>
    </div>
  );
}
