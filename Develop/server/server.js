const express = require('express');
const path = require('path');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: authMiddleware,
 });


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/'));
 })


const startApolloServer = async (typeDefs, resolvers) => {
   await server.start();
   server.applyMiddleware({ app });
   
   db.once('open', () => {
     app.listen(PORT, () => 
     console.log(`🌍 Now listening on ${PORT}`))
   })
   };
   

   startApolloServer(typeDefs, resolvers);
 