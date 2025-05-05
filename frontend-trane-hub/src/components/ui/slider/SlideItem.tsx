'use client';
import React from 'react';
import { ISlide } from './slider.interface';
import { useRouter } from 'next/navigation';
import styles from './Slider.module.scss';
import { cn } from '@/lib/utils';
import { Heading } from '../heading/Heading';
import { Button } from '../form-elements/button/Button';
interface Props {
    className?: string;
    slide: ISlide;
}

export const SlideItem: React.FC<Props> = ({ className, slide }) => {
    const { push } = useRouter();
    return (
        <div className={cn(className, styles.slide, 'relative w-full h-40 sm:h-72 flex items-center justify-center')}> 
            {slide.bigPoster && (
                <img
                    src={slide.bigPoster}
                    alt={slide.title}
                    className={styles.image + ' w-full h-full object-cover rounded-lg'}
                    draggable={false}
                />
            )}
            <div className={styles.content + ' absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 bg-black/60 p-2 sm:p-4 rounded-lg'}>
                <Heading className={styles.title + ' text-base sm:text-2xl'}>{slide.title}</Heading>
                <div className={styles.sub_title + ' text-xs sm:text-base'}>{slide.subTitle}</div>
                <Button
                    className={styles.button + ' mt-2 sm:mt-4 w-full sm:w-auto'}
                    onClick={() => push(slide.link)}
                >
                    смотреть
                </Button>
            </div>
        </div>
    );
};
