'use client';

import { Catalog } from '@/components/ui/catalog-movies/Catalog';
import { useProfile } from '@/hooks/useProfile';
import { FC } from 'react';

export const Favorites: FC = () => {
    const { user, isLoading } = useProfile();

    return (
        <div className="px-6">
            <Catalog
                title="любимое"
                movies={user?.favorites || []}
                isLoading={isLoading}
            />
        </div>
    );
};
