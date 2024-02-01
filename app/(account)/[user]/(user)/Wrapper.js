"use client";
import { Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/lib/context/AuthContext";
import Profile from "./profile";
import Error from "../error";
import Loading from "@/components/root/loader";
import { auth } from "@/lib/firebase/config";

export default function Wrapper({ userDetails }) {
  let login = useContext(AuthContext);
  const { user, loading, error } = login;
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen -mt-10 w-full">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <>
      {!loading && isClient && (
        <>
          {userDetails.success &&
          Object.entries(userDetails?.data).length === 2 &&
          userDetails.data.uid !== auth?.currentUser?.uid ? (
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
