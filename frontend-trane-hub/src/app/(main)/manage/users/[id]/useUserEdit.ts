import { userService } from '@/services/user.service';
import { IUserEditInput } from '@/types/user.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

export const useUserEdit = (userId: string) => {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => userService.getById(userId),
        select: ({ data }) => data,
        enabled: !!userId,
    });

    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationKey: ['update user', userId],
        mutationFn: (data: IUserEditInput) => userService.update(userId, data),
        onSuccess() {
            toast.success('пользователь обновлен');
            queryClient.invalidateQueries({
                queryKey: ['get users for admin dashboard'],
            });
        },
        onError() {
            toast.error('ошибка при обновлении');
        },
    });

    const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
        await mutateAsync(data);
    };

    return { user, isLoading, onSubmit };
};
