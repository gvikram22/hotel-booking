
import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    console.log("CLERK WEBHOOK HIT");

    try {
        const whook = new Webhook(
            process.env.CLERK_WEBHOOK_SECRET
        );

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verify raw request body
        const evt = whook.verify(req.body, headers);

        console.log("Webhook event:", evt);

        if (!evt) {
            return res.status(400).json({
                success: false,
                message: "Webhook verification returned undefined",
            });
        }

        const { data, type } = evt;

        console.log("Webhook type:", type);
        console.log("Webhook data:", data);

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            image: data.image_url,
        };

        switch (type) {
            case "user.created":
                await User.create(userData);
                console.log("✅ User created:", userData);
                break;

            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                console.log("✅ User updated:", data.id);
                break;

            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                console.log("✅ User deleted:", data.id);
                break;

            default:
                console.log("Unhandled webhook event:", type);
        }

        return res.status(200).json({
            success: true,
            message: "Webhook received",
        });

    } catch (error) {
        console.error("❌ Clerk webhook error:", error);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export default clerkWebhooks;
