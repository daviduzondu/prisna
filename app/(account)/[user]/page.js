import { fetchUserData } from "@/lib/data";
import Profile from "./(user)/profile";
import Wrapper from "./(user)/Wrapper";

export default async function Page({ params }) {
  const response = await fetchUserData(params.user);
  return <>{<Wrapper userDetails={response} />}</>;
}
