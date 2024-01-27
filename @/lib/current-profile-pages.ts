import { getAuth } from "@clerk/nextjs/server";
import { db } from "./db";
import { NextApiRequest } from "next";

// This file is the current profile utility but only works for Nextjs pages router that we are using it for socket io
export const currentProfilePages = async(req: NextApiRequest) => {
    const {userId} = getAuth(req);

    if(!userId) return null;

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    })

    return profile;
}