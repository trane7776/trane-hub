import type { Metadata } from 'next';
import './globals.scss';
import { Providers } from './providers';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants';

export const metadata: Metadata = {
    title: {
        absolute: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(process.env.APP_URL as string),
    openGraph: {
        type: 'website',
        locale: 'ru_RU',
        siteName: SITE_NAME,
        emails: ['info@tranehub.com'],
    },
    icons: {
        icon: '/images/logo.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ru"
            className={`${GeistSans.variable} ${GeistMono.variable}`}
        >
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
