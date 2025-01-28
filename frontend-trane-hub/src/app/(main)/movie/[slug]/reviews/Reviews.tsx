import React from 'react';

interface Props {
    className?: string;
}

export const Reviews: React.FC<Props> = ({ className }) => {
    return <div className={className}>Reviews</div>;
};
