import { cn } from '@/lib/utils';
import React from 'react';
import styles from './SlideArrow.module.scss';
import { Icon } from '../../Icon';
interface Props {
    className?: string;
    variant: 'left' | 'right';
    clickHandler: () => void;
}

export const SlideArrow: React.FC<Props> = ({
    className,
    variant,
    clickHandler,
}) => {
    const isLeft = variant === 'left';

    return (
        <button
            onClick={clickHandler}
            className={cn(className, styles.arrow, {
                [styles.left]: isLeft,
                [styles.right]: !isLeft,
            })}
        >
            <Icon
                name={isLeft ? 'LuChevronLeft' : 'LuChevronRight'}
                className={styles.icon}
            />
        </button>
    );
};
