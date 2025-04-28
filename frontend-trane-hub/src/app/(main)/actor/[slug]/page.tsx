export const dynamic = 'force-dynamic';
import { Catalog } from '@/components/ui/catalog-movies/Catalog';
import { actorService } from '@/services/actor.service';
import { movieService } from '@/services/movie.service';
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params.types';
import { redirect } from 'next/navigation';

export default async function ActorPage({ params }: IPageSlugParam) {
    async function getMovies(params: TypeParamSlug) {
        try {
            const { data: actor } = await actorService.getBySlug(params.slug);
            if (!actor) return redirect('/404');

            const { data: movies } = await movieService.getByActor(actor.id);
            return { actor, movies };
        } catch (error) {
            return redirect('/404');
        }
    }

    const { actor, movies } = await getMovies(params);

    return (
        <div className="px-6">
            <Catalog title={actor.name} movies={movies} />
        </div>
    );
}
