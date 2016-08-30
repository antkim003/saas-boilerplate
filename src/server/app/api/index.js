import Express from 'express';

const Router = Express.Router();
export default Router;

Router.use('/users', require('./users/routes.js'));

Router.use((req,res) => {
  res.status(404).end();
})
