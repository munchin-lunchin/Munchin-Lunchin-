const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const typeDefs = buildSchema(`
  type User {
    id: String
    username: String
    password: String
 }
  type Query {
    getUser: User
  }
`);

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getUser: () => ({
        username: 'user',
        password: 'pw'
      }
    ),
  },
};

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
