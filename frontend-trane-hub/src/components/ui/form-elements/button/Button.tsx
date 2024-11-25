import React from 'react';
import cn from 'clsx';

import { IButton } from '../form.interface';

import styles from './Button.module.scss';

export const Button: React.FC<IButton> = ({
    className,
    children,
    variant = 'default',
    size = 'md',
    ...rest
}) => {
    return (
        <button
            className={cn(
                styles.button,
                className,
                size === 'sm' && 'rounded-lg px-4',
                size === 'md' && 'text-sm rounded-md',
                {
                    [styles.default]: variant === 'default',
                    [styles.outline]: variant === 'outline',
                }
            )}
            {...rest}
        >
            {children}
        </button>
    );
};
