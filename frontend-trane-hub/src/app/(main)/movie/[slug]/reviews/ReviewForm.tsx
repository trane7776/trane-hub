import React from 'react';

interface Props {
    className?: string;
    movieId: string;
    setModalOpen: (isOpen: boolean) => void;
}

export const ReviewForm: React.FC<Props> = ({
    className,
    movieId,
    setModalOpen,
}) => {
    return <div className={className}>ReviewForm</div>;
};
