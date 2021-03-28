import { rctrl, vctrl } from 'data-fixer';
import { vldFn } from './validator';

export const isTrue = vctrl(vldFn({ type: 'boolean', required: true, enum: [true] }), true);

export const isFalse = vctrl(vldFn({ type: 'boolean', required: true, enum: [false] }), false);

export const isBoolean = (alt: boolean) => vctrl(vldFn({ type: 'boolean', required: true }), alt);

export const isString = vctrl(vldFn({ type: 'string', required: true }), '');

export const isDic = rctrl(isString);
