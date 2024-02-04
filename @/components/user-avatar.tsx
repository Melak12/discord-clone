import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

type Props = {
    src?: string;
    className?: string
}

const UserAvatar = ({src, className}: Props) => {
  return (
    <Avatar className={cn(
        'h-7 w-7 md:h-10 md:w-10'
    )}>
        <AvatarImage src={src} />
    </Avatar>
  )
}

export default UserAvatar