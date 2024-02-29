"use client";
import * as React from "react";
import {useEffect, useState} from "react";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase/config.js";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {getLoginErrorMessage} from "@/lib/firebase/helpers";
import {useForm} from 'react-hook-form';

export default function Page() {
    const {
        register,
        clearErrors,
        handleSubmit,
        formState: {isSubmitting, isSubmitted, errors, isSubmitSuccessful},
        reset
    } = useForm();
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    useEffect(() => {
        Object.keys(errors).length > 0 && showToastErrors(errors) && console.log(errors);
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

    async function submitHandler({email, password}) {
        try {
            const res = await signInWithEmailAndPassword(email, password);
            if (error) throw new Error(error.code);
            toast.success(`Welcome back, ${res.user.email}`);
            router.push(`/${res.user.uid}`)
        } catch (e) {
            console.log(e);
            toast.error(getLoginErrorMessage(e.message));
        }

    }

    return (
        <div className="flex items-center justify-center h-[90vh]">
            <Card className="w-[450px] drop-shadow-xl">
                <CardHeader>
                    <CardTitle>Welcome back!</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input
                                    type={"email"}
                                    {...register("email", {
                                        required: true,
                                    })}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
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
                            {!loading ? <Button type="submit">
                                Login
                            </Button> : <Button disabled className={"border border-green-950 bg-transparent text-green-950 font-bold"}>
                                Logging in...
                            </Button>}
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
