'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

import styles from './Menu.module.scss';
import { usePathname } from 'next/navigation';
import { IMenuItem } from './menu.interface';
import { Icon } from '@/components/ui/Icon';
interface Props {
    className?: string;
    item: IMenuItem;
}

export const MenuItem: React.FC<Props> = ({ className, item }) => {
    const pathname = usePathname();
    return (
        <Link
            className={cn(className, styles.item, {
                [styles.active]: pathname === item.link,
            })}
            href={item.link}
        >
            <Icon name={item.icon} className={styles.icon} />
            {item.value}
        </Link>
    );
};
