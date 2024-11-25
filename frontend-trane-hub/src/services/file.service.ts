import { axiosWithAuth } from '@/api/interceptors';
import { API_URL } from '@/app/config/api.config';

interface IFile {
    url: string;
    name: string;
}

class FileService {
    async uploadFile(file: FormData, folder?: string) {
        return axiosWithAuth.post<IFile[]>(API_URL.files(''), file, {
            params: {
                folder,
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

export const fileService = new FileService();
