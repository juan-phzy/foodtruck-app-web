// app/api/verify-subscription/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil",
});

export async function GET(req: NextRequest) {
    const sessionId = req.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json(
            { success: false, message: "No session ID provided" },
            { status: 400 }
        );
    }

    try {
        // Retrieve the checkout session with expanded subscription data
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["subscription", "customer"],
        });

        // Check if the session is complete
        if (session.status === "complete") {
            // Extract important IDs
            const customerId = session.customer as string;
            const subscriptionId = session.subscription as string;

            // Get plan info from metadata
            const planId = session.metadata?.plan || "";

            // Get trial info from subscription if available
            let trialEnd = null;
            if (
                typeof session.subscription === "object" &&
                session.subscription
            ) {
                trialEnd = session.subscription.trial_end;
            }

            return NextResponse.json({
                success: true,
                customerId,
                subscriptionId,
                planId,
                trialEnd,
                // Include any other useful subscription details
                status: session.payment_status,
            });
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Checkout session not complete",
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error verifying subscription:", error);
        let errorMessage = "Error verifying subscription";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json(
            {
                success: false,
                message: errorMessage,
            },
            { status: 500 }
        );
    }
}
