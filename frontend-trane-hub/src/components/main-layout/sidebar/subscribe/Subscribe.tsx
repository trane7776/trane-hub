import React from 'react'

interface Props {
  className?: string;
}

export const Subscribe: React.FC<Props> = ({className}) => {
  return <div className={className}>Subscribe</div>;
}
