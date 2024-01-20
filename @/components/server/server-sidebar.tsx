import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { ChannelType } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'
import ServerHeader from './server-header';

type Props = {
    serverId: string
}

const ServerSidebar = async ({ serverId }: Props) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId
        },
        include: {
            channels: {
                orderBy: {
                    createAt: 'asc'
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: 'asc'
                }
            }
        },

    })

    if (!server) {
        return redirect('/');
    }

    // Channels by type
    const textChannels = server.channels.filter((ch) => ch.type === ChannelType.TEXT)
    const audioChannels = server.channels.filter((ch) => ch.type === ChannelType.AUDIO)
    const videoChannels = server.channels.filter((ch) => ch.type === ChannelType.VIDEO)

    // Other members
    const members = server.members.filter((member) => member.profileId !== profile.id)

    // Current user role in the server
    const role = server.members.find((member) => member.profileId === profile.id)?.role;
    return (
        <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
            <ServerHeader server={server} role={role}/>
        </div>
    )
}

export default ServerSidebar