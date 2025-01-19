import { Metadata } from 'next';
import { Home } from './Home';
import { movieService } from '@/services/movie.service';
import { ISlide } from '@/components/ui/slider/slider.interface';
import { PUBLIC_URL } from '@/config/url.config';
import { getGenresList } from '@/utils/movie/getGenresList';

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

    return { slides };
}

export default async function HomePage() {
    const { slides } = await getContent();
    return <Home slides={slides} />;
}
