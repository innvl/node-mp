import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    'development': {
        'username': process.env.DB_USERNAME,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_NAME,
        'host': process.env.DB_HOSTNAME,
        'dialect': 'postgres',
        'dialectOptions': {
            'ssl': {
                'require': true,
                'rejectUnauthorized': false
            }
        }
    }
};
