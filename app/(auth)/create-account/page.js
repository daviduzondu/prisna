"use client";
import * as React from "react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config.js";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "@/components/root/loader";
import { getReadableErrorMessage } from "@/lib/firebase/helpers";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass2, setPass2] = useState("");
  const [createUserWithEmailAndPassword, , user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  async function handleSignUp() {
    // console.log(inputs)
    // preventDefault();

    try {
      if (password === pass2) {
        const res = await createUserWithEmailAndPassword(email, password);
        setEmail("");
        setPassword("");
        setPass2("");
        toast.success("Account created successfully.", {
          description: "You will now to directed to the home page",
        });
        router.push("/");
        console.log(res);
      } else {
        toast.error("The passwords do not match!");
        handleAuthErrors(error.message);
        // alert("The passwords do not match!");
      }
    } catch (e) {
      // toast.error(getReadableErrorMessage(e.message));
      console.error(e);
    }
  }

  function handleAuthErrors(message) {
    toast.error(getReadableErrorMessage(message));
  }

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <Card className="w-[450px] drop-shadow-xl">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <form onSubmit={(e) => (e.preventDefault(), handleSignUp(e))}>
          {/* {(loading && user) && (
            <div className="flex items-center justify-center my-2">
              <Loading width={30} height={30} />
              <span className="ml-2">Signing up...</span>
            </div>
          )} */}
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Confirm password</Label>
                <Input
                  id="pass2"
                  type="password"
                  placeholder="Confirm password"
                  value={pass2}
                  required
                  onChange={(e) => setPass2(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="action-btn flex justify-between w-[100%]">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" onClick={() => handleSignUp()}>
                Create Account
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
              Already have an account?{" "}
              <Link href={"/login"} className="text-blue-500 hover:underline">
                Login instead
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
