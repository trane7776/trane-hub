import { IOption } from '@/components/ui/form-elements/form.interface';
import { actorService } from '@/services/actor.service';
import { useQuery } from '@tanstack/react-query';

export const useAdminActors = () => {
    const { data: actors, isLoading: isActorsLoading } = useQuery({
        queryKey: ['list of actors'],
        queryFn: () => actorService.getAll(),
        select: (data) =>
            data.map(
                (actor): IOption => ({
                    label: actor.name,
                    value: actor.id,
                })
            ),
    });
    return { actors, isActorsLoading };
};
