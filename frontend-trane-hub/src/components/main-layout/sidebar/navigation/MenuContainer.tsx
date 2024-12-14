import React from 'react';

interface Props {
    className?: string;
}

export const MenuContainer: React.FC<Props> = ({ className }) => {
    return <div className={className}>MenuContainer</div>;
};
