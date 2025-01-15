'use client';
import React from 'react';
import { useGenreEdit } from './useGenreEdit';
import { Controller, useForm } from 'react-hook-form';
import { IGenreEditInput } from '@/types/genre.types';
import { cn } from '@/lib/utils';
import { Heading } from '@/components/ui/heading/Heading';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Field } from '@/components/ui/form-elements/field/Field';
import { Button } from '@/components/ui/form-elements/button/Button';
import { SlugField } from '@/components/ui/form-elements/slug-field/SlugField';
import { generateSlug } from '@/utils/string/generateSlug';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';

interface Props {
    className?: string;
    genreId: string;
}

const DynamicTextEditor = dynamic(
    () => import('@/components/ui/form-elements/text-editor/TextEditor'),
    { ssr: false }
);
export const GenreEdit: React.FC<Props> = ({ className, genreId }) => {
    const { genre, onSubmit, isLoading } = useGenreEdit(genreId);

    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
        setValue,
        getValues,
    } = useForm<IGenreEditInput>({
        mode: 'onChange',
        values: {
            name: genre?.name || '',
            slug: genre?.slug || '',
            description: genre?.description || '',
            icon: genre?.icon! || '',
        },
    });
    return (
        <div className={cn(className, 'px-6')}>
            <Heading>настройка жанра</Heading>
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
                                placeholder="название"
                                error={errors.name}
                                style={{ width: '31%' }}
                            />

                            <div style={{ width: '31%' }}>
                                <SlugField
                                    register={register}
                                    error={errors.slug}
                                    generate={() => {
                                        setValue(
                                            'slug',
                                            generateSlug(getValues('name'))
                                        );
                                    }}
                                />
                            </div>

                            <Field
                                {...register('icon', {
                                    required: 'иконка обязательна',
                                })}
                                placeholder="иконка"
                                error={errors.icon}
                                style={{ width: '31%' }}
                            />
                        </div>
                        {/* Text editor */}
                        <Controller
                            name="description"
                            control={control}
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <DynamicTextEditor
                                    placeholder="описание"
                                    onChange={onChange}
                                    error={error}
                                    value={value}
                                />
                            )}
                        />
                        <Button>сохранить</Button>
                    </>
                )}
            </form>
        </div>
    );
};
