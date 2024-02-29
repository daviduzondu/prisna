"use server";

export async function getLoginErrorMessage(errorCode) {
    let result;
    switch (errorCode) {
        case 'auth/invalid-email':
            result = "Invalid email format. Please enter a valid email address."
            break;
        case 'auth/user-not-found':
            result = "User not found. Please check your email and try again."
            break;
        case 'auth/wrong-password':
            result = "Incorrect password. Please check your password and try again."
            break;
        case 'auth/invalid-credential':
            result = "Invalid credentials. Please check your email and password."
            break;
        case 'auth/email-already-in-use':
            result = "Email is already in use. Please use a different email address or login."
            break;
        case 'auth/weak-password':
            result = "Weak password. Please use a stronger password."
        default:
            result = "Something went wrong!";
    }
    return result;
}
