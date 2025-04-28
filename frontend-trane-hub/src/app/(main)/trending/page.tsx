import { Catalog } from '@/components/ui/catalog-movies/Catalog';
import { movieService } from '@/services/movie.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Популярные фильмы',
};

export const dynamic = 'force-dynamic';

export default async function TrendingPage() {
    const data = await movieService.getMostPopularMovies();

    return (
        <div className="px-6">
            <Catalog
                title="Популярное"
                description="Самые просматриваемые фильмы и сериалы на TraneHub"
                movies={data}
            />
        </div>
    );
}
