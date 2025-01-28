import { Gallery } from '@/components/ui/gallery/Gallery';
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';
import { Heading } from '@/components/ui/heading/Heading';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
    similarMovies: IGalleryItem[];
}

export const SimilarMovies: React.FC<Props> = ({
    className,
    similarMovies,
}) => {
    return similarMovies.length ? (
        <div className={cn(className, 'mt-8')}>
            <Heading className="mb-3">похожие фильмы</Heading>
            <Gallery items={similarMovies} />
        </div>
    ) : null;
};
