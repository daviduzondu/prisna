"use server";
import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db, storageRef} from "./firebase/config";
import {getDownloadURL, uploadBytes} from "firebase/storage";
import {v4 as uuidv4} from "uuid";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {fetchUserData} from "@/lib/data";

export async function updateDetails(userDetails, formData) {
    let $ = formData;
    const rawFormData = {
        pic: $.get("profile-pic"),
        name: $.get("name"),
        location: $.get("location"),
        phone: $.get("phone"),
    };

    try {
        const upload = await uploadImage(`avatars/${userDetails.uid}/${rawFormData.pic.name}`, rawFormData.pic);
        const docRef = doc(db, "users", userDetails.uid);
        const url = await getImageURL(`avatars/${userDetails.uid}/${rawFormData.pic.name}`);

        const update = await updateDoc(docRef, {
            name: rawFormData.name,
            location: rawFormData.location,
            phone: rawFormData.phone,
            pic: url,
        });
        console("Update Complete!")
    } catch (e) {
        console.log(e);
    }

    redirect(`/${userDetails.uid}`);
    revalidatePath(`/${userDetails.uid}`);
}

export async function addNewListerReview(formData) {
    let $ = formData;
    const rawFormData = {
        review: $.get("review"),
        reviewerID: $.get("reviewerID"),
        listerID:$.get("listerID")
    };
    console.log(rawFormData);

    const userData = await fetchUserData(rawFormData.reviewerID);

    const listerReviewDocRef = await doc(db, "listerReviews", rawFormData.listerID);
    console.log(listerReviewDocRef);
    const listerReviewDocSnapshot = await getDoc(listerReviewDocRef);

    if (userData.success) {
        if (!listerReviewDocSnapshot.exists()) {
            await setDoc(listerReviewDocRef, {
                reviews: [{
                    review: rawFormData.review,
                    id: uuidv4(),
                    date: new Date(),
                    reviewerData: userData.data
                }]
            })
        } else {
            const arrayField = listerReviewDocSnapshot.data().reviews;
            await updateDoc(listerReviewDocRef, {
                reviews: [
                    ...arrayField,
                    {
                    review: rawFormData.review,
                    id: uuidv4(),
                    date: new Date(),
                    reviewerData: userData.data
                }]
            })
        }
        console.log("Add review complete!")
    }
}

export async function addNewListing(formData) {
    const txtDetails = {};
    const mediaDetails = [];
    const listMedia = [];

    for (const key of formData.keys()) {
        if (!key.includes("pictures")) txtDetails[key.slice(6)] = formData.get(key);
        else mediaDetails.push(formData.get(key));
    }

    try {
        const uu = uuidv4();

        // Use Promise.all to wait for all media uploads to complete
        await Promise.all(
            mediaDetails.map(async (x) => {
                let filePath = `listings/${txtDetails.lister}${x.name}${uu}`;
                const upload = await uploadImage(filePath, x);
                const url = await getImageURL(filePath);
                listMedia.push(url);
            })
        );

        const listDocRef = doc(db, "listings", txtDetails.lister);
        const listDocSnapshot = await getDoc(listDocRef);

        if (!listDocSnapshot.exists()) {
            await setDoc(listDocRef, {
                listings: [
                    {
                        ...txtDetails,
                        lister: txtDetails.lister,
                        media: listMedia,
                        id: uuidv4(),
                        date: new Date(),
                    },
                ],
            });
        } else {
            const arrayField = listDocSnapshot.data().listings;

            if (!arrayField || !Array.isArray(arrayField)) {
                await updateDoc(listDocRef, {
                    listings: [
                        {
                            ...txtDetails,
                            lister: txtDetails.lister,
                            media: listMedia,
                            id: uuidv4(),
                            date: new Date(),
                        },
                    ],
                });
            } else {
                await updateDoc(listDocRef, {
                    listings: [
                        ...arrayField,
                        {
                            ...txtDetails,
                            lister: txtDetails.lister,
                            media: listMedia,
                            id: uuidv4(),
                            date: new Date(),
                        },
                    ],
                });
            }
        }
        console.log("Listing added!")
    } catch (e) {
        console.error(e);
    }

    redirect(`/${txtDetails.lister}`);
    revalidatePath(`/${txtDetails.lister}`);
}

export async function searchListingsByLocation(formData) {
    const targetLocation = formData.get("location");

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
                    return listing.location.includes(targetLocation)
                    // console.log(listing.location.includes("Kano"));
                    // console.log();
                });

                // Add the matching listings to the result array
                matchingListings.push(...filteredListings);
            }
        });
        console.log(matchingListings)
        return matchingListings;

    } catch (error) {
        console.error("Error searching listings:", error);
        throw error;
    }
}

export async function getImageURL(path) {
    const url = await getDownloadURL(storageRef(path));
    return url;
}

export async function uploadImage(path, file) {
    const uploadRef = storageRef(path);
    const snapshot = await uploadBytes(uploadRef, file);
    return snapshot;
}

// addNewListing();
