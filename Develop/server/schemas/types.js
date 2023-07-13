const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type Query {
      user: User
   }

   type Mutation {
      addUser(username: String!, email: String!, password: String!): Authorized
      login(email: String!, password: String!): Authorized
      addBook(bookData: InputBook!): User
      deleteBook(bookId: ID!): User
   }

   input InputBook {
      authors: [String]
      description: String!
      bookId: String!
      image: String
      link: String
      title: String!
    }

    type User {
      _id: ID!
      username: String!
      email: String
      bookCount: Int
      savedBooks: [Book]
      password: String!
    }

    type Authorized {
      token: ID!
      user: User
    }

    type Book {
      bookId: ID!
      authors: [String]
      description: String
      image: String
      link: String
      title: String!
    }
`;

module.exports = typeDefs;