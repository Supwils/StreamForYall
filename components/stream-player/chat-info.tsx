import { useMemo } from "react";
import { Info } from "lucide-react";

import { Hint } from "../hint";

interface ChatInfoProps { 
    isDelayed: boolean;
    isFollowerOnly: boolean;
}

export const ChatInfo = ({
    isDelayed,
    isFollowerOnly
}: ChatInfoProps) => { 
    const hint = useMemo(() => {
        if (isFollowerOnly && !isDelayed) {
            return "Only followers can chat"
        }
        if (isDelayed && !isFollowerOnly) {
            return "Chat is delayed"
        }

        if (isDelayed && isFollowerOnly) {
            return "Chat is delayed and only followers can chat"
        }

        return "";
    }, [isDelayed, isFollowerOnly])
    const label = useMemo(() => {
        if (isFollowerOnly && !isDelayed) {
            return "Followers only"
        }
        if (isDelayed && !isFollowerOnly) {
            return "Slow mode"
        }

        if (isDelayed && isFollowerOnly) {
            return "Follower only and slow mode"
        }

        return "";
    }, [isDelayed, isFollowerOnly])
    
    if (!isDelayed && !isFollowerOnly) { 
        return null;
    }
    return (
        <div className="p-2 text-mited-foreground bg-white/5 border
         border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={hint}>
                <Info className="w-4 h-4" />
            </Hint>
            <p className="text-xs font-semibold">
                {label}
            </p>
        </div>
    )
}
