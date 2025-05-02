"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const role = user?.unsafeMetadata?.role;

  const vendorProfile = useQuery(
    api.vendors.getUserByClerkId,
    user && role === "vendor" ? { clerkId: user.id } : "skip"
  );

  useEffect(() => {
    if (!isLoaded || !user) return;

    const isAuthRoute = pathname?.startsWith("/auth");
    const isVendorRoute = pathname?.startsWith("/vendor");
    const isPublicRoute = pathname?.startsWith("/public");

    const isUnrestrictedPublicRoute =
      pathname === "/" ||
      pathname.startsWith("/map") ||
      pathname.startsWith("/vendor-info");

    // 1. Unauthenticated users can access public pages
    if (!isSignedIn) {
      if (!isAuthRoute && !isUnrestrictedPublicRoute) {
        router.replace("/auth/signin");
      }
      return;
    }

    // 2. Vendor logic
    if (role === "vendor") {
      const isOnboarded = vendorProfile?.is_onboarded;

      if (isOnboarded === false && !isAuthRoute) {
        router.replace("/auth/createBusiness/step6");
        return;
      }

      if (isAuthRoute || isPublicRoute || isUnrestrictedPublicRoute) {
        router.replace("/vendor/locations");
        return;
      }
    }

    // 3. Public user logic
    if (role === "public" && (isAuthRoute || isVendorRoute)) {
      router.replace("/public");
    }
  }, [isLoaded, isSignedIn, user, vendorProfile, pathname]);

  return <>{children}</>;
}
