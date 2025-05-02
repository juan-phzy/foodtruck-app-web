// // constants.ts
// import { FoodTruck, PublicUserProfile, VendorProfile } from "@/types";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// export type VendorSettingsSection = "personal" | "security" | "notifications" | "contact";

// export type VendorSettingsField = {
//     label: string;
//     link: string;
//     displayValue: (user: any) => string;
//     inputs: {
//       title: string;
//       key: keyof VendorProfile | "password" | "current_password";
//       keyboardType: "default" | "numeric" | "email-address";
//     }[];
//   };

// // types.ts (optional separation)
// export type UserSettingsSection = "personal" | "security" | "notifications" | "contact";

// export type UserSettingsField = {
//   label: string;
//   link: string;
//   displayValue: (user: any) => string;
//   inputs: {
//     title: string;
//     key: keyof PublicUserProfile | "password" | "current_password";
//     keyboardType: "default" | "numeric" | "email-address";
//   }[];
// };

// export type UserSettingsConfigType = Record<
//   UserSettingsSection,
//   {
//     iconName: keyof typeof MaterialCommunityIcons.glyphMap;
//     setting: string;
//     link: UserSettingsSection;
//     title: string;
//     fields: UserSettingsField[];
//   }
// >;

// // mergedSettingsConfig.ts
// export const USER_SETTINGS_CONFIG: UserSettingsConfigType = {
//   personal: {
//     iconName: "account-edit",
//     setting: "Edit Profile",
//     link: "personal",
//     title: "Edit Profile",
//     fields: [
//       {
//         label: "Name",
//         link: "name",
//         displayValue: (user) => `${user.first_name} ${user.last_name}`,
//         inputs: [
//           { title: "First Name", key: "first_name", keyboardType: "default" },
//           { title: "Last Name", key: "last_name", keyboardType: "default" },
//         ],
//       },
//       {
//         label: "Date of Birth",
//         link: "dob",
//         displayValue: (user) => user.dob == "" ? "Not Set" : user.dob ?? "Not Set",
//         inputs: [
//           { title: "Date of Birth", key: "dob", keyboardType: "numeric" },
//         ],
//       },
//       {
//         label: "Primary City",
//         link: "city",
//         displayValue: (user) => user.primary_city ?? "Not Set",
//         inputs: [
//           { title: "Primary City", key: "primary_city", keyboardType: "default" },
//         ],
//       },
//     ],
//   },
//   security: {
//     iconName: "lock",
//     setting: "Security",
//     link: "security",
//     title: "Security Settings",
//     fields: [
//       {
//         label: "Password",
//         link: "password",
//         displayValue: () => "********",
//         inputs: [
//           { title: "Current Password", key: "current_password", keyboardType: "default" },
//           { title: "New Password", key: "password", keyboardType: "default" },
//         ],
//       },
//     ],
//   },
//   notifications: {
//     iconName: "bell",
//     setting: "Notifications",
//     link: "notifications",
//     title: "Notifications",
//     fields: [
//       {
//         label: "Notification Preferences",
//         link: "preferences",
//         displayValue: () => "Manage",
//         inputs: [], // e.g. toggle switches could be handled differently
//       },
//     ],
//   },
//   contact: {
//     iconName: "phone",
//     setting: "Contact",
//     link: "contact",
//     title: "Contact Information",
//     fields: [
//       {
//         label: "Email",
//         link: "email",
//         displayValue: (user) => user.email,
//         inputs: [
//           { title: "Email", key: "email", keyboardType: "email-address" },
//         ],
//       },
//       {
//         label: "Phone Number",
//         link: "phone",
//         displayValue: (user) => user.phone_number ?? "Not Set",
//         inputs: [
//           { title: "Phone Number", key: "phone_number", keyboardType: "numeric" },
//         ],
//       },
//     ],
//   },
// };


// export type VendorSettingsConfigType = Record<
//   VendorSettingsSection,
//   {
//     iconName:  keyof typeof MaterialCommunityIcons.glyphMap;
//     setting: string;
//     link: UserSettingsSection;
//     title: string;
//     fields: VendorSettingsField[];
//   }
// >;

// // mergedSettingsConfig.ts
// export const VENDOR_SETTINGS_CONFIG: VendorSettingsConfigType = {
//   personal: {
//     iconName: "account-edit",
//     setting: "Edit Profile",
//     link: "personal",
//     title: "Edit Profile",
//     fields: [
//       {
//         label: "Name",
//         link: "name",
//         displayValue: (user) => `${user.first_name} ${user.last_name}`,
//         inputs: [
//           { title: "First Name", key: "first_name", keyboardType: "default" },
//           { title: "Last Name", key: "last_name", keyboardType: "default" },
//         ],
//       },
//       {
//         label: "Date of Birth",
//         link: "dob",
//         displayValue: (user) => user.dob == "" ? "Not Set" : user.dob ?? "Not Set",
//         inputs: [
//           { title: "Date of Birth", key: "dob", keyboardType: "numeric" },
//         ],
//       },
//     ],
//   },
//   security: {
//     iconName: "lock",
//     setting: "Security",
//     link: "security",
//     title: "Security Settings",
//     fields: [
//       {
//         label: "Password",
//         link: "password",
//         displayValue: () => "********",
//         inputs: [
//           { title: "Current Password", key: "current_password", keyboardType: "default" },
//           { title: "New Password", key: "password", keyboardType: "default" },
//         ],
//       },
//     ],
//   },
//   notifications: {
//     iconName: "bell",
//     setting: "Notifications",
//     link: "notifications",
//     title: "Notifications",
//     fields: [
//       {
//         label: "Notification Preferences",
//         link: "preferences",
//         displayValue: () => "Manage",
//         inputs: [], // e.g. toggle switches could be handled differently
//       },
//     ],
//   },
//   contact: {
//     iconName: "phone",
//     setting: "Contact",
//     link: "contact",
//     title: "Contact Information",
//     fields: [
//       {
//         label: "Email",
//         link: "email",
//         displayValue: (user) => user.email,
//         inputs: [
//           { title: "Email", key: "email", keyboardType: "email-address" },
//         ],
//       },
//       {
//         label: "Phone Number",
//         link: "phone",
//         displayValue: (user) => user.phone_number ?? "Not Set",
//         inputs: [
//           { title: "Phone Number", key: "phone_number", keyboardType: "numeric" },
//         ],
//       },
//     ],
//   },
// };

// export const MANAGE_SCREEN_USERS = [
//     {
//         name: "Juan Hernandez",
//         type: "Admin",
//     },
//     {
//         name: "Maria Garcia",
//         type: "User",
//     },
//     {
//         name: "Carlos Lopez",
//         type: "User",
//     },
//     {
//         name: "Sofia Martinez",
//         type: "Admin",
//     },
//     {
//         name: "Luis Rodriguez",
//         type: "User",
//     },
//     {
//         name: "Ana Torres",
//         type: "User",
//     },
// ];

// export const LOCATION_SCREEN_TRUCKS = [
//     {
//         id: 1,
//         name: "Taco Truck 1",
//         status: true,
//         type: "Truck",
//     },
//     {
//         id: 2,
//         name: "Taco Truck 2",
//         status: false,
//         type: "Truck",
//     },
//     {
//         id: 3,
//         name: "Taco Stand 1",
//         status: true,
//         type: "Stand",
//     },
//     {
//         id: 4,
//         name: "Taco Truck 3",
//         status: false,
//         type: "Truck",
//     },
//     {
//         id: 5,
//         name: "Taco Stand 2",
//         status: true,
//         type: "Stand",
//     },
//     {
//         id: 6,
//         name: "Taco Truck 4",
//         status: false,
//         type: "Truck",
//     },
// ];

// export const FORM_FIELDS = [
//     { label: "First Name", placeholder: "Enter your first name" },
//     { label: "Last Name", placeholder: "Enter your last name" },
//     { label: "Date of Birth", placeholder: "mm/dd/yyyy" },
//     { label: "Primary City", placeholder: "Enter your primary city" },
//     { label: "Email", placeholder: "you@email.com" },
//     { label: "Confirm Email", placeholder: "you@email.com" },
//     { label: "Phone Number", placeholder: "(123)-456-7890" },
// ];

// export type ProfileSection = {
//     name: string;
//     icon: keyof typeof MaterialCommunityIcons.glyphMap;
//     link: string;
// };

// export const PROFILE_SECTIONS: ProfileSection[] = [
//     { name: "Favorites", icon: "bookmark-outline", link: "favorites" },
//     {
//         name: "Recently Viewed",
//         icon: "clock-time-three-outline",
//         link: "recent",
//     },
//     { name: "Your Ratings", icon: "star-outline", link: "ratings" },
//     {
//         name: "Favorite Caegories",
//         icon: "food",
//         link: "categories",
//     },
// ];

// export type MunchUser = {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//     password: string;
//     munchLevel: number;
//     favoriteTrucks: number[];
//     reviews: number[];
//     recentlyViewed: number[];
//     favoriteCategories: string[];
// };

// type SearchSection = {
//     name: string;
//     trucks: number[];
// };

// export const SEARCH_SECTIONS: SearchSection[] = [
//     {
//         name: "Our Reccomendations",
//         trucks: [1, 2, 3],
//     },
//     {
//         name: "Top Rated",
//         trucks: [4, 5, 6],
//     },
//     {
//         name: "New On The Scene",
//         trucks: [7, 8, 9, 10],
//     },
// ];

// type Category = {
//     name: string;
//     url: string;
// };

// export const CATEGORIES: Category[] = [
//     {
//         name: "American",
//         url: "https://cdn-icons-png.flaticon.com/128/206/206626.png",
//     },
//     {
//         name: "Burgers",
//         url: "https://cdn-icons-png.flaticon.com/128/878/878052.png",
//     },
//     {
//         name: "Mexican",
//         url: "https://cdn-icons-png.flaticon.com/128/12360/12360219.png",
//     },
//     {
//         name: "Tacos",
//         url: "https://cdn-icons-png.flaticon.com/128/537/537386.png",
//     },
//     {
//         name: "BBQ",
//         url: "https://cdn-icons-png.flaticon.com/128/3808/3808804.png",
//     },
//     {
//         name: "Ribs",
//         url: "https://cdn-icons-png.flaticon.com/128/6332/6332512.png",
//     },
//     {
//         name: "Italian",
//         url: "https://cdn-icons-png.flaticon.com/128/330/330672.png",
//     },
//     {
//         name: "Pizza",
//         url: "https://cdn-icons-png.flaticon.com/128/3595/3595455.png",
//     },
//     {
//         name: "Vegan",
//         url: "https://cdn-icons-png.flaticon.com/128/16206/16206765.png",
//     },
//     {
//         name: "Healthy",
//         url: "https://cdn-icons-png.flaticon.com/128/706/706164.png",
//     },
//     {
//         name: "Japanese",
//         url: "https://cdn-icons-png.flaticon.com/128/14007/14007506.png",
//     },
//     {
//         name: "Sushi",
//         url: "https://cdn-icons-png.flaticon.com/128/2674/2674064.png",
//     },
//     {
//         name: "Seafood",
//         url: "https://cdn-icons-png.flaticon.com/128/3082/3082055.png",
//     },
//     {
//         name: "French",
//         url: "https://cdn-icons-png.flaticon.com/128/330/330490.png",
//     },
//     {
//         name: "Desserts",
//         url: "https://cdn-icons-png.flaticon.com/128/3081/3081903.png",
//     },
//     {
//         name: "Crepes",
//         url: "https://cdn-icons-png.flaticon.com/128/168/168351.png",
//     },
//     {
//         name: "Mediterranean",
//         url: "https://cdn-icons-png.flaticon.com/128/5861/5861566.png",
//     },
//     {
//         name: "Kebabs",
//         url: "https://cdn-icons-png.flaticon.com/128/4711/4711382.png",
//     },
//     {
//         name: "Middle Eastern",
//         url: "https://cdn-icons-png.flaticon.com/128/706/706893.png",
//     },
//     {
//         name: "Chinese",
//         url: "https://cdn-icons-png.flaticon.com/128/13482/13482170.png",
//     },
//     {
//         name: "Dim Sum",
//         url: "https://cdn-icons-png.flaticon.com/128/7499/7499405.png",
//     },
//     {
//         name: "Dumplings",
//         url: "https://cdn-icons-png.flaticon.com/128/673/673530.png",
//     },
//     {
//         name: "Fast Food",
//         url: "https://cdn-icons-png.flaticon.com/128/737/737967.png",
//     },
//     {
//         name: "Pasta",
//         url: "https://cdn-icons-png.flaticon.com/128/3480/3480618.png",
//     },
// ];

// export const FOOD_TRUCKS: FoodTruck[] = [
//     {
//         id: "1",
//         name: "Whataburger",
//         categories: ["American", "Burgers"],
//         location: "123 Sesame St. NY, NY",
//         type: "Stationary",
//         coordinates: {
//             latitude: 40.769842169115456,
//             longitude: -73.98803807961161,
//         },
//         hours: {
//             sunday: "09:00 AM - 09:00 PM",
//             monday: "09:00 AM - 09:00 PM",
//             tuesday: "09:00 AM - 09:00 PM",
//             wednesday: "09:00 AM - 09:00 PM",
//             thursday: "09:00 AM - 09:00 PM",
//             friday: "09:00 AM - 09:00 PM",
//             saturday: "09:00 AM - 09:00 PM",
//         },
//         rating: 4.0,
//         reviewCount: 443,
//         contact: {
//             email: "foodtruck@whataburger.com",
//             social: {
//                 instagram: "@whataburgerinsta",
//                 facebook: "@whataburgerfacebook",
//                 twitter: "@whataburgerX",
//             },
//         },
//         isOpen: true,
//         imageUrl:
//             "https://s.hdnux.com/photos/01/13/34/22/19776684/3/1200x0.jpg",
//         images: [
//             "https://th.bing.com/th/id/OIP.EUSnARUOq1Ed8z9WWLRb7AHaE8?w=257&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
//             "https://th.bing.com/th/id/OIP.oHVCdsNYJjLKFop5A_X-7AHaE8?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
//             "https://th.bing.com/th/id/OIP.avyUpTdLZLZFC2gbyAE51gHaFj?w=207&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
//         ],
//         distance: 0.29,
//         menu: [
//             {
//                 category: "Classic Burgers",
//                 items: [
//                     {
//                         name: "Cheeseburger",
//                         description:
//                             "Juicy beef patty topped with melted cheddar cheese, lettuce, tomato, and pickles.",
//                         price: 10.99,
//                         imageUrl:
//                             "https://www.foodrepublic.com/wp-content/uploads/2012/03/033_FR11785.jpg",
//                     },
//                     {
//                         name: "Bacon Burger",
//                         description:
//                             "Beef patty topped with crispy bacon, lettuce, and a special house sauce.",
//                         price: 12.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.JGigDSijh-lKRw6YaZQGVwHaDs?rs=1&pid=ImgDetMain",
//                     },
//                 ],
//             },
//             {
//                 category: "Gourmet Burgers",
//                 items: [
//                     {
//                         name: "Mushroom Swiss Burger",
//                         description:
//                             "Beef patty topped with sautéed mushrooms and Swiss cheese.",
//                         price: 13.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.qaM3W2UhxEq9XFBJMGF7vwHaE8?rs=1&pid=ImgDetMain",
//                     },
//                     {
//                         name: "Spicy Jalapeño Burger",
//                         description:
//                             "Beef patty with spicy jalapeños, pepper jack cheese, and chipotle mayo.",
//                         price: 11.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.r1CzwUrnuV3Rt_ZNLkd3kAHaFj?rs=1&pid=ImgDetMain",
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: "2",
//         name: "Taco Fiesta",
//         categories: ["Mexican", "Tacos"],
//         location: "456 Taco Ln, NY, NY",
//         type: "Stationary",
//         coordinates: {
//             latitude: 40.76603584958277,
//             longitude: -73.98339407734088,
//         },
//         hours: {
//             sunday: "08:00 AM - 08:00 PM",
//             monday: "08:00 AM - 08:00 PM",
//             tuesday: "08:00 AM - 08:00 PM",
//             wednesday: "08:00 AM - 08:00 PM",
//             thursday: "08:00 AM - 08:00 PM",
//             friday: "08:00 AM - 08:00 PM",
//             saturday: "08:00 AM - 08:00 PM",
//         },
//         rating: 4.5,
//         reviewCount: 123,
//         contact: {
//             email: "tacofiesta@foodtruck.com",
//             social: {
//                 instagram: "@tacofiesta",
//                 facebook: "@tacofiesta",
//                 twitter: "@tacofiesta",
//             },
//         },
//         isOpen: false,
//         imageUrl:
//             "https://www.ctfoodtrucks.com/wp-content/uploads/2020/02/fiesta-taco-truck-e1562690144706.jpg",
//         images: [
//             "https://th.bing.com/th/id/OIP.O6iZ5H18dNPmWot1X7uqMwAAAA?w=254&h=190&c=7&r=0&o=5&dpr=1.3&pid=1.7",
//             "https://th.bing.com/th/id/OIP.em5-7XmFYToVpnuIyf5YnQHaFj?w=238&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
//             "https://th.bing.com/th/id/OIP.3mqB4hQyCFcWbIMgn4Xc-gAAAA?w=225&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
//         ],
//         distance: 0.26,
//         menu: [
//             {
//                 category: "Classic Tacos",
//                 items: [
//                     {
//                         name: "Beef Taco",
//                         description:
//                             "Seasoned ground beef, lettuce, cheddar cheese, and diced tomatoes in a soft tortilla.",
//                         price: 3.99,
//                         imageUrl:
//                             "https://www.thecookierookie.com/wp-content/uploads/2020/01/crockpot-taco-meat-beef-tacos-6-of-8-1.jpg",
//                     },
//                     {
//                         name: "Chicken Taco",
//                         description:
//                             "Grilled chicken, pico de gallo, and shredded lettuce in a warm tortilla.",
//                         price: 4.49,
//                         imageUrl:
//                             "https://butteryourbiscuit.com/wp-content/uploads/2020/10/baked-chicken-tacos-1.jpeg",
//                     },
//                 ],
//             },
//             {
//                 category: "Gourmet Tacos",
//                 items: [
//                     {
//                         name: "Fish Taco",
//                         description:
//                             "Crispy fried fish, cabbage slaw, and tangy lime crema in a soft tortilla.",
//                         price: 5.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/R.a128422830f95e91ac645e879148c305?rik=sjfaFmBBvs8CUA&pid=ImgRaw&r=0",
//                     },
//                     {
//                         name: "Shrimp Taco",
//                         description:
//                             "Spicy grilled shrimp, avocado slices, and cilantro on a warm tortilla.",
//                         price: 6.49,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.ZjX1bH4Hvvwxxn7WBRrBvgHaLH?rs=1&pid=ImgDetMain",
//                     },
//                 ],
//             },
//             {
//                 category: "Classic Tacos",
//                 items: [
//                     {
//                         name: "Beef Taco",
//                         description:
//                             "Seasoned ground beef, lettuce, cheddar cheese, and diced tomatoes in a soft tortilla.",
//                         price: 3.99,
//                         imageUrl:
//                             "https://www.thecookierookie.com/wp-content/uploads/2020/01/crockpot-taco-meat-beef-tacos-6-of-8-1.jpg",
//                     },
//                     {
//                         name: "Chicken Taco",
//                         description:
//                             "Grilled chicken, pico de gallo, and shredded lettuce in a warm tortilla.",
//                         price: 4.49,
//                         imageUrl:
//                             "https://butteryourbiscuit.com/wp-content/uploads/2020/10/baked-chicken-tacos-1.jpeg",
//                     },
//                 ],
//             },
//             {
//                 category: "Gourmet Tacos",
//                 items: [
//                     {
//                         name: "Fish Taco",
//                         description:
//                             "Crispy fried fish, cabbage slaw, and tangy lime crema in a soft tortilla.",
//                         price: 5.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/R.a128422830f95e91ac645e879148c305?rik=sjfaFmBBvs8CUA&pid=ImgRaw&r=0",
//                     },
//                     {
//                         name: "Shrimp Taco",
//                         description:
//                             "Spicy grilled shrimp, avocado slices, and cilantro on a warm tortilla.",
//                         price: 6.49,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.ZjX1bH4Hvvwxxn7WBRrBvgHaLH?rs=1&pid=ImgDetMain",
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: "3",
//         name: "Rolling BBQ",
//         categories: ["BBQ", "Ribs"],
//         location: "789 BBQ Blvd, Dallas, TX",
//         type: "Stationary",
//         coordinates: {
//             latitude: 40.7648366742179,
//             longitude: -73.97842882891602,
//         },
//         hours: {
//             sunday: "11:00 AM - 10:00 PM",
//             monday: "11:00 AM - 10:00 PM",
//             tuesday: "11:00 AM - 10:00 PM",
//             wednesday: "11:00 AM - 10:00 PM",
//             thursday: "11:00 AM - 10:00 PM",
//             friday: "11:00 AM - 11:00 PM",
//             saturday: "11:00 AM - 11:00 PM",
//         },
//         rating: 4.8,
//         reviewCount: 350,
//         contact: {
//             email: "rollingbbq@foodtruck.com",
//             social: {
//                 instagram: "@rollingbbq",
//                 facebook: "@rollingbbq",
//                 twitter: "@rollingbbq",
//             },
//         },
//         isOpen: true,
//         imageUrl:
//             "https://www.ctfoodtrucks.com/wp-content/uploads/2016/04/pig-rig-bbq-food-truck-1.jpg",
//         images: [
//             "https://th.bing.com/th/id/OIP.F_MD1ZwYccaJbEc4OdN05AHaFj?rs=1&pid=ImgDetMain",
//             "https://th.bing.com/th/id/OIP.Z7FioLpsCk60OfuoevvjawHaJ4?pid=ImgDet&w=474&h=632&rs=1",
//             "https://th.bing.com/th/id/OIP.1Y6VTuruKYqwA5c7n-xGLAHaFj?pid=ImgDet&w=474&h=355&rs=1",
//         ],
//         distance: 0.4,
//         menu: [
//             {
//                 category: "Classic Ribs",
//                 items: [
//                     {
//                         name: "BBQ Pork Ribs",
//                         description:
//                             "Slow-cooked pork ribs glazed with a smoky BBQ sauce.",
//                         price: 14.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/R.634d586d591cff2083efec97f5768510?rik=WJp7wM8uDk4t6A&pid=ImgRaw&r=0",
//                     },
//                     {
//                         name: "Honey-Glazed Ribs",
//                         description:
//                             "Tender ribs coated in a sweet and sticky honey glaze.",
//                         price: 15.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.p7QW1pFrPnl-qA3Z1rRVnwHaKT?rs=1&pid=ImgDetMain",
//                     },
//                 ],
//             },
//             {
//                 category: "Specialty Ribs",
//                 items: [
//                     {
//                         name: "Spicy Cajun Ribs",
//                         description:
//                             "Ribs seasoned with Cajun spices and served with a tangy dipping sauce.",
//                         price: 16.49,
//                         imageUrl:
//                             "https://i0.wp.com/frugalhausfrau.com/wp-content/uploads/2020/06/Sweet-Spicy-Cajun-Spare-Ribs-4.jpg?fit=923%2C1024&ssl=1",
//                     },
//                     {
//                         name: "Asian Sticky Ribs",
//                         description:
//                             "Ribs marinated in a soy-ginger glaze and topped with sesame seeds.",
//                         price: 16.99,
//                         imageUrl:
//                             "https://apressurecooker.com/wp-content/uploads/2021/02/chinese-sticky-ribs-recipe-1152x1536.jpg",
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: "4",
//         name: "Pizza Paradise",
//         categories: ["Italian", "Pizza"],
//         location: "321 Pizza Ln, San Francisco, CA",
//         type: "Mobile",
//         coordinates: {
//             latitude: 40.77183296465364,
//             longitude: -73.97941631600894,
//         },
//         hours: {
//             sunday: "10:00 AM - 09:00 PM",
//             monday: "10:00 AM - 09:00 PM",
//             tuesday: "10:00 AM - 09:00 PM",
//             wednesday: "10:00 AM - 09:00 PM",
//             thursday: "10:00 AM - 09:00 PM",
//             friday: "10:00 AM - 10:00 PM",
//             saturday: "10:00 AM - 10:00 PM",
//         },
//         rating: 4.6,
//         reviewCount: 290,
//         contact: {
//             email: "pizzaparadise@foodtruck.com",
//             social: {
//                 instagram: "@pizzaparadise",
//                 facebook: "@pizzaparadise",
//                 twitter: "@pizzaparadise",
//             },
//         },
//         isOpen: false,
//         imageUrl:
//             "https://th.bing.com/th/id/OIP.7PVZoRvuBGKzOqga_FtoUQHaE9?rs=1&pid=ImgDetMain",
//         images: [
//             "https://cruisingkitchens.com/wp-content/uploads/2022/06/stouts-pizza-custom-food-truck-pizza-oven-mobile-truck-8-1024x683.jpg",
//             "https://th.bing.com/th/id/OIP.pGKTM5_vyfCfPEZTDVQ9MQHaE8?pid=ImgDet&w=474&h=316&rs=1",
//             "https://th.bing.com/th/id/OIP.X68S1k8TOEp_UnPFwGvbZQAAAA?pid=ImgDet&w=474&h=316&rs=1",
//         ],
//         distance: 0.22,
//         menu: [
//             {
//                 category: "Classic Pizzas",
//                 items: [
//                     {
//                         name: "Margherita Pizza",
//                         description:
//                             "Fresh mozzarella, tomato sauce, and basil on a crispy crust.",
//                         price: 10.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.A_7IadfotxHc56iM-XuY5AHaJd?rs=1&pid=ImgDetMain",
//                     },
//                     {
//                         name: "Pepperoni Pizza",
//                         description:
//                             "Classic pepperoni slices with mozzarella and tomato sauce.",
//                         price: 12.99,
//                         imageUrl:
//                             "https://fromthehorsesmouth.org.uk/wp-content/uploads/2019/10/easy-pepperoni-pizza-lead-4-731x1024.jpg",
//                     },
//                 ],
//             },
//             {
//                 category: "Specialty Pizzas",
//                 items: [
//                     {
//                         name: "BBQ Chicken Pizza",
//                         description:
//                             "Grilled chicken, BBQ sauce, red onions, and mozzarella.",
//                         price: 13.99,
//                         imageUrl:
//                             "https://lilluna.com/wp-content/uploads/2014/05/barbecue-chicken-pizza-resize-7.jpg",
//                     },
//                     {
//                         name: "Veggie Supreme Pizza",
//                         description:
//                             "A mix of fresh vegetables, mozzarella, and tomato sauce.",
//                         price: 12.49,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.e8DKB-liIZTbNTNwfw1m0gHaE8?rs=1&pid=ImgDetMain",
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: "5",
//         name: "Vegan Bites",
//         categories: ["Vegan", "Healthy"],
//         location: "654 Greenway St, Boulder, CO",
//         type: "Stationary",
//         coordinates: {
//             latitude: 40.772749665368515,
//             longitude: -73.9891319148263,
//         },
//         hours: {
//             sunday: "08:00 AM - 06:00 PM",
//             monday: "08:00 AM - 06:00 PM",
//             tuesday: "08:00 AM - 06:00 PM",
//             wednesday: "08:00 AM - 06:00 PM",
//             thursday: "08:00 AM - 06:00 PM",
//             friday: "08:00 AM - 06:00 PM",
//             saturday: "08:00 AM - 06:00 PM",
//         },
//         rating: 4.3,
//         reviewCount: 210,
//         contact: {
//             email: "veganbites@foodtruck.com",
//             social: {
//                 instagram: "@veganbites",
//                 facebook: "@veganbites",
//                 twitter: "@veganbites",
//             },
//         },
//         isOpen: true,
//         imageUrl:
//             "https://i.pinimg.com/originals/48/20/2b/48202bcd744a4d309014413bcbd0370a.jpg",
//         images: [
//             "https://images.happycow.net/venues/1024/97/58/hcmp97588_291119.jpeg",
//             "https://th.bing.com/th/id/OIP.-FNJqmddnSgvOmxncUh0BwHaHa?pid=ImgDet&w=474&h=474&rs=1",
//             "https://th.bing.com/th/id/OIP.Nfe9RvR9v1dVR5OtNwA1ugHaHa?pid=ImgDet&w=474&h=474&rs=1",
//         ],
//         distance: 0.41,
//         menu: [
//             {
//                 category: "Vegan Bowls",
//                 items: [
//                     {
//                         name: "Quinoa Power Bowl",
//                         description:
//                             "Quinoa, roasted vegetables, and tahini dressing.",
//                         price: 9.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.rIlbUwt1Fam_Vp4KdX_jPwHaLH?rs=1&pid=ImgDetMain",
//                     },
//                     {
//                         name: "Avocado Chickpea Salad",
//                         description:
//                             "Chickpeas, avocado, cucumber, and lime dressing.",
//                         price: 8.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/R.52dcb4e753efcd697e91922821a4ee08?rik=V6PPOUilATtMtw&pid=ImgRaw&r=0",
//                     },
//                 ],
//             },
//             {
//                 category: "Vegan Wraps",
//                 items: [
//                     {
//                         name: "Mediterranean Falafel Wrap",
//                         description:
//                             "Falafel, hummus, lettuce, and tomato in a soft wrap.",
//                         price: 7.99,
//                         imageUrl:
//                             "https://pickyeaterblog.com/wp-content/uploads/2022/11/healthy-falafel-wrap-recipe.jpg",
//                     },
//                     {
//                         name: "Spicy Tofu Wrap",
//                         description:
//                             "Grilled tofu, spicy mayo, and fresh veggies.",
//                         price: 8.49,
//                         imageUrl:
//                             "https://www.ourhappymess.com/wp-content/uploads/2022/01/Tofu-Wrap-1_.jpg",
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: "6",
//         name: "Sushi on Wheels",
//         categories: ["Japanese", "Sushi", "Seafood"],
//         location: "123 Sushi Blvd, Seattle, WA",
//         type: "Mobile",
//         coordinates: {
//             latitude: 40.76686326170899,
//             longitude: -73.98941860462746,
//         },
//         hours: {
//             sunday: "12:00 PM - 08:00 PM",
//             monday: "12:00 PM - 08:00 PM",
//             tuesday: "12:00 PM - 08:00 PM",
//             wednesday: "12:00 PM - 08:00 PM",
//             thursday: "12:00 PM - 08:00 PM",
//             friday: "12:00 PM - 09:00 PM",
//             saturday: "12:00 PM - 09:00 PM",
//         },
//         rating: 4.9,
//         reviewCount: 510,
//         contact: {
//             email: "sushiwheels@foodtruck.com",
//             social: {
//                 instagram: "@sushiwheels",
//                 facebook: "@sushiwheels",
//                 twitter: "@sushiwheels",
//             },
//         },
//         isOpen: true,
//         imageUrl:
//             "https://th.bing.com/th/id/OIP.SlU9VsRqRftxqDNn97pl0wAAAA?rs=1&pid=ImgDetMain",
//         images: [
//             "https://th.bing.com/th/id/OIP.SqE8Pzm9_lqoClmh5030dwHaJ4?rs=1&pid=ImgDetMain",
//             "https://th.bing.com/th/id/OIP.4M8qC-ilA4lc-55vhE8chAHaJ4?pid=ImgDet&w=474&h=632&rs=1",
//             "https://th.bing.com/th/id/OIP.COHUmm0ZKLswp-u9TDQDgwHaJQ?pid=ImgDet&w=474&h=592&rs=1",
//         ],
//         distance: 0.41,
//         menu: [
//             {
//                 category: "Classic Sushi Rolls",
//                 items: [
//                     {
//                         name: "California Roll",
//                         description:
//                             "Crab stick, avocado, cucumber, and sesame seeds.",
//                         price: 8.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/R.3155b2dc431681ad2439a23366f4d5a4?rik=mZVvtdX2CmFrZg&pid=ImgRaw&r=0",
//                     },
//                     {
//                         name: "Spicy Tuna Roll",
//                         description: "Fresh tuna, spicy mayo, and scallions.",
//                         price: 9.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.E_drMaie2v0Sl0ruy38GpAHaE8?rs=1&pid=ImgDetMain",
//                     },
//                 ],
//             },
//             {
//                 category: "Specialty Sushi Rolls",
//                 items: [
//                     {
//                         name: "Dragon Roll",
//                         description: "Eel, cucumber, avocado, and unagi sauce.",
//                         price: 12.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/R.573094b94e1a32bd0a5053ee34c731bd?rik=vksMic%2fa22KYOA&pid=ImgRaw&r=0",
//                     },
//                     {
//                         name: "Rainbow Roll",
//                         description:
//                             "California roll topped with assorted sashimi.",
//                         price: 13.99,
//                         imageUrl:
//                             "https://izzycooking.com/wp-content/uploads/2021/03/Rainbow-Roll-1.jpg",
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: "7",
//         name: "Crepe Delight",
//         categories: ["French", "Desserts", "Crepes"],
//         location: "456 Sweet St, New Orleans, LA",
//         type: "Mobile",
//         coordinates: {
//             latitude: 40.77156760155993,
//             longitude: -73.98253804939942,
//         },
//         hours: {
//             sunday: "09:00 AM - 05:00 PM",
//             monday: "09:00 AM - 05:00 PM",
//             tuesday: "09:00 AM - 05:00 PM",
//             wednesday: "09:00 AM - 05:00 PM",
//             thursday: "09:00 AM - 05:00 PM",
//             friday: "09:00 AM - 05:00 PM",
//             saturday: "09:00 AM - 05:00 PM",
//         },
//         rating: 4.7,
//         reviewCount: 230,
//         contact: {
//             email: "crepedelight@foodtruck.com",
//             social: {
//                 instagram: "@crepedelight",
//                 facebook: "@crepedelight",
//                 twitter: "@crepedelight",
//             },
//         },
//         isOpen: true,
//         imageUrl:
//             "https://i.pinimg.com/originals/ba/c3/34/bac334508bbade6a4196cd2523c933bc.jpg",
//         images: [
//             "https://foodtruckya.eu-central-1.linodeobjects.com/service/103/image/964/7e4f5208-edd1-4a72-8d5f-53a8aa486314.jpeg",
//             "https://th.bing.com/th/id/OIP.lY3lnT68HzxLHKhEVfzbpAHaJR?pid=ImgDet&w=474&h=593&rs=1",
//             "https://th.bing.com/th/id/OIP.WZWWEGSETiaj5dOob2PmSQHaHa?pid=ImgDet&w=474&h=474&rs=1",
//         ],
//         distance: 0.13,
//         menu: [
//             {
//                 category: "Sweet Crepes",
//                 items: [
//                     {
//                         name: "Nutella Banana Crepe",
//                         description:
//                             "Filled with creamy Nutella and fresh banana slices.",
//                         price: 7.99,
//                         imageUrl:
//                             "https://bellyfull.net/wp-content/uploads/2021/07/Banana-Nutella-Crepes-blog-3.jpg",
//                     },
//                     {
//                         name: "Strawberry Delight Crepe",
//                         description:
//                             "Stuffed with strawberries, whipped cream, and a drizzle of chocolate sauce.",
//                         price: 8.99,
//                         imageUrl:
//                             "https://www.tasteofhome.com/wp-content/uploads/2018/01/Strawberry-Creme-Crepes_exps25512_BB2406671B09_02_3b_RMS.jpg",
//                     },
//                 ],
//             },
//             {
//                 category: "Savory Crepes",
//                 items: [
//                     {
//                         name: "Ham and Cheese Crepe",
//                         description:
//                             "Filled with smoked ham and melted Swiss cheese.",
//                         price: 9.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.bRewNRSmSIMIsNldZPNhogHaHa?rs=1&pid=ImgDetMain",
//                     },
//                     {
//                         name: "Spinach and Feta Crepe",
//                         description:
//                             "Stuffed with sautéed spinach and crumbled feta cheese.",
//                         price: 10.99,
//                         imageUrl:
//                             "https://cottagelife.com/wp-content/uploads/2022/06/AdobeStock_98490564-1.jpeg",
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: "8",
//         name: "Kebab Junction",
//         categories: ["Kebabs", "Middle Eastern"],
//         location: "789 Kebab Ln, Chicago, IL",
//         type: "Stationary",
//         coordinates: {
//             latitude: 40.76498143251705,
//             longitude: -73.97464688424562,
//         },
//         hours: {
//             sunday: "10:00 AM - 08:00 PM",
//             monday: "10:00 AM - 08:00 PM",
//             tuesday: "10:00 AM - 08:00 PM",
//             wednesday: "10:00 AM - 08:00 PM",
//             thursday: "10:00 AM - 08:00 PM",
//             friday: "10:00 AM - 09:00 PM",
//             saturday: "10:00 AM - 09:00 PM",
//         },
//         rating: 4.5,
//         reviewCount: 320,
//         contact: {
//             email: "kebabjunction@foodtruck.com",
//             social: {
//                 instagram: "@kebabjunction",
//                 facebook: "@kebabjunction",
//                 twitter: "@kebabjunction",
//             },
//         },
//         isOpen: true,
//         imageUrl:
//             "https://i.pinimg.com/474x/4b/ef/28/4bef285a21155f431926326643b5af88--food-carts-for-sale-electric-foods.jpg",
//         images: [
//             "https://th.bing.com/th/id/R.09917c20e7b3d4e4295aca38721ad17a?rik=3id8Gtf7WeDVeg&riu=http%3a%2f%2fbookmylot.com%2fwp-content%2fgallery%2fdoner-kebob%2fdoner-kabob-food-truck-los-angeles-food-trucks-la-01.jpg&ehk=UJfyevcxc6HvexqTvoOCRmkIM3afVd3jJoRHh2zeRvA%3d&risl=&pid=ImgRaw&r=0",
//             "https://th.bing.com/th/id/OIP.JL9_xxFwQcPq5zKZQWUMmgHaE6?pid=ImgDet&w=474&h=314&rs=1",
//             "https://th.bing.com/th/id/OIP.sOhec202eKG4czeRM9qCJgHaEJ?pid=ImgDet&w=474&h=265&rs=1",
//         ],
//         distance: 0.53,
//         menu: [
//             {
//                 category: "Sweet Crepes",
//                 items: [
//                     {
//                         name: "Nutella Banana Crepe",
//                         description:
//                             "Filled with creamy Nutella and fresh banana slices.",
//                         price: 7.99,
//                         imageUrl:
//                             "https://bellyfull.net/wp-content/uploads/2021/07/Banana-Nutella-Crepes-blog-3.jpg",
//                     },
//                     {
//                         name: "Strawberry Delight Crepe",
//                         description:
//                             "Stuffed with strawberries, whipped cream, and a drizzle of chocolate sauce.",
//                         price: 8.99,
//                         imageUrl:
//                             "https://www.tasteofhome.com/wp-content/uploads/2018/01/Strawberry-Creme-Crepes_exps25512_BB2406671B09_02_3b_RMS.jpg",
//                     },
//                 ],
//             },
//             {
//                 category: "Savory Crepes",
//                 items: [
//                     {
//                         name: "Ham and Cheese Crepe",
//                         description:
//                             "Filled with smoked ham and melted Swiss cheese.",
//                         price: 9.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.bRewNRSmSIMIsNldZPNhogHaHa?rs=1&pid=ImgDetMain",
//                     },
//                     {
//                         name: "Spinach and Feta Crepe",
//                         description:
//                             "Stuffed with sautéed spinach and crumbled feta cheese.",
//                         price: 10.99,
//                         imageUrl:
//                             "https://cottagelife.com/wp-content/uploads/2022/06/AdobeStock_98490564-1.jpeg",
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: "9",
//         name: "Dim Sum Cart",
//         categories: ["Chinese", "Dim Sum", "Dumplings"],
//         location: "123 Chinatown Rd, San Francisco, CA",
//         type: "Mobile",
//         coordinates: {
//             latitude: 40.761115713616185,
//             longitude: -73.97546478711149,
//         },
//         hours: {
//             sunday: "10:00 AM - 09:00 PM",
//             monday: "10:00 AM - 09:00 PM",
//             tuesday: "10:00 AM - 09:00 PM",
//             wednesday: "10:00 AM - 09:00 PM",
//             thursday: "10:00 AM - 09:00 PM",
//             friday: "10:00 AM - 10:00 PM",
//             saturday: "10:00 AM - 10:00 PM",
//         },
//         rating: 4.6,
//         reviewCount: 290,
//         contact: {
//             email: "dimsumcart@foodtruck.com",
//             social: {
//                 instagram: "@dimsumcart",
//                 facebook: "@dimsumcart",
//                 twitter: "@dimsumcart",
//             },
//         },
//         isOpen: true,
//         imageUrl:
//             "https://live.staticflickr.com/701/20961727134_062f7cbd6d_b.jpg",
//         images: [
//             "https://i.pinimg.com/originals/96/a6/f2/96a6f2d72e7348cdafda1d21bdde2043.jpg",
//             "https://th.bing.com/th/id/R.bb6f128a603b39d2b6c4e3cd7e0c9e70?rik=n0utIsUyRGC5aQ&riu=http%3a%2f%2ffarm5.static.flickr.com%2f4066%2f4383457958_1ebcb5abda.jpg&ehk=fOKi6u1a%2fhwsA%2bgbav3NGjk6%2brwrae72m53U9ggXc3w%3d&risl=&pid=ImgRaw&r=0",
//             "https://dailytrojan.com/wp-content/uploads/2010/03/Dim-sum-truck-1.jpg",
//         ],
//         distance: 0.7,
//         menu: [
//             {
//                 category: "Dim Sum Classics",
//                 items: [
//                     {
//                         name: "Shrimp Har Gow",
//                         description:
//                             "Delicate steamed dumplings with shrimp filling.",
//                         price: 9.99,
//                         imageUrl:
//                             "https://www.tastingtable.com/img/gallery/har-gow-the-delicate-shrimp-dumplings-that-are-a-dim-sum-staple/l-intro-1679071100.jpg",
//                     },
//                     {
//                         name: "Char Siu Bao",
//                         description:
//                             "Steamed buns filled with sweet barbecue pork.",
//                         price: 7.99,
//                         imageUrl:
//                             "https://th.bing.com/th/id/OIP.eNy5wowyaqOqJETaIpsjTgHaE7?rs=1&pid=ImgDetMain",
//                     },
//                 ],
//             },
//             {
//                 category: "Sweet Treats",
//                 items: [
//                     {
//                         name: "Egg Tarts",
//                         description:
//                             "Sweet custard tarts with a flaky pastry crust.",
//                         price: 5.99,
//                         imageUrl:
//                             "https://www.jocooks.com/wp-content/uploads/2021/08/egg-tarts-1-19.jpg",
//                     },
//                     {
//                         name: "Sesame Balls",
//                         description:
//                             "Crispy fried balls filled with sweet red bean paste.",
//                         price: 6.49,
//                         imageUrl:
//                             "https://www.thespruceeats.com/thmb/N8wuye6vfugVfQ3IILXY9elJxI0=/4494x3000/filters:fill(auto,1)/sesame-seed-balls-694446-hero-01-5c018766c9e77c00019cd880.jpg",
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         id: "10",
//         name: "Pasta on the Go",
//         categories: ["Italian", "Pasta"],
//         location: "321 Spaghetti Ln, Los Angeles, CA",
//         type: "Mobile",
//         coordinates: {
//             latitude: 40.76638746545183,
//             longitude: -73.99599636395169,
//         },
//         hours: {
//             sunday: "11:00 AM - 08:00 PM",
//             monday: "11:00 AM - 08:00 PM",
//             tuesday: "11:00 AM - 08:00 PM",
//             wednesday: "11:00 AM - 08:00 PM",
//             thursday: "11:00 AM - 08:00 PM",
//             friday: "11:00 AM - 09:00 PM",
//             saturday: "11:00 AM - 09:00 PM",
//         },
//         rating: 4.8,
//         reviewCount: 370,
//         contact: {
//             email: "pastaonthego@foodtruck.com",
//             social: {
//                 instagram: "@pastaonthego",
//                 facebook: "@pastaonthego",
//                 twitter: "@pastaonthego",
//             },
//         },
//         isOpen: true,
//         imageUrl:
//             "https://bestfoodtrucks.mo.cloudinary.net/https://bft-production.storage.googleapis.com/resources/trucks/2810/images/original/pasta-on-the-go-2810.jpg?1630070856&tx=f_auto,c_limit,g_center,w_3840,q_auto&resource_type=image",
//         images: [
//             "https://www.arizonafoodtrucks.com/wp-content/uploads/2022/01/174087927_1912739438896327_6914361191601118463_n.jpg",
//             "https://th.bing.com/th/id/OIP.MiAGrYafshORM2n_HLu4swHaHa?rs=1&pid=ImgDetMain",
//             "https://photos.roaminghunger.com/1200x/c6e30f1f-dab3-4a13-9de8-24dc27b0f8dd.jpg",
//         ],
//         distance: 0.74,
//         menu: [
//             {
//                 category: "Classic Pastas",
//                 items: [
//                     {
//                         name: "Spaghetti Bolognese",
//                         description: "Rich meat sauce with a touch of basil.",
//                         price: 12.99,
//                         imageUrl:
//                             "https://www.ericlyons.co.uk/wp-content/uploads/2021/06/8K0A7866-2000x1333.jpg",
//                     },
//                     {
//                         name: "Fettuccine Alfredo",
//                         description: "Creamy Alfredo sauce over fresh pasta.",
//                         price: 11.99,
//                         imageUrl:
//                             "https://hips.hearstapps.com/delish/assets/17/36/1504715566-delish-fettuccine-alfredo.jpg",
//                     },
//                 ],
//             },
//             {
//                 category: "Stuffed Pastas",
//                 items: [
//                     {
//                         name: "Cheese Ravioli",
//                         description:
//                             "Stuffed with ricotta cheese and served with marinara sauce.",
//                         price: 12.99,
//                         imageUrl:
//                             "https://iambaker.net/wp-content/uploads/2019/11/ravioli-blog-2.jpg",
//                     },
//                     {
//                         name: "Meat Ravioli",
//                         description: "Stuffed with seasoned ground beef.",
//                         price: 13.49,
//                         imageUrl:
//                             "https://www.foodandwine.com/thmb/9A0UrYmDuzWLB3NK66ejinrdrGM=/2000x1334/filters:fill(auto,1)/meat-ravioli-filling-FT-RECIPE0721-2-caea06001b9642219d2a0ba2a466eabe.jpg",
//                     },
//                 ],
//             },
//         ],
//     },
// ];
