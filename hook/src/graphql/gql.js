import { gql } from '@apollo/client';

export const GET_PHONEBOOKS = gql`
query getPhonebooks( $page: Int, $name: String!, $phone: String! ) {
    getPhonebooks( page: $page, name: $name, phone: $phone ) {
      _id
      name
      phone
    }
  }  
`;

export const CREATE_PHONEBOOK = gql`
mutation CreatePhonebook($name: String!, $phone: String!) {
    createPhonebook(input: { name: $name, phone: $phone }) {
        _id
        name
        phone
        }
    }
`;

export const UPDATE_PHONEBOOK = gql`
mutation UpdatePhonebook($id: ID!, $name: String!, $phone: String!) {
    updatePhonebook(id: $id, input: { name: $name, phone: $phone }) {
        _id
        name
        phone
        }
    }
`;

export const UPDATE_AVATAR = gql`
  mutation updateAvatar($id: ID!, $avatar: String!) {
    updateAvatar(id: $id) {
      _id
      name
      phone
    }
  }
`;

export const DELETE_PHONEBOOK = gql`
  mutation deletePhonebook($id: ID!) {
    deletePhonebook(id: $id) {
      _id
      name
      phone
    }
  }
`;