'use client';

import { Banner } from '@/components/ui/banner/Banner';
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';
import { movieService } from '@/services/movie.service';
import { IMovie } from '@/types/movie.types';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { VideoPlayer } from './video-player/VideoPlayer';
import { SimilarMovies } from './SimilarMovies';
import { Reviews } from './reviews/Reviews';
import { useUpdateCountViews } from './useUpdateCountViews';

interface Props {
    className?: string;
    initialMovie: IMovie;
    similarMovies: IGalleryItem[];
    slug?: string;
}

export const Movie: React.FC<Props> = ({
    className,
    initialMovie,
    similarMovies,
    slug = '',
}) => {
    const { data: movie } = useQuery({
        queryKey: ['get movie', initialMovie.id],
        queryFn: () => movieService.getBySlug(slug),
        initialData: initialMovie,
        enabled: !!slug,
    });
    const hasUpdated = useRef(false);

    useUpdateCountViews(movie.slug); // Вызов хука внутри тела компонента

    useEffect(() => {
        if (movie.slug && !hasUpdated.current) {
            hasUpdated.current = true;
        }
    }, [movie.slug]);
    return (
        <div className={className}>
            <Banner image={movie.bigPoster} />
            <div className="px-6 mb-10">
                <VideoPlayer />
                <SimilarMovies similarMovies={similarMovies} />
                <Reviews />
            </div>
        </div>
    );
};
