import { IReview } from '@/types/review.types';
import React from 'react';

interface Props {
    className?: string;
    review: IReview;
}

export const ReviewItem: React.FC<Props> = ({ className, review }) => {
    return <div className={className}>ReviewItem</div>;
};
