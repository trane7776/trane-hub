import React, { useState } from 'react';

import styles from './Content.module.scss';
import { IMovie } from '@/types/movie.types';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';
import { ContentList } from './content-list/ContentList';
import { PUBLIC_URL } from '@/config/url.config';
import { MdStarRate } from 'react-icons/md';
import { FavoriteButton } from './favorite-button/FavoriteButton';

interface Props {
    className?: string;
    movie: IMovie;
}

export const Content: React.FC<Props> = ({ className, movie }) => {
    const { user } = useProfile();
    const [rating, setRating] = useState<number>(
        Math.round(
            movie.reviews.reduce((acc, review) => acc + review.rating, 0) /
                movie.reviews.length
        ) || 0
    );

    return (
        <div className={cn(className, styles.content)}>
            <h1>{movie.title}</h1>
            <div className={styles.details}>
                <span>{movie.year} · </span>
                <span>{movie.country} · </span>
                <span>{movie.duration} мин. </span>
            </div>

            <ContentList
                name="жанры: "
                links={movie.genres.slice(0, 3).map((genre) => ({
                    id: genre.id,
                    link: PUBLIC_URL.genre(genre.slug),
                    title: genre.name,
                }))}
            />

            <ContentList
                name="актеры: "
                links={movie.actors.slice(0, 3).map((actor) => ({
                    id: actor.id,
                    link: PUBLIC_URL.actor(actor.slug),
                    title: actor.name,
                }))}
            />

            <div className={styles.rating}>
                <MdStarRate />
                <span>{rating.toFixed(1)}</span>
            </div>

            {user && <FavoriteButton movieId={movie.id} />}
        </div>
    );
};
