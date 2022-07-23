import { ChangeEvent } from 'react';

export const getInputEventValue = (evt: ChangeEvent<HTMLInputElement>): any => evt.currentTarget.value || '';

export const getSelectEventValue = (evt: ChangeEvent<HTMLSelectElement>): any => evt.currentTarget.value || '';

export const getEventChecked = (evt: ChangeEvent<HTMLInputElement>): boolean => evt.currentTarget.checked;
