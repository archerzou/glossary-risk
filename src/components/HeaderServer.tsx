import HeaderClient from "./HeaderClient";
import { getCurrentUser, signOut } from "@/lib/auth/actions";

export default async function Header() {
  const user = await getCurrentUser();

  async function signOutAction() {
    "use server";
    await signOut();
  }

  return <HeaderClient user={user} signOutAction={signOutAction} />;
}
