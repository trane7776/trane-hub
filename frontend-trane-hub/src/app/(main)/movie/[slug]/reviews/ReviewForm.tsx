import { cn } from '@/lib/utils';
import { reviewService, TypeData } from '@/services/review.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import styles from './Reviews.module.scss';
import { Heading } from '@/components/ui/heading/Heading';
import { Loader } from '@/components/ui/Loader';
import { Rating } from 'react-simple-star-rating';
import { Button } from '@/components/ui/form-elements/button/Button';
interface Props {
    className?: string;
    movieId: string;
    setModalOpen: (isOpen: boolean) => void;
}

export const ReviewForm: React.FC<Props> = ({
    className,
    movieId,
    setModalOpen,
}) => {
    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<TypeData>({
        mode: 'onChange',
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['leave review'],
        mutationFn: (data: TypeData) => reviewService.leave(movieId, data),
        onSuccess() {
            toast.success('отзыв успешно добавлен');
            queryClient.refetchQueries({ queryKey: ['get movie', movieId] });
            setModalOpen(false);
        },
    });

    const onSubmit: SubmitHandler<TypeData> = (data) => {
        mutate(data);
        reset();
    };

    return (
        <div className={cn(className, styles.leave_form)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading className={styles.heading}>написать отзыв</Heading>
                {isPending ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div>
                        <Controller
                            control={control}
                            name="rating"
                            render={({ field: { onChange, value } }) => (
                                <Rating
                                    onClick={onChange}
                                    initialValue={value}
                                    size={20}
                                    SVGstyle={{
                                        display: 'inline-block',
                                    }}
                                    transition
                                />
                            )}
                            rules={{ required: 'оценка обязательна' }}
                        />
                        <textarea
                            {...formRegister('text', {
                                required: 'текст обязателен',
                            })}
                            className={styles.textarea}
                            placeholder="ваш отзыв..."
                        />

                        {Object.entries(errors) && (
                            <ul className="text-red text-sm list-disc pl-4 mt-3">
                                {Object.entries(errors).map(([key, error]) => (
                                    <li key={key}>{error?.message}</li>
                                ))}
                            </ul>
                        )}

                        <div className="text-right mb-2 mt-8">
                            <Button type="submit">добавить</Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};
