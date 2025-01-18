import { IOption } from '@/components/ui/form-elements/form.interface';
import { genreService } from '@/services/genre.service';
import { useQuery } from '@tanstack/react-query';

export const useAdminGenres = () => {
    const { data: genres, isLoading: isGenresLoading } = useQuery({
        queryKey: ['list of genres'],
        queryFn: () => genreService.getAll(),
        select: (data) =>
            data.map(
                (genre): IOption => ({
                    label: genre.name,
                    value: genre.id,
                })
            ),
    });
    return { genres, isGenresLoading };
};
