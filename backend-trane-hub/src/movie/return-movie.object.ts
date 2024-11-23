import { Prisma } from '@prisma/client';
import { returnGenreObject } from 'src/genre/return-genre.object';
import { returnReviewObject } from 'src/review/return-review.object';
import { returnActorObject } from 'src/actor/return-actor.object';

export const returnMovieObject: Prisma.MovieSelect = {
    id: true,
    createdAt: true,
    title: true,
    slug: true,
    poster: true,
    bigPoster: true,
    videoUrl: true,
    views: true,
    country: true,
    year: true,
    duration: true,
    reviews: {
        select: returnReviewObject,
        orderBy: {
            createdAt: 'desc',
        },
    },
    actors: {
        select: returnActorObject,
    },
    genres: {
        select: returnGenreObject,
    },
};
