import { ZodFirstPartySchemaTypes } from 'zod';

export const vldFn = (schema: ZodFirstPartySchemaTypes) => (data: any) => schema.safeParse(data).success;
