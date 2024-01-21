import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import {v4 as uuidv4} from "uuid";

export async function POST(req:Request) {
    try {

        const {name, type} = await req.json();
        const {searchParams} = new URL(req.url);

        const serverId = searchParams.get('serverId');
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!serverId) {
            return new NextResponse("Server ID missing", {status: 400});
        }

        if (name === 'general') {
            return new NextResponse("Name can not be 'general'", {status: 400});

        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN]
                        }
                    }
                }
            },
            data: {
               channels: {
                create: {
                    profileId: profile.id,
                    name,
                    type
                }
               }
            }
        })

        return NextResponse.json(server);

    }catch(error) {
        console.log("[CHANNELS_POST", error);
        return new NextResponse("Internal error", {status: 500})
        
    }
}