'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Auth.module.scss';
import { Heading } from '@/components/ui/heading/Heading';
import { IAuthForm } from '@/types/auth.types';
import { AuthFields } from './Auth.fields';
import { Button } from '@/components/ui/form-elements/button/Button';
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

    const onSubmit: SubmitHandler<IAuthForm> = (data) => {
        console.log(data);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <Heading>
                    {isLoginForm ? 'войти в аккаунт' : 'регистрация'}
                </Heading>
                <form onSubmit={() => handleSubmit(onSubmit)}>
                    <AuthFields
                        register={register}
                        errors={errors}
                        isLoginForm={isLoginForm}
                    />
                    <Button className={styles.button}>
                        {isLoginForm ? 'войти' : 'создать аккаунт'}
                    </Button>
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
