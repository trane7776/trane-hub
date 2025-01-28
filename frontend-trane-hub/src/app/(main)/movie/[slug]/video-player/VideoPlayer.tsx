import React from 'react';

interface Props {
    className?: string;
}

export const VideoPlayer: React.FC<Props> = ({ className }) => {
    return <div className={className}>VideoPlayer</div>;
};
