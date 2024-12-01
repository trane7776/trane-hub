import { axiosWithAuth } from '@/api/interceptors';
import { API_URL } from '@/config/api.config';
import { IUser, IUserEditInput } from '@/types/user.types';

class UserService {
    async getAll(searchTerm?: string) {
        const { data } = await axiosWithAuth.get<IUser[]>(API_URL.users(''), {
            params: searchTerm ? { searchTerm } : {},
        });

        return data;
    }

    async getProfile() {
        const response = await axiosWithAuth.get<IUser>(
            API_URL.users('/profile')
        );
        return response;
    }

    async getProfileForMiddleware(accessToken?: string) {
        const response = await axiosWithAuth.get<IUser>(
            API_URL.users('/profile'),
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response;
    }

    async toggleFavorite(movieId: string) {
        return axiosWithAuth.post(API_URL.users('/profile/favorites'), {
            movieId,
        });
    }

    async getById(id: string) {
        const response = await axiosWithAuth.get<IUser>(
            API_URL.users(`/${id}`)
        );
        return response;
    }

    async update(id: string, data: IUserEditInput) {
        return axiosWithAuth.put<string>(API_URL.users(`/${id}`), data);
    }

    async delete(id: string) {
        return axiosWithAuth.delete<string>(API_URL.users(`/${id}`));
    }
}

export const userService = new UserService();
