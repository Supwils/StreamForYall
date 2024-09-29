'use client';

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WarpperProps {
    children: React.ReactNode;  
}

export const Container = ({
    children
}: WarpperProps) => { 
    const {
        collapsed,
        onCollapse,
        onExpand
    } = useCreatorSidebar((state) => state);

    const matches = useMediaQuery("(max-width: 1024px)");

    useEffect(() => {
        if (matches) {
            onCollapse();
        } else {
            onExpand();
        }
    
    }, [matches, onCollapse, onExpand])


    return (
        <div className={cn("flex-1",
                    collapsed? "ml-[10px]" : "ml-[10px]")}>
            {children}
        </div>
    )
}