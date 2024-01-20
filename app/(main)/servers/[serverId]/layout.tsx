import ServerSidebar from '@/components/server/server-sidebar'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode,
    params: { serverId: string }
}

const ServerDetailLayout = async ({ children, params }: Props) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (!server) {
        return redirect('/');
    }


    return (
        <div className='h-full'>
            {/* Channels list */}
            <div className='hidden md:flex h-full w-60 z-20 flex-col inset-y-0 fixed'>
                <ServerSidebar serverId={server.id}/>
            </div>

            {/* Chat Area */}
            <main className='h-full md:pl-60'>
                {children}
            </main>


        </div>
    )
}

export default ServerDetailLayout