import { genreService } from '@/services/genre.service';
import { IGenreEditInput } from '@/types/genre.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

export const useGenreEdit = (genreId: string) => {
    const { data: genre, isLoading } = useQuery({
        queryKey: ['genre', genreId],
        queryFn: () => genreService.getById(genreId),
        select: ({ data }) => data,
        enabled: !!genreId,
    });

    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationKey: ['update genre', genreId],
        mutationFn: (data: IGenreEditInput) =>
            genreService.update(genreId, data),
        onSuccess() {
            toast.success('жанр обновлен');
            queryClient.invalidateQueries({
                queryKey: ['get genres for admin dashboard'],
            });
        },
        onError() {
            toast.error('ошибка при обновлении');
        },
    });

    const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
        await mutateAsync(data);
    };

    return { genre, isLoading, onSubmit };
};
