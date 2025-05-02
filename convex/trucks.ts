import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTrucksByBusinessId = query({
    args: {
        business_clerk_id: v.optional(v.string()),
        business_convex_id: v.optional(v.id("businesses")),
    },
    handler: async (ctx, args) => {
        if (!args.business_clerk_id && !args.business_convex_id) {
            console.log("No business ID provided.");
        }

        if (args.business_convex_id) {
            // Search by business_convex_id
            return await ctx.db
                .query("trucks")
                .withIndex("by_business_convex_id", (q) =>
                    q.eq("business_convex_id", args.business_convex_id!)
                )
                .collect();
        } else if (args.business_clerk_id) {
            // Search by business_clerk_id
            return await ctx.db
                .query("trucks")
                .withIndex("by_business_clerk_id", (q) =>
                    q.eq("business_clerk_id", args.business_clerk_id!)
                )
                .collect();
        }

        return [];
    },
});

export const createTruck = mutation({
    args: {
        truck_name: v.string(),
        truck_type: v.union(v.literal("Stationary"), v.literal("Mobile")),
        location: v.optional(v.string()),
        latitude: v.optional(v.number()),
        longitude: v.optional(v.number()),
        menu_id: v.id("menus"),
        business_clerk_id: v.string(),
        business_convex_id: v.id("businesses"),
        schedule: v.array(
            v.object({
                day: v.string(),
                start_time: v.string(),
                end_time: v.string(),
                closed: v.boolean(),
            })
        ),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized: User not signed in.");
        }

        // 1. Fetch the business
        const business = await ctx.db
            .query("businesses")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", args.business_clerk_id)
            )
            .unique();

        if (!business) {
            throw new Error("Business not found.");
        }

        // 2. Verify the requesting user is the vendor/admin of the business
        if (business.vendor_clerk_id !== identity.subject) {
            throw new Error(
                "Unauthorized: Only the business admin can create a truck."
            );
        }

        // 3. Insert the new truck
        await ctx.db.insert("trucks", {
            truck_name: args.truck_name,
            business_clerk_id: args.business_clerk_id,
            business_convex_id: args.business_convex_id,
            location: args.location,
            latitude: args.latitude,
            longitude: args.longitude,
            menu_id: args.menu_id,
            open_status: false, // default
            truck_type: args.truck_type,
            categories: business.categories || [],
            rating: 0, // default
            schedule: args.schedule,
        });
    },
});

export const getTruckById = query({
    args: {
        truckId: v.id("trucks"),
    },
    handler: async (ctx, args) => {
        const truck = await ctx.db.get(args.truckId);

        if (!truck) {
            throw new Error("Truck not found.");
        }

        return truck;
    },
});

export const updateOpenStatus = mutation({
    args: {
        truckId: v.id("trucks"),
        open_status: v.boolean(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized: User not signed in.");
        }

        const truck = await ctx.db.get(args.truckId);

        if (!truck) {
            throw new Error("Truck not found.");
        }

        await ctx.db.patch(args.truckId, {
            open_status: args.open_status,
        });
    },
});

export const updateTruckSchedule = mutation({
    args: {
        truckId: v.id("trucks"),
        schedule: v.array(
            v.object({
                day: v.string(),
                start_time: v.string(),
                end_time: v.string(),
                closed: v.boolean(),
            })
        ),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized: Not signed in.");
        }

        const truck = await ctx.db.get(args.truckId);

        if (!truck) {
            throw new Error("Truck not found.");
        }

        await ctx.db.patch(args.truckId, {
            schedule: args.schedule,
        });
    },
});

export const deleteTruck = mutation({
    args: {
        truckId: v.id("trucks"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized: User not signed in.");
        }

        // 1. Fetch the truck
        const truck = await ctx.db.get(args.truckId);
        if (!truck) {
            throw new Error("Truck not found.");
        }

        // 2. Fetch the associated business
        const business = await ctx.db
            .query("businesses")
            .withIndex("by_clerk_id", (q) =>
                q.eq("clerkId", truck.business_clerk_id)
            )
            .unique();

        if (!business) {
            throw new Error("Associated business not found.");
        }

        // 3. Verify the requesting user is the vendor/admin
        if (business.vendor_clerk_id !== identity.subject) {
            throw new Error(
                "Unauthorized: Only the business admin can delete a truck."
            );
        }

        // 4. Delete the truck
        await ctx.db.delete(args.truckId);
    },
});

export const getTrucksInViewport = query({
    args: {
        topLat: v.number(),
        bottomLat: v.number(),
        leftLng: v.number(),
        rightLng: v.number(),
    },
    handler: async (ctx, args) => {
        const { topLat, bottomLat, leftLng, rightLng } = args;

        const trucks = await ctx.db.query("trucks").collect();

        // Only return trucks whose lat/lng is inside the viewport
        const filteredTrucks = trucks.filter((truck) => {
            if (truck.latitude === undefined || truck.longitude === undefined) {
                return false; // skip if missing lat/lng
            }

            return (
                truck.latitude <= topLat &&
                truck.latitude >= bottomLat &&
                truck.longitude >= leftLng &&
                truck.longitude <= rightLng
            );
        });

        return filteredTrucks;
    },
});

export const getTrucksInViewportPublic = query({
    args: {
        topLat: v.number(),
        bottomLat: v.number(),
        leftLng: v.number(),
        rightLng: v.number(),
    },
    handler: async (ctx, args) => {
        const { topLat, bottomLat, leftLng, rightLng } = args;

        const trucks = await ctx.db.query("trucks").collect();

        // Only return trucks whose lat/lng is inside the viewport
        const filteredTrucks = trucks.filter((truck) => {
            if (truck.latitude === undefined || truck.longitude === undefined) {
                return false; // skip if missing lat/lng
            }

            return (
                truck.latitude <= topLat &&
                truck.latitude >= bottomLat &&
                truck.longitude >= leftLng &&
                truck.longitude <= rightLng
            );
        });

        return filteredTrucks;
    },
});
