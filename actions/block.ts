"use server";
import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service"
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomServeice = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,

);

export const onBlock = async (id: string) => { 
    //Todo adapt to disconnect from the streaming
    //To do: adapt to kick the guest
    const self = await getSelf();

    let blockeduser;
    try {
         blockeduser = await blockUser(id);
    } catch {
        
    }

    try {
        await roomServeice.removeParticipant(self.id, id);
    } catch {
        
    }
     revalidatePath(`/u/${self.username}/community`)

    return blockeduser;

}

export const onUnBlock = async (id: string) => { 
    //Todo adapt to reconnect to the streaming
    //To do: adapt to invite the guest
    const unblockedUser = await unblockUser(id);

    if (unblockedUser) {
        revalidatePath(`/${unblockedUser.blocked.username}`)
    }

    return unblockedUser;
    
}
