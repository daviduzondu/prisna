import { collection, addDoc, getDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";

export async function fetchTrending() {
  const response = await fetch("https://dummyjson.com/products/");
  const data = await response.json();
  return data;
}


async function seedDB() {
  try {
    const docRef = await addDoc(collection(db, "trending"), {
      name: "Startup Kano Event Hall",
      product_id: "davido12345",
      lister: "David Uzondu",
    });
  } catch (e) {
    console.error("Error adding document:", e);
  }
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
      return { success: true, data: docRef.data(), uid:uid };
    } else {
      return { success: false, uid:uid };
    }
  } catch (e) {
    console.error("Error fetching document", e);
  }
}
