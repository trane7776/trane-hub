import { Catalog } from '@/components/ui/catalog-movies/Catalog';
import { movieService } from '@/services/movie.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Новые фильмы',
};

export const revalidate = 60;

async function getMovies() {
    const data = await movieService.getAll();

    return data;
}
export default async function ExplorerPage() {
    const data = await getMovies();

    return (
        <div className="px-6">
            <Catalog
                title="новые фильмы"
                description="новые фильмы и сериалы в хорошем качестве: без смс и регистрации"
                movies={data}
            />
        </div>
    );
}
