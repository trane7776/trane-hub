import { actorService } from '@/services/actor.service';
import { IActorEditInput } from '@/types/actor.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

export const useActorEdit = (actorId: string) => {
    const { data: actor, isLoading } = useQuery({
        queryKey: ['actor', actorId],
        queryFn: () => actorService.getById(actorId),
        select: ({ data }) => data,
        enabled: !!actorId,
    });

    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationKey: ['update actor', actorId],
        mutationFn: (data: IActorEditInput) =>
            actorService.update(actorId, data),
        onSuccess() {
            toast.success('актер обновлен');
            queryClient.invalidateQueries({
                queryKey: ['get actors for admin dashboard'],
            });
        },
        onError() {
            toast.error('ошибка при обновлении');
        },
    });

    const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
        await mutateAsync(data);
    };

    return { actor, isLoading, onSubmit };
};
