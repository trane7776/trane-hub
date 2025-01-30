import { Heading } from '@/components/ui/heading/Heading';
import { Modal } from '@/components/ui/modal/Modal';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';
import { IReview } from '@/types/review.types';
import React, { useState } from 'react';
import { ReviewForm } from './ReviewForm';
import styles from './Reviews.module.scss';
import { ReviewItem } from './ReviewItem';
interface Props {
    className?: string;
    reviews: IReview[];
    movieId: string;
}

export const Reviews: React.FC<Props> = ({ className, reviews, movieId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useProfile();
    return (
        <div id="reviews" className={cn(className, 'mt-8')}>
            <div className="mb-8">
                <Heading>Отзывы</Heading>

                {user && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-white/80 hover:text-white duration-200"
                    >
                        оставить отзыв
                    </button>
                )}
            </div>

            {user && (
                <Modal
                    isOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                >
                    <ReviewForm
                        movieId={movieId}
                        setModalOpen={setIsModalOpen}
                    />
                </Modal>
            )}
            <div className={styles.reviews}>
                {reviews.length ? (
                    reviews.map((review) => (
                        <ReviewItem key={review.id} review={review} />
                    ))
                ) : (
                    <div>отзывов пока нет</div>
                )}
            </div>
        </div>
    );
};
