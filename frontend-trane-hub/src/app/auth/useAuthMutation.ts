import { authService } from '@/services/auth/auth.service';
import { IAuthForm } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { UseFormReset } from 'react-hook-form';
import toast from 'react-hot-toast';
import { DASHBOARD_URL } from '../config/url.config';

export const useAuthMutation = (
    isLoginForm: boolean,
    reset: UseFormReset<IAuthForm>
) => {
    const { push, refresh } = useRouter();

    const { mutate } = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) =>
            authService.main(isLoginForm ? 'login' : 'register', data),
        onSuccess: () => {
            toast.success('вы успешно вошли в аккаунт');
            reset();
            push(DASHBOARD_URL.root());
            refresh();
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'ошибка авторизации');
        },
    });

    return { mutate };
};
