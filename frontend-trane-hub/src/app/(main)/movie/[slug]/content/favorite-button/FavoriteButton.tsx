import React, { use } from 'react';
import styles from './FavoriteButton.module.scss';
import { useProfile } from '@/hooks/useProfile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { AiFillHeart } from 'react-icons/ai';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
    movieId: string;
}

export const FavoriteButton: React.FC<Props> = ({ className, movieId }) => {
    const { user } = useProfile();

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['toggle favorite', movieId],
        mutationFn: () => userService.toggleFavorite(movieId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['profile'],
            });
        },
    });

    if (!user) return null;

    const isExists = user.favorites.some((favorite) => favorite.id === movieId);

    return (
        <button
            className={cn(className, styles.button)}
            onClick={() => mutate()}
            disabled={isPending}
        >
            {isExists ? (
                <AiFillHeart
                    className="hover:fill-[#ca0946] transition-colors"
                    color="#f6004a"
                    size={33}
                />
            ) : (
                <AiFillHeart
                    className="hover:opacity-55 transition-opacity"
                    opacity={0.7}
                    size={33}
                />
            )}
        </button>
    );
};
