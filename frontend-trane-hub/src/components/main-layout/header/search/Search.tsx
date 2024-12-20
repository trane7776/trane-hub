import React from 'react';

interface Props {
    className?: string;
}

export const Search: React.FC<Props> = ({ className }) => {
    return <div className={className}>Search</div>;
};
