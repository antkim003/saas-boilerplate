import Sequelize from 'sequelize';
// import Promise from 'bluebird';
import {getDotenv} from '../../universal/utils/dotenv';
getDotenv();

const Db = new Sequelize(process.env.DATABASE_URL, {logging: false});
// const Db = new Sequelize(process.env.DATABASE_URL);
export default Db;
