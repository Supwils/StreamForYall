'use client';

import { ConnectionState, Track } from "livekit-client";
import {
    useConnectionState,
    useRemoteParticipant,
    useTracks
} from "@livekit/components-react"
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";
import { Skeleton } from "../ui/skeleton";

interface VideoProps { 
    hostName: string
    hostIdentiry: string
}

export const Video = ({
    hostName,
    hostIdentiry
}: VideoProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentiry);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter((t) => t.participant.identity === hostIdentiry);

    let content;

    if (!participant && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostName} />
    } else if (!participant || tracks.length === 0) {
        content = <LoadingVideo label={connectionState} />
    } else {
        content = <LiveVideo participant={participant} />
    }

    return (
        <div className="aspect-video border-b group relative">
            {content}
        </div>
    )
}

export const VideoSkeleton = () => { 
    return (
        <div className="aspect-video border-x border-background">
            <Skeleton className="w-full h-full rounded-none"/>
            
        </div>
    )
}