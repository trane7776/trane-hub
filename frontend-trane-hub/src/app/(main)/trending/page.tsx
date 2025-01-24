import { Catalog } from '@/components/ui/catalog-movies/Catalog';
import { movieService } from '@/services/movie.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Популярные фильмы',
};

export const revalidate = 60;

async function getMovies() {
    const data = await movieService.getMostPopularMovies();

    return data;
}
export default async function TrendingPage() {
    const data = await getMovies();

    return (
        <div className="px-6">
            <Catalog
                title="Популярные фильмы"
                description="Актуальные фильмы и сериалы в хорошем качестве: без смс и регистрации"
                movies={data}
            />
        </div>
    );
}
