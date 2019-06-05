const express = require('express');
const schema = require('./schema/schema');

const PORT = 4000;

// glue layer in express
const expressGraphQL = require('express-graphql');

// express is an http server
const app = express();

// dev tool to make queries against out dev env / dev server
// register a middleware
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log('Listening...', PORT);
});
