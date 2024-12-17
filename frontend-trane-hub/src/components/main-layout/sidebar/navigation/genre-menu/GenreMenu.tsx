import React from 'react';
import { useGenresMenu } from './useGenresMenu';

interface Props {
    className?: string;
}

export const GenreMenu: React.FC<Props> = ({ className }) => {
    const { data, isLoading } = useGenresMenu();

    console.log(data);

    return <div className={className}>GenreMenu</div>;
};
