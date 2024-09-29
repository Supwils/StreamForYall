

import { LiveBadge } from '@/components/live-badge';
import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar';
import { Stream, User } from '@prisma/client';
import Link from 'next/link';


interface ResultCardProps { 
    data: {
        user: User,
        thumbnail: string | null;
        isLive: boolean;
        name: string;
    };
};

export const ResultCard = ({ data }: ResultCardProps) => { 
    
    return (
        <Link href={`/${data.user.username}`}>
        <div className=' h-full w-full space-y-4'>
                <Thumbnail
                    src={data.thumbnail}
                    fallback={data.user.imageUrl}
                    isLive={data.isLive}
                    username={data.user.username}
                />
                
                <div className='flex gap-x-3'>
                    <UserAvatar
                        username={data.user.username}
                        imageUrl={data.user.imageUrl}
                        isLive={data.isLive}
                    />
                    <div className='flex flex-col text-sm overflow'>
                        <p className='truncate font-semibold hover:text-blue-500'>
                            {data.name}
                        </p>
                        <p className='text-muted-forground'>
                            {data.user.username}
                        </p>
                    </div>
                </div>
        </div>
        </Link>
    )
}

export const ResultCardSkeleton = () => { 
    return (
        <div className='h-full w-full space-y-4'>
            <ThumbnailSkeleton />
            <div className='flex gap-x-3'>
                <UserAvatarSkeleton />
                <div className='flex flex-col gap-y-1'>
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-24 h-4" />
                </div>

            </div>

        </div>
    )
}