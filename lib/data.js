"use server";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "./firebase/config";

export async function fetchTrending() {
    const response = await fetch("https://dummyjson.com/products/");
    const data = await response.json();
    return data;
}


export async function fetchAllUsersData() {
    try {
        const result = [];
        console.log("Fetching document...");
        const querySnapshot = await getDocs(collection(db, "users"));

        querySnapshot.forEach((entry) => {
            result.push(entry);
        });
        return result;
    } catch (e) {
        console.error("Error fetching document", e);
    }
}

export async function fetchUserData(uid) {
    try {
        const docRef = await getDoc(doc(db, "users", uid));
        if (docRef.exists()) {
            return {success: true, data: docRef.data(), uid: uid};
        } else {
            return {success: false, uid: uid};
        }
    } catch (e) {
        console.error("Error fetching document", e);
    }
}

export async function fetchListerReviews(uid) {
    const docRef = doc(db, "listerReviews", uid);
    const snapshot = await getDoc(docRef);

    const response = {};
    if (snapshot.exists() && snapshot.data().reviews) {
        response.reviews = JSON.parse(JSON.stringify(snapshot.data().reviews));
        // console.log(new Date( Date.now() - response.reviews[0].date.nanoseconds))
        return response;
    }
    response.reviews = []
    return response;
}

export async function fetchListingData(id) {
    const collectionRef = collection(db, "listings");

    let response = {data: null, userData: null, error: true};
    let userData;
    try {
        // const docRef = await (getDoc(doc(db, )))
        let error = false;
        const listingSnapshot = (await getDocs(collectionRef));
        const listing = new Promise(res => res(listingSnapshot.docs.map(doc => doc.data().listings).flat().filter(x => x.id === id)));
        const [lister] = (await listing)
        const userData = await fetchUserData(lister.lister);
        let data = (await listing);

        response = {data: data[0], userData: userData.data, error}
        // console.log(...response);
        return response;
    } catch (e) {
        console.log(e);
        response.message = "Something went wrong!";
        return response;
    }
    // return response
}

export async function getUserListings(uid) {
    try {
        const docRef = doc(db, 'listings', uid)
        console.log(docRef)
    } catch (e) {
        console.log(e)
    }
}
