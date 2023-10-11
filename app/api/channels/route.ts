import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "@/node_modules/next/server"
//@ts-ignore
import { MemberRole } from "@prisma/client"

export async function POST(
    req: Request,
){
    try {
        const profile = await currentProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get('serverId');

        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!serverId){
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if(name === "general"){
            return new NextResponse("Channel name can not be General", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        type,
                    }
                }
            }
        });

        return NextResponse.json(server)

    } catch (error) {
        console.log("channels_post", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}