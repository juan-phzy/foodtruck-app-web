// types.ts

import { Id } from "./convex/_generated/dataModel";
// IMPORTS ABOVE DONT TOUCH
//------------------------------

export interface Hours {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
}

export interface Contact {
    email: string;
    social: {
        instagram: string;
        facebook: string;
        twitter: string;
    };
}

export interface FoodTruck {
    id: string;
    name: string;
    categories: string[];
    location: string;
    type: "Stationary" | "Mobile";
    coordinates: Coordinates;
    hours: Hours;
    rating: number;
    reviewCount: number;
    contact: Contact;
    isOpen: boolean;
    imageUrl: string;
    images: string[];
    distance: number;
    menu: ItemCategory[];
}

export interface ItemCategory {
    category: string;
    items: Item[];
}

export interface Item {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface Rating {
    truckId: string; // ID of the food truck
    rating: number; // Rating given by the user (e.g., 1-5 stars)
    review?: string; // Optional review text
}

//------------- FINAL PRODUCTION TYPES ------------------

// Google Autocomplete Types
export interface GoogleAutocompleteResponse {
    suggestions: Suggestion[];
}

export interface Suggestion {
    placePrediction: PlacePrediction;
}

export interface PlacePrediction {
    placeId: string;
    structuredFormat: StructuredFormat;
}

export interface StructuredFormat {
    mainText: {
        text: string;
        matches: { endOffset: number }[];
    };
    secondaryText: {
        text: string;
    };
}

export interface ParsedSuggestion {
    placeId: string;
    mainText: string;
    secondaryText: string;
}

export type Coordinates = {
    latitude: number;
    longitude: number;
};

// Convex Types
export type PublicUserProfile = {
    _id: Id<"users">;
    _creationTime: number;
    dob?: string | undefined;
    munchLevel?: number | undefined;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    primary_city: string;
    clerkId: string;
    selectedCategories?: string[] | undefined;
};

export type VendorProfile = {
    _id: Id<"vendors">;
    _creationTime: number;
    dob?: string | undefined;
    business_Id?: string | undefined;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    clerkId: string;
    is_onboarded: boolean;
};

export type Business = {
    _creationTime: number;
    _id: Id<"businesses">;
    business_name: string;
    vendor_clerk_id: string;
    clerkId: string;
    categories?: string[] | undefined;
    description?: string | undefined;
    phone_number?: string | undefined;
    logo_url?: string | undefined;
    cover_photo_url?: string | undefined;
    primary_city?: string | undefined;
    website?: string | undefined;
    instagram_link?: string | undefined;
    twitter_link?: string | undefined;
    facebook_link?: string | undefined;
    email_link?: string | undefined;
};

export type Trucks = {
    _creationTime: number;
    _id: Id<"trucks">;
    truck_name: string;
    business_clerk_id: string;
    business_convex_id: Id<"businesses">;
    location?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    menu_id?: Id<"menus"> | undefined;
    open_status: boolean;
    rating?: number | undefined;
    truck_type: "Stationary" | "Mobile";
    categories?: string[] | undefined;
    distance?: number | undefined;
    schedule: {
        day: string;
        start_time: string;
        end_time: string;
        closed: boolean;
    }[];
};

export type Menu = {
    _id: Id<"menus">;
    _creationTime: number;
    name: string;
    business_convex_id: Id<"businesses">;
    menu: {
      category: string;
      items: {
        name: string;
        description: string;
        price: number;
        imageUrl: string;
      }[];
    }[];
  };


export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type ScheduleType = Record<
  DayOfWeek,
  {
    start: string;
    end: string;
    closed: boolean;
  }
>;