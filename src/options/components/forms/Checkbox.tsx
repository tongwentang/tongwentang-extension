import { ChangeEvent, FC } from 'react';

export const Checkbox: FC<{
  isSwitch: boolean;
  label: string;
  checked: boolean;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}> = ({ isSwitch, label, checked: value, onChange }) => {
  return (
    <div className="form-group">
      <label className={isSwitch ? 'form-switch' : 'form-checkbox'}>
        <input type="checkbox" checked={value} onChange={onChange} />
        <i className="form-icon" /> {label}
      </label>
    </div>
  );
};
