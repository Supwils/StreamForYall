import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps { 
    params: {
        username: string;
    }
}

const UserPage = async ({
    params: { username }
}: UserPageProps) => {
    const user = await getUserByUsername(username);
    
    if (!user || !user.stream) {
        notFound();
    }
    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked) {
        notFound();
    }
    

    return (
            <StreamPlayer
                user={user}
                stream={user.stream}
                isFollowing={isFollowing}
            />
    )
    // return (
    //     <div>
    //         User Page
    //     </div>
    // )
}
export default UserPage;