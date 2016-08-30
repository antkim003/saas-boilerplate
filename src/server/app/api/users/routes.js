import Express from 'express';
import db from '../../database/models';

const Router = Express.Router();

Router.get('/', function (req, res, next) {
  db.User.findAll({where: {}})
    .then((users) => {
      console.log('users: ', users);
      res.json(users);
    })
});

export default Router;
