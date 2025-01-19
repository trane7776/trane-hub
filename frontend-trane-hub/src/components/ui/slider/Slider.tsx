'use client';
import React from 'react';
import { ISlide } from './slider.interface';
import { useSlider } from './useSlider';

import styles from './Slider.module.scss';
import { cn } from '@/lib/utils';
import { SlideArrow } from './slide-arrow/SlideArrow';
import { SlideItem } from './SlideItem';
import { CSSTransition } from 'react-transition-group';

interface Props {
    className?: string;
    slides: ISlide[];
}

export const Slider: React.FC<Props> = ({ className, slides }) => {
    const { handleClick, index, isNext, isPrev, slideIn } = useSlider(
        slides.length
    );
    return (
        <div className={cn(className, styles.slider)}>
            {isPrev && (
                <SlideArrow
                    variant="left"
                    clickHandler={() => handleClick('prev')}
                />
            )}

            <CSSTransition
                in={slideIn}
                timeout={300}
                classNames="slide-animation"
                unmountOnExit
            >
                <SlideItem slide={slides[index]} />
            </CSSTransition>

            {isNext && (
                <SlideArrow
                    variant="right"
                    clickHandler={() => handleClick('next')}
                />
            )}
        </div>
    );
};
