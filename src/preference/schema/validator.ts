import type { ZodFirstPartySchemaTypes } from 'zod';

export const vldFn = (schema: ZodFirstPartySchemaTypes) => (data: unknown) => schema.safeParse(data).success;
