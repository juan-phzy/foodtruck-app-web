// app/vendor/menus/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import styles from "./page.module.css";
import { Id } from "@/convex/_generated/dataModel";

export default function VendorMenus() {
    const router = useRouter();
    const { user, isLoaded, isSignedIn } = useUser();
    const [loading, setLoading] = useState(true);

    // Safely get user ID
    const userId = user?.id || "";

    // Fetch vendor data
    // const vendor = useQuery(api.vendors.getVendorByClerkId, {
    //     clerkId: userId,
    // });

    // Fetch business data
    const business = useQuery(api.businesses.getBusinessByVendor, {
        vendor_clerk_id: userId,
    });

    // Safely get business ID
    const businessId = business?._id as Id<"businesses"> | undefined;

    // Fetch menus for this business
    const menus = useQuery(
        api.menus.getMenusByBusiness,
        businessId ? { business_id: businessId } : "skip"
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
            (menus !== undefined || !businessId)
        ) {
            setLoading(false);
        }
    }, [isLoaded, isSignedIn, router, business, menus, businessId]);

    // Handle add menu button
    const handleAddMenu = () => {
        router.push("/vendor/menus/create");
    };

    // Show loading state
    if (loading) {
        return (
            <main className="page-scrollable">
                <div className={styles.loadingContainer}>
                    <div className={styles.loader}></div>
                    <p>Loading your menus...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="page-scrollable">
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Menus</h1>
                        <p className={styles.subtitle}>
                            Create and manage your food truck menus
                        </p>
                    </div>

                    <div className={styles.actionArea}>
                        <button
                            className={styles.addButton}
                            onClick={handleAddMenu}
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
                            Create Menu
                        </button>
                    </div>
                </div>

                {menus && menus.length > 0 ? (
                    <div className={styles.menusGrid}>
                        {menus.map((menu) => (
                            <div key={menu._id} className={styles.menuCard}>
                                <div className={styles.menuInfo}>
                                    <h3 className={styles.menuName}>
                                        {menu.name}
                                    </h3>
                                    <div className={styles.menuDetails}>
                                        <div className={styles.menuDetail}>
                                            <span
                                                className={styles.detailLabel}
                                            >
                                                Categories:
                                            </span>
                                            <span
                                                className={styles.detailValue}
                                            >
                                                {menu.menu.length}
                                            </span>
                                        </div>

                                        <div className={styles.menuDetail}>
                                            <span
                                                className={styles.detailLabel}
                                            >
                                                Items:
                                            </span>
                                            <span
                                                className={styles.detailValue}
                                            >
                                                {menu.menu.reduce(
                                                    (total, category) =>
                                                        total +
                                                        category.items.length,
                                                    0
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {menu.menu.length > 0 && (
                                        <div className={styles.categoryList}>
                                            <h4
                                                className={
                                                    styles.categoriesTitle
                                                }
                                            >
                                                Menu Categories:
                                            </h4>
                                            <div
                                                className={styles.categoryTags}
                                            >
                                                {menu.menu.map(
                                                    (category, index) => (
                                                        <span
                                                            key={index}
                                                            className={
                                                                styles.categoryTag
                                                            }
                                                        >
                                                            {category.category}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.menuPreview}>
                                    {menu.menu
                                        .slice(0, 1)
                                        .map((category, catIndex) => (
                                            <div
                                                key={catIndex}
                                                className={
                                                    styles.previewCategory
                                                }
                                            >
                                                <h4
                                                    className={
                                                        styles.previewCategoryName
                                                    }
                                                >
                                                    {category.category}
                                                </h4>
                                                <div
                                                    className={
                                                        styles.previewItems
                                                    }
                                                >
                                                    {category.items
                                                        .slice(0, 2)
                                                        .map(
                                                            (
                                                                item,
                                                                itemIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        itemIndex
                                                                    }
                                                                    className={
                                                                        styles.previewItem
                                                                    }
                                                                >
                                                                    <span
                                                                        className={
                                                                            styles.previewItemName
                                                                        }
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </span>
                                                                    <span
                                                                        className={
                                                                            styles.previewItemPrice
                                                                        }
                                                                    >
                                                                        $
                                                                        {item.price.toFixed(
                                                                            2
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
                                                    {category.items.length >
                                                        2 && (
                                                        <div
                                                            className={
                                                                styles.moreItems
                                                            }
                                                        >
                                                            +{" "}
                                                            {category.items
                                                                .length -
                                                                2}{" "}
                                                            more
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    {menu.menu.length > 1 && (
                                        <div className={styles.moreCategories}>
                                            + {menu.menu.length - 1} more
                                            categories
                                        </div>
                                    )}
                                </div>

                                <div className={styles.menuActions}>
                                    <Link
                                        href={`/vendor/menus/${menu._id}`}
                                        className={styles.manageButton}
                                    >
                                        Edit Menu
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
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                            </svg>
                        </div>
                        <h3>No menus yet</h3>
                        <p>Create your first menu to start adding food items</p>

                        <button
                            className={styles.emptyStateButton}
                            onClick={handleAddMenu}
                        >
                            Create Your First Menu
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
