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
        <div className={cn(className, styles.banner, 'relative w-full h-40 sm:h-72 rounded-lg overflow-hidden mb-4')}> 
            <img
                src={image}
                alt=""
                className={styles.image + ' w-full h-full object-cover'}
                draggable={false}
            />
            {Details && <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4"> <Details /> </div>}
        </div>
    );
};
