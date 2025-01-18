'use client';
import React from 'react';
import { useMovieEdit } from './useMovieEdit';
import { Controller, useForm } from 'react-hook-form';
import { IMovieEditInput } from '@/types/movie.types';
import { cn } from '@/lib/utils';
import { Heading } from '@/components/ui/heading/Heading';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Field } from '@/components/ui/form-elements/field/Field';
import { Button } from '@/components/ui/form-elements/button/Button';
import { SlugField } from '@/components/ui/form-elements/slug-field/SlugField';
import { generateSlug } from '@/utils/string/generateSlug';
import { UploadField } from '@/components/ui/form-elements/upload-field/UploadField';
import { useAdminGenres } from './useAdminGenres';
import { useAdminActors } from './useAdminActors';
import { Select } from '@/components/ui/form-elements/select/Select';

interface Props {
    className?: string;
    movieId: string;
}

export const MovieEdit: React.FC<Props> = ({ className, movieId }) => {
    const { movie, onSubmit, isLoading } = useMovieEdit(movieId);
    const { genres, isGenresLoading } = useAdminGenres();
    const { actors, isActorsLoading } = useAdminActors();
    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
        setValue,
        getValues,
    } = useForm<IMovieEditInput>({
        mode: 'onChange',
        values: {
            title: movie?.title || '',
            slug: movie?.slug || '',
            country: movie?.country || '',
            duration: movie?.duration || 0,
            year: movie?.year || 0,
            poster: movie?.poster || '',
            bigPoster: movie?.bigPoster || '',
            videoUrl: movie?.videoUrl || '',
            genres: movie?.genres.map((genre) => genre.id) || [],
            actors: movie?.actors.map((actor) => actor.id) || [],
        },
    });
    return (
        <div className={cn(className, 'px-6')}>
            <Heading>настройка фильма</Heading>
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
                                {...register('title', {
                                    required: 'обязательное поле',
                                })}
                                placeholder="название"
                                error={errors.title}
                            />

                            <SlugField
                                register={register}
                                error={errors.slug}
                                generate={() => {
                                    setValue(
                                        'slug',
                                        generateSlug(getValues('title'))
                                    );
                                }}
                            />
                            <Field
                                {...register('country', {
                                    required: 'обязательное поле',
                                })}
                                placeholder="страна"
                                error={errors.title}
                                style={{ width: '31%' }}
                            />
                            <Field
                                {...register('duration', {
                                    required: 'обязательное поле',
                                })}
                                placeholder="длительность в минутах"
                                error={errors.duration}
                                style={{ width: '31%' }}
                            />
                            <Field
                                {...register('year', {
                                    required: 'обязательное поле',
                                })}
                                placeholder="год"
                                error={errors.year}
                                style={{ width: '31%' }}
                            />

                            <Controller
                                name="genres"
                                control={control}
                                rules={{
                                    required: 'выберите хотя бы один жанр',
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <Select
                                        error={error}
                                        field={field}
                                        placeholder="жанры"
                                        options={genres || []}
                                        isLoading={isGenresLoading}
                                        isMulti
                                    />
                                )}
                            />

                            <Controller
                                name="actors"
                                control={control}
                                rules={{
                                    required: 'выберите хотя бы одного актера',
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <Select
                                        error={error}
                                        field={field}
                                        placeholder="актеры"
                                        options={actors || []}
                                        isLoading={isGenresLoading}
                                        isMulti
                                    />
                                )}
                            />

                            <Controller
                                name="poster"
                                control={control}
                                render={({
                                    field: { value, onChange },
                                    fieldState: { error },
                                }) => (
                                    <UploadField
                                        onChange={onChange}
                                        value={value}
                                        error={error}
                                        folder="movies"
                                        placeholder="постер"
                                        className="mt-4"
                                    />
                                )}
                                rules={{
                                    required: 'постер обязателен',
                                }}
                            />
                            <Controller
                                name="bigPoster"
                                control={control}
                                render={({
                                    field: { value, onChange },
                                    fieldState: { error },
                                }) => (
                                    <UploadField
                                        onChange={onChange}
                                        value={value}
                                        error={error}
                                        folder="movies"
                                        placeholder="большой постер"
                                        className="mt-4"
                                    />
                                )}
                                rules={{
                                    required: 'большой постер обязателен',
                                }}
                            />
                            <Controller
                                name="videoUrl"
                                control={control}
                                render={({
                                    field: { value, onChange },
                                    fieldState: { error },
                                }) => (
                                    <UploadField
                                        onChange={onChange}
                                        value={value}
                                        error={error}
                                        folder="movies"
                                        placeholder="видео"
                                        className="mt-4 mb-24"
                                        isImage={false}
                                    />
                                )}
                                rules={{
                                    required: 'видео обязательно',
                                }}
                            />
                        </div>
                        <Button className="mb-12">сохранить</Button>
                    </>
                )}
            </form>
        </div>
    );
};
