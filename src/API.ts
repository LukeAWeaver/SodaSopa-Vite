/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type User = {
  __typename: "User",
  _id: string,
  authProvider?: string | null,
  email?: string | null,
  name?: string | null,
  uid?: string | null,
};

export type GetUsersQuery = {
  getUsers?:  Array< {
    __typename: "User",
    _id: string,
    authProvider?: string | null,
    email?: string | null,
    name?: string | null,
    uid?: string | null,
  } | null > | null,
};
