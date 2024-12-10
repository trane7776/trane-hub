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
        <div className="px-6">
            <div className={styles.wrapper}>
                <Heading className={styles.heading}>
                    привет, {user.name}
                </Heading>
                <div className={styles.avatar}>
                    <img
                        src={user.avatarPath}
                        alt={user.name}
                        width={180}
                        height={180}
                        className="rounded-md"
                    />
                </div>
                <Button
                    className={styles.button}
                    variant="outline"
                    onClick={logout}
                >
                    выйти
                </Button>
            </div>
        </div>
    );
};
