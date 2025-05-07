"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Define route access patterns more explicitly
const PUBLIC_ROUTES = ["/", "/map", "/vendor-info"];
const AUTH_ROUTES = ["/auth", "/auth/sign-in", "/auth/sign-up/user", "/auth/sign-up/vendor"];
const USER_ROUTES = ["/user"];
const VENDOR_ROUTES = ["/vendor"];
const ONBOARDING_ROUTE = "/auth/createBusiness/step6";

export default function ClientLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    // Extract role from user metadata
    const role = user?.unsafeMetadata?.role as string | undefined;

    // Query vendor profile only if user is a vendor
    const vendorProfile = useQuery(
        api.vendors.getUserByClerkId,
        user && role === "vendor" ? { clerkId: user.id } : "skip"
    );

    // Helper functions to check route permissions
    const isPublicRoute = (path: string) => {
        return PUBLIC_ROUTES.some(
            (route) => path === route || path.startsWith(`${route}/`)
        );
    };

    const isAuthRoute = (path: string) => {
        return AUTH_ROUTES.some(
            (route) => path === route || path.startsWith(`${route}/`)
        );
    };

    const isUserRoute = (path: string) => {
        return USER_ROUTES.some(
            (route) => path === route || path.startsWith(`${route}/`)
        );
    };

    const isVendorRoute = (path: string) => {
        return VENDOR_ROUTES.some(
            (route) => path === route || path.startsWith(`${route}/`)
        );
    };

    useEffect(() => {
        // Don't run routing logic until auth is loaded
        if (!isLoaded) return;

        // 1. Handle unauthenticated users (can only access public & auth routes)
        if (!isSignedIn) {
            if (!isPublicRoute(pathname) && !isAuthRoute(pathname)) {
                router.replace("/auth/sign-in");
            }
            return;
        }

        // 2. Handle vendor users
        if (role === "vendor") {
            // 2a. Check if vendor is onboarded, redirect to onboarding if not
            if (
                vendorProfile?.is_onboarded === false &&
                !pathname.startsWith(ONBOARDING_ROUTE)
            ) {
                router.replace(ONBOARDING_ROUTE);
            }
            // 2b. Vendor users should not access user routes or auth routes when signed in
            else if (
                isUserRoute(pathname) ||
                (isAuthRoute(pathname) &&
                    !pathname.startsWith(ONBOARDING_ROUTE))
            ) {
                router.replace("/vendor/dashboard");
            }
        }
        // 3. Handle public users (general customers)
        else if (role === "public") {
            // Public users shouldn't access vendor routes or auth routes when signed in
            if (isVendorRoute(pathname) || isAuthRoute(pathname)) {
                router.replace("/user/map");
            }
        }
        // 4. Handle users with no role yet (fallback)
        else if (
            !role &&
            !isAuthRoute(pathname) &&
            !isPublicRoute(pathname)
        ) {
            router.replace("/");
        }
    }, [isLoaded, isSignedIn, user, role, vendorProfile, pathname, router]);

    // Simply render children - the routing logic happens in useEffect
    return <>{children}</>;
}
