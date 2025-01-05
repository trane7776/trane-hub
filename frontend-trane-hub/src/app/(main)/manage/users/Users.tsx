import { Heading } from '@/components/ui/heading/Heading';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
}

export const Users: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn(className, 'px-6')}>
            <Heading>пользователи</Heading>
        </div>
    );
};
