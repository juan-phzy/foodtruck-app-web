// app/vendor/menus/add-menu/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import styles from "./page.module.css";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "react-toastify";

// Define types for menu structure
type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
};

type MenuCategory = {
    id: string;
    name: string;
    items: MenuItem[];
};

export default function CreateMenu() {
    const router = useRouter();
    const { user, isLoaded, isSignedIn } = useUser();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form state
    const [menuName, setMenuName] = useState("");
    const [categories, setCategories] = useState<MenuCategory[]>([]);
    const [errors, setErrors] = useState({
        menuName: "",
        categories: "",
    });

    // Safely get user ID
    const userId = user?.id || "";

    // Fetch business data
    const business = useQuery(api.businesses.getBusinessByVendor, {
        vendor_clerk_id: userId,
    });

    // Safely get business ID
    const businessId = business?._id as Id<"businesses"> | undefined;

    // Create menu mutation
    const createMenu = useMutation(api.menus.createMenu);

    // Auth check and data loading
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/auth/sign-in");
            return;
        }

        if (isLoaded && isSignedIn && business !== undefined) {
            setLoading(false);
        }
    }, [isLoaded, isSignedIn, router, business]);

    // Generate unique IDs for categories and items
    const generateId = () => {
        return Math.random().toString(36).substring(2, 9);
    };

    // Add a new category
    const addCategory = () => {
        const newCategory: MenuCategory = {
            id: generateId(),
            name: "",
            items: [],
        };

        setCategories([...categories, newCategory]);
        setErrors({ ...errors, categories: "" });
    };

    // Remove a category
    const removeCategory = (categoryId: string) => {
        setCategories(
            categories.filter((category) => category.id !== categoryId)
        );
    };

    // Update category name
    const updateCategoryName = (categoryId: string, name: string) => {
        setCategories(
            categories.map((category) =>
                category.id === categoryId ? { ...category, name } : category
            )
        );
    };

    // Add item to category
    const addItem = (categoryId: string) => {
        const newItem: MenuItem = {
            id: generateId(),
            name: "",
            description: "",
            price: 0,
            imageUrl: "",
        };

        setCategories(
            categories.map((category) =>
                category.id === categoryId
                    ? { ...category, items: [...category.items, newItem] }
                    : category
            )
        );
    };

    // Remove item from category
    const removeItem = (categoryId: string, itemId: string) => {
        setCategories(
            categories.map((category) =>
                category.id === categoryId
                    ? {
                          ...category,
                          items: category.items.filter(
                              (item) => item.id !== itemId
                          ),
                      }
                    : category
            )
        );
    };

    // Update item field
    const updateItem = (
        categoryId: string,
        itemId: string,
        field: keyof MenuItem,
        value: string | number
    ) => {
        setCategories(
            categories.map((category) =>
                category.id === categoryId
                    ? {
                          ...category,
                          items: category.items.map((item) =>
                              item.id === itemId
                                  ? { ...item, [field]: value }
                                  : item
                          ),
                      }
                    : category
            )
        );
    };

    // Validate form before submission
    const validateForm = () => {
        let isValid = true;
        const newErrors = { menuName: "", categories: "" };

        if (!menuName.trim()) {
            newErrors.menuName = "Menu name is required";
            isValid = false;
        }

        if (categories.length === 0) {
            newErrors.categories = "At least one category is required";
            isValid = false;
        } else {
            // Check if any category is empty
            for (const category of categories) {
                if (!category.name.trim()) {
                    newErrors.categories = "All categories must have a name";
                    isValid = false;
                    break;
                }

                if (category.items.length === 0) {
                    newErrors.categories =
                        "Each category must have at least one item";
                    isValid = false;
                    break;
                }

                // Check if any item is incomplete
                for (const item of category.items) {
                    if (!item.name.trim() || item.price <= 0) {
                        newErrors.categories =
                            "All items must have a name and price";
                        isValid = false;
                        break;
                    }
                }

                if (!isValid) break;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    // Save menu to database
    const saveMenu = async () => {
        if (!validateForm() || !businessId) return;

        setSaving(true);

        try {
            // Format data for API
            const menuData = categories.map((category) => ({
                category: category.name,
                items: category.items.map((item) => ({
                    name: item.name,
                    description: item.description || undefined,
                    price: Number(item.price),
                    imageUrl: item.imageUrl || undefined,
                })),
            }));

            // Call API to create menu
            await createMenu({
                business_id: businessId,
                name: menuName,
                menu: menuData,
            });

            toast.success("Menu created successfully!", {
                position: "bottom-right",
                autoClose: 4000,
            });

            // Navigate back to menus page
            router.push("/vendor/menus");
        } catch (error) {
            console.error("Error creating menu:", error);
            toast.error(
                error instanceof Error
                    ? `Error: ${error.message}`
                    : "Failed to create menu. Please try again.",
                {
                    position: "bottom-right",
                    autoClose: 4000,
                }
            );
        } finally {
            setSaving(false);
        }
    };

    // Show loading state
    if (loading) {
        return (
            <main className="page-scrollable">
                <div className={styles.loadingContainer}>
                    <div className={styles.loader}></div>
                    <p>Loading...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="page-scrollable">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create New Menu</h1>
                    <p className={styles.subtitle}>
                        Create a menu for your food truck with categories and
                        items
                    </p>
                </div>

                <div className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label htmlFor="menuName" className={styles.label}>
                            Menu Name *
                        </label>
                        <input
                            id="menuName"
                            type="text"
                            className={`${styles.input} ${errors.menuName ? styles.inputError : ""}`}
                            value={menuName}
                            onChange={(e) => setMenuName(e.target.value)}
                            placeholder="e.g. Main Menu, Breakfast Menu, etc."
                        />
                        {errors.menuName && (
                            <p className={styles.errorText}>
                                {errors.menuName}
                            </p>
                        )}
                    </div>

                    <div className={styles.categoriesSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                Menu Categories
                            </h2>
                            <button
                                type="button"
                                className={styles.addButton}
                                onClick={addCategory}
                            >
                                Add Category
                            </button>
                        </div>

                        {errors.categories && (
                            <p className={styles.errorText}>
                                {errors.categories}
                            </p>
                        )}

                        {categories.length === 0 ? (
                            <div className={styles.emptyCategories}>
                                <p>
                                    No categories yet. Add a category to get
                                    started.
                                </p>
                                <button
                                    type="button"
                                    className={styles.addCategoryButton}
                                    onClick={addCategory}
                                >
                                    Add Your First Category
                                </button>
                            </div>
                        ) : (
                            <div className={styles.categoriesList}>
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className={styles.categoryCard}
                                    >
                                        <div className={styles.categoryHeader}>
                                            <div
                                                className={
                                                    styles.categoryInputGroup
                                                }
                                            >
                                                <input
                                                    type="text"
                                                    className={
                                                        styles.categoryNameInput
                                                    }
                                                    value={category.name}
                                                    onChange={(e) =>
                                                        updateCategoryName(
                                                            category.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Category Name (e.g. Appetizers, Main Dishes, etc.)"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className={styles.removeButton}
                                                onClick={() =>
                                                    removeCategory(category.id)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className={styles.itemsSection}>
                                            <div
                                                className={
                                                    styles.itemsSectionHeader
                                                }
                                            >
                                                <h3
                                                    className={
                                                        styles.itemsTitle
                                                    }
                                                >
                                                    Items
                                                </h3>
                                                <button
                                                    type="button"
                                                    className={
                                                        styles.addItemButton
                                                    }
                                                    onClick={() =>
                                                        addItem(category.id)
                                                    }
                                                >
                                                    Add Item
                                                </button>
                                            </div>

                                            {category.items.length === 0 ? (
                                                <div
                                                    className={
                                                        styles.emptyItems
                                                    }
                                                >
                                                    <p>
                                                        No items in this
                                                        category yet.
                                                    </p>
                                                </div>
                                            ) : (
                                                <div
                                                    className={styles.itemsList}
                                                >
                                                    {category.items.map(
                                                        (item) => (
                                                            <div
                                                                key={item.id}
                                                                className={
                                                                    styles.itemCard
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.itemRow
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.itemFormGroup
                                                                        }
                                                                    >
                                                                        <label
                                                                            className={
                                                                                styles.itemLabel
                                                                            }
                                                                        >
                                                                            Item
                                                                            Name
                                                                            *
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className={
                                                                                styles.itemInput
                                                                            }
                                                                            value={
                                                                                item.name
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateItem(
                                                                                    category.id,
                                                                                    item.id,
                                                                                    "name",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            placeholder="e.g. Cheeseburger"
                                                                        />
                                                                    </div>

                                                                    <div
                                                                        className={
                                                                            styles.itemFormGroup
                                                                        }
                                                                    >
                                                                        <label
                                                                            className={
                                                                                styles.itemLabel
                                                                            }
                                                                        >
                                                                            Price
                                                                            ($)
                                                                            *
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            step="0.01"
                                                                            min="0"
                                                                            className={
                                                                                styles.itemInput
                                                                            }
                                                                            value={
                                                                                item.price
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateItem(
                                                                                    category.id,
                                                                                    item.id,
                                                                                    "price",
                                                                                    parseFloat(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    ) ||
                                                                                        0
                                                                                )
                                                                            }
                                                                            placeholder="0.00"
                                                                        />
                                                                    </div>

                                                                    <button
                                                                        type="button"
                                                                        className={
                                                                            styles.removeItemButton
                                                                        }
                                                                        onClick={() =>
                                                                            removeItem(
                                                                                category.id,
                                                                                item.id
                                                                            )
                                                                        }
                                                                    >
                                                                        &times;
                                                                    </button>
                                                                </div>

                                                                <div
                                                                    className={
                                                                        styles.itemFormGroup
                                                                    }
                                                                >
                                                                    <label
                                                                        className={
                                                                            styles.itemLabel
                                                                        }
                                                                    >
                                                                        Description
                                                                        (Optional)
                                                                    </label>
                                                                    <textarea
                                                                        className={
                                                                            styles.itemTextarea
                                                                        }
                                                                        value={
                                                                            item.description
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateItem(
                                                                                category.id,
                                                                                item.id,
                                                                                "description",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        placeholder="Add a description of the item..."
                                                                        rows={2}
                                                                    />
                                                                </div>

                                                                <div
                                                                    className={
                                                                        styles.itemFormGroup
                                                                    }
                                                                >
                                                                    <label
                                                                        className={
                                                                            styles.itemLabel
                                                                        }
                                                                    >
                                                                        Image
                                                                        URL
                                                                        (Optional)
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className={
                                                                            styles.itemInput
                                                                        }
                                                                        value={
                                                                            item.imageUrl ||
                                                                            ""
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateItem(
                                                                                category.id,
                                                                                item.id,
                                                                                "imageUrl",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        placeholder="https://example.com/image.jpg"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.actionButtons}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => router.push("/vendor/menus")}
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className={styles.saveButton}
                            onClick={saveMenu}
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save Menu"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
