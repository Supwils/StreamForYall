import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import { db } from "@/lib/db";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
    const body = await req.text();

    const headerPayLoad = headers();
    const authorization = headerPayLoad.get("Authorization");

    if (!authorization) {
        return new Response("Unauthorized", { status: 401 });
    }

    const event = receiver.receive(body, authorization);

    if ((await event).event === "ingress_started") {
        await db.stream.update({
            where: {
                ingressId: (await event).ingressInfo?.ingressId
            },
            data: {
                isLive: true
            },
        });
    }

    if ((await event).event === "ingress_ended") {
        await db.stream.update({
            where: {
                ingressId: (await event).ingressInfo?.ingressId
            },
            data: {
                isLive: false
            },
        });
    }

    return new Response("OK", { status: 200 });
}