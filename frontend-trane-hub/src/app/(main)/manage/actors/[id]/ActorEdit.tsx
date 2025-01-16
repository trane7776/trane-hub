'use client';
import React from 'react';
import { useActorEdit } from './useActorEdit';
import { Controller, useForm } from 'react-hook-form';
import { IActorEditInput } from '@/types/actor.types';
import { cn } from '@/lib/utils';
import { Heading } from '@/components/ui/heading/Heading';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Field } from '@/components/ui/form-elements/field/Field';
import { Button } from '@/components/ui/form-elements/button/Button';
import { SlugField } from '@/components/ui/form-elements/slug-field/SlugField';
import { generateSlug } from '@/utils/string/generateSlug';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface Props {
    className?: string;
    actorId: string;
}

export const ActorEdit: React.FC<Props> = ({ className, actorId }) => {
    const { actor, onSubmit, isLoading } = useActorEdit(actorId);

    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
        setValue,
        getValues,
    } = useForm<IActorEditInput>({
        mode: 'onChange',
        values: {
            name: actor?.name || '',
            slug: actor?.slug || '',
            photoUrl: actor?.photoUrl || '',
        },
    });
    return (
        <div className={cn(className, 'px-6')}>
            <Heading>настройка актера</Heading>
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
                        {/* Text editor */}

                        <Button>сохранить</Button>
                    </>
                )}
            </form>
        </div>
    );
};
