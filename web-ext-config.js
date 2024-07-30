const { error, parsed: env } = require('dotenv').config();

if (error) {
  throw error;
}

module.exports = {
  verbose: env.WEBEXT_VERBOSE === 'true',
};
