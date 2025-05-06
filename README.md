# Project Structure

```
FOODTRUCK-APP-WEB
│
│── .next      
│
├── app
|   ├── (public)
│   │   ├── map
│   |   │   ├── page.module.css
│   |   │   └── page.tsx
│   │   └── vendor-info
│   |       ├── page.module.css
│   |       └── page.tsx
|   ├── auth
│   │   └── sign-in
│   |       ├── page.module.css
│   |       └── page.tsx
|   ├── user
│   │   ├── account
│   |   │   ├── page.module.css
│   |   │   └── page.tsx
│   │   ├── map
│   |   │   ├── page.module.css
│   |   │   └── page.tsx
│   │   └── search
│   |       ├── page.module.css
│   |       └── page.tsx
|   ├── vendor
│   │   └── dashboard
│   |       ├── page.module.css
│   |       └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.module.css
│   └── page.tsx
|
├── components
│   ├── navigation
│   |   ├── ClientLayout.tsx
│   |   ├── PublicNavBar.module.css
│   |   └── PublicNavBar.tsx
│   └── landing
│       ├── Footer.module.css
│       └── Footer.tsx
|
├── convex                          # Convex Backend Folder
│   ├── _generated                      # Automatically Generated Server Files
│   ├── auth.config.ts                  # Auth configuration for convex
│   ├── businesses.ts                   # Business Mutations / Queries
│   ├── http.ts
│   ├── menus.ts                        # Database Menu Mutations / Queries
│   ├── README.md
│   ├── schema.ts                       # Database Table Schemas
│   ├── trucks.ts                       # Truck Mutations / Queries
│   ├── tsconfig.json                   # Backend TypeScript Configuration
│   ├── users.ts                        # User Mutations / Queries
│   └── vendors.ts                      # Vendor Mutations / Queries
|
├── node_modules                    # Automatically appears when npm and expo is initialized
|
├── providers                       # Context Providers
|   └── ClerkAndConvexProvider.tsx
|
├── public
|   └── images
│       ├── placeholder.jpg
│       └── truck-icon.png
│
├── store                           # Contains Zustand custom hooks
│   ├── useBusinessStore.ts             # State management for signed in business
│   ├── useFilterStore.ts               # State management for selected category filters
│   ├── useMapLayerStore.ts             # State management for selected map layer style
│   ├── useMenuModalStore.ts            # State management for menu toggle
│   ├── useTruckStore.ts                # State management for selected truck on map
│   ├── useUserLocationStore.ts         # State management for user device location
│   ├── useUserOnboardingStore.ts     # State management for vendor creation & onboarding
│   ├── useUserStore.ts                 # State management for convex user
│   ├── useVendorOnboardingStore.ts     # State management for vendor creation & onboarding
│   └── useVendorStore.ts               # State management for vendor
|
├── utils                           # Utility Folder
│   ├── calculateDistance.ts 
│   ├── convertScheduleArrayToRecord.ts            
│   └── helperFunctions.ts             
│
├── .env.local               # Local environment variables
│
├── .gitignore               # List of files to be ignored on github
│
├── constants.ts 
│
├── eslint.config.mjs
│
├── middleware.ts
│
├── next-env.d.ts
│
├── next.config.ts
│
├── package-lock.json
│
├── package.json
│
├── postcss.config.mjs
│
├── README.md
│
├── tailwind.config.ts
│
├── tsconfig.json
│
└── types.ts               
```