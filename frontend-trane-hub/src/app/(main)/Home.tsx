import { Slider } from '@/components/ui/slider/Slider';
import { ISlide } from '@/components/ui/slider/slider.interface';
import React from 'react';

interface Props {
    className?: string;
    slides: ISlide[];
}

export const Home: React.FC<Props> = ({ className, slides }) => {
    return (
        <div className={className}>
            {slides.length && <Slider slides={slides} />}
        </div>
    );
};
