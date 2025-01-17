import { fileService } from '@/services/file.service';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

type TypeUpload = (
    onChange: (url: string) => void,
    folder?: string
) => {
    uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
    isLoading: boolean;
};

export const useUpload: TypeUpload = (onChange, folder) => {
    const [isLoading, setIsLoading] = useState(false);
    const { mutateAsync } = useMutation({
        mutationKey: ['upload file', folder],
        mutationFn: (data: FormData) => fileService.uploadFile(data, folder),
        onSuccess({ data }) {
            onChange(data[0].url);
        },
        onError() {
            toast.error('ошибка при загрузке файла');
        },
    });

    const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files?.length) {
            setIsLoading(true);
            try {
                const formData = new FormData();
                formData.append('image', files[0]);
                await mutateAsync(formData);
            } catch {
                // Обработка ошибок уже есть в `onError`
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        uploadImage,
        isLoading,
    };
};
