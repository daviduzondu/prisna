"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loading from "@/components/root/loader";
import { getReadableErrorMessage } from "@/lib/firebase/helpers";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      toast.success("Welcome back!");
      setEmail("");
      setPassword("");
      router.push("/");
    }
  }, [user]);

  async function handleSignIn() {
    console.log(error);
    try {
      if (email.includes("@") && password) {
        const res = await signInWithEmailAndPassword(email, password);
      }
      if (error) {
        throw new Error(error);
      }
    } catch (e) {
      console.error(e);
      handleAuthErrors(e.message);
    }
  }

  function handleAuthErrors(message) {
    toast.error(getReadableErrorMessage(message));
  }

  return (
    <div className="flex items-center justify-center h-[90vh]">
      {/* {user && } */}
      <Card className="w-[450px] drop-shadow-xl">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <form onSubmit={(e) => (e.preventDefault(), handleSignIn(e))}>
          {loading && (
            <div className="flex items-center justify-center my-2">
              <Loading width={30} height={30} />
              <span className="ml-2">Signing you in...</span>
            </div>
          )}
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="action-btn flex justify-between w-[100%]">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" onClick={() => handleSignIn()}>
                Login
              </Button>
            </div>
            <div className="my-5 text-gray-400 flex items-center gap-3">
              <span className="h-[1px] bg-gray-400 block w-7"></span>
              <span className="text-xs">OR</span>
              <span className="h-[1px] bg-gray-400 block w-7"></span>
            </div>
            {/* <Separator orientation="horizontal"/> */}
            <div className="external-providers flex gap-3 items-center justify-center">
              <Button variant="outline">
                <LogIn className="icon mr-2" />
                Continue with Google
              </Button>
            </div>
            <div className="mt-5 text-sm">
              Don&apos;t have an account?{" "}
              <Link href={"/create-account"} className="text-blue-500 hover:underline">
                Create an account
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
