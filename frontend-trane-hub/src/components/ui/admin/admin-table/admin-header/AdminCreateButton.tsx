import { Button } from '@/components/ui/form-elements/button/Button';
import { Icon } from '@/components/ui/Icon';
import React from 'react';

interface Props {
    className?: string;
    onClick?: () => void;
}

export const AdminCreateButton: React.FC<Props> = ({ className, onClick }) => {
    return (
        <Button className={className} onClick={onClick}>
            <Icon name="LuPlus" className="size-4 mr-2" />
            создать
        </Button>
    );
};
