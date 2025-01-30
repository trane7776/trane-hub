import { IReview } from '@/types/review.types';
import React from 'react';
import styles from './Reviews.module.scss';
import { cn } from '@/lib/utils';
import { Rating } from 'react-simple-star-rating';
interface Props {
    className?: string;
    review: IReview;
}

export const ReviewItem: React.FC<Props> = ({ className, review }) => {
    return (
        <div className={cn(className, styles.review)}>
            <div className={styles.user}>
                <img
                    alt={review.user.name}
                    src={review.user.avatarPath}
                    width={40}
                    height={40}
                    className={styles.avatar}
                />
                <span>{review.user.name}</span>
            </div>
            <Rating
                readonly
                initialValue={review.rating}
                SVGstyle={{
                    display: 'inline-block',
                }}
                size={18}
                allowFraction
                transition
            />
            <div className={styles.text}>{review.text}</div>
        </div>
    );
};
