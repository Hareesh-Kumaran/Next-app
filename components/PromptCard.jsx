import "@/styles/card.scss";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
export default function Card({
  post,
  profileSection,
  handleEdit,
  handleDelete,
}) {
  const [copiedPrompt, setCopiedPrompt] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  function handleCopy(prompt) {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);

    setTimeout(() => {
      setCopiedPrompt("");
    }, 5000);
  }
  return (
    <div className="card-wrapper">
      <div className="card-header">
        <div className="user-details-wrapper">
          <Link href={(session.user.id===post.creator._id)?"/profile":`/profile/${post.creator._id}`}>
            <Image
              src={post.creator.image}
              width={40}
              height={40}
              alt="dp"
              className="profile-pic"
            />
          </Link>
          <div className="username-wrapper">
            <p className="profile-name">{post.creator.username}</p>
            <p className="profile-email">{post.creator.email}</p>
          </div>
        </div>
        <Image
          src={
            copiedPrompt === post.prompt
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"
          }
          width={20}
          height={20}
          alt="copy"
          onClick={() => handleCopy(post.prompt)}
        />
      </div>
      <div className="card-body">{post.prompt}</div>
      <div className="card-footer">
        <p>{post.tag}</p>
      </div>
      {profileSection &&
        pathname === "/profile" &&
        session?.user.id === post.creator._id && (
          <div className="card-controller-wrapper">
            <Image
              src="/assets/icons/edit.svg"
              width={15}
              height={15}
              alt="logo"
              className="control-logo"
              onClick={() => handleEdit(post)}
            />

            <Image
              src="/assets/icons/delete.svg"
              width={15}
              height={15}
              alt="logo"
              className="control-logo"
              onClick={() => handleDelete(post._id)}
            />
          </div>
        )}
    </div>
  );
}
