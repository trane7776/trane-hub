'use client';
import React from 'react';
import { useUserEdit } from './useUserEdit';
import { Controller, useForm } from 'react-hook-form';
import { IUserEditInput, UserRole } from '@/types/user.types';
import { cn } from '@/lib/utils';
import { Heading } from '@/components/ui/heading/Heading';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Field } from '@/components/ui/form-elements/field/Field';
import { Button } from '@/components/ui/form-elements/button/Button';
import { SlugField } from '@/components/ui/form-elements/slug-field/SlugField';
import { generateSlug } from '@/utils/string/generateSlug';
import { UploadField } from '@/components/ui/form-elements/upload-field/UploadField';

import { Select } from '@/components/ui/form-elements/select/Select';
import darkSelectStyles from '@/components/ui/form-elements/select/darkSelectStyles';

interface Props {
    className?: string;
    userId: string;
}

export const UserEdit: React.FC<Props> = ({ className, userId }) => {
    const { user, onSubmit, isLoading } = useUserEdit(userId);

    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
        setValue,
        getValues,
    } = useForm<IUserEditInput>({
        mode: 'onChange',
        values: {
            name: user?.name || '',
            email: user?.email || '',
            role: user?.role || UserRole.USER,
        },
    });

    const roles = [
        {
            label: 'Пользователь',
            value: UserRole.USER,
        },
        {
            label: 'Администратор',
            value: UserRole.ADMIN,
        },
    ];

    return (
        <div className={cn(className, 'px-6')}>
            <Heading>настройка пользователя</Heading>
            <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
                {isLoading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <SkeletonLoader className="h-10" key={index} />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className={formStyles.fields}>
                            <Field
                                {...register('name', {
                                    required: 'обязательное поле',
                                })}
                                placeholder="имя"
                                error={errors.name}
                            />

                            <Field
                                {...register('email', {
                                    required: 'обязательное поле',
                                })}
                                placeholder="почта"
                                error={errors.email}
                            />

                            <Controller
                                name="role"
                                control={control}
                                rules={{
                                    required: 'выберите роль',
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <Select
                                        error={error}
                                        field={field}
                                        placeholder="роль"
                                        options={roles || []}
                                    />
                                )}
                            />
                        </div>
                        <Button className="mb-12">сохранить</Button>
                    </>
                )}
            </form>
        </div>
    );
};
