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
import { Content } from './content/Content';

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

    useUpdateCountViews(movie.slug); // Вызов хука внутри тела компонента

    return (
        <div className={className}>
            <Banner
                image={movie.bigPoster}
                Details={() => <Content movie={movie} />}
            />
            <div className="px-6 mb-10">
                <VideoPlayer />
                <SimilarMovies similarMovies={similarMovies} />
                <Reviews />
            </div>
        </div>
    );
};
