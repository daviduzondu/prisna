"use server";
import { getDoc, addDoc, doc, collection, updateDoc } from "firebase/firestore";
import { storage, storageRef } from "./firebase/config";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { db } from "./firebase/config";
import { revalidatePath } from "next/cache";

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

export async function getImageURL(path) {
  const url = await getDownloadURL(storageRef(path));
  return url;
  console.log("The image URL is:", url);
}

export async function uploadImage(path, file) {
  const uploadRef = storageRef(path);
  const snapshot = await uploadBytes(uploadRef, file);
  return snapshot;
}
