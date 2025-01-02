'use client';
import React from 'react';

import styles from './UserMenu.module.scss';
import { cn } from '@/lib/utils';
import { useProfile } from '@/hooks/useProfile';
import { Loader } from '@/components/ui/Loader';
import Link from 'next/link';
import { ADMIN_URL, DASHBOARD_URL, PUBLIC_URL } from '@/config/url.config';
import { Button } from '@/components/ui/form-elements/button/Button';
import { Icon } from '@/components/ui/Icon';
import { LuLoader } from 'react-icons/lu';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { UserRole } from '@/types/user.types';

interface Props {
    className?: string;
}

export const UserMenu: React.FC<Props> = ({ className }) => {
    const { user, isLoading } = useProfile();
    return (
        <div className={cn(className, styles.wrapper)}>
            {isLoading ? (
                <LuLoader className={styles.loader} />
            ) : user ? (
                <div className={styles.menu}>
                    {user.role === UserRole.ADMIN && (
                        <Link href={ADMIN_URL.root()}>
                            <MdOutlineAdminPanelSettings
                                className={styles.icon}
                            />
                        </Link>
                    )}
                    <Link href={DASHBOARD_URL.favorites()}>
                        <AiOutlineHeart className={styles.icon} />
                    </Link>
                    <Link href={DASHBOARD_URL.root()}>
                        <img
                            src={user.avatarPath}
                            alt={user.name}
                            width={42}
                            height={42}
                            className={styles.avatar}
                        />
                    </Link>
                </div>
            ) : (
                <Link href={PUBLIC_URL.auth()}>
                    <Button variant="outline" className="px-4">
                        <Icon name="LuLogIn" className="size-4 mr-2" />
                        Войти
                    </Button>
                </Link>
            )}
        </div>
    );
};
