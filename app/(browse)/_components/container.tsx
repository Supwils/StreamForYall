"use client";

import { useEffect } from "react";
import {useMediaQuery} from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

interface ContainerProps { 
    children:React.ReactNode
}
export const Container = ({
    children,
}: {
    children: React.ReactNode

    }) => {
    const matches = useMediaQuery("(max-width: 1024px)")
    const { collapsed,
            onCollapse,
            onExpand} = useSidebar((state) => state)
    
    useEffect(() => {
        if (matches) {
            onCollapse()
        }
        else {
            onExpand()
        }
    }, [matches, onCollapse, onExpand])

    return (
        <div className={cn(
            "flex",
            collapsed ? "ml-[0px]" : "ml-[0px] lg:ml-0"
          )}>
            {children}
          </div>
    )
}