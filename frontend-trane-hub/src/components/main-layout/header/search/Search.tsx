import { cn } from '@/lib/utils';
import React from 'react';

import styles from './Search.module.scss';

interface Props {
    className?: string;
}

export const Search: React.FC<Props> = ({ className }) => {
    return <div className={cn(styles.search)}>Search</div>;
};
