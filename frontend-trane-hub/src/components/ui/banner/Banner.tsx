import React from 'react';

import styles from './Banner.module.scss';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
    image: string;
    Details?: React.FC | null;
}

export const Banner: React.FC<Props> = ({ className, image, Details }) => {
    return (
        <div className={cn(className, styles.banner)}>
            <img
                src={image}
                alt=""
                className={styles.image}
                draggable={false}
            />
            {Details && <Details />}
        </div>
    );
};
