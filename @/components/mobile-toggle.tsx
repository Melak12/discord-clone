import { Menu } from 'lucide-react'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import NavigationSidebar from './nav/NavigationSidebar'
import ServerSidebar from './server/server-sidebar'

type Props = {
    serverId: string
}

const MobileToggle = ({serverId}: Props) => {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant='ghost' size='icon' className='md:hidden'>
                <Menu/>
            </Button>
        </SheetTrigger>
        <SheetContent side='left' className='p-0 flex gap-0'>
            <div className='w-[72px]'>
                <NavigationSidebar />
            </div>  

            <ServerSidebar serverId={serverId}/>
        </SheetContent>
    </Sheet>
  )
}

export default MobileToggle