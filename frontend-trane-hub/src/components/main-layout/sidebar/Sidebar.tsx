import React from 'react';

interface Props {
    className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
    return <div className={className}>Sidebar</div>;
};
