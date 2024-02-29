"use client";
import * as React from "react";
import {useEffect} from "react";
import {toast} from "sonner";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/config.js";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {getLoginErrorMessage} from "@/lib/firebase/helpers";
import {useForm} from "react-hook-form";

export default function Page() {
    const {
        register,
        setError,
        clearErrors,
        handleSubmit,
        formState: {isSubmitting, isSubmitted, errors, isSubmitSuccessful, isDirty},
        reset
    } = useForm();
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    useEffect(() => {
        console.log(errors);
        Object.keys(errors).length > 0 && showToastErrors(errors);
        reset({}, {keepValues: true});
    }, [isSubmitted]);


    function showToastErrors(errors) {
        switch ("required") {
            case errors?.email?.type:
                toast.error("Please enter your email!")
                break;
            case errors?.password?.type:
                toast.error("Please enter a password!")
                break;
        }

        switch ("minLength") {
            case errors?.password?.type:
                toast.error("Password not up to 8 characters")
        }
    }

    async function submitHandler({email, password, password2}) {
        // if (Object.keys(errors).length === 0) {
        console.log("submitting...")
        try {
            const res = await createUserWithEmailAndPassword(email, password);
            if (error) throw new Error(error.code);
            toast.success(`Welcome to Prisna ${res.user.email}`);
            router.push(`/`)
        } catch (e) {

            toast.error(getLoginErrorMessage(e.message));
        }
        // }
    }

    function handleAuthErrors(message) {
        toast.error(getLoginErrorMessage(message));
    }

    return (
        <div className="flex items-center justify-center h-[90vh]">
            <Card className="w-[450px] drop-shadow-xl">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    {/* <CardDescription></CardDescription> */}
                </CardHeader>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">

                                <Label htmlFor="name">Email</Label>
                                <Input
                                    type="email"
                                    {...register("email", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type={"password"}

                                    {...register("password", {
                                        required: true,
                                        minLength: 7
                                    })}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <div className="action-btn flex justify-between w-[100%]">
                            <Button variant="outline">Cancel</Button>
                            {!loading && !user || error ? <Button type="submit">
                                Create Account
                            </Button> : <Button disabled className={"border border-green-950 bg-transparent text-green-950 font-bold"}>
                                Creating Account...
                            </Button>}
                        </div>
                        <div className="my-5 text-gray-400 flex items-center gap-3">
                            <span className="h-[1px] bg-gray-400 block w-7"></span>
                            <span className="text-xs">OR</span>
                            <span className="h-[1px] bg-gray-400 block w-7"></span>
                        </div>
                        {/* <Separator orientation="horizontal"/> */}
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
