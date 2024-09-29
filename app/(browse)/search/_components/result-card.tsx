import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";
import { Stream, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface ResultCardProps { 
    data: Stream & { user: User };
}

export const ResultCard = ({
    data,
}: ResultCardProps) => { 
    return (
        <Link href={`/${data.user.username}`} >
            <div className="w-full flex gap-x-4">
                <div className="relative h-[9rem] w-[16rem]">
                    <Thumbnail
                        src={data.thumbnail}
                        fallback={data.user.imageUrl}
                        isLive={data.isLive}
                        username={data.user.username}
                    />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold text-lg cursor-pointer hover:text-blue-500">{data.user.username}</p>
                        <VerifiedMark />
                    </div>
                    <p className="text-sm text-muted-foreground">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(data.updatedAt), {
                            addSuffix: true,
                        })}
                    </p>
                </div>

            </div>
        </Link>
    )
}

export const ResultSkeleton = () => {
    return (
        <div className="w-full flex gap-x-4">
            <div className="relative h-[9rem] w-[16rem]">
                <ThumbnailSkeleton />
            </div>
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-32 h-4" />
        </div>
    )
}