import { Gallery } from '@/components/ui/gallery/Gallery';
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';
import { Heading } from '@/components/ui/heading/Heading';
import { Slider } from '@/components/ui/slider/Slider';
import { ISlide } from '@/components/ui/slider/slider.interface';
import React from 'react';

interface Props {
    className?: string;
    slides: ISlide[];
    trendingMovies: IGalleryItem[];
    actors: IGalleryItem[];
}

export const Home: React.FC<Props> = ({
    className,
    slides,
    trendingMovies,
    actors,
}) => {
    return (
        <div className={className + ' flex flex-col gap-4'}>
            {slides.length && <Slider slides={slides} className="mb-2" />}

            <div className="px-2 sm:px-6 my-3">
                <Heading className="text-lg sm:text-xl mb-2">в тренде</Heading>
                {trendingMovies.length && <Gallery items={trendingMovies} />}
            </div>
            <div className="px-2 sm:px-6 my-3">
                <Heading className="text-lg sm:text-xl mb-2">лучшие актеры</Heading>
                {actors.length && <Gallery items={actors} />}
            </div>
        </div>
    );
};
