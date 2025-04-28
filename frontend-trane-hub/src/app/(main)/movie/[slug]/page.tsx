export const dynamic = 'force-dynamic';

import { movieService } from '@/services/movie.service';
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params.types';
import { redirect } from 'next/navigation';
import { Movie } from './Movie';
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';
import { PUBLIC_URL } from '@/config/url.config';

export default async function MoviePage({ params }: IPageSlugParam) {
    async function getMovie(params: TypeParamSlug) {
        try {
            const movie = await movieService.getBySlug(params.slug);
            if (!movie) return redirect('/404');

            const { data: dataSimilarMovies } = await movieService.getByGenres(
                movie.genres.map((genre) => genre.id)
            );

            const similarMovies: IGalleryItem[] = dataSimilarMovies
                .filter((m) => m.id !== movie.id)
                .slice(0, 6)
                .map((m) => ({
                    name: m.title,
                    poster: m.poster,
                    link: PUBLIC_URL.movie(m.slug),
                }));

            return { movie, similarMovies };
        } catch (error) {
            return redirect('/404');
        }
    }

    const { movie, similarMovies } = await getMovie(params);

    return (
        <Movie
            initialMovie={movie}
            similarMovies={similarMovies}
            slug={params.slug}
        />
    );
}
