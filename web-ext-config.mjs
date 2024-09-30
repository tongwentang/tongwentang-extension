import dotenv from 'dotenv';
const { error, parsed: env } = dotenv.config();

if (error) {
  throw error;
}

export const config = {
  verbose: env.WEBEXT_VERBOSE === 'true',
};

export { env };
