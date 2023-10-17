import { currentProfilePages } from "@/lib/current-profile-pages";
import { NextApiRequest } from "@/node_modules/next/dist/shared/lib/utils";
import { NextApiResponceServerIo } from "@/types";

export default async function handler( 
    req: NextApiRequest,
    res: NextApiResponceServerIo 
) {
    if(req.method !== "DELETE" && req.method !== "PATCH"){
        return res.status(405).json({ error: "Method not allowed" });

        try {
            const profile = await currentProfilePages(req);
            const { messageId, serverId, channelId } = req.query;
            const { content } = req.body;
            
            if(!profile){
                return res.status(401).json({ error: "Unauthorized" })
            }

            if(!serverId){
                return res.status(400).json({ error: "Server ID Missing " })
            }

            if(!channelId){
                return res.status(400).json({ error: "Channel ID Missing" })
            }

        } catch (error) {
            console.log("message_id", error)
            return res.status(500).json({ error: "Internal Error" })
        }
    }
}