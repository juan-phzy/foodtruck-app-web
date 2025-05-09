// convex/businesses.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new business
export const createBusiness = mutation({
    args: {
        business_name: v.string(),
        vendor_clerk_id: v.string(),
        clerkId: v.string(),
        description: v.optional(v.string()),
        email: v.optional(v.string()),
        phone_number: v.optional(v.string()),
        website: v.optional(v.string()),
        logo_url: v.optional(v.string()),
        cover_photo_url: v.optional(v.string()),
        instagram_link: v.optional(v.string()),
        twitter_link: v.optional(v.string()),
        facebook_link: v.optional(v.string()),
        email_link: v.optional(v.string()),
        primary_city: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("businesses")
            .withIndex("by_vendor", (q) =>
                q.eq("vendor_clerk_id", args.vendor_clerk_id)
            )
            .first();

        if (existing) throw new Error("Vendor already has a business.");

        return await ctx.db.insert("businesses", args);
    },
});

export const getBusinessById = query({
    args: {
        businessId: v.id("businesses"),
    },
    handler: async (ctx, args) => {
        const business = await ctx.db.get(args.businessId);

        if (!business) {
            throw new Error("Business not found.");
        }

        return business;
    },
});

// Get a business by vendor ID
export const getBusinessByVendor = query({
    args: { vendor_clerk_id: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("businesses")
            .withIndex("by_vendor", (q) =>
                q.eq("vendor_clerk_id", args.vendor_clerk_id)
            )
            .first();
    },
});

// Update business details
export const updatePublicInfo = mutation({
    args: {
        clerkId: v.string(),
        description: v.optional(v.string()),
        phone_number: v.optional(v.string()),
        email_link: v.optional(v.string()),
        primary_city: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const business = await ctx.db
            .query("businesses")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (!business) {
            throw new Error("Business not found for vendor.");
        }

        await ctx.db.patch(business._id, {
            description: args.description,
            phone_number: args.phone_number,
            email_link: args.email_link,
            primary_city: args.primary_city,
        });
    },
});

export const updateCategories = mutation({
    args: {
        clerkId: v.string(),
        categories: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const business = await ctx.db
            .query("businesses")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (!business) {
            throw new Error("Business not found for vendor.");
        }

        await ctx.db.patch(business._id, {
            categories: args.categories,
        });
    },
});

export const updateSocials = mutation({
    args: {
        clerkId: v.string(),
        website: v.optional(v.string()),
        instagram_link: v.optional(v.string()),
        twitter_link: v.optional(v.string()),
        facebook_link: v.optional(v.string()),
        email_link: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const business = await ctx.db
            .query("businesses")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (!business) {
            throw new Error("Business not found for vendor.");
        }

        await ctx.db.patch(business._id, {
            website: args.website,
            instagram_link: args.instagram_link,
            twitter_link: args.twitter_link,
            facebook_link: args.facebook_link,
            email_link: args.email_link,
        });
    },
});
