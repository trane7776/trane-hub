'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Auth.module.scss';
import { Heading } from '@/components/ui/heading/Heading';
import { IAuthForm } from '@/types/auth.types';
import { AuthFields } from './Auth.fields';
import { Button } from '@/components/ui/form-elements/button/Button';
import { useAuthMutation } from './useAuthMutation';
interface Props {
    className?: string;
}

export const Auth: React.FC<Props> = ({ className }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IAuthForm>({
        mode: 'onChange',
    });

    const [isLoginForm, setIsLogin] = React.useState(true);
    const { mutate } = useAuthMutation(isLoginForm, reset);
    const onSubmit: SubmitHandler<IAuthForm> = (data) => {
        mutate(data);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <Heading className={styles.heading}>
                    {isLoginForm ? 'войти в аккаунт' : 'регистрация'}
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AuthFields
                        register={register}
                        errors={errors}
                        isLoginForm={isLoginForm}
                    />
                    <Button className={styles.button}>
                        {isLoginForm ? 'войти' : 'создать аккаунт'}
                    </Button>
                    <div className={styles.toggle}>
                        {isLoginForm ? 'нет аккаунта? ' : 'есть аккаунт? '}
                        <button
                            type="button"
                            className="text-primary hover:text-red-900 transition-colors"
                            onClick={() => {
                                setIsLogin(!isLoginForm);
                            }}
                        >
                            {isLoginForm ? 'зарегистрируйтесь' : 'войдите'}
                        </button>
                    </div>
                </form>
            </div>
            <div className={styles.right}>
                <img
                    src="/images/logo.svg"
                    height={150}
                    width={150}
                    alt="Авторизация"
                />
            </div>
        </div>
    );
};
