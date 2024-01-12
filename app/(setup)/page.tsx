import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initializeProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
    const profile = await initializeProfile();

    // Search through all the servers and find the first one that has the profile Id in one of the members of that server
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(server) {
        return redirect(`/servers/${server.id}`)
    }

    return ( 
        <>
            <InitialModal />
        </>
     );
}
 
export default SetupPage;