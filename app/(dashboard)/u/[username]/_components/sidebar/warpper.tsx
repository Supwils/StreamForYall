"use client";

import {
    cn
} from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WarpperProps {
    children: React.ReactNode;  
}

export const Warpper = ({
    children
}: WarpperProps) => { 

    const { collapsed } = useCreatorSidebar((state) => state);
    return (
        <aside className={cn(
            "left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
            collapsed && "w-[70px]",
        )}>
            {children}
        </aside>
    )
}