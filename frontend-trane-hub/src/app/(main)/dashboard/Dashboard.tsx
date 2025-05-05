'use client';
import { PUBLIC_URL } from '@/config/url.config';
import { useProfile } from '@/hooks/useProfile';
import { removeFromStorage } from '@/services/auth/auth-token.service';

import { useRouter } from 'next/navigation';
import React from 'react';

import styles from './Dashboard.module.scss';
import { Heading } from '@/components/ui/heading/Heading';
import { Button } from '@/components/ui/form-elements/button/Button';

interface Props {
    className?: string;
}

export const Dashboard: React.FC<Props> = ({ className }) => {
    const { user } = useProfile();

    const { push } = useRouter();

    if (!user) return null;

    const logout = () => {
        removeFromStorage();
        push(PUBLIC_URL.auth());
    };
    return (
        <div className="px-2 sm:px-6">
            <div className={styles.wrapper + ' flex flex-col items-center gap-4'}>
                <Heading className={styles.heading + ' text-lg sm:text-2xl'}>
                    привет, {user.name}
                </Heading>
                <div className={styles.avatar + ' w-32 h-32 sm:w-44 sm:h-44'}>
                    <img
                        src={user.avatarPath}
                        alt={user.name}
                        width={180}
                        height={180}
                        className="rounded-md w-full h-full object-cover"
                    />
                </div>
                <Button
                    className={styles.button + ' w-full sm:w-auto'}
                    variant="outline"
                    onClick={logout}
                >
                    выйти
                </Button>
            </div>
        </div>
    );
};
