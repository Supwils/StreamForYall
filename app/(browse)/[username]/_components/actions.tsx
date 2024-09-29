"use client";

import { onBlock, onUnBlock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionProps{
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({
    isFollowing,
    userId
}:ActionProps) => {

    const [isPending, startTransition] = useTransition();

    const handelFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Failed to follow"));
        });
    }

    const handelUnFollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You are unfollowing ${data.following.username}`))
                .catch(() => toast.error("Failed to follow"));
        });
    }

    const handleBlock = () => {
        startTransition(() => { 
            onBlock(userId)
                .then((data: any) => toast.success(`You are now blocking ${data.blocked.username}`))
                .catch(() => toast.error("Failed to block"));
        });
    }

    const onClick = isFollowing ? handelUnFollow : handelFollow;
    return (
        <>
        <Button disabled={ isPending} onClick={onClick} variant="primary">
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
            <Button onClick={handleBlock} disabled={isPending}>
                Block
            </Button>
        </>
    )
}