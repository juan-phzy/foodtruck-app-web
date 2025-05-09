// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil", // Updated to current version
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err}`);
        return NextResponse.json(
            { error: `Webhook Error` },
            { status: 400 }
        );
    }

    // Handle the event
    switch (event.type) {
        case "customer.subscription.created":
            // const subscription = event.data.object as Stripe.Subscription;
            // Handle subscription created event
            // Update your database or user metadata in Clerk
            break;

        case "customer.subscription.updated":
            // Handle subscription update
            break;

        case "customer.subscription.deleted":
            // Handle subscription cancellation
            break;

        // Add more event handlers as needed

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
