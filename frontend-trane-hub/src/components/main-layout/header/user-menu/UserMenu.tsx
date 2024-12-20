import React from 'react';

interface Props {
    className?: string;
}

export const UserMenu: React.FC<Props> = ({ className }) => {
    return <div className={className}>UserMenu</div>;
};
