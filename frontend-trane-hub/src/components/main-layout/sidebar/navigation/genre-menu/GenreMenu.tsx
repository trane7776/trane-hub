import React from 'react';
import { useGenresMenu } from './useGenresMenu';
import { Menu } from '../Menu';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';

interface Props {
    className?: string;
}

export const GenreMenu: React.FC<Props> = ({ className }) => {
    const { data, isLoading } = useGenresMenu();

    return isLoading ? (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonLoader className="h-10 mx-4 mt-2" key={index} />
            ))}
        </div>
    ) : (
        <Menu menu={{ title: 'Популярные жанры', items: data || [] }} />
    );
};
