'use client';
import React from 'react';

import styles from './Logo.module.scss';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { PUBLIC_URL } from '@/config/url.config';
import { cn } from '@/lib/utils';
import { HandySvg } from 'handy-svg';
interface Props {
    className?: string;
}

const font = Poppins({
    subsets: ['latin'],
    weight: ['600'],
});

export const Logo: React.FC<Props> = ({ className }) => {
    return (
        <Link href={PUBLIC_URL.home()} className={cn(className, styles.logo)}>
            <HandySvg
                src="/images/logo.svg"
                className="fill-primary"
                width="50"
                height="50"
            />
            <div
                className={cn(
                    'font-semibold text-2xl text-white',
                    font.className
                )}
            >
                Trane<span className="text-primary">Hub</span>
            </div>
        </Link>
    );
};
