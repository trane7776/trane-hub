import React from 'react';
import { IGalleryItemProps } from './gallery.interface';
import Link from 'next/link';
import styles from './Gallery.module.scss';
import { cn } from '@/lib/utils';
import { Heading } from '../heading/Heading';
interface Props extends IGalleryItemProps {
    className?: string;
}

export const GalleryItem: React.FC<Props> = ({ className, item, variant }) => {
    return (
        <Link
            href={item.link}
            className={cn(className, styles.item, {
                [styles.vertical]: variant === 'vertical',
                [styles.horizontal]: variant === 'horizontal',
                [styles.with_text]: item.content,
            })}
        >
            <img src={item.poster} alt={item.name} draggable={false} />
            {item.content && (
                <div className={styles.content}>
                    <Heading className={styles.title}>
                        {item.content.title}
                    </Heading>
                    {item.content.subTitle && (
                        <div className={styles.sub_title}>
                            {item.content.subTitle}
                        </div>
                    )}
                </div>
            )}
        </Link>
    );
};
