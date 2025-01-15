import { axiosClassic, axiosWithAuth } from '@/api/interceptors';
import { API_URL } from '@/config/api.config';
import { IGenre, IGenreEditInput } from '@/types/genre.types';

class GenreService {
    async getAll(searchTerm?: string) {
        const { data } = await axiosWithAuth.get<IGenre[]>(API_URL.genres(''), {
            params: searchTerm ? { searchTerm } : {},
        });

        return data;
    }

    async getById(id: string) {
        const response = await axiosWithAuth.get<IGenre>(
            API_URL.genres(`/by-id/${id}`)
        );
        return response;
    }

    async getBySlug(slug: string) {
        return axiosClassic.get<IGenre>(API_URL.genres(`/by-slug/${slug}`));
    }

    async create() {
        return axiosWithAuth.post<string>(API_URL.genres(''));
    }

    async update(id: string, data: IGenreEditInput) {
        return axiosWithAuth.put<IGenre>(API_URL.genres(`/${id}`), data);
    }

    async delete(id: string) {
        return axiosWithAuth.delete<IGenre>(API_URL.genres(`/${id}`));
    }
}

export const genreService = new GenreService();
