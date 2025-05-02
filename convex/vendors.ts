// users.ts
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

export const createVendor = mutation({
    args: {
        first_name: v.string(),
        last_name: v.string(),
        phone_number: v.string(), // Optional
        email: v.string(),
        dob: v.optional(v.string()),
        clerkId: v.string(), // Connects Clerk and Convex
    },

    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("vendors")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (existingUser) return;

        await ctx.db.insert("vendors", {
            first_name: args.first_name,
            last_name: args.last_name,
            phone_number: args.phone_number,
            email: args.email,
            dob: args.dob,
            clerkId: args.clerkId,
            is_onboarded: false,
        });
    },
});

export const getUserByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("vendors")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .unique();
        return user;
    },
});

export async function getAuthenticatedVendor(ctx: QueryCtx | MutationCtx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const currentVendor = await ctx.db
        .query("vendors")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
        .first();

    if (!currentVendor) throw new Error("Vendor not found");

    return currentVendor;
}

export const updateClerkInfo = mutation({
    args: {
        clerkId: v.string(),
        first_name: v.string(),
        last_name: v.string(),
        phone_number: v.string(), 
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const vendor = await ctx.db
            .query("vendors")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (!vendor) {
            throw new Error("Vendor not found");
        }

        await ctx.db.patch(vendor._id, {
            first_name: args.first_name,
            last_name: args.last_name,
            phone_number: args.phone_number,
            email: args.email,
        });
    },
});

export const updateOnboardingStatus = mutation({
    args: {
        isOnboarded: v.boolean(),
    },
    handler: async (ctx, args) => {
        const user = await getAuthenticatedVendor(ctx);

        await ctx.db.patch(user._id, {
            is_onboarded: args.isOnboarded,
        });
    },
});

export const updateDOB = mutation({
    args: {
        clerkId: v.string(),
        dob: v.string(),
    },
    handler: async (ctx, args) => {
        const vendor = await ctx.db
            .query("vendors")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (!vendor) {
            throw new Error("Vendor not found");
        }

        await ctx.db.patch(vendor._id, {
            dob: args.dob,
        });
    },
});