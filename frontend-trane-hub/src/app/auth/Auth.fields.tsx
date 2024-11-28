import { Field } from '@/components/ui/form-elements/field/Field';
import { IAuthForm } from '@/types/auth.types';
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { validEmail } from './valid-email';

interface Props {
    register: UseFormRegister<IAuthForm>;
    errors: {
        name?: FieldError;
        email?: FieldError;
        password?: FieldError;
    };
    isLoginForm: boolean;
}

export const AuthFields: React.FC<Props> = ({
    register,
    errors,
    isLoginForm,
}) => {
    return (
        <>
            {!isLoginForm && (
                <Field
                    {...register('name', {
                        required: 'имя обязательно',
                        minLength: {
                            value: 1,
                            message: 'пожалуйста, введите имя',
                        },
                    })}
                    placeholder="имя"
                    error={errors.name}
                />
            )}
            <Field
                {...register('email', {
                    required: 'email обязателен',
                    pattern: {
                        value: validEmail,
                        message: 'пожалуйста, введите корректный email',
                    },
                })}
                placeholder="email"
                error={errors.email}
            />

            <Field
                {...register('password', {
                    required: 'пароль обязателен',
                    minLength: {
                        value: 6,
                        message: 'пароль должен быть не менее 6 символов',
                    },
                })}
                type="password"
                placeholder="пароль"
                error={errors.password}
            />
        </>
    );
};
