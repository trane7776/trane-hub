import { MainLayout } from '@/components/main-layout/MainLayout';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <MainLayout>{children}</MainLayout>;
}
