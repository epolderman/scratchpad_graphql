/* Req all knowledge what properties each object has and the relation to one another */

const graphql = require('graphql');
const axios = require('axios');

// problem with restful routing => graphql can request only the types we need, firstName instead of
// the entire object

// graphql can serve as a proxy, talkt to serveral backend api's and not one monolithic data store, and ship
// a response back our client. graphql can make it's own http requests back to other api's and formulate a response

// high level
// each edge in our graph can be a resolve function
// schema / data => bunch of fucntions that return references to other objects in our graph

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

// instructs graphql on what the object looks like, types, & relation
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/company/${[parentValue.id]}/users`)
          .then(res => res.data);
      }
    }
  })
});

// instructs graphql on what the object looks like, types, & relation
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/company/${parentValue.companyId}`)
          .then(res => res.data);
      }
    }
  })
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
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(res => res.data);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/company/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
