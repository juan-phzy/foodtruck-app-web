import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        first_name: v.string(),
        last_name: v.string(),
        phone_number: v.string(),
        email: v.string(),
        dob: v.optional(v.string()),
        munchLevel: v.optional(v.float64()),
        primary_city: v.string(),
        clerkId: v.string(),
        selectedCategories: v.optional(v.array(v.string())),
    }).index("by_clerk_id", ["clerkId"]),

    // Vendors Table
    vendors: defineTable({
        clerkId: v.string(),
        first_name: v.string(),
        last_name: v.string(),
        phone_number: v.string(),
        email: v.string(),
        dob: v.optional(v.string()),
        stripeCustomerId: v.optional(v.string()),
        stripeSubscriptionId: v.optional(v.string()),
        subscriptionPlanId: v.optional(v.string()), // e.g. "starter", "growth", etc.
        subscriptionStatus: v.optional(v.string()), // e.g. "active", "past_due", "canceled"
        subscriptionCurrentPeriodEnd: v.optional(v.string()), // ISO date string
        business_Id: v.optional(v.string()),
        is_onboarded: v.boolean(),
    })
        .index("by_clerk_id", ["clerkId"])
        .index("by_email", ["email"])
        .index("by_phone", ["phone_number"])
        .index("by_stripe_customer_id", ["stripeCustomerId"]),

    businesses: defineTable({
        // Identifiers
        business_name: v.string(),
        clerkId: v.string(), // Clerk ID of the organization
        vendor_clerk_id: v.string(), // or v.id("vendors") if you want to enforce ref integrity

        // About the business
        categories: v.optional(v.array(v.string())), // Categories of the business
        description: v.optional(v.string()),
        phone_number: v.optional(v.string()),
        logo_url: v.optional(v.string()), // could be used for branding
        cover_photo_url: v.optional(v.string()), // optional banner/hero image
        primary_city: v.optional(v.string()),

        // Social media
        website: v.optional(v.string()),
        instagram_link: v.optional(v.string()),
        twitter_link: v.optional(v.string()),
        facebook_link: v.optional(v.string()),
        email_link: v.optional(v.string()),
    })
        .index("by_vendor", ["vendor_clerk_id"])
        .index("by_city", ["primary_city"])
        .index("by_business_name", ["business_name"])
        .index("by_clerk_id", ["clerkId"]),

    // Trucks Table
    trucks: defineTable({
        truck_name: v.string(),
        business_clerk_id: v.string(),
        business_convex_id: v.id("businesses"),
        location: v.optional(v.string()),
        latitude: v.optional(v.number()),
        longitude: v.optional(v.number()),
        menu_id: v.optional(v.id("menus")),
        open_status: v.boolean(),
        rating: v.optional(v.number()),
        categories: v.optional(v.array(v.string())),
        truck_type: v.union(v.literal("Stationary"), v.literal("Mobile")),
        schedule: v.array(
            v.object({
                day: v.string(),
                start_time: v.string(),
                end_time: v.string(),
                closed: v.boolean(),
            })
        ),
    })
        .index("by_business_convex_id", ["business_convex_id"])
        .index("by_business_clerk_id", ["business_clerk_id"]),

    // Stands Table
    stands: defineTable({
        stand_name: v.string(),
        business_clerk_id: v.string(),
        business_convex_id: v.id("businesses"),
        location: v.optional(v.string()),
        latitude: v.optional(v.number()),
        longitude: v.optional(v.number()),
        menu_id: v.optional(v.string()),
        open_status: v.boolean(),

        stand_type: v.union(v.literal("Stationary"), v.literal("Mobile")),

        schedule: v.array(
            v.object({
                day: v.string(),
                start_time: v.string(),
                end_time: v.string(),
                closed: v.boolean(),
            })
        ),
    })
        .index("by_business_convex_id", ["business_convex_id"])
        .index("by_business_clerk_id", ["business_clerk_id"]),

    menus: defineTable({
        business_id: v.id("businesses"),
        name: v.string(),
        menu: v.array(
            v.object({
                category: v.string(),
                items: v.array(
                    v.object({
                        name: v.string(),
                        description: v.optional(v.string()),
                        price: v.number(),
                        imageUrl: v.optional(v.string()),
                    })
                ),
            })
        ),
    }).index("by_business_id", ["business_id"]),
});
