import dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();

if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    port: parseInt(process.env.PORT || '3000', 10),
    databaseURL: process.env.DATABASE_URL || 'postgres://tzfwtgmwnbcpvu:5f639773fd7225443c05bc14590f1967a612c5a69a68fe03584d78167f4f6a5c@ec2-54-75-244-161.eu-west-1.compute.amazonaws.com:5432/d3moss972a88qa?sslmode=require'
};
