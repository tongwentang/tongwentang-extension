import { ChangeEvent } from 'react';

export const getInputEventValue = (evt: ChangeEvent<HTMLInputElement>): any => evt.target.value || '';

export const getSelectEventValue = (evt: ChangeEvent<HTMLSelectElement>): any => evt.target.value || '';

export const getEventChecked = (evt: ChangeEvent<HTMLInputElement>): boolean => evt.target.checked;
