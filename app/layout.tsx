import type { Metadata, Viewport } from "next";
import "./globals.css";

import ClientLayout from "@/components/navigation/ClientLayout";
import { ToastContainer } from "react-toastify";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import NavBar from "@/components/navigation/NavBar";

export const metadata: Metadata = {
    title: "MunchMap",
    description: "Discover & expolore local food vendors!",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    userScalable: false,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* ✅ Step 1b: Wrap app in ClerkProvider */}
            <ClerkAndConvexProvider>
                <body>
                    <div className="app-wrapper">
                        <NavBar />
                        <ClientLayout>{children}</ClientLayout>
                        <ToastContainer position="top-center" />
                    </div>
                </body>
            </ClerkAndConvexProvider>
        </html>
    );
}
