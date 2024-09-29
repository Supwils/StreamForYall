'use client';

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";

import { Skeleton } from "../ui/skeleton";

interface ActionsProps { 
    hostIdentity: string
    isFollowing: boolean
    isHost: boolean
}

export const Actions = ({
    hostIdentity,
    isFollowing,
    isHost
}: ActionsProps) => { 
    const [isPending, startTransition ]= useTransition();
    const { userId } = useAuth();
    const router = useRouter();

    const handleFollow = () => {
        startTransition(() => { 
            onFollow(hostIdentity)
            .then((data) => toast.success(`You are now following ${data.following.username}`))
            .catch((error) => toast.error('Something wrong following!'))
        })
    }

    const handleUnfollow = () => {
        startTransition(() => { 
            onUnfollow(hostIdentity)
            .then((data) => toast.success(`You unfollowed ${data.following.username}`))
            .catch((error) => toast.error('Something wrong unfollowing!'))
        })
    }
    const ToggleFollow = () => {
        if (!userId) return router.push("/sign-in")
        
        if (isHost) return;
        
        if (isFollowing) {
            handleUnfollow();
        }
        else {
            handleFollow();
        }
        
    }
    return (
        <Button
            disabled={isPending || isHost}
            onClick={ToggleFollow}
            variant={"primary"}
            size={"sm"}
            className="w-full lg:w-auto"
        >
            <Heart
                className={cn(
                    "h-4 w-4 mr-2",
                    isFollowing 
                        ? "fill-white"
                        : "fill-none"
            )}
            />
            {isFollowing ? "UnFollow" : "Follow"}
        </Button>
    )
}

export const ActionsSkeleton = () => { 
    return (
        <Skeleton className="h-10 w-full lg:w-24"/>
    )
}