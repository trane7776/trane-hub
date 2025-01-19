import React from 'react';
import { IGalleryItem } from './gallery.interface';
import styles from './Gallery.module.scss';
import { cn } from '@/lib/utils';
import { GalleryItem } from './GalleryItem';

interface Props {
    className?: string;
    items: IGalleryItem[];
}

export const Gallery: React.FC<Props> = ({ className, items }) => {
    return (
        <div className={cn(className, styles.gallery)}>
            {items.map((item) => (
                <GalleryItem key={item.link} item={item} variant="vertical" />
            ))}
        </div>
    );
};
