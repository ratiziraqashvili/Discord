import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "@/node_modules/next/server";

export async function POST(req: Request){
    try {
        const { name, imageUrl } = await req.json()
        const profile = await currentProfile()

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
    } catch (error) {
            console.log("[servers_post]", error);
            return new NextResponse("Internal Error", { status: 500 })
    }
}