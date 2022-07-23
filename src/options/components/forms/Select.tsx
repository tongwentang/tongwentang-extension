import { ChangeEvent, FC, ReactNode } from 'react';

export const Select: FC<{
  id: string;
  label: string;
  value?: string | number | string[];
  children: ReactNode;
  onChange?: (evt: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ id, label, value, onChange, children, ...props }) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select {...props} id={id} className="form-select" onChange={onChange} value={value}>
        {children}
      </select>
    </div>
  );
};
