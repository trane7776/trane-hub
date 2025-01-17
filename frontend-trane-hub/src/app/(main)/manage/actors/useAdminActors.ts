import { IListItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface';
import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config';
import { useDebounce } from '@/hooks/useDebounce';
import { actorService } from '@/services/actor.service';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

export const useAdminActors = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 500);

    const queryClient = useQueryClient();

    const { isLoading, data: actors } = useQuery({
        queryKey: ['get actors for admin dashboard', debouncedSearch],
        queryFn: () => actorService.getAll(debouncedSearch),
        select: (data) =>
            data.map(
                (actor): IListItem => ({
                    id: actor.id,
                    viewUrl: PUBLIC_URL.actor(actor.slug),
                    editUrl: ADMIN_URL.actorEdit(actor.id),
                    items: [actor.name, actor.slug],
                })
            ),
    });

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const { push } = useRouter();

    const { mutateAsync: createAsync } = useMutation({
        mutationKey: ['create actor'],
        mutationFn: () => actorService.create(),
        onSuccess({ data: id }) {
            toast.success('актер создан');
            push(ADMIN_URL.actorEdit(id));
            queryClient.invalidateQueries({
                queryKey: ['get actors for admin dashboard'],
            });
        },
        onError() {
            toast.error('ошибка при создании');
        },
    });

    const { mutateAsync: deleteAsync } = useMutation({
        mutationKey: ['delete actor'],
        mutationFn: (actorId: string) => actorService.delete(actorId),
        onSuccess() {
            toast.success('актер удален');
            queryClient.invalidateQueries({
                queryKey: ['get actors for admin dashboard'],
            });
        },
        onError() {
            toast.error('ошибка при удалении');
        },
    });

    return {
        handleSearch,
        searchTerm,
        actors,
        isLoading,
        setSearchTerm,
        createAsync,
        deleteAsync,
    };
};
