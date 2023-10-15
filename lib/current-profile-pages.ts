//@ts-ignore
import { NextApiRequest } from "next";
//@ts-ignore
import { getAuth } from "@clerk/nextjs/server";

import { db } from "./db";

export const currentProfilePages = async (req: NextApiRequest) => {
    const { userId } = getAuth(req);

    if(!userId) {
        return null
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    });

    return profile
}