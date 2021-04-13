/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      imageUri
      bio
      following {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      authored {
        items {
          id
          title
          imageUri
          audioUri
          genre
          userID
          writer
          narrator
          time
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      imageUri
      bio
      following {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      authored {
        items {
          id
          title
          imageUri
          audioUri
          genre
          userID
          writer
          narrator
          time
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      imageUri
      bio
      following {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      authored {
        items {
          id
          title
          imageUri
          audioUri
          genre
          userID
          writer
          narrator
          time
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFollowingConn = /* GraphQL */ `
  mutation CreateFollowingConn(
    $input: CreateFollowingConnInput!
    $condition: ModelFollowingConnConditionInput
  ) {
    createFollowingConn(input: $input, condition: $condition) {
      id
      user {
        id
        name
        email
        imageUri
        bio
        following {
          nextToken
        }
        authored {
          nextToken
        }
        createdAt
        updatedAt
      }
      follower {
        id
        name
        email
        imageUri
        bio
        following {
          nextToken
        }
        authored {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateFollowingConn = /* GraphQL */ `
  mutation UpdateFollowingConn(
    $input: UpdateFollowingConnInput!
    $condition: ModelFollowingConnConditionInput
  ) {
    updateFollowingConn(input: $input, condition: $condition) {
      id
      user {
        id
        name
        email
        imageUri
        bio
        following {
          nextToken
        }
        authored {
          nextToken
        }
        createdAt
        updatedAt
      }
      follower {
        id
        name
        email
        imageUri
        bio
        following {
          nextToken
        }
        authored {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteFollowingConn = /* GraphQL */ `
  mutation DeleteFollowingConn(
    $input: DeleteFollowingConnInput!
    $condition: ModelFollowingConnConditionInput
  ) {
    deleteFollowingConn(input: $input, condition: $condition) {
      id
      user {
        id
        name
        email
        imageUri
        bio
        following {
          nextToken
        }
        authored {
          nextToken
        }
        createdAt
        updatedAt
      }
      follower {
        id
        name
        email
        imageUri
        bio
        following {
          nextToken
        }
        authored {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createStory = /* GraphQL */ `
  mutation CreateStory(
    $input: CreateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    createStory(input: $input, condition: $condition) {
      id
      title
      imageUri
      audioUri
      genre
      userID
      author {
        id
        name
        email
        imageUri
        bio
        following {
          nextToken
        }
        authored {
          nextToken
        }
        createdAt
        updatedAt
      }
      writer
      narrator
      time
      description
      comments {
        items {
          id
          storyID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateStory = /* GraphQL */ `
  mutation UpdateStory(
    $input: UpdateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    updateStory(input: $input, condition: $condition) {
      id
      title
      imageUri
      audioUri
      genre
      userID
      author {
        id
        name
        email
        imageUri
        bio
        following {
          nextToken
        }
        authored {
          nextToken
        }
        createdAt
        updatedAt
      }
      writer
      narrator
      time
      description
      comments {
        items {
          id
          storyID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteStory = /* GraphQL */ `
  mutation DeleteStory(
    $input: DeleteStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    deleteStory(input: $input, condition: $condition) {
      id
      title
      imageUri
      audioUri
      genre
      userID
      author {
        id
        name
        email
        imageUri
        bio
        following {
          nextToken
        }
        authored {
          nextToken
        }
        createdAt
        updatedAt
      }
      writer
      narrator
      time
      description
      comments {
        items {
          id
          storyID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      storyID
      story {
        id
        title
        imageUri
        audioUri
        genre
        userID
        author {
          id
          name
          email
          imageUri
          bio
          createdAt
          updatedAt
        }
        writer
        narrator
        time
        description
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      storyID
      story {
        id
        title
        imageUri
        audioUri
        genre
        userID
        author {
          id
          name
          email
          imageUri
          bio
          createdAt
          updatedAt
        }
        writer
        narrator
        time
        description
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      storyID
      story {
        id
        title
        imageUri
        audioUri
        genre
        userID
        author {
          id
          name
          email
          imageUri
          bio
          createdAt
          updatedAt
        }
        writer
        narrator
        time
        description
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
