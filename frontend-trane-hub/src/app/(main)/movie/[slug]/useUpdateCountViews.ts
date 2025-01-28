import { movieService } from '@/services/movie.service';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export const useUpdateCountViews = (slug: string) => {
    const { mutateAsync } = useMutation({
        mutationKey: ['update count views', slug],
        mutationFn: () => movieService.updateCountViews(slug),
    });

    const hasUpdated = useRef(false);

    useEffect(() => {
        if (slug && !hasUpdated.current) {
            mutateAsync();
            hasUpdated.current = true;
        }
    }, [slug, mutateAsync]);
};
