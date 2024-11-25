import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

interface Props {
    className?: string;
}

export const Heading: React.FC<PropsWithChildren<Props>> = ({
    className,
    children,
}) => {
    return (
        <h1 className={cn('text-2xl font-semibold', className)}>{children}</h1>
    );
};
