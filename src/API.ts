/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
  email: string,
  imageUri?: string | null,
  bio?: string | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  id?: string,
  name?: string | null,
  email?: string,
  imageUri?: string | null,
  bio?: string | null,
  following?: ModelFollowingConnConnection,
  authored?: ModelStoryConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelFollowingConnConnection = {
  __typename: "ModelFollowingConnConnection",
  items?:  Array<FollowingConn | null > | null,
  nextToken?: string | null,
};

export type FollowingConn = {
  __typename: "FollowingConn",
  id?: string,
  user?: User,
  follower?: User,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelStoryConnection = {
  __typename: "ModelStoryConnection",
  items?:  Array<Story | null > | null,
  nextToken?: string | null,
};

export type Story = {
  __typename: "Story",
  id?: string,
  title?: string,
  imageUri?: string | null,
  audioUri?: string,
  genre?: string,
  userID?: string | null,
  author?: User,
  writer?: string,
  narrator?: string | null,
  time?: number | null,
  description?: string,
  comments?: ModelCommentConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items?:  Array<Comment | null > | null,
  nextToken?: string | null,
};

export type Comment = {
  __typename: "Comment",
  id?: string,
  storyID?: string,
  story?: Story,
  content?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  imageUri?: string | null,
  bio?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateFollowingConnInput = {
  id?: string | null,
  followingConnUserId?: string | null,
  followingConnFollowerId?: string | null,
};

export type ModelFollowingConnConditionInput = {
  and?: Array< ModelFollowingConnConditionInput | null > | null,
  or?: Array< ModelFollowingConnConditionInput | null > | null,
  not?: ModelFollowingConnConditionInput | null,
};

export type UpdateFollowingConnInput = {
  id: string,
  followingConnUserId?: string | null,
  followingConnFollowerId?: string | null,
};

export type DeleteFollowingConnInput = {
  id?: string | null,
};

export type CreateStoryInput = {
  id?: string | null,
  title: string,
  imageUri?: string | null,
  audioUri: string,
  genre: string,
  userID?: string | null,
  writer: string,
  narrator?: string | null,
  time?: number | null,
  description: string,
};

export type ModelStoryConditionInput = {
  title?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  audioUri?: ModelStringInput | null,
  genre?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  writer?: ModelStringInput | null,
  narrator?: ModelStringInput | null,
  time?: ModelIntInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelStoryConditionInput | null > | null,
  or?: Array< ModelStoryConditionInput | null > | null,
  not?: ModelStoryConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateStoryInput = {
  id: string,
  title?: string | null,
  imageUri?: string | null,
  audioUri?: string | null,
  genre?: string | null,
  userID?: string | null,
  writer?: string | null,
  narrator?: string | null,
  time?: number | null,
  description?: string | null,
};

export type DeleteStoryInput = {
  id?: string | null,
};

export type CreateCommentInput = {
  id?: string | null,
  storyID: string,
  content: string,
};

export type ModelCommentConditionInput = {
  storyID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
};

export type UpdateCommentInput = {
  id: string,
  storyID?: string | null,
  content?: string | null,
};

export type DeleteCommentInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export type ModelFollowingConnFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelFollowingConnFilterInput | null > | null,
  or?: Array< ModelFollowingConnFilterInput | null > | null,
  not?: ModelFollowingConnFilterInput | null,
};

export type ModelStoryFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  imageUri?: ModelStringInput | null,
  audioUri?: ModelStringInput | null,
  genre?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  writer?: ModelStringInput | null,
  narrator?: ModelStringInput | null,
  time?: ModelIntInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelStoryFilterInput | null > | null,
  or?: Array< ModelStoryFilterInput | null > | null,
  not?: ModelStoryFilterInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  storyID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type CreateUserMutationVariables = {
  input?: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?:  {
      __typename: "ModelFollowingConnConnection",
      items?:  Array< {
        __typename: "FollowingConn",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items?:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre: string,
        userID?: string | null,
        writer: string,
        narrator?: string | null,
        time?: number | null,
        description: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input?: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?:  {
      __typename: "ModelFollowingConnConnection",
      items?:  Array< {
        __typename: "FollowingConn",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items?:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre: string,
        userID?: string | null,
        writer: string,
        narrator?: string | null,
        time?: number | null,
        description: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input?: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?:  {
      __typename: "ModelFollowingConnConnection",
      items?:  Array< {
        __typename: "FollowingConn",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items?:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre: string,
        userID?: string | null,
        writer: string,
        narrator?: string | null,
        time?: number | null,
        description: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateFollowingConnMutationVariables = {
  input?: CreateFollowingConnInput,
  condition?: ModelFollowingConnConditionInput | null,
};

export type CreateFollowingConnMutation = {
  createFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFollowingConnMutationVariables = {
  input?: UpdateFollowingConnInput,
  condition?: ModelFollowingConnConditionInput | null,
};

export type UpdateFollowingConnMutation = {
  updateFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFollowingConnMutationVariables = {
  input?: DeleteFollowingConnInput,
  condition?: ModelFollowingConnConditionInput | null,
};

export type DeleteFollowingConnMutation = {
  deleteFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateStoryMutationVariables = {
  input?: CreateStoryInput,
  condition?: ModelStoryConditionInput | null,
};

export type CreateStoryMutation = {
  createStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre: string,
    userID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    writer: string,
    narrator?: string | null,
    time?: number | null,
    description: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateStoryMutationVariables = {
  input?: UpdateStoryInput,
  condition?: ModelStoryConditionInput | null,
};

export type UpdateStoryMutation = {
  updateStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre: string,
    userID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    writer: string,
    narrator?: string | null,
    time?: number | null,
    description: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteStoryMutationVariables = {
  input?: DeleteStoryInput,
  condition?: ModelStoryConditionInput | null,
};

export type DeleteStoryMutation = {
  deleteStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre: string,
    userID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    writer: string,
    narrator?: string | null,
    time?: number | null,
    description: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCommentMutationVariables = {
  input?: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre: string,
      userID?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      writer: string,
      narrator?: string | null,
      time?: number | null,
      description: string,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input?: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre: string,
      userID?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      writer: string,
      narrator?: string | null,
      time?: number | null,
      description: string,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input?: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre: string,
      userID?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      writer: string,
      narrator?: string | null,
      time?: number | null,
      description: string,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id?: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?:  {
      __typename: "ModelFollowingConnConnection",
      items?:  Array< {
        __typename: "FollowingConn",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items?:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre: string,
        userID?: string | null,
        writer: string,
        narrator?: string | null,
        time?: number | null,
        description: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetFollowingConnQueryVariables = {
  id?: string,
};

export type GetFollowingConnQuery = {
  getFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFollowingConnsQueryVariables = {
  filter?: ModelFollowingConnFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFollowingConnsQuery = {
  listFollowingConns?:  {
    __typename: "ModelFollowingConnConnection",
    items?:  Array< {
      __typename: "FollowingConn",
      id: string,
      user?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      follower?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetStoryQueryVariables = {
  id?: string,
};

export type GetStoryQuery = {
  getStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre: string,
    userID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    writer: string,
    narrator?: string | null,
    time?: number | null,
    description: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListStorysQueryVariables = {
  filter?: ModelStoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStorysQuery = {
  listStorys?:  {
    __typename: "ModelStoryConnection",
    items?:  Array< {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre: string,
      userID?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      writer: string,
      narrator?: string | null,
      time?: number | null,
      description: string,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id?: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre: string,
      userID?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      writer: string,
      narrator?: string | null,
      time?: number | null,
      description: string,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items?:  Array< {
      __typename: "Comment",
      id: string,
      storyID: string,
      story?:  {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre: string,
        userID?: string | null,
        writer: string,
        narrator?: string | null,
        time?: number | null,
        description: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      content: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?:  {
      __typename: "ModelFollowingConnConnection",
      items?:  Array< {
        __typename: "FollowingConn",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items?:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre: string,
        userID?: string | null,
        writer: string,
        narrator?: string | null,
        time?: number | null,
        description: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?:  {
      __typename: "ModelFollowingConnConnection",
      items?:  Array< {
        __typename: "FollowingConn",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items?:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre: string,
        userID?: string | null,
        writer: string,
        narrator?: string | null,
        time?: number | null,
        description: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    email: string,
    imageUri?: string | null,
    bio?: string | null,
    following?:  {
      __typename: "ModelFollowingConnConnection",
      items?:  Array< {
        __typename: "FollowingConn",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    authored?:  {
      __typename: "ModelStoryConnection",
      items?:  Array< {
        __typename: "Story",
        id: string,
        title: string,
        imageUri?: string | null,
        audioUri: string,
        genre: string,
        userID?: string | null,
        writer: string,
        narrator?: string | null,
        time?: number | null,
        description: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFollowingConnSubscription = {
  onCreateFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFollowingConnSubscription = {
  onUpdateFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFollowingConnSubscription = {
  onDeleteFollowingConn?:  {
    __typename: "FollowingConn",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    follower?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateStorySubscription = {
  onCreateStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre: string,
    userID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    writer: string,
    narrator?: string | null,
    time?: number | null,
    description: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateStorySubscription = {
  onUpdateStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre: string,
    userID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    writer: string,
    narrator?: string | null,
    time?: number | null,
    description: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteStorySubscription = {
  onDeleteStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    imageUri?: string | null,
    audioUri: string,
    genre: string,
    userID?: string | null,
    author?:  {
      __typename: "User",
      id: string,
      name?: string | null,
      email: string,
      imageUri?: string | null,
      bio?: string | null,
      following?:  {
        __typename: "ModelFollowingConnConnection",
        nextToken?: string | null,
      } | null,
      authored?:  {
        __typename: "ModelStoryConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    writer: string,
    narrator?: string | null,
    time?: number | null,
    description: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        storyID: string,
        content: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre: string,
      userID?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      writer: string,
      narrator?: string | null,
      time?: number | null,
      description: string,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre: string,
      userID?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      writer: string,
      narrator?: string | null,
      time?: number | null,
      description: string,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    storyID: string,
    story?:  {
      __typename: "Story",
      id: string,
      title: string,
      imageUri?: string | null,
      audioUri: string,
      genre: string,
      userID?: string | null,
      author?:  {
        __typename: "User",
        id: string,
        name?: string | null,
        email: string,
        imageUri?: string | null,
        bio?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      writer: string,
      narrator?: string | null,
      time?: number | null,
      description: string,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
