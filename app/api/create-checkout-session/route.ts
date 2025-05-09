// app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil",
});

export async function POST(req: NextRequest) {
    try {
        console.log("Starting checkout session creation");
        // Get request data
        const body = await req.json();
        console.log("Request body:", body);

        const { plan, stripePriceId, redirectUrl } = body;

        if (!stripePriceId) {
            console.error("Missing price ID");
            return NextResponse.json(
                { error: "Missing price ID" },
                { status: 400 }
            );
        }

        console.log("Creating Stripe checkout session with:", {
            priceId: stripePriceId,
            plan,
            redirectUrl,
        });

        // Configuration for checkout session
        const checkoutConfig: Stripe.Checkout.SessionCreateParams = {
            line_items: [
                {
                    price: stripePriceId,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${redirectUrl}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${redirectUrl}?canceled=true`,
            allow_promotion_codes: true, // Let users add promo codes
            metadata: {
                plan,
            },
        };

        // Add 30-day free trial only for growth, professional, and enterprise plans
        if (
            plan === "growth" ||
            plan === "professional" ||
            plan === "enterprise"
        ) {
            checkoutConfig.subscription_data = {
                trial_period_days: 30,
            };
            console.log(`Adding 30-day free trial for ${plan} plan`);
        } else {
            console.log(`No free trial for ${plan} plan`);
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create(checkoutConfig);

        console.log("Checkout session created:", {
            sessionId: session.id,
            url: session.url,
        });

        return NextResponse.json({
            sessionId: session.id,
            url: session.url,
        });
    } catch (error) {
        console.error("Error creating checkout session:", error);

        // Provide more detailed error information
        let errorMessage = "Error creating checkout session";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
