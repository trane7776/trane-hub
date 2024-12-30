import { cn } from '@/lib/utils';
import { IMovie } from '@/types/movie.types';
import React from 'react';

import styles from './SearchList.module.scss';
import Link from 'next/link';
import { PUBLIC_URL } from '@/config/url.config';

interface Props {
    movies: IMovie[];
    className?: string;
}

export const SearchList: React.FC<Props> = ({ className, movies }) => {
    return (
        <div className={cn(className, styles.list)}>
            {movies.length ? (
                movies.map((movie) => (
                    <Link
                        href={PUBLIC_URL.movie(movie.slug)}
                        key={movie.id}
                        className={styles.item}
                    >
                        <img
                            src={movie.poster}
                            width={70}
                            height={80}
                            alt={movie.title}
                            className="rounded-md object-cover object-top"
                        />
                    </Link>
                ))
            ) : (
                <div className={styles.notFound}>ничего не найдено</div>
            )}
        </div>
    );
};
