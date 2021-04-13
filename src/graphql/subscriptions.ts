/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateFollowingConn = /* GraphQL */ `
  subscription OnCreateFollowingConn {
    onCreateFollowingConn {
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
export const onUpdateFollowingConn = /* GraphQL */ `
  subscription OnUpdateFollowingConn {
    onUpdateFollowingConn {
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
export const onDeleteFollowingConn = /* GraphQL */ `
  subscription OnDeleteFollowingConn {
    onDeleteFollowingConn {
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
export const onCreateStory = /* GraphQL */ `
  subscription OnCreateStory {
    onCreateStory {
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
export const onUpdateStory = /* GraphQL */ `
  subscription OnUpdateStory {
    onUpdateStory {
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
export const onDeleteStory = /* GraphQL */ `
  subscription OnDeleteStory {
    onDeleteStory {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
