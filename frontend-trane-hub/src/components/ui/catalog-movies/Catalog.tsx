import React from 'react';
import { ICatalog } from './catalog.interface';
import styles from './Catalog.module.scss';
import { Heading } from '../heading/Heading';
import { Description } from '../heading/Description';
import { SkeletonLoader } from '../SkeletonLoader';
import { GalleryItem } from '../gallery/GalleryItem';
import { PUBLIC_URL } from '@/config/url.config';

interface Props extends ICatalog {
    className?: string;
}

export const Catalog: React.FC<Props> = ({
    className,
    title,
    description,
    movies,
    isLoading = false,
}) => {
    return (
        <div className={className}>
            <Heading className={styles.heading}>{title}</Heading>

            {description && <Description text={description} />}

            <section className={styles.movies}>
                {isLoading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <SkeletonLoader
                            key={index}
                            className={styles.loading}
                        />
                    ))
                ) : movies?.length ? (
                    movies.map((movie) => (
                        <GalleryItem
                            key={movie.id}
                            item={{
                                name: movie.title,
                                link: PUBLIC_URL.movie(movie.slug),
                                poster: movie.bigPoster,
                                content: { title: movie.title },
                            }}
                            variant="horizontal"
                        />
                    ))
                ) : (
                    <div className={styles.not_found}>фильмы не найдены</div>
                )}
            </section>
        </div>
    );
};
