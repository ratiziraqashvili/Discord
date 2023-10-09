import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "@/node_modules/next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();
        const { name, imageUrl } = await req.json()

        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id,
            },
            data: {
                name,
                imageUrl,
            }
        })

        return NextResponse.json(server)
    } catch (error) {
        console.log("[server_id_patch]", error)
        return new NextResponse("internal error", { status: 500 })
    }
}