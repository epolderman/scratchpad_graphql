/* Req all knowledge what properties each object has and the relation to one another */
const graphql = require('graphql');
const _ = require('lodash');

const USERS = [
  { id: '23', firstName: 'Erik', age: 32 },
  { id: '24', firstName: 'Bob', age: 22 }
];

const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

// instructs graphql on what the object looks like, types, & relation
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

// root query => allows us to jump into our graph of data => give us user with id 23
// entry point into our data

// resolve function is where we go into our database and find the actual data we are looking for
// grab our data / parentValue => never is really used / args => args passed into query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      arge: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(USERS, u => u.id === args.id);
      }
    }
  }
});
