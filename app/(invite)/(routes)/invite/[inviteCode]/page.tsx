import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        inviteCode: string
    }
}

const InvitePage = async({params}: Props) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    if(!params.inviteCode) {
        return redirect('/')
    }

    const exisingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if(exisingServer) {
        return redirect(`/servers/${exisingServer.id}`)
    }

    // join server
    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id
                    }
                ]
            }
        }
    });

    if(server) {
        return redirect(`/servers/${server.id}`)
    }
  

    return null;
}

export default InvitePage