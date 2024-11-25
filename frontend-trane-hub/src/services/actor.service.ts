import { axiosClassic, axiosWithAuth } from '@/api/interceptors';
import { API_URL } from '@/app/config/api.config';
import { IActor, IActorEditInput } from '@/types/actor.types';

class ActorService {
    async getAll(searchTerm?: string) {
        const { data } = await axiosClassic.get<IActor[]>(API_URL.actors(''), {
            params: searchTerm ? { searchTerm } : {},
        });

        return data;
    }

    async getById(id: string) {
        const response = await axiosWithAuth.get<IActor>(
            API_URL.actors(`/by-id/${id}`)
        );
        return response;
    }

    async getBySlug(slug: string) {
        return axiosClassic.get<IActor>(API_URL.actors(`/by-slug/${slug}`));
    }

    async create() {
        return axiosWithAuth.post<string>(API_URL.actors(''));
    }

    async update(id: string, data: IActorEditInput) {
        return axiosWithAuth.put<IActor>(API_URL.actors(`/${id}`), data);
    }

    async delete(id: string) {
        return axiosWithAuth.delete<IActor>(API_URL.actors(`/${id}`));
    }
}

export const actorService = new ActorService();
