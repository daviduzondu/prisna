import { collection, addDoc, getDoc, doc, getDocs, collectionGroup, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export async function GET(request) {
  const { nextUrl } = request;
  const targetLocation = nextUrl.searchParams.get("location");

  const collectionRef = collection(db, "listings");
  try {
    const matchingListings = [];

    // Query all documents in the collection
    const snapshot = await getDocs(collectionRef);

    // Iterate through each document
    snapshot.forEach((doc) => {
      // Check if the document has a "listings" array
      const listingsArray = doc.data().listings;

      if (listingsArray && Array.isArray(listingsArray)) {
        // Filter the listings array based on the target location
        const filteredListings = listingsArray.filter((listing) => {
          console.log(listing);
          return listing.location.includes(targetLocation);
          // console.log(listing.location.includes("Kano"));
          // console.log();
        });

        // Add the matching listings to the result array
        matchingListings.push(...filteredListings);
      }
    });
    console.log("data", matchingListings);
    return Response.json({ data: matchingListings });
  } catch (error) {
    console.error("Error searching listings:", error);
    throw error;
  }
}
