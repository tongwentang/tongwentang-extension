import { v2Schema } from './schema/v2';
import { Pref } from './types/lastest';

// default TongWen preferences
export const getDefaultPref = (): Pref => v2Schema({}).value() as Pref;
