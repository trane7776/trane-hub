import { IncrementalCache } from 'next/dist/server/lib/incremental-cache';
import { IActor } from './actor.types';
import { IGenre } from './genre.types';
import { IReview } from './review.types';

export interface IMovie {
    id: string;
    poster: string;
    bigPoster: string;
    title: string;
    year: number;
    duration: number;
    country: string;
    genres: IGenre[];
    actors: IActor[];
    reviews: IReview[];
    views: number;
    videoUrl: string;
    slug: string;
}

export interface IMovieEditInput
    extends Omit<IMovie, 'id' | 'views' | 'reviews' | 'genres' | 'actors'> {
    genres: string[];
    actors: string[];
}
