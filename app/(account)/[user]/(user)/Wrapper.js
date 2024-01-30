"use client";
import { Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/context/AuthContext";
import Profile from "./profile";
import Error from "../error";
import Loading from "@/components/root/loader";
import { auth} from "@/lib/firebase/config"

export default function Wrapper({ userDetails }) {
  let login = useContext(AuthContext);
  const { user, loading, error } = login;
  console.log(userDetails);
  //   useEffect(() => {
  //     setNotFound(false);
  //     // if (!login)
  //     if (userDetails.success && Object.entries(userDetails.data).length === 2 && login?.uid !== userDetails.uid) {
  //       console.log("Something");
  //       setNotFound(true);
  //     } else if (!userDetails.success) {
  //       setNotFound(true);
  //     }
  //   }, [login]);

  //   if (notFound) {
  //     return <Error />;
  //   }

  //   console.log(login);
  //   console.log(login.data.uid);
  //   console.log(Object.entries(userDetails.data).length === 2)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen -mt-10 w-full">
        <Loading></Loading>
      </div>
    );
  }

//   if (!loading && Object.entries(userDetails.data).length === 2 && (userDetails.data.uid !== auth)){

//   }
  return (
    <>
      {!loading && (
        <>
          {userDetails.success && Object.entries(userDetails?.data).length === 2 && (userDetails.data.uid !== auth?.currentUser?.uid) ? (
            <AccountNotFound />
          ) : (
            <Profile userDetails={userDetails} user={user} />
          )}
        </>
      )}
    </>
  );
}

function AccountNotFound() {
  return <div className="flex h-screen w-full text-3xl">This account does not exist.</div>;
}
