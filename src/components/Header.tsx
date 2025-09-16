import User from "./User";
import { getCurrentUser, signOut } from "@/lib/auth/actions";

export default async function Header() {
  const user = await getCurrentUser();

  async function signOutAction() {
    "use server";
    await signOut();
  }

  return <User user={user} signOutAction={signOutAction} />;
}
