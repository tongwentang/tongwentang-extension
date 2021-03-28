import { Schema, validate } from 'jsonschema';

export const vldFn = (schema: Schema) => (data: any) => validate(data, schema).valid;
