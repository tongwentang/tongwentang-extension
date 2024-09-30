import type { FC, MouseEventHandler, ReactNode } from 'react';
import { classEntries } from '../../shared/css';

export const Button: FC<{
  type?: 'primary' | 'link' | 'success' | 'error';
  tooltip?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = ({ type, tooltip, fullWidth, children, onClick: handleClick, disabled }) => {
  const className = classEntries({
    btn: true,
    [`btn-${type}`]: !!type,
    tooltip: !!tooltip,
    disabled: !!disabled,
  });
  const style = fullWidth ? { width: '100%' } : {};

  return (
    <button className={className} style={style} onClick={handleClick} data-tooltip={tooltip}>
      {children}
    </button>
  );
};
