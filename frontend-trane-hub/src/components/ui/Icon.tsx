import React from 'react';
import cn from 'clsx';
import * as Icons from 'react-icons/lu';

export type TypeIconName = keyof typeof Icons;

interface Props {
    name: TypeIconName;
    className?: string;
}

export const Icon: React.FC<Props> = ({ name, className }) => {
    const IconComponent = Icons[name];

    return <IconComponent className={cn('size-4', className)} />;
};
