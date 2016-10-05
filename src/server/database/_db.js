import Sequelize from 'sequelize';
// import Promise from 'bluebird';
import {getDotenv} from '../../universal/utils/dotenv';
getDotenv();

// console.log('process.env.NODE_ENV!!!!!', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'testing') {
  console.log('Testing Environment');
  process.env.DATABASE_URL = "postgres://localhost:5432/relay_test";
}

const Db = new Sequelize(process.env.DATABASE_URL, {logging: false});
export default Db;
