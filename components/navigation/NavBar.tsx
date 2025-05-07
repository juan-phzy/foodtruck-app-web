"use client";

import { useUser } from "@clerk/nextjs";
import PublicNavBar from "./PublicNavBar";
import UserNavBar from "./UserNavBar";
import VendorNavBar from "./VendorNavBar";

export default function NavBar() {
  const { isSignedIn, user } = useUser();
  const role = user?.unsafeMetadata?.role as string | undefined;

  // Render the appropriate navbar based on authentication state and role
  if (!isSignedIn) {
    return <PublicNavBar />;
  } else if (role === "public") {
    return <UserNavBar />;
  } else if (role === "vendor") {
    return <VendorNavBar />;
  }
  
  // Fallback to public navbar if no role is determined yet
  return <PublicNavBar />;
}