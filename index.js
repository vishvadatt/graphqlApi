const {ApolloServer} = require('apollo-server-express');
const express = require('express');
const { typeDefs, resolvers } = require('./schema');
const app = express();
require('./db');


let server;
const startServer = async () => {
    server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start();
    server.applyMiddleware({app});

}
startServer()

app.listen(4000, function () {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});