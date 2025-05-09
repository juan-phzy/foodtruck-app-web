// convex/vendors.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new vendor
export const createVendor = mutation({
    args: {
        clerkId: v.string(),
        first_name: v.string(),
        last_name: v.string(),
        phone_number: v.string(),
        email: v.string(),
        dob: v.optional(v.string()),
        is_onboarded: v.boolean(),
    },
    handler: async (ctx, args) => {
        // Check if a vendor with this Clerk ID already exists
        const existingVendor = await ctx.db
            .query("vendors")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (existingVendor) {
            throw new Error("A vendor with this ID already exists.");
        }

        // Create the new vendor
        return await ctx.db.insert("vendors", {
            ...args,
        });
    },
});

// Get a vendor by Clerk ID
export const getVendorByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("vendors")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();
    },
});

// Update vendor profile
export const updateClerkInfo = mutation({
    args: {
        clerkId: v.string(),
        first_name: v.optional(v.string()),
        last_name: v.optional(v.string()),
        phone_number: v.optional(v.string()),
        email: v.optional(v.string()),
        dob: v.optional(v.string()),
        is_onboarded: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { clerkId, ...updates } = args;

        // Find the vendor
        const vendor = await ctx.db
            .query("vendors")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
            .first();

        if (!vendor) {
            throw new Error("Vendor not found.");
        }

        // Update only the fields that are provided
        await ctx.db.patch(vendor._id, updates);
    },
});

// Link a business to a vendor
export const linkBusinessToVendor = mutation({
    args: {
        vendorClerkId: v.string(),
        businessId: v.string(),
    },
    handler: async (ctx, args) => {
        const vendor = await ctx.db
            .query("vendors")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", args.vendorClerkId)
            )
            .first();

        if (!vendor) {
            throw new Error("Vendor not found.");
        }

        // Update the vendor with the business ID
        await ctx.db.patch(vendor._id, {
            business_Id: args.businessId,
            is_onboarded: true, // Once a business is linked, consider the vendor onboarded
        });
    },
});

// Update vendor subscription information
export const updateVendorSubscription = mutation({
    args: {
        clerkId: v.string(),
        stripeCustomerId: v.string(),
        stripeSubscriptionId: v.string(),
        subscriptionPlanId: v.string(),
        subscriptionStatus: v.string(),
        subscriptionCurrentPeriodEnd: v.string(),
    },
    handler: async (ctx, args) => {
        const vendor = await ctx.db
            .query("vendors")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (!vendor) {
            throw new Error("Vendor not found.");
        }

        // Update the vendor with subscription information
        await ctx.db.patch(vendor._id, {
            stripeCustomerId: args.stripeCustomerId,
            stripeSubscriptionId: args.stripeSubscriptionId,
            subscriptionPlanId: args.subscriptionPlanId,
            subscriptionStatus: args.subscriptionStatus,
            subscriptionCurrentPeriodEnd: args.subscriptionCurrentPeriodEnd,
        });
    },
});

// Get vendor by Stripe customer ID
export const getVendorByStripeCustomerId = query({
    args: { stripeCustomerId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("vendors")
            .withIndex("by_stripe_customer_id", (q) =>
                q.eq("stripeCustomerId", args.stripeCustomerId)
            )
            .first();
    },
});

// Cancel vendor subscription
export const cancelVendorSubscription = mutation({
    args: {
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {
        const vendor = await ctx.db
            .query("vendors")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (!vendor) {
            throw new Error("Vendor not found.");
        }

        // Update subscription status to canceled
        await ctx.db.patch(vendor._id, {
            subscriptionStatus: "canceled",
        });
    },
});
