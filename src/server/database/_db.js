import Sequelize from 'sequelize';
import Promise from 'bluebird';
import {getDotenv} from '../../universal/utils/dotenv';
getDotenv();

// console.log('database: ', process.env.DATABASE_URL);
const Db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/relay');

export default Db;
