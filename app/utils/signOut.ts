"use server";

import { signOut } from "./auth";

export async function SignOut() {
  await signOut();
}
