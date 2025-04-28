import { Catalog } from '@/components/ui/catalog-movies/Catalog';
import { genreService } from '@/services/genre.service';
import { movieService } from '@/services/movie.service';
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params.types';
import { redirect } from 'next/navigation';

export default async function GenrePage({ params }: IPageSlugParam) {
    async function getMovies(params: TypeParamSlug) {
        try {
            const { data: genre } = await genreService.getBySlug(params.slug);
            if (!genre) return redirect('/404');

            const { data: movies } = await movieService.getByGenres([genre.id]);
            return { genre, movies };
        } catch (error) {
            return redirect('/404');
        }
    }

    const { genre, movies } = await getMovies(params);

    return (
        <div className="px-6">
            <Catalog
                title={genre.name}
                description={genre.description}
                movies={movies}
            />
        </div>
    );
}
