'use client';

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useState , useEffect} from "react";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";


interface WarpperProps {
    children: React.ReactNode;
}

export const Warpper = ({ children }: WarpperProps) => {
    const [isClient, setIsClient] = useState(false);
    const { collapsed } = useSidebar();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient)
        return (
        <aside className="left-0 flex flex-col lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
                <ToggleSkeleton />
                <FollowingSkeleton/>
                <RecommendedSkeleton/>
            </aside>
    
    );

    return (
        <aside className={cn(
            "left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50"
            , collapsed && "w-[70px]")}
            >
            {children}
        </aside>
    )
}