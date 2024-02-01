"use server";
import { getDoc, addDoc, doc, collection, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { storage, storageRef } from "./firebase/config";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { db } from "./firebase/config";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateDetails(userDetails, formData) {
  let $ = formData;
  console.log($);
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
  } catch (e) {
    console.log(e);
  }

  revalidatePath("/");
}

export async function addNewListing(formData) {
  console.log(formData);
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
  } catch (e) {
    console.error(e);
  }

  revalidatePath(`/${txtDetails.lister}`);
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
