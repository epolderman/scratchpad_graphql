const express = require('express');

// glue layer in express
const expressGraphQL = require('express-graphql');

// express is an http server
const app = express();

// dev tool to make queries against out dev env / dev server
// register a middleware
app.use(
  '/graphql',
  expressGraphQL({
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('Listening...');
});
