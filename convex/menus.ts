import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
    handler: async (ctx) => {
      return await ctx.storage.generateUploadUrl();
    },
  });

export const createMenu = mutation({
    args: {
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
    },
    handler: async (ctx, args) => {
        const newMenuId = await ctx.db.insert("menus", {
            business_id: args.business_id,
            name: args.name,
            menu: args.menu,
        });

        return newMenuId;
    },
});

// UPDATE an existing menu
export const updateMenu = mutation({
    args: {
        menuId: v.id("menus"),
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
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.menuId, {
            name: args.name,
            menu: args.menu,
        });
    },
});

// GET all menus for a business
export const getMenusByBusiness = query({
    args: {
        business_id: v.id("businesses"),
    },
    handler: async (ctx, args) => {
        const menus = await ctx.db
            .query("menus")
            .withIndex("by_business_id", (q) =>
                q.eq("business_id", args.business_id)
            )
            .collect();

        return menus;
    },
});

// GET a single menu by ID
export const getSingleMenu = query({
    args: {
        menuId: v.id("menus"),
    },
    handler: async (ctx, args) => {
        const menu = await ctx.db.get(args.menuId);

        if (!menu) {
            throw new Error("Menu not found.");
        }

        return menu;
    },
});

// DELETE a menu (optional but useful)
export const deleteMenu = mutation({
    args: {
        menuId: v.id("menus"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.menuId);
    },
});
