import { gql } from '@apollo/client';

export const FIND_USER = gql`
  {
    findUser {
      _id
      username
      email
      savedBooks {
         authors
         description
         bookId
         image
         link
         title
       }
    }
  }
`;
