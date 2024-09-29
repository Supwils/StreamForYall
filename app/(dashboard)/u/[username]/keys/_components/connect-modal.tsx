"use client";

import { IngressInput } from "livekit-server-sdk";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

import {
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert";

import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
 
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useState, useTransition, useRef, ElementRef } from "react";
import { on } from "events";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success("Connection created")
                    closeRef.current?.click();
                })
                .catch((err) => toast.error("Failed to create connection"));
        });
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"primary"}>
                    Generate Connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Generate Connection
                    </DialogTitle>
                </DialogHeader>
                <Select
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value as IngressType)}
                    disabled={isPending}
                >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Ingress Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={RTMP}>
                                RTMP
                            </SelectItem>
                            <SelectItem value={WHIP}>
                                WHIP
                            </SelectItem>
                        </SelectContent>
                    </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>
                        Warning!
                    </AlertTitle>
                    <AlertDescription>
                        This action will reset all your existing connections.
                    </AlertDescription>
                    
                </Alert>
                <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild >
                        <Button variant={"ghost"}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={onSubmit}
                        disabled={isPending}
                        variant={"primary"}>
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}