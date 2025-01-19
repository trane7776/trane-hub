import React from 'react';
import { IGalleryItemProps } from './gallery.interface';
import Link from 'next/link';
import styles from './Gallery.module.scss';
import { cn } from '@/lib/utils';
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
        </Link>
    );
};
