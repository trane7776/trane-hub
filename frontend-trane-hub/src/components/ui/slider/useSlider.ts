import { useEffect, useState } from 'react';

export const useSlider = (length: number) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [slideIn, setSlideIn] = useState(true);

    const isExistsNext = currentIndex < length - 1;
    const isExistsPrev = currentIndex > 0;

    useEffect(() => {
        // автоматическое переключение слайдов
        const interval = setTimeout(() => {
            if (isExistsNext) {
                handleArrowClick('next');
            } else {
                setCurrentIndex(0);
            }
        }, 10000);

        return () => clearTimeout(interval);
    }, [currentIndex, isExistsNext]);

    const handleArrowClick = (direction: 'next' | 'prev') => {
        const newIndex =
            direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        setSlideIn(false);
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setSlideIn(true);
        }, 300);
    };

    return {
        slideIn,
        index: currentIndex,
        isNext: isExistsNext,
        isPrev: isExistsPrev,
        handleClick: handleArrowClick,
    };
};
