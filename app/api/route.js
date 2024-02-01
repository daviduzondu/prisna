import { collection, addDoc, getDoc, doc, getDocs, collectionGroup, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export async function GET(request) {
  //   console.log(request.url.searchParams);
  const { nextUrl } = request;
  const uid = nextUrl.searchParams.get("uid");

  let docRef;
  let data;
  try {
    docRef = doc(db, "listings", uid);
    const res = await getDoc(docRef);

    if (res.exists()) {
      data = res.data().listings;
      console.log(data);
      return Response.json({ data, success: true });
    }
  } catch (e) {
    console.log(e);
  }
  return Response.json({ success: false });
  //   return new Response("This is a new API route");
}
