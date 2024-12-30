import React from 'react';

import styles from './UserMenu.module.scss';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
}

export const UserMenu: React.FC<Props> = ({ className }) => {
    return <div className={cn(className, styles.wrapper)}>UserMenu</div>;
};
