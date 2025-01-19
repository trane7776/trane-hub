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
        <div className={cn(className, styles.slide)}>
            {slide.bigPoster && (
                <img
                    src={slide.bigPoster}
                    alt={slide.title}
                    className={styles.image}
                    draggable={false}
                />
            )}
            <div className={styles.content}>
                <Heading className={styles.title}>{slide.title}</Heading>
                <div className={styles.sub_title}>{slide.subTitle}</div>
                <Button
                    className={styles.button}
                    onClick={() => push(slide.link)}
                >
                    смотреть
                </Button>
            </div>
        </div>
    );
};
