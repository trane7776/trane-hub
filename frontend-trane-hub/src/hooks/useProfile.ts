import { userService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
    const { data: user, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: () => userService.getProfile(),
        select: ({ data }) => data,
        retry: 1, // Уменьшаем количество повторных попыток
        refetchOnWindowFocus: false, // Отключаем обновление при фокусе окна
    });

    return { user, isLoading: isLoading && !user };
};
