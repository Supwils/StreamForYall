import { toast } from "sonner";
import { useState, useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity:string) => { 
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostIdentity);
                setToken(viewerToken);
                //console.log(viewerToken);
                const decodedToken = jwtDecode(viewerToken) as JwtPayload & { name?: string };
                
                const name = decodedToken?.name;
                const identity = decodedToken.iss;
                //console.log(decodedToken);
                if (identity) {
                    setIdentity(identity);
                }
                if(name) {
                    setName(name);
                }


            } catch {
                toast.error("Failed to create token");
            }
        }
        createToken();
    }, [hostIdentity]);

    return { token, name, identity };
}