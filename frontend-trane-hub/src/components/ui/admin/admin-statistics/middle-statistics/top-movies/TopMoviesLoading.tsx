import React from 'react';

import styles from './TopMovies.module.scss';
import { cn } from '@/lib/utils';
import { Loader } from '@/components/ui/Loader';

interface Props {
    className?: string;
}

export const TopMoviesLoading: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn(className, styles.top_Movies)}>
            <div className="h-[390px] w-full flex items-center justify-center">
                <Loader />
            </div>
        </div>
    );
};
