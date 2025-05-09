// app/vendor/locations/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import styles from "./page.module.css";
import { Trucks } from "@/types";
import { Id } from "@/convex/_generated/dataModel";

export default function VendorLocations() {
    const router = useRouter();
    const { user, isLoaded, isSignedIn } = useUser();
    const [loading, setLoading] = useState(true);

    // Safely get user ID
    const userId = user?.id || "";

    // Fetch vendor data - always call this hook
    // const vendor = useQuery(api.vendors.getVendorByClerkId, {
    //     clerkId: userId,
    // });

    // Fetch business data - always call this hook
    const business = useQuery(api.businesses.getBusinessByVendor, {
        vendor_clerk_id: userId,
    });

    // Safely get business ID or undefined
    const businessId = business?._id as Id<"businesses"> | undefined;
    const businessClerkId = business?.clerkId || "";

    // Fetch menus - always call this hook but handle undefined
    const menus = useQuery(
        api.menus.getMenusByBusiness,
        businessId ? { business_id: businessId } : "skip"
    );

    // Fetch trucks - always call this hook but handle undefined
    const trucks = useQuery(
        api.trucks.getTrucksByBusinessId,
        businessClerkId ? { business_clerk_id: businessClerkId } : "skip"
    );

    // Auth check and data loading
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/auth/sign-in");
            return;
        }

        // Only set loading to false when all data is loaded
        if (
            isLoaded &&
            isSignedIn &&
            business !== undefined &&
            (menus !== undefined || !businessId) &&
            (trucks !== undefined || !businessClerkId)
        ) {
            setLoading(false);
        }
    }, [
        isLoaded,
        isSignedIn,
        router,
        business,
        menus,
        trucks,
        businessId,
        businessClerkId,
    ]);

    // Check if business has menus (required to add trucks)
    const hasMenus = menus && menus.length > 0;

    // Handle add truck button
    const handleAddTruck = () => {
        if (!hasMenus) {
            return; // Button will be disabled
        }

        router.push("/vendor/locations/add-truck");
    };

    // Show loading state
    if (loading) {
        return (
            <main className="page-scrollable">
                <div className={styles.loadingContainer}>
                    <div className={styles.loader}></div>
                    <p>Loading your locations...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="page-scrollable">
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Locations</h1>
                        <p className={styles.subtitle}>
                            Manage your food truck locations and schedules
                        </p>
                    </div>

                    <div className={styles.actionArea}>
                        {hasMenus ? (
                            <button
                                className={styles.addButton}
                                onClick={handleAddTruck}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add Location
                            </button>
                        ) : (
                            <div className={styles.warningBox}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line
                                        x1="12"
                                        y1="16"
                                        x2="12.01"
                                        y2="16"
                                    ></line>
                                </svg>
                                <span>
                                    Please{" "}
                                    <Link href="/vendor/menus">
                                        create a menu
                                    </Link>{" "}
                                    first before adding a location
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {trucks && trucks.length > 0 ? (
                    <div className={styles.trucksGrid}>
                        {trucks.map((truck: Trucks) => (
                            <div key={truck._id} className={styles.truckCard}>
                                <div className={styles.truckInfo}>
                                    <h3 className={styles.truckName}>
                                        {truck.truck_name}
                                    </h3>
                                    <div className={styles.truckDetails}>
                                        <div className={styles.truckDetail}>
                                            <span
                                                className={styles.detailLabel}
                                            >
                                                Type:
                                            </span>
                                            <span
                                                className={styles.detailValue}
                                            >
                                                {truck.truck_type}
                                            </span>
                                        </div>

                                        <div className={styles.truckDetail}>
                                            <span
                                                className={styles.detailLabel}
                                            >
                                                Status:
                                            </span>
                                            <span
                                                className={`${styles.detailValue} ${truck.open_status ? styles.statusOpen : styles.statusClosed}`}
                                            >
                                                {truck.open_status
                                                    ? "Open"
                                                    : "Closed"}
                                            </span>
                                        </div>

                                        {truck.location && (
                                            <div className={styles.truckDetail}>
                                                <span
                                                    className={
                                                        styles.detailLabel
                                                    }
                                                >
                                                    Location:
                                                </span>
                                                <span
                                                    className={
                                                        styles.detailValue
                                                    }
                                                >
                                                    {truck.location}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {truck.categories &&
                                        truck.categories.length > 0 && (
                                            <div
                                                className={styles.categoryTags}
                                            >
                                                {truck.categories.map(
                                                    (category, index) => (
                                                        <span
                                                            key={index}
                                                            className={
                                                                styles.categoryTag
                                                            }
                                                        >
                                                            {category}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        )}
                                </div>

                                <div className={styles.truckActions}>
                                    <Link
                                        href={`/vendor/locations/${truck._id}`}
                                        className={styles.manageButton}
                                    >
                                        Manage
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                        </div>
                        <h3>No locations yet</h3>
                        <p>
                            {hasMenus
                                ? "Add your first food truck location to get started"
                                : "Create a menu first, then add your food truck locations"}
                        </p>

                        {hasMenus ? (
                            <button
                                className={styles.emptyStateButton}
                                onClick={handleAddTruck}
                            >
                                Add Your First Location
                            </button>
                        ) : (
                            <Link
                                href="/vendor/menus"
                                className={styles.emptyStateButton}
                            >
                                Create a Menu
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
