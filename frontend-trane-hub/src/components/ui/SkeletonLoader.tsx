import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
}

export const SkeletonLoader: React.FC<Props> = ({ className }) => {
    return (
        <div
            className={cn(className, 'animate-pulse rounded-lg bg-[#292A2E]')}
        ></div>
    );
};
