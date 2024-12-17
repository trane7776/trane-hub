import React from 'react';
import { IMenu } from './menu.interface';

import styles from './Menu.module.scss';
import { cn } from '@/lib/utils';
import { MenuItem } from './MenuItem';

interface Props {
    className?: string;
    menu: IMenu;
}

export const Menu: React.FC<Props> = ({
    className,
    menu: { items, title },
}) => {
    return (
        <div className={cn(className, styles.menu)}>
            <div className={styles.heading}>{title}</div>
            <div className={styles.items}>
                {items.length ? (
                    items.map((item, index) => (
                        <MenuItem key={index} item={item} />
                    ))
                ) : (
                    <div>элементы не найдены</div>
                )}
            </div>
        </div>
    );
};
