SAAS ready Boilerplate with serverside rendering react

Modified from [Meatier](https://github.com/mattkrick/meatier)

| Problem           | My solution                                                         | Result                                                              |
|-------------------|---------------------------------------------------------------------|---------------------------------------------------------------------|
| Database          | [RethinkDB](https://www.rethinkdb.com/)                             | Built in reactivity, but you can use any DB you like                |
| Database schema   | [GraphQL](https://github.com/graphql/graphql-js)                    | Can't have a hipster webapp without GraphQL!                        |
| Client validation | [Joi](https://github.com/hapijs/joi)                                | Clean API for client validation, although the package is HUGE       |
| Database hooks    | [GraphQL](https://github.com/graphql/graphql-js)                    | GraphQL is overkill for small apps (then again, so is meatier)      |
| Client-side cache | [redux](http://redux.js.org/)                                       | Bonus logging, time traveling, and undo functionality               |
| Socket server     | [socketcluster](http://socketcluster.io/#!/)                        | super easy scaling, pubsub, auth, middleware                        |
| Authentication    | [JWTs](https://jwt.io)                                              | JWTs can also serve to authorize actions, too                       |
| Auth-transport    | GraphQL (via HTTP)                                                  | Don't use sockets until you need to                                 |
| Front-end         | [React](https://facebook.github.io/react/)                          | Vdom, server-side rendering, async router, etc.                     |
| Build system      | [webpack](https://webpack.github.io/)                               | using webpack inside meteor is very limited                         |
| CSS               | [css-modules](https://github.com/css-modules/css-modules)           | component-scoped css with variables available in a file or embedded |
| Optimistic UI     | [redux-optimistic-ui](https://github.com/mattkrick/redux-optimistic-ui)  | written by yours truly                                         |
| Testing           | [AVA](https://github.com/sindresorhus/ava)                          | awesome es2016 concurrent testing                                   |
| Linting           | [xo](https://www.npmjs.com/package/xo)                              | no dotfiles, fixes errors                                           |
| Routing           | [react-router-redux](https://github.com/reactjs/react-router-redux) | stick the route in the state, react-router SSR, async routes        |
| Server            | Node 5                                                              | Faster, maintained, not a dinosaur...                               |    
