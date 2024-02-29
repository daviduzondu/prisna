import {collection, getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase/config";
import {fetchUserData} from "@/lib/data";

export async function GET(request) {
    const {nextUrl} = request;
    const targetLocation = nextUrl.searchParams.get("location");

    const collectionRef = collection(db, "listings");
    try {
        let matchingListings = [];

        // Query all documents in the collection
        // const snapshot = await getDocs(collectionRef);
        const listingSnapshot = (await getDocs(collectionRef));
        const listing = new Promise(res => res(listingSnapshot.docs.map(doc => doc.data().listings).flat().filter(x => x.location.toLowerCase().includes(targetLocation.toLowerCase()))));
        const lister = (await listing).lister
        matchingListings = (await listing);
        for (let i = 0; i < matchingListings.length; i++) {
            let match = matchingListings[i];
            const userData = await fetchUserData(match.lister);
            match = {...match, userData: userData.data}
            matchingListings[i] = match;
        }


        return Response.json({data: matchingListings});
    } catch (error) {
        console.error("Error searching listings:", error);
        throw error;
    }
}
