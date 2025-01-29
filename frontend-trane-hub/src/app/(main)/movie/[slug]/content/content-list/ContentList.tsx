import React, { Fragment } from 'react';
import styles from './ContentList.module.scss';
import { IContentList } from '../content.interface';
import { cn } from '@/lib/utils';
import Link from 'next/link';
interface Props extends IContentList {
    className?: string;
}

export const ContentList: React.FC<Props> = ({ className, links, name }) => {
    return (
        <div className={cn(className, styles.list)}>
            <div className={styles.name}>{name}</div>
            <div className={styles.links}>
                {links.slice(0, 3).map((link, index) => (
                    <Fragment key={index}>
                        <Link href={link.link} className={styles.link}>
                            {link.title}
                        </Link>
                        {index !== links.length - 1 && ', '}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};
