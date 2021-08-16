const debug = require('debug')('app:config:env');
const dotenv = require('dotenv');
dotenv.config();

debug('Loading environment');

const env = name => process.env[name.toUpperCase()];


module.exports = {

    NODE_ENV: env('node_env') || 'development',

    HOST: env('host') || 'localhost',

    DB_NAME: env('db_name') || 'tasmota-manager',

    PORT: env('port') || 3000,

    JWT_SECRET: env('jwt_secret') || 'secret', //Used to generate JSON web tokens.

};