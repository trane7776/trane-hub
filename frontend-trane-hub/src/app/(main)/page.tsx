import { Metadata } from 'next';
import { Home } from './Home';
import { movieService } from '@/services/movie.service';
import { ISlide } from '@/components/ui/slider/slider.interface';
import { PUBLIC_URL } from '@/config/url.config';
import { getGenresList } from '@/utils/movie/getGenresList';
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';
import { actorService } from '@/services/actor.service';
import { getMovieLength } from '@/utils/string/getMovieLength';

export const metadata: Metadata = {
    title: 'Главная',
};

export const revalidate = 60;

async function getContent() {
    const movies = await movieService.getAll();

    const slides: ISlide[] = movies
        .map((movie) => ({
            id: movie.id,
            link: PUBLIC_URL.movie(movie.slug),
            subTitle: getGenresList(movie.genres),
            title: movie.title,
            bigPoster: movie.bigPoster,
        }))
        .slice(0, 4);
    const dataTrendingMovies = await movieService.getMostPopularMovies();
    const trendingMovies: IGalleryItem[] = dataTrendingMovies
        .slice(0, 6)
        .map((movie) => ({
            name: movie.title,
            poster: movie.poster,
            link: PUBLIC_URL.movie(movie.slug),
            content: {
                title: movie.title,
                subTitle: movie.genres[0].name,
            },
        }));
    const dataActors = await actorService.getAll();

    const actors: IGalleryItem[] = dataActors.slice(0, 6).map((actor) => ({
        name: actor.name,
        poster: actor.photoUrl,
        link: PUBLIC_URL.actor(actor.slug),
        content: {
            title: actor.name,
            subTitle: getMovieLength(actor.movies.length),
        },
    }));

    return { slides, trendingMovies, actors };
}

export default async function HomePage() {
    const { slides, trendingMovies, actors } = await getContent();
    return (
        <Home slides={slides} trendingMovies={trendingMovies} actors={actors} />
    );
}
