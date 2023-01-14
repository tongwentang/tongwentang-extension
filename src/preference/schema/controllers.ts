import { rctrl, vctrl } from 'data-fixer';
import { z } from 'zod';
import { vldFn } from './validator';

export const isTrue = vctrl(vldFn(z.literal(true)), true);

export const isFalse = vctrl(vldFn(z.literal(false)), false);

export const isBoolean = (alt: boolean) => vctrl(vldFn(z.boolean()), alt);

export const isString = vctrl(vldFn(z.string()), '');

export const isDic = rctrl(isString);
