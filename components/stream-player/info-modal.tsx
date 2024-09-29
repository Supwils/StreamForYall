"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ElementRef, useRef, useState, useTransition } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Hint } from "../hint";
import { Trash } from "lucide-react";
import Image from "next/image";
import { set } from "date-fns";
interface InfoModalProps{
    initialName: string;
    initialThumbnailUrl: string | null;
}

export const InfoModal = ({ 
    initialName,
    initialThumbnailUrl

}: InfoModalProps) => { 
    const route = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);
    const [ isPending, startTransition] = useTransition();
    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

    const onChage = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setName(e.target.value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        
        startTransition(() => {
            updateStream({
                name: name,
            }).then(() => {
                toast.success("Stream info updated")
                closeRef?.current?.click();
            })
            .catch(() => toast.error("Failed to update stream info"));
         });

    }

    const onRemove = (() => {
        startTransition(() => { 
            updateStream({ thumbnail: null })
                .then(() => {
                    
                    toast.success("Thumbnail removed")
                    setThumbnailUrl("");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Failed to remove thumbnail"));
        });
    })
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"link"}
                    size={"sm"}
                    className="ml-auto"
                >
                    Edit
                </Button>
            </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Edit Stream Info
                        </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <label>
                            Name
                        </label>
                        <Input
                            placeholder="Stream Name"
                            onChange={onChage}
                            value={name}
                            disabled={isPending}
                        >
                        </Input>
                    </div>
                    <div className="space-y-2">
                        <label>
                            Thumbnail
                        </label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl 
                            overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint label="Remove Thumbnail" asChild side="left">
                                        <Button
                                            type="button"
                                            disabled={isPending}
                                            onClick={onRemove}
                                            className="h-auto w-auto p-1.5"
                                        >
                                            <Trash className="h-4 w-4"/>
                                        </Button>
                                    </Hint>
                                </div> 
                                <Image
                                    src={thumbnailUrl}
                                    alt="Thumbnail"
                                    fill
                                    className="object-cover"
                                
                                />
                                </div>
                        ):(
                        <div className="rounded-xl border outline-dashed outline-muted">
                            <UploadDropzone
                                endpoint="thumbnailUploader"
                                appearance={{
                                    label: {
                                        color:"FFFFFF",
                                    },
                                    allowedContent: {
                                        color: "FFFFFF",
                                    }
                                }}  
                                onClientUploadComplete={(res) => {
                                    setThumbnailUrl(res?.[0]?.url);
                                    route.refresh();
                                    closeRef?.current?.click();
                                }}
                                
                            />
                    </div>
                        )}

                    </div>
                    <div className="flex justify-between">
                        <DialogClose asChild ref={closeRef}>
                            <Button type="button" variant={"ghost"}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit"
                            disabled={isPending}
                            variant={"primary"}
                        >
                            Save
                        </Button>

                    </div>

                </form>
                </DialogContent>
        </Dialog>
    )
}