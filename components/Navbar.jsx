"use client";
import "@/styles/Navbar.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Navbar() {
  // const [isLogged, setLogged] = useState(false);
  const {data:session}=useSession();
  const [showNav, setShowNav] = useState(false);
  const [providers,setProviders]=useState(null);
 
  const fetchProviders=async()=>{
    const response=await getProviders();
    console.log('fp',response);
    setProviders(response);
  }
  useEffect(()=>{
    fetchProviders();

  },[]);
  return (
    <nav>
      {/* {alert(JSON.stringify(session))} */}
      <div className="left-wrapper">
        <Link href="/" className="home-link">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={25}
            height={25}
          />
          Prompto
        </Link>
      </div>

      <div className="right-wrapper">
        {session?.user ? (
          <>
            <Link className="link" href="/create-prompt">
              Create Post
            </Link>
            <button>Sign-out</button>
            <Link className="link" href="/profile">
              <Image
                src={session?.user.image}
                alt="profile_pic"
                width={35}
                height={35}
                className="profile-img "
              />
            </Link>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
      <button
        className="responsive-nav-control-btn"
        onClick={() => setShowNav(!showNav)}
      >
        <Image
          src={!showNav ? "/assets/icons/menu.svg" : "/assets/icons/x.svg"}
          alt="menu"
          width={15}
          height={15}
        />
      </button>
      <div
        className="responsive-nav-option"
        style={showNav ? { display: "flex" } : { display: "none" }}
      >
        {session?.user ? (
          <>
            <Link className="link" href="/create-prompt">
              Create Post
            </Link>
            <button onClick={(e)=>{e.preventDefault();signOut()}}>Sign-out</button>
            <Link className="link" href="/profile">
              <Image
                src={session?.user.image}
                alt="profile_pic"
                width={30}
                height={30}
                className="profile-img "
              />
            </Link>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}
